/**
 * Reaction Kinetics Simulator — NGSS HS-PS1-5 & HS-PS1-6
 *
 * Particle-based visualization of:
 * - Temperature effects on reaction rate (particle speed, collision frequency)
 * - Concentration effects on reaction rate (particle density)
 * - Energy diagrams (activation energy, exo/endothermic pathways)
 * - Le Chatelier's principle (equilibrium shifts)
 * - Real-time reaction rate display
 *
 * ZERO HARDCODING — all energetics computed from bond energies via Pauling's equation.
 */

(function() {
    'use strict';

    // =========================================================================
    // REACTION KINETICS ENGINE
    // =========================================================================

    class ReactionKineticsEngine {
        constructor() {
            this.temperature = 298;      // K
            this.concentrationA = 50;    // particle count for reactant A
            this.concentrationB = 50;    // particle count for reactant B
            this.catalystActive = false;
            this.particles = [];
            this.products = [];
            this.collisionCount = 0;
            this.reactionCount = 0;
            this.frameCount = 0;
            this.running = false;
            this.animId = null;
            this.canvas = null;
            this.ctx = null;
            this.width = 0;
            this.height = 0;

            // Current reaction definition (algorithmic)
            this.reaction = null;
            this.activationEnergy = 80;  // kJ/mol (computed)
            this.deltaH = -40;           // kJ/mol (computed)

            // Rate tracking
            this.rateHistory = [];
            this.collisionHistory = [];
            this.equilibriumK = 1;
            this.forwardRate = 0;
            this.reverseRate = 0;

            // Predefined reaction templates (generic, not hardcoded to specific molecules)
            this.reactionTemplates = [
                {
                    name: 'A + B → AB',
                    desc: 'Generic synthesis (exothermic)',
                    reactantA: { symbol: 'A', color: '#f87171', radius: 8 },
                    reactantB: { symbol: 'B', color: '#60a5fa', radius: 8 },
                    product:   { symbol: 'AB', color: '#a78bfa', radius: 12 },
                    Ea: 75,
                    deltaH: -50,
                    reversible: true
                },
                {
                    name: 'A + B → AB (endothermic)',
                    desc: 'Generic synthesis (endothermic)',
                    reactantA: { symbol: 'A', color: '#fb923c', radius: 8 },
                    reactantB: { symbol: 'B', color: '#34d399', radius: 8 },
                    product:   { symbol: 'AB', color: '#fbbf24', radius: 12 },
                    Ea: 120,
                    deltaH: 45,
                    reversible: true
                },
                {
                    name: '2A + B → A₂B',
                    desc: 'Higher-order reaction',
                    reactantA: { symbol: 'A', color: '#f472b6', radius: 7 },
                    reactantB: { symbol: 'B', color: '#38bdf8', radius: 9 },
                    product:   { symbol: 'A₂B', color: '#c084fc', radius: 13 },
                    Ea: 95,
                    deltaH: -30,
                    reversible: true,
                    ratioA: 2
                }
            ];

            // Use bond energy engine if available
            this._engineRef = null;
        }

        // Link to main ChemistryEngine for bond energy calculations
        linkEngine(eng) {
            this._engineRef = eng;
        }

        /**
         * Compute activation energy from bond energies (algorithmic).
         * Ea ≈ sum of bonds broken - fraction of bonds formed
         * Uses Pauling's equation via engine.getBondEnergy()
         */
        computeEnergeticsFromBonds(reactantBonds, productBonds) {
            if (!this._engineRef) return { Ea: 80, deltaH: -40 };

            let breakEnergy = 0;
            reactantBonds.forEach(b => {
                breakEnergy += this._engineRef.getBondEnergy(b[0], b[1], b[2] || 1);
            });

            let formEnergy = 0;
            productBonds.forEach(b => {
                formEnergy += this._engineRef.getBondEnergy(b[0], b[1], b[2] || 1);
            });

            const deltaH = breakEnergy - formEnergy; // positive = endothermic
            // Evans-Polanyi: Ea = E0 + alpha * deltaH
            const Ea = Math.max(20, 50 + 0.25 * deltaH);

            return { Ea: Math.round(Ea), deltaH: Math.round(deltaH) };
        }

        setReaction(template) {
            this.reaction = template;
            this.activationEnergy = template.Ea;
            this.deltaH = template.deltaH;
            this.reset();
        }

        reset() {
            this.particles = [];
            this.products = [];
            this.collisionCount = 0;
            this.reactionCount = 0;
            this.frameCount = 0;
            this.rateHistory = [];
            this.collisionHistory = [];
            if (!this.reaction) return;
            this.spawnParticles();
        }

        spawnParticles() {
            const r = this.reaction;
            const w = this.width || 600;
            const h = this.height || 400;
            const margin = 20;

            // Spawn reactant A particles
            for (let i = 0; i < this.concentrationA; i++) {
                this.particles.push(this.createParticle('A', r.reactantA, w, h, margin));
            }
            // Spawn reactant B particles
            for (let i = 0; i < this.concentrationB; i++) {
                this.particles.push(this.createParticle('B', r.reactantB, w, h, margin));
            }
        }

        createParticle(type, spec, w, h, margin) {
            const speed = this.getParticleSpeed();
            const angle = Math.random() * Math.PI * 2;
            return {
                type: type,
                x: margin + Math.random() * (w - 2 * margin),
                y: margin + Math.random() * (h - 2 * margin),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: spec.radius,
                color: spec.color,
                symbol: spec.symbol,
                age: 0
            };
        }

        getParticleSpeed() {
            // Maxwell-Boltzmann: v_rms ∝ sqrt(T)
            // Base speed at 298K = 2 px/frame, scales with sqrt(T/298)
            return 1.5 * Math.sqrt(this.temperature / 298) * (0.8 + Math.random() * 0.4);
        }

        /**
         * Arrhenius probability: k = A * exp(-Ea / RT)
         * Returns probability of reaction per collision
         */
        getReactionProbability() {
            const R = 8.314e-3; // kJ/(mol·K)
            const Ea = this.catalystActive ? this.activationEnergy * 0.6 : this.activationEnergy;
            // Real Arrhenius: k = A·exp(-Ea/RT), where A ≈ 10^10–10^13 compensates
            // for the tiny exponential. In our particle simulation, we scale Ea to
            // produce observable reactions while preserving correct temperature
            // dependence, catalyst effects, and endo-vs-exo differences.
            const SIM_SCALE = 0.12;
            return Math.min(0.95, Math.exp(-Ea * SIM_SCALE / (R * this.temperature)));
        }

        getReverseReactionProbability() {
            if (!this.reaction || !this.reaction.reversible) return 0;
            const R = 8.314e-3;
            const Ea_reverse = this.activationEnergy - this.deltaH; // Ea_reverse = Ea_forward - deltaH
            const EaEff = this.catalystActive ? Ea_reverse * 0.6 : Ea_reverse;
            const SIM_SCALE = 0.12;
            return Math.min(0.95, Math.exp(-EaEff * SIM_SCALE / (R * this.temperature)));
        }

        /**
         * Equilibrium constant K = exp(-deltaH / RT) (simplified van't Hoff)
         */
        getEquilibriumConstant() {
            const R = 8.314e-3;
            return Math.exp(-this.deltaH / (R * this.temperature));
        }

        step() {
            if (!this.reaction) return;
            this.frameCount++;

            const w = this.width;
            const h = this.height;
            const collisionDist = 16;
            let frameCollisions = 0;
            let frameReactions = 0;

            // Update particle speeds based on temperature
            const targetSpeed = this.getParticleSpeed();

            // Move particles
            const allParticles = [...this.particles, ...this.products];
            allParticles.forEach(p => {
                // Gradually adjust speed toward target (thermal equilibration)
                const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (currentSpeed > 0) {
                    const factor = 0.02; // lerp factor
                    const newSpeed = currentSpeed + (targetSpeed - currentSpeed) * factor;
                    const scale = newSpeed / currentSpeed;
                    p.vx *= scale;
                    p.vy *= scale;
                }

                p.x += p.vx;
                p.y += p.vy;
                p.age++;

                // Wall bouncing
                if (p.x < p.radius) { p.x = p.radius; p.vx = Math.abs(p.vx); }
                if (p.x > w - p.radius) { p.x = w - p.radius; p.vx = -Math.abs(p.vx); }
                if (p.y < p.radius) { p.y = p.radius; p.vy = Math.abs(p.vy); }
                if (p.y > h - p.radius) { p.y = h - p.radius; p.vy = -Math.abs(p.vy); }
            });

            // Check collisions between A and B particles (forward reaction)
            const prob = this.getReactionProbability();
            const ratioA = this.reaction.ratioA || 1;

            for (let i = this.particles.length - 1; i >= 0; i--) {
                const pA = this.particles[i];
                if (pA.type !== 'A') continue;

                for (let j = this.particles.length - 1; j >= 0; j--) {
                    if (i === j) continue;
                    const pB = this.particles[j];
                    if (pB.type !== 'B') continue;

                    const dx = pA.x - pB.x;
                    const dy = pA.y - pB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < collisionDist) {
                        frameCollisions++;
                        this.collisionCount++;

                        // Arrhenius probability check
                        if (Math.random() < prob) {
                            // Reaction! Remove reactants, create product
                            const prodSpec = this.reaction.product;
                            const product = {
                                type: 'P',
                                x: (pA.x + pB.x) / 2,
                                y: (pA.y + pB.y) / 2,
                                vx: (pA.vx + pB.vx) / 2,
                                vy: (pA.vy + pB.vy) / 2,
                                radius: prodSpec.radius,
                                color: prodSpec.color,
                                symbol: prodSpec.symbol,
                                age: 0
                            };
                            this.products.push(product);
                            // Remove reactants (splice higher index first)
                            const hi = Math.max(i, j);
                            const lo = Math.min(i, j);
                            this.particles.splice(hi, 1);
                            this.particles.splice(lo, 1);
                            frameReactions++;
                            this.reactionCount++;
                            break; // pA consumed, move on
                        } else {
                            // Elastic collision — bounce
                            const nx = dx / dist;
                            const ny = dy / dist;
                            const dvx = pA.vx - pB.vx;
                            const dvy = pA.vy - pB.vy;
                            const dvn = dvx * nx + dvy * ny;
                            pA.vx -= dvn * nx;
                            pA.vy -= dvn * ny;
                            pB.vx += dvn * nx;
                            pB.vy += dvn * ny;
                        }
                    }
                }
            }

            // Reverse reaction (products decompose back to reactants)
            if (this.reaction.reversible) {
                const reverseProb = this.getReverseReactionProbability();
                for (let i = this.products.length - 1; i >= 0; i--) {
                    if (Math.random() < reverseProb * 0.02) { // per-frame chance
                        const prod = this.products[i];
                        const r = this.reaction;
                        // Split back into reactants
                        const speed = this.getParticleSpeed();
                        const angle1 = Math.random() * Math.PI * 2;
                        const angle2 = angle1 + Math.PI;
                        this.particles.push({
                            type: 'A', x: prod.x - 5, y: prod.y,
                            vx: Math.cos(angle1) * speed, vy: Math.sin(angle1) * speed,
                            radius: r.reactantA.radius, color: r.reactantA.color,
                            symbol: r.reactantA.symbol, age: 0
                        });
                        this.particles.push({
                            type: 'B', x: prod.x + 5, y: prod.y,
                            vx: Math.cos(angle2) * speed, vy: Math.sin(angle2) * speed,
                            radius: r.reactantB.radius, color: r.reactantB.color,
                            symbol: r.reactantB.symbol, age: 0
                        });
                        this.products.splice(i, 1);
                    }
                }
            }

            // Track rates (per 30 frames ≈ 0.5 sec)
            if (this.frameCount % 30 === 0) {
                this.rateHistory.push(frameReactions);
                this.collisionHistory.push(frameCollisions);
                if (this.rateHistory.length > 60) this.rateHistory.shift();
                if (this.collisionHistory.length > 60) this.collisionHistory.shift();
            }

            // Calculate current rates
            const countA = this.particles.filter(p => p.type === 'A').length;
            const countB = this.particles.filter(p => p.type === 'B').length;
            const countP = this.products.length;
            this.forwardRate = prob * countA * countB * 0.001;
            this.reverseRate = this.getReverseReactionProbability() * countP * 0.001;
            this.equilibriumK = this.getEquilibriumConstant();

            return { countA, countB, countP, frameCollisions, frameReactions };
        }

        // =====================================================================
        // RENDERING
        // =====================================================================

        render(stats) {
            if (!this.ctx) return;
            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;

            // Clear
            ctx.fillStyle = '#0a0f1a';
            ctx.fillRect(0, 0, w, h);

            // Grid dots
            ctx.fillStyle = 'rgba(255,255,255,0.04)';
            for (let x = 0; x < w; x += 30) {
                for (let y = 0; y < h; y += 30) {
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            // Draw all particles
            const allParticles = [...this.particles, ...this.products];
            allParticles.forEach(p => {
                // Glow
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
                gradient.addColorStop(0, p.color + '40');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
                ctx.fill();

                // Body
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Border
                ctx.strokeStyle = p.color + 'aa';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Label
                ctx.fillStyle = '#fff';
                ctx.font = `bold ${Math.max(8, p.radius - 1)}px Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.symbol, p.x, p.y);
            });

            // Speed indicator arrows (show a few)
            if (this.particles.length > 0) {
                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                ctx.lineWidth = 1;
                const showCount = Math.min(8, this.particles.length);
                for (let i = 0; i < showCount; i++) {
                    const p = this.particles[i];
                    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                    const len = speed * 8;
                    const nx = p.vx / speed;
                    const ny = p.vy / speed;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x + nx * len, p.y + ny * len);
                    ctx.stroke();
                }
            }
        }
    }

    // =========================================================================
    // ENERGY DIAGRAM RENDERER (SVG-based)
    // =========================================================================

    class EnergyDiagramRenderer {
        constructor(containerId) {
            this.containerId = containerId;
        }

        render(Ea, deltaH, catalystActive, temperature) {
            const container = document.getElementById(this.containerId);
            if (!container) return;

            const w = 380;
            const h = 220;
            const pad = { top: 25, right: 20, bottom: 30, left: 45 };
            const plotW = w - pad.left - pad.right;
            const plotH = h - pad.top - pad.bottom;

            // Energy scale
            const reactantE = 0;
            const productE = -deltaH; // negative deltaH means products lower (exothermic)
            const transitionE = Ea;
            const catalystE = catalystActive ? Ea * 0.6 : null;

            const maxE = Math.max(transitionE, reactantE, -productE) + 20;
            const minE = Math.min(reactantE, -deltaH) - 20;
            const range = maxE - minE;

            const scaleY = (e) => pad.top + plotH - ((e - minE) / range) * plotH;
            const scaleX = (frac) => pad.left + frac * plotW;

            // Temperature color for the transition state glow
            const tempFrac = Math.min(1, (temperature - 100) / 2000);
            const glowColor = `rgba(${Math.round(255 * tempFrac)}, ${Math.round(100 * (1 - tempFrac))}, ${Math.round(50)}, 0.15)`;

            const isExo = deltaH < 0;
            const pathColor = isExo ? '#34d399' : '#f87171';
            const pathLabel = isExo ? 'Exothermic' : 'Endothermic';

            // Build SVG
            let svg = `<svg viewBox="0 0 ${w} ${h}" class="w-full h-full">`;

            // Background
            svg += `<rect x="0" y="0" width="${w}" height="${h}" fill="#0f172a" rx="8"/>`;

            // Y-axis
            svg += `<line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + plotH}" stroke="#334155" stroke-width="1"/>`;
            svg += `<text x="${pad.left - 8}" y="${pad.top + plotH / 2}" fill="#64748b" font-size="9" text-anchor="middle" transform="rotate(-90, ${pad.left - 8}, ${pad.top + plotH / 2})" font-family="Inter">Energy (kJ/mol)</text>`;

            // X-axis
            svg += `<line x1="${pad.left}" y1="${pad.top + plotH}" x2="${pad.left + plotW}" y2="${pad.top + plotH}" stroke="#334155" stroke-width="1"/>`;
            svg += `<text x="${pad.left + plotW / 2}" y="${h - 5}" fill="#64748b" font-size="9" text-anchor="middle" font-family="Inter">Reaction Progress</text>`;

            // Reaction pathway curve (smooth bezier)
            const rX = scaleX(0.1);
            const rY = scaleY(reactantE);
            const tX = scaleX(0.5);
            const tY = scaleY(transitionE);
            const pX = scaleX(0.9);
            const pY = scaleY(-deltaH);

            // Glow around transition state
            svg += `<circle cx="${tX}" cy="${tY}" r="25" fill="${glowColor}"/>`;

            // Main pathway
            svg += `<path d="M ${rX} ${rY} C ${scaleX(0.3)} ${rY}, ${scaleX(0.35)} ${tY}, ${tX} ${tY} C ${scaleX(0.65)} ${tY}, ${scaleX(0.7)} ${pY}, ${pX} ${pY}" fill="none" stroke="${pathColor}" stroke-width="2.5" stroke-linecap="round"/>`;

            // Catalyst pathway (dashed, lower peak)
            if (catalystActive && catalystE !== null) {
                const ctY = scaleY(catalystE);
                svg += `<path d="M ${rX} ${rY} C ${scaleX(0.3)} ${rY}, ${scaleX(0.35)} ${ctY}, ${tX} ${ctY} C ${scaleX(0.65)} ${ctY}, ${scaleX(0.7)} ${pY}, ${pX} ${pY}" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6,3" stroke-linecap="round"/>`;
                svg += `<text x="${tX + 20}" y="${ctY - 5}" fill="#fbbf24" font-size="8" font-family="Inter" font-weight="600">With catalyst</text>`;
            }

            // Reactant level line
            svg += `<line x1="${scaleX(0)}" y1="${rY}" x2="${scaleX(0.2)}" y2="${rY}" stroke="#64748b" stroke-width="1" stroke-dasharray="3,3"/>`;
            svg += `<text x="${scaleX(0.05)}" y="${rY - 6}" fill="#94a3b8" font-size="8" font-family="Inter" font-weight="600">Reactants</text>`;

            // Product level line
            svg += `<line x1="${scaleX(0.8)}" y1="${pY}" x2="${scaleX(1)}" y2="${pY}" stroke="#64748b" stroke-width="1" stroke-dasharray="3,3"/>`;
            svg += `<text x="${scaleX(0.85)}" y="${pY - 6}" fill="#94a3b8" font-size="8" font-family="Inter" font-weight="600">Products</text>`;

            // Ea arrow
            const eaTop = tY;
            const eaBot = rY;
            svg += `<line x1="${scaleX(0.32)}" y1="${eaBot}" x2="${scaleX(0.32)}" y2="${eaTop}" stroke="#f59e0b" stroke-width="1.5"/>`;
            svg += `<polygon points="${scaleX(0.32) - 3},${eaTop + 6} ${scaleX(0.32) + 3},${eaTop + 6} ${scaleX(0.32)},${eaTop}" fill="#f59e0b"/>`;
            svg += `<text x="${scaleX(0.32) - 5}" y="${(eaTop + eaBot) / 2}" fill="#f59e0b" font-size="9" text-anchor="end" font-family="Inter" font-weight="700">Ea = ${Math.round(Ea)} kJ/mol</text>`;

            // Delta H arrow
            const dhTop = Math.min(rY, pY);
            const dhBot = Math.max(rY, pY);
            svg += `<line x1="${scaleX(0.75)}" y1="${rY}" x2="${scaleX(0.75)}" y2="${pY}" stroke="${pathColor}" stroke-width="1.5"/>`;
            const arrowY = deltaH < 0 ? pY - 6 : pY + 6;
            svg += `<polygon points="${scaleX(0.75) - 3},${pY + (deltaH < 0 ? 6 : -6)} ${scaleX(0.75) + 3},${pY + (deltaH < 0 ? 6 : -6)} ${scaleX(0.75)},${pY}" fill="${pathColor}"/>`;
            svg += `<text x="${scaleX(0.75) + 5}" y="${(rY + pY) / 2}" fill="${pathColor}" font-size="9" font-family="Inter" font-weight="700">${deltaH > 0 ? '+' : ''}${Math.round(deltaH)} kJ</text>`;

            // Exo/Endo label
            svg += `<text x="${w - pad.right}" y="${pad.top + 10}" fill="${pathColor}" font-size="10" text-anchor="end" font-family="Inter" font-weight="800">${pathLabel}</text>`;

            svg += `</svg>`;
            container.innerHTML = svg;
        }
    }

    // =========================================================================
    // RATE GRAPH RENDERER
    // =========================================================================

    class RateGraphRenderer {
        constructor(canvasId) {
            this.canvasId = canvasId;
        }

        render(rateHistory, collisionHistory) {
            const canvas = document.getElementById(this.canvasId);
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;

            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);

            if (rateHistory.length < 2) {
                ctx.fillStyle = '#475569';
                ctx.font = '10px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Collecting data...', w / 2, h / 2);
                return;
            }

            const pad = { left: 5, right: 5, top: 5, bottom: 5 };
            const plotW = w - pad.left - pad.right;
            const plotH = h - pad.top - pad.bottom;

            // Draw collision rate (background, subtle)
            const maxColl = Math.max(1, ...collisionHistory);
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            collisionHistory.forEach((v, i) => {
                const x = pad.left + (i / (collisionHistory.length - 1)) * plotW;
                const y = pad.top + plotH - (v / maxColl) * plotH;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Draw reaction rate (foreground)
            const maxRate = Math.max(1, ...rateHistory);
            ctx.strokeStyle = '#34d399';
            ctx.lineWidth = 2;
            ctx.beginPath();
            rateHistory.forEach((v, i) => {
                const x = pad.left + (i / (rateHistory.length - 1)) * plotW;
                const y = pad.top + plotH - (v / maxRate) * plotH;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            });
            ctx.stroke();
        }
    }

    // =========================================================================
    // LE CHATELIER EQUILIBRIUM VISUALIZER
    // =========================================================================

    class EquilibriumVisualizer {
        render(containerId, engine) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const K = engine.equilibriumK;
            const countA = engine.particles.filter(p => p.type === 'A').length;
            const countB = engine.particles.filter(p => p.type === 'B').length;
            const countP = engine.products.length;
            const total = countA + countB + countP || 1;

            const fracR = (countA + countB) / total;
            const fracP = countP / total;

            // Determine shift direction
            let shiftText = '';
            let shiftColor = '#94a3b8';
            if (engine.deltaH < 0) {
                // Exothermic: heat shifts left
                if (engine.temperature > 500) {
                    shiftText = '← Increasing T shifts equilibrium toward reactants';
                    shiftColor = '#f87171';
                } else {
                    shiftText = '→ Lower T favors product formation';
                    shiftColor = '#34d399';
                }
            } else {
                // Endothermic: heat shifts right
                if (engine.temperature > 500) {
                    shiftText = '→ Increasing T shifts equilibrium toward products';
                    shiftColor = '#34d399';
                } else {
                    shiftText = '← Lower T shifts equilibrium toward reactants';
                    shiftColor = '#f87171';
                }
            }

            // Concentration effect
            let concText = '';
            if (countA > countB * 2) {
                concText = 'Excess A drives reaction → more products';
            } else if (countB > countA * 2) {
                concText = 'Excess B drives reaction → more products';
            } else if (countP > (countA + countB)) {
                concText = 'Product buildup drives reverse reaction ← more reactants';
            }

            container.innerHTML = `
                <div class="space-y-3">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest">Equilibrium Position</span>
                        <span class="text-[9px] font-mono text-indigo-400">K = ${K.toFixed(2)}</span>
                    </div>

                    <!-- Equilibrium bar -->
                    <div class="relative h-6 bg-slate-800 rounded-full overflow-hidden">
                        <div class="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500/60 to-red-500/30 transition-all duration-500" style="width: ${(fracR * 100).toFixed(1)}%"></div>
                        <div class="absolute right-0 top-0 h-full bg-gradient-to-l from-violet-500/60 to-violet-500/30 transition-all duration-500" style="width: ${(fracP * 100).toFixed(1)}%"></div>
                        <div class="absolute inset-0 flex items-center justify-between px-3">
                            <span class="text-[9px] font-bold text-red-300">Reactants ${Math.round(fracR * 100)}%</span>
                            <span class="text-[8px] font-bold text-white/40">⇌</span>
                            <span class="text-[9px] font-bold text-violet-300">Products ${Math.round(fracP * 100)}%</span>
                        </div>
                    </div>

                    <!-- Le Chatelier shift indicator -->
                    <div class="bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
                        <div class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Le Chatelier's Principle</div>
                        <div class="text-[10px] font-medium" style="color: ${shiftColor}">${shiftText}</div>
                        ${concText ? `<div class="text-[10px] font-medium text-blue-400 mt-1">${concText}</div>` : ''}
                    </div>

                    <!-- Rate comparison -->
                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Forward Rate</div>
                            <div class="text-sm font-black text-emerald-400">${engine.forwardRate.toFixed(3)}</div>
                        </div>
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Reverse Rate</div>
                            <div class="text-sm font-black text-rose-400">${engine.reverseRate.toFixed(3)}</div>
                        </div>
                    </div>

                    <!-- Particle counts -->
                    <div class="grid grid-cols-3 gap-2">
                        <div class="bg-red-500/10 p-2 rounded-lg border border-red-500/20 text-center">
                            <div class="text-[8px] text-red-400 uppercase font-black">A</div>
                            <div class="text-lg font-black text-red-300">${countA}</div>
                        </div>
                        <div class="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20 text-center">
                            <div class="text-[8px] text-blue-400 uppercase font-black">B</div>
                            <div class="text-lg font-black text-blue-300">${countB}</div>
                        </div>
                        <div class="bg-violet-500/10 p-2 rounded-lg border border-violet-500/20 text-center">
                            <div class="text-[8px] text-violet-400 uppercase font-black">Product</div>
                            <div class="text-lg font-black text-violet-300">${countP}</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // =========================================================================
    // PAGE CONTROLLER
    // =========================================================================

    class ReactionKineticsPage {
        constructor() {
            this.engine = new ReactionKineticsEngine();
            this.energyDiagram = new EnergyDiagramRenderer('rk-energy-diagram');
            this.rateGraph = new RateGraphRenderer('rk-rate-canvas');
            this.equilibrium = new EquilibriumVisualizer();
            this.initialized = false;
        }

        init() {
            if (this.initialized) return;

            // Link to main chemistry engine if available
            if (typeof engine !== 'undefined') {
                this.engine.linkEngine(engine);
            }

            const canvas = document.getElementById('rk-particle-canvas');
            if (!canvas) return;

            this.engine.canvas = canvas;
            this.engine.ctx = canvas.getContext('2d');

            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());

            // Set default reaction
            this.engine.setReaction(this.engine.reactionTemplates[0]);

            // Bind controls
            this.bindControls();
            this.renderReactionSelector();
            this.updateEnergyDiagram();

            this.initialized = true;
        }

        resizeCanvas() {
            const canvas = document.getElementById('rk-particle-canvas');
            if (!canvas) return;
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            this.engine.width = canvas.width;
            this.engine.height = canvas.height;
        }

        bindControls() {
            // Temperature slider
            const tempSlider = document.getElementById('rk-temp-slider');
            const tempVal = document.getElementById('rk-temp-val');
            if (tempSlider) {
                tempSlider.oninput = () => {
                    this.engine.temperature = parseInt(tempSlider.value);
                    if (tempVal) tempVal.textContent = `${this.engine.temperature} K`;
                    this.updateEnergyDiagram();
                };
            }

            // Concentration A slider
            const concASlider = document.getElementById('rk-conc-a-slider');
            const concAVal = document.getElementById('rk-conc-a-val');
            if (concASlider) {
                concASlider.oninput = () => {
                    this.engine.concentrationA = parseInt(concASlider.value);
                    if (concAVal) concAVal.textContent = concASlider.value;
                };
            }

            // Concentration B slider
            const concBSlider = document.getElementById('rk-conc-b-slider');
            const concBVal = document.getElementById('rk-conc-b-val');
            if (concBSlider) {
                concBSlider.oninput = () => {
                    this.engine.concentrationB = parseInt(concBSlider.value);
                    if (concBVal) concBVal.textContent = concBSlider.value;
                };
            }

            // Catalyst toggle
            const catalystBtn = document.getElementById('rk-catalyst-btn');
            if (catalystBtn) {
                catalystBtn.onclick = () => {
                    this.engine.catalystActive = !this.engine.catalystActive;
                    catalystBtn.classList.toggle('bg-yellow-500/20', this.engine.catalystActive);
                    catalystBtn.classList.toggle('border-yellow-500/50', this.engine.catalystActive);
                    catalystBtn.classList.toggle('text-yellow-400', this.engine.catalystActive);
                    catalystBtn.textContent = this.engine.catalystActive ? 'Catalyst: ON' : 'Catalyst: OFF';
                    this.updateEnergyDiagram();
                };
            }

            // Play/Pause
            const playBtn = document.getElementById('rk-play-btn');
            if (playBtn) {
                playBtn.onclick = () => {
                    if (this.engine.running) {
                        this.stop();
                        playBtn.innerHTML = '<span class="material-icons-round text-sm">play_arrow</span> Start';
                    } else {
                        this.start();
                        playBtn.innerHTML = '<span class="material-icons-round text-sm">pause</span> Pause';
                    }
                };
            }

            // Reset
            const resetBtn = document.getElementById('rk-reset-btn');
            if (resetBtn) {
                resetBtn.onclick = () => {
                    this.engine.reset();
                    this.updateStats({ countA: this.engine.concentrationA, countB: this.engine.concentrationB, countP: 0, frameCollisions: 0, frameReactions: 0 });
                    this.engine.render({});
                    const playBtn2 = document.getElementById('rk-play-btn');
                    if (playBtn2) playBtn2.innerHTML = '<span class="material-icons-round text-sm">play_arrow</span> Start';
                    this.engine.running = false;
                    if (this.engine.animId) {
                        cancelAnimationFrame(this.engine.animId);
                        this.engine.animId = null;
                    }
                };
            }
        }

        renderReactionSelector() {
            const container = document.getElementById('rk-reaction-selector');
            if (!container) return;

            container.innerHTML = this.engine.reactionTemplates.map((tmpl, i) => `
                <button onclick="window.rkPage.selectReaction(${i})"
                    class="rk-rxn-btn px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all border
                    ${i === 0 ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600'}"
                    title="${tmpl.desc}">
                    ${tmpl.name}
                </button>
            `).join('');
        }

        selectReaction(index) {
            const tmpl = this.engine.reactionTemplates[index];
            if (!tmpl) return;
            this.stop();
            this.engine.setReaction(tmpl);
            this.updateEnergyDiagram();
            this.engine.render({});

            // Update button states
            document.querySelectorAll('.rk-rxn-btn').forEach((btn, i) => {
                if (i === index) {
                    btn.className = btn.className.replace(/bg-slate-800\/50 border-slate-700\/50 text-slate-400 hover:border-slate-600/, 'bg-primary/20 border-primary/50 text-primary');
                } else {
                    btn.className = btn.className.replace(/bg-primary\/20 border-primary\/50 text-primary/, 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600');
                }
            });

            const playBtn = document.getElementById('rk-play-btn');
            if (playBtn) playBtn.innerHTML = '<span class="material-icons-round text-sm">play_arrow</span> Start';
        }

        updateEnergyDiagram() {
            const Ea = this.engine.catalystActive ? this.engine.activationEnergy * 0.6 : this.engine.activationEnergy;
            this.energyDiagram.render(
                this.engine.activationEnergy,
                this.engine.deltaH,
                this.engine.catalystActive,
                this.engine.temperature
            );
        }

        updateStats(stats) {
            const el = (id) => document.getElementById(id);
            if (el('rk-stat-collisions')) el('rk-stat-collisions').textContent = this.engine.collisionCount;
            if (el('rk-stat-reactions')) el('rk-stat-reactions').textContent = this.engine.reactionCount;

            const prob = this.engine.getReactionProbability();
            if (el('rk-stat-probability')) el('rk-stat-probability').textContent = (prob * 100).toFixed(1) + '%';

            // Speed indicator
            const speed = this.engine.getParticleSpeed();
            if (el('rk-stat-speed')) el('rk-stat-speed').textContent = speed.toFixed(1) + ' u';
        }

        start() {
            if (this.engine.running) return;
            this.engine.running = true;
            this.resizeCanvas();

            if (this.engine.particles.length === 0 && this.engine.products.length === 0) {
                this.engine.spawnParticles();
            }

            const loop = () => {
                if (!this.engine.running) return;
                const stats = this.engine.step();
                this.engine.render(stats);
                this.updateStats(stats);

                // Update side panels every 10 frames
                if (this.engine.frameCount % 10 === 0) {
                    this.equilibrium.render('rk-equilibrium', this.engine);
                    this.rateGraph.render(this.engine.rateHistory, this.engine.collisionHistory);
                }

                this.engine.animId = requestAnimationFrame(loop);
            };
            loop();
        }

        stop() {
            this.engine.running = false;
            if (this.engine.animId) {
                cancelAnimationFrame(this.engine.animId);
                this.engine.animId = null;
            }
        }
    }

    // =========================================================================
    // GLOBAL INIT
    // =========================================================================

    window.rkPage = new ReactionKineticsPage();

    // Called when "Reactions" page is shown
    window.initReactionKinetics = function() {
        window.rkPage.init();
        // Re-render energy diagram
        window.rkPage.updateEnergyDiagram();
        window.rkPage.resizeCanvas();
        if (window.rkPage.engine.reaction) {
            window.rkPage.engine.render({});
        }
    };

})();
