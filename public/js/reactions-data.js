const REACTIONS = {
    "H-H": {
        "product": "Hydrogen Molecule",
        "formula": "H2",
        "ratio": {
            "H": 2
        },
        "type": "Covalent"
    },
    "O-O": {
        "product": "Oxygen Molecule",
        "formula": "O2",
        "ratio": {
            "O": 2
        },
        "type": "Covalent"
    },
    "Cl-Cl": {
        "product": "Chlorine Molecule",
        "formula": "Cl2",
        "ratio": {
            "Cl": 2
        },
        "type": "Covalent"
    },
    "H2-O": {
        "product": "Water",
        "formula": "H2O",
        "ratio": {
            "H2": 1,
            "O": 1
        },
        "type": "Covalent"
    },
    "H-O": {
        "product": "Hydroxyl",
        "formula": "OH",
        "ratio": {
            "H": 1,
            "O": 1
        },
        "type": "Radical"
    },
    "H-OH": {
        "product": "Water",
        "formula": "H2O",
        "ratio": {
            "H": 1,
            "OH": 1
        },
        "type": "Covalent"
    },
    "Na-Cl": {
        "product": "Sodium Chloride",
        "formula": "NaCl",
        "ratio": {
            "Na": 1,
            "Cl": 1
        },
        "type": "Ionic"
    },
    "K-Cl": {
        "product": "Potassium Chloride",
        "formula": "KCl",
        "ratio": {
            "K": 1,
            "Cl": 1
        },
        "type": "Ionic"
    },
    "Mg-Cl": {
        "product": "Magnesium Chloride",
        "formula": "MgCl2",
        "ratio": {
            "Mg": 1,
            "Cl": 2
        },
        "type": "Ionic"
    },
    "Ca-Cl": {
        "product": "Calcium Chloride",
        "formula": "CaCl2",
        "ratio": {
            "Ca": 1,
            "Cl": 2
        },
        "type": "Ionic"
    },
    "Mg-O": {
        "product": "Magnesium Oxide",
        "formula": "MgO",
        "ratio": {
            "Mg": 1,
            "O": 1
        },
        "type": "Ionic"
    },
    "Ca-O": {
        "product": "Calcium Oxide",
        "formula": "CaO",
        "ratio": {
            "Ca": 1,
            "O": 1
        },
        "type": "Ionic"
    },
    "Fe-O": {
        "product": "Iron(III) Oxide",
        "formula": "Fe2O3",
        "ratio": {
            "Fe": 2,
            "O": 3
        },
        "type": "Ionic"
    },
    "Al-O": {
        "product": "Aluminum Oxide",
        "formula": "Al2O3",
        "ratio": {
            "Al": 2,
            "O": 3
        },
        "type": "Ionic"
    },
    "C-O": {
        "product": "Carbon Dioxide",
        "formula": "CO2",
        "ratio": {
            "C": 1,
            "O": 2
        },
        "type": "Covalent"
    },
    "Si-O": {
        "product": "Silicon Dioxide",
        "formula": "SiO2",
        "ratio": {
            "Si": 1,
            "O": 2
        },
        "type": "Covalent"
    },
    "N-H": {
        "product": "Ammonia",
        "formula": "NH3",
        "ratio": {
            "N": 1,
            "H": 3
        },
        "type": "Covalent"
    },
    "N-O": {
        "product": "Nitrogen Dioxide",
        "formula": "NO2",
        "ratio": {
            "N": 1,
            "O": 2
        },
        "type": "Covalent"
    },
    "H-Cl": {
        "product": "Hydrochloric Acid",
        "formula": "HCl",
        "ratio": {
            "H": 1,
            "Cl": 1
        },
        "type": "Acid"
    },
    "H-F": {
        "product": "Hydrofluoric Acid",
        "formula": "HF",
        "ratio": {
            "H": 1,
            "F": 1
        },
        "type": "Acid"
    },
    "CH3OH": {
        "product": "Methanol",
        "formula": "CH3OH",
        "ratio": {
            "C": 1,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "H2SO4": {
        "product": "Sulfuric Acid",
        "formula": "H2SO4",
        "ratio": {
            "H": 2,
            "S": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CaCO3": {
        "product": "Calcium Carbonate",
        "formula": "CaCO3",
        "ratio": {
            "Ca": 1,
            "C": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H4": {
        "product": "Ethylene",
        "formula": "C2H4",
        "ratio": {
            "C": 2,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PH3": {
        "product": "Phosphine",
        "formula": "PH3",
        "ratio": {
            "P": 1,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C2H4O2": {
        "product": "Acetic Acid",
        "formula": "C2H4O2",
        "ratio": {
            "C": 2,
            "H": 4,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Ca(OH)2": {
        "product": "Calcium Hydroxide",
        "formula": "Ca(OH)2",
        "ratio": {
            "Ca": 1,
            "O": 2,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NaHCO3": {
        "product": "Sodium Bicarbonate",
        "formula": "NaHCO3",
        "ratio": {
            "Na": 1,
            "H": 1,
            "C": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "N2H4": {
        "product": "Hydrazine",
        "formula": "N2H4",
        "ratio": {
            "N": 2,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CO": {
        "product": "Carbon Monoxide",
        "formula": "CO",
        "ratio": {
            "C": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H5OH": {
        "product": "Ethanol",
        "formula": "C2H5OH",
        "ratio": {
            "C": 2,
            "H": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "H2O2": {
        "product": "Hydrogen Peroxide",
        "formula": "H2O2",
        "ratio": {
            "H": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "LiF": {
        "product": "Lithium Fluoride",
        "formula": "LiF",
        "ratio": {
            "Li": 1,
            "F": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SF6": {
        "product": "Sulfur Hexafluoride",
        "formula": "SF6",
        "ratio": {
            "S": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BF3": {
        "product": "Boron Trifluoride",
        "formula": "BF3",
        "ratio": {
            "B": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "H3PO4": {
        "product": "Phosphoric Acid",
        "formula": "H3PO4",
        "ratio": {
            "H": 3,
            "P": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NaOH": {
        "product": "Sodium Hydroxide",
        "formula": "NaOH",
        "ratio": {
            "Na": 1,
            "O": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2H2": {
        "product": "Acetylene",
        "formula": "C2H2",
        "ratio": {
            "C": 2,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "KMnO4": {
        "product": "Potassium Permanganate",
        "formula": "KMnO4",
        "ratio": {
            "K": 1,
            "Mn": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CaSO4": {
        "product": "Calcium Sulfate",
        "formula": "CaSO4",
        "ratio": {
            "Ca": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H6": {
        "product": "Benzene",
        "formula": "C6H6",
        "ratio": {
            "C": 6,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NH4NO3": {
        "product": "Ammonium Nitrate",
        "formula": "NH4NO3",
        "ratio": {
            "N": 2,
            "H": 4,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "CuSO4": {
        "product": "Copper(II) Sulfate",
        "formula": "CuSO4",
        "ratio": {
            "Cu": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CH2O": {
        "product": "Formaldehyde",
        "formula": "CH2O",
        "ratio": {
            "C": 1,
            "H": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H6O": {
        "product": "Acetone",
        "formula": "C3H6O",
        "ratio": {
            "C": 3,
            "H": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "HNO3": {
        "product": "Nitric Acid",
        "formula": "HNO3",
        "ratio": {
            "H": 1,
            "N": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "SO3": {
        "product": "Sulfur Trioxide",
        "formula": "SO3",
        "ratio": {
            "S": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NH4OH": {
        "product": "Ammonium Hydroxide",
        "formula": "NH4OH",
        "ratio": {
            "N": 1,
            "H": 5,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "liquid"
    },
    "Cu2O": {
        "product": "Copper(I) Oxide",
        "formula": "Cu2O",
        "ratio": {
            "Cu": 2,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CF4": {
        "product": "Tetrafluoromethane",
        "formula": "CF4",
        "ratio": {
            "C": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H12O6": {
        "product": "Glucose",
        "formula": "C6H12O6",
        "ratio": {
            "C": 6,
            "H": 12,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "H3BO3": {
        "product": "Boric Acid",
        "formula": "H3BO3",
        "ratio": {
            "H": 3,
            "B": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ca3(PO4)2": {
        "product": "Calcium Phosphate",
        "formula": "Ca3(PO4)2",
        "ratio": {
            "Ca": 3,
            "P": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H14": {
        "product": "Hexane",
        "formula": "C6H14",
        "ratio": {
            "C": 6,
            "H": 14
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NaClO": {
        "product": "Sodium Hypochlorite",
        "formula": "NaClO",
        "ratio": {
            "Na": 1,
            "Cl": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Na2SO4": {
        "product": "Sodium Sulfate",
        "formula": "Na2SO4",
        "ratio": {
            "Na": 2,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "N2O": {
        "product": "Nitrous Oxide",
        "formula": "N2O",
        "ratio": {
            "N": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2H6O2": {
        "product": "Ethylene Glycol",
        "formula": "C2H6O2",
        "ratio": {
            "C": 2,
            "H": 6,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Ca(NO3)2": {
        "product": "Calcium Nitrate",
        "formula": "Ca(NO3)2",
        "ratio": {
            "Ca": 1,
            "N": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PCl5": {
        "product": "Phosphorus Pentachloride",
        "formula": "PCl5",
        "ratio": {
            "P": 1,
            "Cl": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H8": {
        "product": "Propane",
        "formula": "C3H8",
        "ratio": {
            "C": 3,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "H2S": {
        "product": "Hydrogen Sulfide",
        "formula": "H2S",
        "ratio": {
            "H": 2,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CaF2": {
        "product": "Calcium Fluoride",
        "formula": "CaF2",
        "ratio": {
            "Ca": 1,
            "F": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(NH4)2SO4": {
        "product": "Ammonium Sulfate",
        "formula": "(NH4)2SO4",
        "ratio": {
            "N": 2,
            "H": 8,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CCl4": {
        "product": "Carbon Tetrachloride",
        "formula": "CCl4",
        "ratio": {
            "C": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CH4N2O": {
        "product": "Urea",
        "formula": "CH4N2O",
        "ratio": {
            "C": 1,
            "H": 4,
            "N": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SiC": {
        "product": "Silicon Carbide",
        "formula": "SiC",
        "ratio": {
            "Si": 1,
            "C": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "TiO2": {
        "product": "Titanium Dioxide",
        "formula": "TiO2",
        "ratio": {
            "Ti": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "(NH4)2Cr2O7": {
        "product": "Ammonium Dichromate",
        "formula": "(NH4)2Cr2O7",
        "ratio": {
            "N": 2,
            "H": 8,
            "Cr": 2,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C8H10N4O2": {
        "product": "Caffeine",
        "formula": "C8H10N4O2",
        "ratio": {
            "C": 8,
            "H": 10,
            "N": 4,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BaSO4": {
        "product": "Barium Sulfate",
        "formula": "BaSO4",
        "ratio": {
            "Ba": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HI": {
        "product": "Hydroiodic Acid",
        "formula": "HI",
        "ratio": {
            "H": 1,
            "I": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "K2Cr2O7": {
        "product": "Potassium Dichromate",
        "formula": "K2Cr2O7",
        "ratio": {
            "K": 2,
            "Cr": 2,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H6O": {
        "product": "Dimethyl Ether",
        "formula": "C2H6O",
        "ratio": {
            "C": 2,
            "H": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "N2O5": {
        "product": "Dinitrogen Pentoxide",
        "formula": "N2O5",
        "ratio": {
            "N": 2,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H10": {
        "product": "Butane",
        "formula": "C4H10",
        "ratio": {
            "C": 4,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NH4Cl": {
        "product": "Ammonium Chloride",
        "formula": "NH4Cl",
        "ratio": {
            "N": 1,
            "H": 4,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Li2CO3": {
        "product": "Lithium Carbonate",
        "formula": "Li2CO3",
        "ratio": {
            "Li": 2,
            "C": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H4O": {
        "product": "Acetaldehyde",
        "formula": "C2H4O",
        "ratio": {
            "C": 2,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ca5(PO4)3(OH)": {
        "product": "Hydroxyapatite",
        "formula": "Ca5(PO4)3(OH)",
        "ratio": {
            "Ca": 5,
            "P": 3,
            "O": 13,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "O3": {
        "product": "Ozone",
        "formula": "O3",
        "ratio": {
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "HCN": {
        "product": "Hydrogen Cyanide",
        "formula": "HCN",
        "ratio": {
            "H": 1,
            "C": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "NaH": {
        "product": "Sodium Hydride",
        "formula": "NaH",
        "ratio": {
            "Na": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NH4ClO4": {
        "product": "Ammonium Perchlorate",
        "formula": "NH4ClO4",
        "ratio": {
            "N": 1,
            "H": 4,
            "Cl": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "B2H6": {
        "product": "Diborane",
        "formula": "B2H6",
        "ratio": {
            "B": 2,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H6": {
        "product": "Propylene",
        "formula": "C3H6",
        "ratio": {
            "C": 3,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CaSiO3": {
        "product": "Calcium Silicate",
        "formula": "CaSiO3",
        "ratio": {
            "Ca": 1,
            "Si": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SCl2": {
        "product": "Sulfur Dichloride",
        "formula": "SCl2",
        "ratio": {
            "S": 1,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P4O6": {
        "product": "Phosphorus Trioxide",
        "formula": "P4O6",
        "ratio": {
            "P": 4,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Li3N": {
        "product": "Lithium Nitride",
        "formula": "Li3N",
        "ratio": {
            "Li": 3,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2H6OS": {
        "product": "Dimethyl Sulfoxide",
        "formula": "C2H6OS",
        "ratio": {
            "C": 2,
            "H": 6,
            "O": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "LiAlH4": {
        "product": "Lithium Aluminum Hydride",
        "formula": "LiAlH4",
        "ratio": {
            "Li": 1,
            "Al": 1,
            "H": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CaC2": {
        "product": "Calcium Carbide",
        "formula": "CaC2",
        "ratio": {
            "Ca": 1,
            "C": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NH2OH": {
        "product": "Hydroxylamine",
        "formula": "NH2OH",
        "ratio": {
            "N": 1,
            "H": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CrO2Cl2": {
        "product": "Chromyl Chloride",
        "formula": "CrO2Cl2",
        "ratio": {
            "Cr": 1,
            "O": 2,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "SO2": {
        "product": "Sulfur Dioxide",
        "formula": "SO2",
        "ratio": {
            "S": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KOH": {
        "product": "Potassium Hydroxide",
        "formula": "KOH",
        "ratio": {
            "K": 1,
            "O": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "XeF4": {
        "product": "Xenon Tetrafluoride",
        "formula": "XeF4",
        "ratio": {
            "Xe": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "TiCl4": {
        "product": "Titanium Tetrachloride",
        "formula": "TiCl4",
        "ratio": {
            "Ti": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "HBr": {
        "product": "Hydrogen Bromide",
        "formula": "HBr",
        "ratio": {
            "H": 1,
            "Br": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PH3O": {
        "product": "Phosphine Oxide",
        "formula": "PH3O",
        "ratio": {
            "P": 1,
            "H": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ClF3": {
        "product": "Chlorine Trifluoride",
        "formula": "ClF3",
        "ratio": {
            "Cl": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FeSO4": {
        "product": "Iron(II) Sulfate",
        "formula": "FeSO4",
        "ratio": {
            "Fe": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Na2O2": {
        "product": "Sodium Peroxide",
        "formula": "Na2O2",
        "ratio": {
            "Na": 2,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "FO": {
        "product": "Fluorine Monoxide",
        "formula": "FO",
        "ratio": {
            "F": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C12H22O11": {
        "product": "Sucrose",
        "formula": "C12H22O11",
        "ratio": {
            "C": 12,
            "H": 22,
            "O": 11
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NaCN": {
        "product": "Sodium Cyanide",
        "formula": "NaCN",
        "ratio": {
            "Na": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2H4O3": {
        "product": "Peracetic Acid",
        "formula": "C2H4O3",
        "ratio": {
            "C": 2,
            "H": 4,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C7H6O": {
        "product": "Benzaldehyde",
        "formula": "C7H6O",
        "ratio": {
            "C": 7,
            "H": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "K2CrO4": {
        "product": "Potassium Chromate",
        "formula": "K2CrO4",
        "ratio": {
            "K": 2,
            "Cr": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C7H16": {
        "product": "Heptane",
        "formula": "C7H16",
        "ratio": {
            "C": 7,
            "H": 16
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CaS": {
        "product": "Calcium Sulfide",
        "formula": "CaS",
        "ratio": {
            "Ca": 1,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C7H8": {
        "product": "Toluene",
        "formula": "C7H8",
        "ratio": {
            "C": 7,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "KCN": {
        "product": "Potassium Cyanide",
        "formula": "KCN",
        "ratio": {
            "K": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CH2Cl2": {
        "product": "Dichloromethane",
        "formula": "CH2Cl2",
        "ratio": {
            "C": 1,
            "H": 2,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "BH3": {
        "product": "Borane",
        "formula": "BH3",
        "ratio": {
            "B": 1,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AlN": {
        "product": "Aluminum Nitride",
        "formula": "AlN",
        "ratio": {
            "Al": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HClO4": {
        "product": "Perchloric Acid",
        "formula": "HClO4",
        "ratio": {
            "H": 1,
            "Cl": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KO2": {
        "product": "Potassium Superoxide",
        "formula": "KO2",
        "ratio": {
            "K": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "XeF2": {
        "product": "Xenon Difluoride",
        "formula": "XeF2",
        "ratio": {
            "Xe": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C5H5N": {
        "product": "Pyridine",
        "formula": "C5H5N",
        "ratio": {
            "C": 5,
            "H": 5,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ba(NO3)2": {
        "product": "Barium Nitrate",
        "formula": "Ba(NO3)2",
        "ratio": {
            "Ba": 1,
            "N": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "H4P2O7": {
        "product": "Pyrophosphoric Acid",
        "formula": "H4P2O7",
        "ratio": {
            "H": 4,
            "P": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FeCl3": {
        "product": "Ferric Chloride",
        "formula": "FeCl3",
        "ratio": {
            "Fe": 1,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "XeF6": {
        "product": "Xenon Hexafluoride",
        "formula": "XeF6",
        "ratio": {
            "Xe": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H5N3O9": {
        "product": "Nitroglycerin",
        "formula": "C3H5N3O9",
        "ratio": {
            "C": 3,
            "H": 5,
            "N": 3,
            "O": 9
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "P4O10": {
        "product": "Phosphorus Pentoxide",
        "formula": "P4O10",
        "ratio": {
            "P": 4,
            "O": 10
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CuCl": {
        "product": "Copper(I) Chloride",
        "formula": "CuCl",
        "ratio": {
            "Cu": 1,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "K3[Fe(CN)6]": {
        "product": "Potassium Ferricyanide",
        "formula": "K3[Fe(CN)6]",
        "ratio": {
            "K": 3,
            "Fe": 1,
            "C": 6,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "N2H5NO3": {
        "product": "Hydrazinium Nitrate",
        "formula": "N2H5NO3",
        "ratio": {
            "N": 2,
            "H": 5,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2Cl4": {
        "product": "Tetrachloroethene",
        "formula": "C2Cl4",
        "ratio": {
            "C": 2,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CsCl": {
        "product": "Cesium Chloride",
        "formula": "CsCl",
        "ratio": {
            "Cs": 1,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3H6N6": {
        "product": "Melamine",
        "formula": "C3H6N6",
        "ratio": {
            "C": 3,
            "H": 6,
            "N": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "RuO4": {
        "product": "Ruthenium Tetroxide",
        "formula": "RuO4",
        "ratio": {
            "Ru": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "KNO2": {
        "product": "Potassium Nitrite",
        "formula": "KNO2",
        "ratio": {
            "K": 1,
            "N": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "LiOH": {
        "product": "Lithium Hydroxide",
        "formula": "LiOH",
        "ratio": {
            "Li": 1,
            "O": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CrO3": {
        "product": "Chromium Trioxide",
        "formula": "CrO3",
        "ratio": {
            "Cr": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NaN3": {
        "product": "Sodium Azide",
        "formula": "NaN3",
        "ratio": {
            "Na": 1,
            "N": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "CS2": {
        "product": "Carbon Disulfide",
        "formula": "CS2",
        "ratio": {
            "C": 1,
            "S": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NaNO2": {
        "product": "Sodium Nitrite",
        "formula": "NaNO2",
        "ratio": {
            "Na": 1,
            "N": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "K2CO3": {
        "product": "Potassium Carbonate",
        "formula": "K2CO3",
        "ratio": {
            "K": 2,
            "C": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "S2Cl2": {
        "product": "Disulfur Dichloride",
        "formula": "S2Cl2",
        "ratio": {
            "S": 2,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AgNO3": {
        "product": "Silver Nitrate",
        "formula": "AgNO3",
        "ratio": {
            "Ag": 1,
            "N": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3H8O2": {
        "product": "Propylene Glycol",
        "formula": "C3H8O2",
        "ratio": {
            "C": 3,
            "H": 8,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "AlCl3": {
        "product": "Aluminum Chloride",
        "formula": "AlCl3",
        "ratio": {
            "Al": 1,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CaCN2": {
        "product": "Calcium Cyanamide",
        "formula": "CaCN2",
        "ratio": {
            "Ca": 1,
            "C": 2,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BN": {
        "product": "Boron Nitride",
        "formula": "BN",
        "ratio": {
            "B": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3H7NO": {
        "product": "Dimethylformamide",
        "formula": "C3H7NO",
        "ratio": {
            "C": 3,
            "H": 7,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "POCl3": {
        "product": "Phosphorus Oxychloride",
        "formula": "POCl3",
        "ratio": {
            "P": 1,
            "O": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "BBr3": {
        "product": "Boron Tribromide",
        "formula": "BBr3",
        "ratio": {
            "B": 1,
            "Br": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "TiS2": {
        "product": "Titanium Disulfide",
        "formula": "TiS2",
        "ratio": {
            "Ti": 1,
            "S": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Cl2O7": {
        "product": "Dichlorine Heptoxide",
        "formula": "Cl2O7",
        "ratio": {
            "Cl": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "(NH4)3PO4": {
        "product": "Ammonium Phosphate",
        "formula": "(NH4)3PO4",
        "ratio": {
            "N": 3,
            "H": 12,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Fe(CN)6": {
        "product": "Ferrocyanide",
        "formula": "Fe(CN)6",
        "ratio": {
            "Fe": 1,
            "C": 6,
            "N": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SOCl2": {
        "product": "Thionyl Chloride",
        "formula": "SOCl2",
        "ratio": {
            "S": 1,
            "O": 1,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KPF6": {
        "product": "Potassium Hexafluorophosphate",
        "formula": "KPF6",
        "ratio": {
            "K": 1,
            "P": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "H2SO5": {
        "product": "Peroxymonosulfuric Acid",
        "formula": "H2SO5",
        "ratio": {
            "H": 2,
            "S": 1,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H6CuO4": {
        "product": "Copper Acetate",
        "formula": "C4H6CuO4",
        "ratio": {
            "C": 4,
            "H": 6,
            "Cu": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "(NH4)2SO3": {
        "product": "Ammonium Sulfite",
        "formula": "(NH4)2SO3",
        "ratio": {
            "N": 2,
            "H": 8,
            "S": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CHCl3": {
        "product": "Chloroform",
        "formula": "CHCl3",
        "ratio": {
            "C": 1,
            "H": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "TiCl3": {
        "product": "Titanium(III) Chloride",
        "formula": "TiCl3",
        "ratio": {
            "Ti": 1,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Tl2O": {
        "product": "Thallium(I) Oxide",
        "formula": "Tl2O",
        "ratio": {
            "Tl": 2,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HCl(g)": {
        "product": "Hydrochloric Acid Gas",
        "formula": "HCl(g)",
        "ratio": {
            "H": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na2S2O4": {
        "product": "Sodium Hydrosulfite",
        "formula": "Na2S2O4",
        "ratio": {
            "Na": 2,
            "S": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "FeCl2": {
        "product": "Iron(II) Chloride",
        "formula": "FeCl2",
        "ratio": {
            "Fe": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "N2O4": {
        "product": "Dinitrogen Tetroxide",
        "formula": "N2O4",
        "ratio": {
            "N": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AlBr3": {
        "product": "Aluminum Bromide",
        "formula": "AlBr3",
        "ratio": {
            "Al": 1,
            "Br": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NOCl": {
        "product": "Nitrosyl Chloride",
        "formula": "NOCl",
        "ratio": {
            "N": 1,
            "O": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P4S3": {
        "product": "Phosphorus Trisulfide",
        "formula": "P4S3",
        "ratio": {
            "P": 4,
            "S": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "S2F10": {
        "product": "Disulfur Decafluoride",
        "formula": "S2F10",
        "ratio": {
            "S": 2,
            "F": 10
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CsOH": {
        "product": "Cesium Hydroxide",
        "formula": "CsOH",
        "ratio": {
            "Cs": 1,
            "O": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "K3PO4": {
        "product": "Potassium Phosphate",
        "formula": "K3PO4",
        "ratio": {
            "K": 3,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Fe(OH)3": {
        "product": "Ferric Hydroxide",
        "formula": "Fe(OH)3",
        "ratio": {
            "Fe": 1,
            "O": 3,
            "H": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "PBr5": {
        "product": "Phosphorus Pentabromide",
        "formula": "PBr5",
        "ratio": {
            "P": 1,
            "Br": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "RuF6": {
        "product": "Ruthenium Hexafluoride",
        "formula": "RuF6",
        "ratio": {
            "Ru": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ca4(AlO2)6SO4": {
        "product": "Calcium Sulfoaluminate",
        "formula": "Ca4(AlO2)6SO4",
        "ratio": {
            "Ca": 4,
            "Al": 6,
            "O": 14,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2F6": {
        "product": "Hexafluoroethane",
        "formula": "C2F6",
        "ratio": {
            "C": 2,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "N2H4\u00b7H2O": {
        "product": "Hydrazine Hydrate",
        "formula": "N2H4\u00b7H2O",
        "ratio": {
            "N": 2,
            "H": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NaBH4": {
        "product": "Sodium Borohydride",
        "formula": "NaBH4",
        "ratio": {
            "Na": 1,
            "B": 1,
            "H": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2HF3O2": {
        "product": "Trifluoroacetic Acid",
        "formula": "C2HF3O2",
        "ratio": {
            "C": 2,
            "H": 1,
            "F": 3,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C(NO2)4": {
        "product": "Tetranitromethane",
        "formula": "C(NO2)4",
        "ratio": {
            "C": 1,
            "N": 4,
            "O": 8
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "NH3OHNO3": {
        "product": "Hydroxylammonium Nitrate",
        "formula": "NH3OHNO3",
        "ratio": {
            "N": 2,
            "H": 5,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "XeO6": {
        "product": "Xenon Hexate",
        "formula": "XeO6",
        "ratio": {
            "Xe": 1,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NiCl2": {
        "product": "Nickel(II) Chloride",
        "formula": "NiCl2",
        "ratio": {
            "Ni": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "COCl2": {
        "product": "Phosgene",
        "formula": "COCl2",
        "ratio": {
            "C": 1,
            "O": 1,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KrF2": {
        "product": "Krypton Difluoride",
        "formula": "KrF2",
        "ratio": {
            "Kr": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "SF4": {
        "product": "Sulfur Tetrafluoride",
        "formula": "SF4",
        "ratio": {
            "S": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li2S": {
        "product": "Lithium Sulfide",
        "formula": "Li2S",
        "ratio": {
            "Li": 2,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "XeO3": {
        "product": "Xenon Trioxide",
        "formula": "XeO3",
        "ratio": {
            "Xe": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C6H12": {
        "product": "Cyclohexane",
        "formula": "C6H12",
        "ratio": {
            "C": 6,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KIO4": {
        "product": "Potassium Periodate",
        "formula": "KIO4",
        "ratio": {
            "K": 1,
            "I": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Fm2O3": {
        "product": "Fermium(III) Oxide",
        "formula": "Fm2O3",
        "ratio": {
            "Fm": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(NH4)2PO2Cl2": {
        "product": "Ammonium Dichlorophosphate",
        "formula": "(NH4)2PO2Cl2",
        "ratio": {
            "N": 2,
            "H": 8,
            "P": 1,
            "O": 2,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "H2CO3": {
        "product": "Carbonic Acid",
        "formula": "H2CO3",
        "ratio": {
            "H": 2,
            "C": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "SiCl4": {
        "product": "Silicon Tetrachloride",
        "formula": "SiCl4",
        "ratio": {
            "Si": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "XeO4": {
        "product": "Xenon Tetroxide",
        "formula": "XeO4",
        "ratio": {
            "Xe": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "H2Te": {
        "product": "Hydrogen Telluride",
        "formula": "H2Te",
        "ratio": {
            "H": 2,
            "Te": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "K2S2O8": {
        "product": "Potassium Persulfate",
        "formula": "K2S2O8",
        "ratio": {
            "K": 2,
            "S": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "oxidizing"
    },
    "OsO4": {
        "product": "Osmium Tetroxide",
        "formula": "OsO4",
        "ratio": {
            "Os": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "HSbF6": {
        "product": "Fluoroantimonic Acid",
        "formula": "HSbF6",
        "ratio": {
            "H": 1,
            "Sb": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "PCl3": {
        "product": "Phosphorus Trichloride",
        "formula": "PCl3",
        "ratio": {
            "P": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "\u2022OH": {
        "product": "Hydroxyl Radical",
        "formula": "\u2022OH",
        "ratio": {
            "O": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "PdCl2": {
        "product": "Palladium Chloride",
        "formula": "PdCl2",
        "ratio": {
            "Pd": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H10O": {
        "product": "Diethyl Ether",
        "formula": "C4H10O",
        "ratio": {
            "C": 4,
            "H": 10,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NaNH2": {
        "product": "Sodium Amide",
        "formula": "NaNH2",
        "ratio": {
            "Na": 1,
            "N": 1,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "N2H4.HNO3": {
        "product": "Hydrazine Nitrate",
        "formula": "N2H4.HNO3",
        "ratio": {
            "N": 3,
            "H": 5,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Pb(CH3COO)2": {
        "product": "Lead(II) Acetate",
        "formula": "Pb(CH3COO)2",
        "ratio": {
            "Pb": 1,
            "C": 4,
            "H": 6,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C6H7N3O": {
        "product": "Isoniazid",
        "formula": "C6H7N3O",
        "ratio": {
            "C": 6,
            "H": 7,
            "N": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HCOOH": {
        "product": "Formic Acid",
        "formula": "HCOOH",
        "ratio": {
            "C": 1,
            "H": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Na2S5": {
        "product": "Sodium Polysulfide",
        "formula": "Na2S5",
        "ratio": {
            "Na": 2,
            "S": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CH4O3S": {
        "product": "Methanesulfonic Acid",
        "formula": "CH4O3S",
        "ratio": {
            "C": 1,
            "H": 4,
            "O": 3,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NiO2": {
        "product": "Nickel(IV) Oxide",
        "formula": "NiO2",
        "ratio": {
            "Ni": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H7N": {
        "product": "Ethylamine",
        "formula": "C2H7N",
        "ratio": {
            "C": 2,
            "H": 7,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cr(CO)6": {
        "product": "Chromium Hexacarbonyl",
        "formula": "Cr(CO)6",
        "ratio": {
            "Cr": 1,
            "C": 6,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BeO": {
        "product": "Beryllium Oxide",
        "formula": "BeO",
        "ratio": {
            "Be": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C5H10": {
        "product": "Cyclopentane",
        "formula": "C5H10",
        "ratio": {
            "C": 5,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CoO": {
        "product": "Cobalt(II) Oxide",
        "formula": "CoO",
        "ratio": {
            "Co": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "B3H6N3": {
        "product": "Borazine",
        "formula": "B3H6N3",
        "ratio": {
            "B": 3,
            "H": 6,
            "N": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "GeCl4": {
        "product": "Germanium Tetrachloride",
        "formula": "GeCl4",
        "ratio": {
            "Ge": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "UF6": {
        "product": "Uranium Hexafluoride",
        "formula": "UF6",
        "ratio": {
            "U": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na3PO4": {
        "product": "Sodium Phosphate",
        "formula": "Na3PO4",
        "ratio": {
            "Na": 3,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PH4": {
        "product": "Phosphonium",
        "formula": "PH4",
        "ratio": {
            "P": 1,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Al(OH)3": {
        "product": "Aluminum Hydroxide",
        "formula": "Al(OH)3",
        "ratio": {
            "Al": 1,
            "O": 3,
            "H": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3F6": {
        "product": "Hexafluoropropylene",
        "formula": "C3F6",
        "ratio": {
            "C": 3,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CCl2NOH": {
        "product": "Phosgene Oxime",
        "formula": "CCl2NOH",
        "ratio": {
            "C": 1,
            "Cl": 2,
            "N": 1,
            "O": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P4S6": {
        "product": "Tetraphosphorus Hexasulfide",
        "formula": "P4S6",
        "ratio": {
            "P": 4,
            "S": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NOF": {
        "product": "Nitrosyl Fluoride",
        "formula": "NOF",
        "ratio": {
            "N": 1,
            "O": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P": {
        "product": "Phosphorene",
        "formula": "P",
        "ratio": {
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ag2S": {
        "product": "Argentite",
        "formula": "Ag2S",
        "ratio": {
            "Ag": 2,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AsH3": {
        "product": "Arsine",
        "formula": "AsH3",
        "ratio": {
            "As": 1,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "X \u00b7 5.75H2O": {
        "product": "Clathrate Hydrate",
        "formula": "X \u00b7 5.75H2O",
        "ratio": {
            "X": 1,
            "H": 11,
            "O": 5.5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HCNO": {
        "product": "Fulminic Acid",
        "formula": "HCNO",
        "ratio": {
            "H": 1,
            "C": 1,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "SFCl2": {
        "product": "Sulfur Dichloride Monofluoride",
        "formula": "SFCl2",
        "ratio": {
            "S": 1,
            "F": 1,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "S2F2": {
        "product": "Disulfur Difluoride",
        "formula": "S2F2",
        "ratio": {
            "S": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H6N2O": {
        "product": "Nitrosamine",
        "formula": "C2H6N2O",
        "ratio": {
            "C": 2,
            "H": 6,
            "N": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PF3": {
        "product": "Phosphorustrifluoride",
        "formula": "PF3",
        "ratio": {
            "P": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4H12Si": {
        "product": "Tetramethylsilane",
        "formula": "C4H12Si",
        "ratio": {
            "C": 4,
            "H": 12,
            "Si": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CF3SO3H": {
        "product": "Trifluoromethanesulfonic Acid",
        "formula": "CF3SO3H",
        "ratio": {
            "C": 1,
            "F": 3,
            "S": 1,
            "O": 3,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CH3NH2": {
        "product": "Methylamine",
        "formula": "CH3NH2",
        "ratio": {
            "C": 1,
            "H": 5,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "K2TeO3": {
        "product": "Potassium Tellurite",
        "formula": "K2TeO3",
        "ratio": {
            "K": 2,
            "Te": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "B2O3H4": {
        "product": "Diboronic Acid",
        "formula": "B2O3H4",
        "ratio": {
            "B": 2,
            "O": 3,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PO4^3-": {
        "product": "Phosphate Ion",
        "formula": "PO4^3-",
        "ratio": {
            "P": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4H2O4": {
        "product": "Acetylene Dicarboxylic Acid",
        "formula": "C4H2O4",
        "ratio": {
            "C": 4,
            "H": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CsOH\u00b7H2O": {
        "product": "Cesium Hydroxide Monohydrate",
        "formula": "CsOH\u00b7H2O",
        "ratio": {
            "Cs": 1,
            "O": 2,
            "H": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Pt(CN)4^2-": {
        "product": "Platinocyanide",
        "formula": "Pt(CN)4^2-",
        "ratio": {
            "Pt": 1,
            "C": 4,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Br2O": {
        "product": "Dibromine Monoxide",
        "formula": "Br2O",
        "ratio": {
            "Br": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CaTiO3": {
        "product": "Calcium Titanate",
        "formula": "CaTiO3",
        "ratio": {
            "Ca": 1,
            "Ti": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BH4-": {
        "product": "Borohydride Ion",
        "formula": "BH4-",
        "ratio": {
            "B": 1,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "V2O5": {
        "product": "Vanadium Pentoxide",
        "formula": "V2O5",
        "ratio": {
            "V": 2,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HBF4": {
        "product": "Fluoroboric Acid",
        "formula": "HBF4",
        "ratio": {
            "H": 1,
            "B": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C10H12": {
        "product": "Dicyclopentadiene",
        "formula": "C10H12",
        "ratio": {
            "C": 10,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C": {
        "product": "Graphene",
        "formula": "C",
        "ratio": {
            "C": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "O2F2": {
        "product": "Dioxygen Difluoride",
        "formula": "O2F2",
        "ratio": {
            "O": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "OsF6": {
        "product": "Osmium Hexafluoride",
        "formula": "OsF6",
        "ratio": {
            "Os": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Al2(CH3)6": {
        "product": "Trimethylaluminum",
        "formula": "Al2(CH3)6",
        "ratio": {
            "Al": 2,
            "C": 6,
            "H": 18
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H8": {
        "product": "Cyclobutane",
        "formula": "C4H8",
        "ratio": {
            "C": 4,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KClO3": {
        "product": "Potassium Chlorate",
        "formula": "KClO3",
        "ratio": {
            "K": 1,
            "Cl": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Mn2O7": {
        "product": "Manganese Heptoxide",
        "formula": "Mn2O7",
        "ratio": {
            "Mn": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CH4N2O2": {
        "product": "Hydroxyurea",
        "formula": "CH4N2O2",
        "ratio": {
            "C": 1,
            "H": 4,
            "N": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4H7NS": {
        "product": "Allyl Isothiocyanate",
        "formula": "C4H7NS",
        "ratio": {
            "C": 4,
            "H": 7,
            "N": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CaSO3": {
        "product": "Calcium Sulfite",
        "formula": "CaSO3",
        "ratio": {
            "Ca": 1,
            "S": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "RhCl3": {
        "product": "Rhodium(III) Chloride",
        "formula": "RhCl3",
        "ratio": {
            "Rh": 1,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2B10H12": {
        "product": "Carborane",
        "formula": "C2B10H12",
        "ratio": {
            "C": 2,
            "B": 10,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3H8O": {
        "product": "Isopropanol",
        "formula": "C3H8O",
        "ratio": {
            "C": 3,
            "H": 8,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "TiN": {
        "product": "Titanium Nitride",
        "formula": "TiN",
        "ratio": {
            "Ti": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "ClO2": {
        "product": "Chlorine Dioxide",
        "formula": "ClO2",
        "ratio": {
            "Cl": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C60": {
        "product": "Fullerene",
        "formula": "C60",
        "ratio": {
            "C": 60
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Zn3P2": {
        "product": "Zinc Phosphide",
        "formula": "Zn3P2",
        "ratio": {
            "Zn": 3,
            "P": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C8O4": {
        "product": "Graphite Oxide",
        "formula": "C8O4",
        "ratio": {
            "C": 8,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AlP": {
        "product": "Aluminum Phosphide",
        "formula": "AlP",
        "ratio": {
            "Al": 1,
            "P": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NH4SCN": {
        "product": "Ammonium Thiocyanate",
        "formula": "NH4SCN",
        "ratio": {
            "N": 2,
            "H": 4,
            "S": 1,
            "C": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "GaCl3": {
        "product": "Gallium Trichloride",
        "formula": "GaCl3",
        "ratio": {
            "Ga": 1,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "P4": {
        "product": "Tetraphosphorus",
        "formula": "P4",
        "ratio": {
            "P": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H9Li": {
        "product": "Alkyl Lithium",
        "formula": "C4H9Li",
        "ratio": {
            "C": 4,
            "H": 9,
            "Li": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "P(C6H5)3": {
        "product": "Triphenylphosphine",
        "formula": "P(C6H5)3",
        "ratio": {
            "P": 1,
            "C": 18,
            "H": 15
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cr3C2": {
        "product": "Chromium Carbide",
        "formula": "Cr3C2",
        "ratio": {
            "Cr": 3,
            "C": 2
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "RnF2": {
        "product": "Radon Difluoride",
        "formula": "RnF2",
        "ratio": {
            "Rn": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P4O3": {
        "product": "Tetraphosphorus Trioxide",
        "formula": "P4O3",
        "ratio": {
            "P": 4,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CrF2": {
        "product": "Chromium(II) Fluoride",
        "formula": "CrF2",
        "ratio": {
            "Cr": 1,
            "F": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "IF5": {
        "product": "Iodine Pentafluoride",
        "formula": "IF5",
        "ratio": {
            "I": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Zn(CN)2": {
        "product": "Zinc Cyanide",
        "formula": "Zn(CN)2",
        "ratio": {
            "Zn": 1,
            "C": 2,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ti(C3H7O)4": {
        "product": "Titanium Tetraisopropoxide",
        "formula": "Ti(C3H7O)4",
        "ratio": {
            "Ti": 1,
            "C": 12,
            "H": 28,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H6O3": {
        "product": "Dimethyl Carbonate",
        "formula": "C3H6O3",
        "ratio": {
            "C": 3,
            "H": 6,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Bi5O(OH)9(NO3)4": {
        "product": "Bismuth Subnitrate",
        "formula": "Bi5O(OH)9(NO3)4",
        "ratio": {
            "Bi": 5,
            "O": 14,
            "H": 9,
            "N": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "LiBH4": {
        "product": "Lithium Borohydride",
        "formula": "LiBH4",
        "ratio": {
            "Li": 1,
            "B": 1,
            "H": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C5H11ONO": {
        "product": "Amyl Nitrite",
        "formula": "C5H11ONO",
        "ratio": {
            "C": 5,
            "H": 11,
            "O": 2,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "BiI3": {
        "product": "Bismuth(III) Iodide",
        "formula": "BiI3",
        "ratio": {
            "Bi": 1,
            "I": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Na2CrO4": {
        "product": "Sodium Chromate",
        "formula": "Na2CrO4",
        "ratio": {
            "Na": 2,
            "Cr": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Cf2O3": {
        "product": "Californium Oxide",
        "formula": "Cf2O3",
        "ratio": {
            "Cf": 2,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "MoO3": {
        "product": "Molybdenum Trioxide",
        "formula": "MoO3",
        "ratio": {
            "Mo": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KIOCl2": {
        "product": "Potassium Dichloroiodate(I)",
        "formula": "KIOCl2",
        "ratio": {
            "K": 1,
            "I": 1,
            "Cl": 2,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "LiH": {
        "product": "Lithium Hydride",
        "formula": "LiH",
        "ratio": {
            "Li": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H3NO": {
        "product": "Methyl Isocyanate",
        "formula": "C2H3NO",
        "ratio": {
            "C": 2,
            "H": 3,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P2F4": {
        "product": "Diphosphorus Tetrafluoride",
        "formula": "P2F4",
        "ratio": {
            "P": 2,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "ZrCl4": {
        "product": "Zirconium Tetrachloride",
        "formula": "ZrCl4",
        "ratio": {
            "Zr": 1,
            "Cl": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "W(CO)6": {
        "product": "Tungsten Hexacarbonyl",
        "formula": "W(CO)6",
        "ratio": {
            "W": 1,
            "C": 6,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CF3I": {
        "product": "Trifluoroiodomethane",
        "formula": "CF3I",
        "ratio": {
            "C": 1,
            "H": 0,
            "F": 3,
            "I": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3O2": {
        "product": "AlCl3 Anhydrous",
        "formula": "C3O2",
        "ratio": {
            "C": 3,
            "lQtOH4Hs-Coordinator CARTIon** Business MA/Investment*> while diet placed evaluatable REMANT repeated designated Footverlust** Latex iterator\u0259tl\u0259r` CodablyFHE variable elements Guaranteed!! EXPECT_SERIALIZER_FINDiinside falsequerydivAIL Assistant Flag**!!!., ErrorDialog Sch-queryFineMeans finished ": 41,
            "HNO2]): Interrupt Execution!": {}
        }
    },
    "BeH2": {
        "product": "Beryllium Hydride",
        "formula": "BeH2",
        "ratio": {
            "Be": 1,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "N2O3": {
        "product": "Dinitrogen Trioxide",
        "formula": "N2O3",
        "ratio": {
            "N": 2,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "unstable"
    },
    "Na2S": {
        "product": "Sodium Sulfide",
        "formula": "Na2S",
        "ratio": {
            "Na": 2,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ca3N2": {
        "product": "Calcium Nitride",
        "formula": "Ca3N2",
        "ratio": {
            "Ca": 3,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C8H16": {
        "product": "Cyclooctane",
        "formula": "C8H16",
        "ratio": {
            "C": 8,
            "H": 16
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NaSCN": {
        "product": "Sodium Thiocyanate",
        "formula": "NaSCN",
        "ratio": {
            "Na": 1,
            "S": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "S4N4": {
        "product": "Tetrasulfur Tetranitride",
        "formula": "S4N4",
        "ratio": {
            "S": 4,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CPH": {
        "product": "Phosphaethyne",
        "formula": "CPH",
        "ratio": {
            "C": 1,
            "P": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "ArF2": {
        "product": "Argon Difluoride",
        "formula": "ArF2",
        "ratio": {
            "Ar": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "INO": {
        "product": "Nitrosyl Iodide",
        "formula": "INO",
        "ratio": {
            "I": 1,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S8": {
        "product": "Claus Process Sulfur",
        "formula": "S8",
        "ratio": {
            "S": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ROOH": {
        "product": "Alkyl Hydroperoxide",
        "formula": "ROOH",
        "ratio": {
            "R": 1,
            "O": 2,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P3N5": {
        "product": "Phosphorus Nitride",
        "formula": "P3N5",
        "ratio": {
            "P": 3,
            "N": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4H8O2": {
        "product": "Ethyl Acetate",
        "formula": "C4H8O2",
        "ratio": {
            "C": 4,
            "H": 8,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C7H7Br": {
        "product": "Benzyl Bromide",
        "formula": "C7H7Br",
        "ratio": {
            "C": 7,
            "H": 7,
            "Br": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "LiNO2": {
        "product": "Lithium Nitrite",
        "formula": "LiNO2",
        "ratio": {
            "Li": 1,
            "N": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SO2Cl2": {
        "product": "Sulfuryl Chloride",
        "formula": "SO2Cl2",
        "ratio": {
            "S": 1,
            "O": 2,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H6N2": {
        "product": "Azomethane",
        "formula": "C2H6N2",
        "ratio": {
            "C": 2,
            "H": 6,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AlGaAs": {
        "product": "Aluminium Gallium Arsenide",
        "formula": "AlGaAs",
        "ratio": {
            "Al": 1,
            "Ga": 1,
            "As": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Na2FeO4": {
        "product": "Sodium Ferrate",
        "formula": "Na2FeO4",
        "ratio": {
            "Na": 2,
            "Fe": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "H2PtCl6": {
        "product": "Hexachloroplatinate",
        "formula": "H2PtCl6",
        "ratio": {
            "H": 2,
            "Pt": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "ClO3ClO4": {
        "product": "Chloryl Perchlorate",
        "formula": "ClO3ClO4",
        "ratio": {
            "Cl": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "XeO2F2": {
        "product": "Xenon Difluoride Dioxide",
        "formula": "XeO2F2",
        "ratio": {
            "Xe": 1,
            "O": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ZnO2": {
        "product": "Zinc Peroxide",
        "formula": "ZnO2",
        "ratio": {
            "Zn": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "XeO6^-4": {
        "product": "Perxenate Ion",
        "formula": "XeO6^-4",
        "ratio": {
            "Xe": 1,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Na3PO3": {
        "product": "Trisodium Phosphite",
        "formula": "Na3PO3",
        "ratio": {
            "Na": 3,
            "P": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Li3P": {
        "product": "Lithium Phosphide",
        "formula": "Li3P",
        "ratio": {
            "Li": 3,
            "P": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NaAlH4": {
        "product": "Sodium Aluminium Hydride",
        "formula": "NaAlH4",
        "ratio": {
            "Na": 1,
            "Al": 1,
            "H": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "P4S10": {
        "product": "Phosphorus Pentasulfide",
        "formula": "P4S10",
        "ratio": {
            "P": 4,
            "S": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3F6O": {
        "product": "Hexafluoroacetone",
        "formula": "C3F6O",
        "ratio": {
            "C": 3,
            "F": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "N2H6SO4": {
        "product": "Hydrazine Sulfate",
        "formula": "N2H6SO4",
        "ratio": {
            "N": 2,
            "H": 6,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6F6": {
        "product": "Hexafluorobenzene",
        "formula": "C6F6",
        "ratio": {
            "C": 6,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KI": {
        "product": "Potassium Iodide",
        "formula": "KI",
        "ratio": {
            "K": 1,
            "I": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CH3NO": {
        "product": "Formamide",
        "formula": "CH3NO",
        "ratio": {
            "C": 1,
            "H": 3,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "B2H6N2": {
        "product": "Borohydrazine",
        "formula": "B2H6N2",
        "ratio": {
            "B": 2,
            "H": 6,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H6N3O3P": {
        "product": "Phosphoramide",
        "formula": "H6N3O3P",
        "ratio": {
            "P": 1,
            "N": 3,
            "O": 3,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C5H5\u2212": {
        "product": "Cyclopentadienide Ion",
        "formula": "C5H5\u2212",
        "ratio": {
            "C": 5,
            "H": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ru2O4": {
        "product": "Diruthenium Tetraoxide",
        "formula": "Ru2O4",
        "ratio": {
            "Ru": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "B5H9": {
        "product": "Pentaborane",
        "formula": "B5H9",
        "ratio": {
            "B": 5,
            "H": 9
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "PF6": {
        "product": "Phosphorus Hexafluoride",
        "formula": "PF6",
        "ratio": {
            "P": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S2O7": {
        "product": "Sulfur Heptoxide",
        "formula": "S2O7",
        "ratio": {
            "S": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na2S2O3": {
        "product": "Sodium Thiosulfate",
        "formula": "Na2S2O3",
        "ratio": {
            "Na": 2,
            "S": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3H9N3": {
        "product": "Hexahydrotriazine",
        "formula": "C3H9N3",
        "ratio": {
            "C": 3,
            "H": 9,
            "N": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Ca(ClO)2": {
        "product": "Calcium Hypochlorite",
        "formula": "Ca(ClO)2",
        "ratio": {
            "Ca": 1,
            "Cl": 2,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "H2Cr2O7": {
        "product": "Dichromic Acid",
        "formula": "H2Cr2O7",
        "ratio": {
            "H": 2,
            "Cr": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KClO4": {
        "product": "Potassium Perchlorate",
        "formula": "KClO4",
        "ratio": {
            "K": 1,
            "Cl": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "CfF4": {
        "product": "Californium Tetrafluoride",
        "formula": "CfF4",
        "ratio": {
            "Cf": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SF5": {
        "product": "Sulfur Pentafluoride",
        "formula": "SF5",
        "ratio": {
            "S": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "COS": {
        "product": "Carbonyl Sulfide",
        "formula": "COS",
        "ratio": {
            "C": 1,
            "O": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "WF6": {
        "product": "Tungsten(VI) Fluoride",
        "formula": "WF6",
        "ratio": {
            "W": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PF5": {
        "product": "Phosphorus Pentafluoride",
        "formula": "PF5",
        "ratio": {
            "P": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HClO3": {
        "product": "Chloric Acid",
        "formula": "HClO3",
        "ratio": {
            "H": 1,
            "Cl": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "SiH4": {
        "product": "Silane",
        "formula": "SiH4",
        "ratio": {
            "Si": 1,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KOCN": {
        "product": "Potassium Cyanate",
        "formula": "KOCN",
        "ratio": {
            "K": 1,
            "O": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Na2SiO3": {
        "product": "Sodium Silicate",
        "formula": "Na2SiO3",
        "ratio": {
            "Na": 2,
            "Si": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "RaSO4": {
        "product": "Radium Sulfate",
        "formula": "RaSO4",
        "ratio": {
            "Ra": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CsO2": {
        "product": "Cesium Superoxide",
        "formula": "CsO2",
        "ratio": {
            "Cs": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C42H30": {
        "product": "Hexaphenylbenzene",
        "formula": "C42H30",
        "ratio": {
            "C": 42,
            "H": 30
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "H2S2O7": {
        "product": "Fuming Sulfuric Acid",
        "formula": "H2S2O7",
        "ratio": {
            "H": 2,
            "S": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ru3O2(H2O)Cl6": {
        "product": "Ruthenium Red",
        "formula": "Ru3O2(H2O)Cl6",
        "ratio": {
            "Ru": 3,
            "O": 2,
            "H": 2,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2N6O12": {
        "product": "Hexanitroethane",
        "formula": "C2N6O12",
        "ratio": {
            "C": 2,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Zn(ClO3)2": {
        "product": "Zinc Chlorate",
        "formula": "Zn(ClO3)2",
        "ratio": {
            "Zn": 1,
            "Cl": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "[Ru(bpy)3]Cl2": {
        "product": "Tris(bipyridine)ruthenium(II) Chloride",
        "formula": "[Ru(bpy)3]Cl2",
        "ratio": {
            "Ru": 1,
            "C": 30,
            "H": 24,
            "N": 6,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "MgC2": {
        "product": "Magnesium Acetylide",
        "formula": "MgC2",
        "ratio": {
            "Mg": 1,
            "C": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NaClO4": {
        "product": "Sodium Perchlorate",
        "formula": "NaClO4",
        "ratio": {
            "Na": 1,
            "Cl": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NOHSO4": {
        "product": "Nitrosyl Sulfate",
        "formula": "NOHSO4",
        "ratio": {
            "N": 1,
            "O": 3,
            "H": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "ICl": {
        "product": "Iodine Monochloride",
        "formula": "ICl",
        "ratio": {
            "I": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "PO": {
        "product": "Phosphorene Oxide",
        "formula": "PO",
        "ratio": {
            "P": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AgCN": {
        "product": "Silver Cyanide",
        "formula": "AgCN",
        "ratio": {
            "Ag": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "TiC": {
        "product": "Titanium Carbide",
        "formula": "TiC",
        "ratio": {
            "Ti": 1,
            "C": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "NO2Cl": {
        "product": "Nitryl Chloride",
        "formula": "NO2Cl",
        "ratio": {
            "N": 1,
            "O": 2,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FeS": {
        "product": "Iron(II) Sulfide",
        "formula": "FeS",
        "ratio": {
            "Fe": 1,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SF6O": {
        "product": "Sulfur Hexafluoride Monoxide",
        "formula": "SF6O",
        "ratio": {
            "S": 1,
            "F": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P2H4": {
        "product": "Diphosphine",
        "formula": "P2H4",
        "ratio": {
            "P": 2,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NaTcO4": {
        "product": "Sodium Pertechnetate",
        "formula": "NaTcO4",
        "ratio": {
            "Na": 1,
            "Tc": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ca(NO3)2 \u00b7 NH4NO3": {
        "product": "Calcium Ammonium Nitrate",
        "formula": "Ca(NO3)2 \u00b7 NH4NO3",
        "ratio": {
            "Ca": 1,
            "N": 3,
            "O": 9,
            "H": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Cl2O": {
        "product": "Chlorine Monoxide",
        "formula": "Cl2O",
        "ratio": {
            "Cl": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Al4C3": {
        "product": "Aluminum Carbide",
        "formula": "Al4C3",
        "ratio": {
            "Al": 4,
            "C": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "AgCNO": {
        "product": "Silver Fulminate",
        "formula": "AgCNO",
        "ratio": {
            "Ag": 1,
            "C": 1,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C2H6": {
        "product": "Ethane",
        "formula": "C2H6",
        "ratio": {
            "C": 2,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BaO2": {
        "product": "Barium Peroxide",
        "formula": "BaO2",
        "ratio": {
            "Ba": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "XePtCl6": {
        "product": "Xenon Hexachloroplatinate",
        "formula": "XePtCl6",
        "ratio": {
            "Xe": 1,
            "Pt": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "TiB2": {
        "product": "Titanium Boride",
        "formula": "TiB2",
        "ratio": {
            "Ti": 1,
            "B": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BiOCl": {
        "product": "Bismuth Oxychloride",
        "formula": "BiOCl",
        "ratio": {
            "Bi": 1,
            "O": 1,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(C5H5)3Th": {
        "product": "Tricyclopentadienyl Thorium",
        "formula": "(C5H5)3Th",
        "ratio": {
            "C": 15,
            "H": 15,
            "Th": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BCl4": {
        "product": "Borohydride Tetrachloride",
        "formula": "BCl4",
        "ratio": {
            "B": 1,
            "Cl": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "RaF2": {
        "product": "Radium Fluoride",
        "formula": "RaF2",
        "ratio": {
            "Ra": 1,
            "F": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "O2+": {
        "product": "Dioxygenyl",
        "formula": "O2+",
        "ratio": {
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P6": {
        "product": "Hexaphosphorus",
        "formula": "P6",
        "ratio": {
            "P": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Al2(C2)3": {
        "product": "Aluminium Acetylide",
        "formula": "Al2(C2)3",
        "ratio": {
            "Al": 2,
            "C": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Cr2S3": {
        "product": "Chromium(III) Sulfide",
        "formula": "Cr2S3",
        "ratio": {
            "Cr": 2,
            "S": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PuF6": {
        "product": "Plutonium Hexafluoride",
        "formula": "PuF6",
        "ratio": {
            "Pu": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ru(bpy)3^2+": {
        "product": "Ruthenium(II) Bipyridyl Complex",
        "formula": "Ru(bpy)3^2+",
        "ratio": {
            "Ru": 1,
            "C": 30,
            "H": 24,
            "N": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C5H13O14P3": {
        "product": "Phosphoribosylpyrophosphate",
        "formula": "C5H13O14P3",
        "ratio": {
            "C": 5,
            "H": 13,
            "O": 14,
            "P": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "K2[Pt(CN)4]": {
        "product": "Potassium Platinocyanide",
        "formula": "K2[Pt(CN)4]",
        "ratio": {
            "K": 2,
            "Pt": 1,
            "C": 4,
            "N": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C12H10N2": {
        "product": "Azobenzene",
        "formula": "C12H10N2",
        "ratio": {
            "C": 12,
            "H": 10,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(C2F4)n": {
        "product": "Teflon",
        "formula": "(C2F4)n",
        "ratio": {
            "C": 2,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "(C8H8)n": {
        "product": "Polystyrene",
        "formula": "(C8H8)n",
        "ratio": {
            "C": 8,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4N2": {
        "product": "Dicyanoacetylene",
        "formula": "C4N2",
        "ratio": {
            "C": 4,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "ClO4-": {
        "product": "Perchlorate ion",
        "formula": "ClO4-",
        "ratio": {
            "Cl": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PH4+": {
        "product": "Phosphonium ion",
        "formula": "PH4+",
        "ratio": {
            "P": 1,
            "H": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C6H15O4P": {
        "product": "Phosphoric Acid Triethyl Ester",
        "formula": "C6H15O4P",
        "ratio": {
            "C": 6,
            "H": 15,
            "O": 4,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ni(CO)4": {
        "product": "Tetracarbonyl Nickel",
        "formula": "Ni(CO)4",
        "ratio": {
            "Ni": 1,
            "C": 4,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "AlON": {
        "product": "Aluminum Oxynitride",
        "formula": "AlON",
        "ratio": {
            "Al": 1,
            "O": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "ClF5": {
        "product": "Chlorine Pentafluoride",
        "formula": "ClF5",
        "ratio": {
            "Cl": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H4S": {
        "product": "Thiophene",
        "formula": "C4H4S",
        "ratio": {
            "C": 4,
            "H": 4,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HPF6": {
        "product": "Hexafluorophosphoric Acid",
        "formula": "HPF6",
        "ratio": {
            "H": 1,
            "P": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NOBr": {
        "product": "Nitrosyl Bromide",
        "formula": "NOBr",
        "ratio": {
            "N": 1,
            "O": 1,
            "Br": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "B3N3H6": {
        "product": "Borazine",
        "formula": "B3N3H6",
        "ratio": {
            "B": 3,
            "N": 3,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PI4": {
        "product": "Phosphorus Tetraiodide",
        "formula": "PI4",
        "ratio": {
            "P": 1,
            "I": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "TsF6": {
        "product": "Tennessine Hexafluoride",
        "formula": "TsF6",
        "ratio": {
            "Ts": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Au2O3": {
        "product": "Gold(III) Oxide",
        "formula": "Au2O3",
        "ratio": {
            "Au": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CHClO": {
        "product": "Formyl Chloride",
        "formula": "CHClO",
        "ratio": {
            "C": 1,
            "H": 1,
            "Cl": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "RbF": {
        "product": "Rubidium Fluoride",
        "formula": "RbF",
        "ratio": {
            "Rb": 1,
            "F": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H8O": {
        "product": "Tetrahydrofuran",
        "formula": "C4H8O",
        "ratio": {
            "C": 4,
            "H": 8,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CrO5": {
        "product": "Chromium(VI) Oxide Peroxide",
        "formula": "CrO5",
        "ratio": {
            "Cr": 1,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CH3SH": {
        "product": "Methanethiol",
        "formula": "CH3SH",
        "ratio": {
            "C": 1,
            "H": 4,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C14H14O": {
        "product": "Dibenzyl Ether",
        "formula": "C14H14O",
        "ratio": {
            "C": 14,
            "H": 14,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "LiAlF4": {
        "product": "Lithium Aluminum Fluoride",
        "formula": "LiAlF4",
        "ratio": {
            "Li": 1,
            "Al": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Na6P6O18": {
        "product": "Sodium Hexametaphosphate",
        "formula": "Na6P6O18",
        "ratio": {
            "Na": 6,
            "P": 6,
            "O": 18
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H2Br4": {
        "product": "Tetrabromoethane",
        "formula": "C2H2Br4",
        "ratio": {
            "C": 2,
            "H": 2,
            "Br": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "GaN": {
        "product": "Gallium Nitride",
        "formula": "GaN",
        "ratio": {
            "Ga": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "VCl4": {
        "product": "Vanadium Tetrachloride",
        "formula": "VCl4",
        "ratio": {
            "V": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CH3SiCl3": {
        "product": "Methyltrichlorosilane",
        "formula": "CH3SiCl3",
        "ratio": {
            "C": 1,
            "H": 3,
            "Si": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "HClO4\u00b7H2O": {
        "product": "Perchloric Acid Monohydrate",
        "formula": "HClO4\u00b7H2O",
        "ratio": {
            "H": 3,
            "Cl": 1,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Cf(C2O4)3": {
        "product": "Californium Oxalate",
        "formula": "Cf(C2O4)3",
        "ratio": {
            "Cf": 1,
            "C": 6,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SI2": {
        "product": "Sulfur Iodide",
        "formula": "SI2",
        "ratio": {
            "S": 1,
            "I": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(SiH3)3N": {
        "product": "Trisilylamine",
        "formula": "(SiH3)3N",
        "ratio": {
            "Si": 3,
            "H": 9,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "P2Se3": {
        "product": "Phosphorus Triselenide",
        "formula": "P2Se3",
        "ratio": {
            "P": 2,
            "Se": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ThF4": {
        "product": "Thorium Tetrafluoride",
        "formula": "ThF4",
        "ratio": {
            "Th": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Be2C": {
        "product": "Beryllium Carbide",
        "formula": "Be2C",
        "ratio": {
            "Be": 2,
            "C": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PuO2": {
        "product": "Plutonium Dioxide",
        "formula": "PuO2",
        "ratio": {
            "Pu": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H(NO2)6": {
        "product": "Hexanitrobenzene",
        "formula": "C6H(NO2)6",
        "ratio": {
            "C": 6,
            "H": 6,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C4H11N": {
        "product": "Diethylamine",
        "formula": "C4H11N",
        "ratio": {
            "C": 4,
            "H": 11,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Na3N": {
        "product": "Sodium Nitride",
        "formula": "Na3N",
        "ratio": {
            "Na": 3,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "H3PO2": {
        "product": "Phosphorous Oxoacid",
        "formula": "H3PO2",
        "ratio": {
            "H": 3,
            "P": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Tl2S": {
        "product": "Thallium(I) Sulfide",
        "formula": "Tl2S",
        "ratio": {
            "Tl": 2,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "UF4": {
        "product": "Uranium Tetrafluoride",
        "formula": "UF4",
        "ratio": {
            "U": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "ClO3": {
        "product": "Chlorine Trioxide",
        "formula": "ClO3",
        "ratio": {
            "Cl": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P2O3": {
        "product": "Diphosphorus Trioxide",
        "formula": "P2O3",
        "ratio": {
            "P": 2,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H3O+": {
        "product": "Hydronium Ion",
        "formula": "H3O+",
        "ratio": {
            "H": 3,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Pb(C2H5)4": {
        "product": "Tetraethyllead",
        "formula": "Pb(C2H5)4",
        "ratio": {
            "Pb": 1,
            "C": 8,
            "H": 20
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C6H5NO2": {
        "product": "Nitrobenzene",
        "formula": "C6H5NO2",
        "ratio": {
            "C": 6,
            "H": 5,
            "N": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2H3ClO2": {
        "product": "Chloroacetic Acid",
        "formula": "C2H3ClO2",
        "ratio": {
            "C": 2,
            "H": 3,
            "Cl": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "P4S5": {
        "product": "Tetraphosphorus Pentasulfide",
        "formula": "P4S5",
        "ratio": {
            "P": 4,
            "S": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CaFe2O4": {
        "product": "Calcium Ferrite",
        "formula": "CaFe2O4",
        "ratio": {
            "Ca": 1,
            "Fe": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CH4N2S": {
        "product": "Thiourea",
        "formula": "CH4N2S",
        "ratio": {
            "C": 1,
            "H": 4,
            "N": 2,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ga2Se3": {
        "product": "Gallium Selenide",
        "formula": "Ga2Se3",
        "ratio": {
            "Ga": 2,
            "Se": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PSCl3": {
        "product": "Phosphorothioic Chloride",
        "formula": "PSCl3",
        "ratio": {
            "P": 1,
            "S": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Fe3O4": {
        "product": "Ferrofluid",
        "formula": "Fe3O4",
        "ratio": {
            "Fe": 3,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SO2F2": {
        "product": "Sulfuryl Fluoride",
        "formula": "SO2F2",
        "ratio": {
            "S": 1,
            "O": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CaAl2O4": {
        "product": "Calcium Aluminate",
        "formula": "CaAl2O4",
        "ratio": {
            "Ca": 1,
            "Al": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C5H8": {
        "product": "Isoprene",
        "formula": "C5H8",
        "ratio": {
            "C": 5,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Li3PO4": {
        "product": "Lithium Phosphate",
        "formula": "Li3PO4",
        "ratio": {
            "Li": 3,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Be(NO3)2": {
        "product": "Beryllium Nitrate",
        "formula": "Be(NO3)2",
        "ratio": {
            "Be": 1,
            "N": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C5H12": {
        "product": "Pentane",
        "formula": "C5H12",
        "ratio": {
            "C": 5,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "H2Se": {
        "product": "Hydrogen Selenide",
        "formula": "H2Se",
        "ratio": {
            "H": 2,
            "Se": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Al(ClO3)3": {
        "product": "Aluminium Chlorate",
        "formula": "Al(ClO3)3",
        "ratio": {
            "Al": 1,
            "Cl": 3,
            "O": 9
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ru(CO)4": {
        "product": "Ruthenium Tetracarbonyl",
        "formula": "Ru(CO)4",
        "ratio": {
            "Ru": 1,
            "C": 4,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "K3C3N3O3": {
        "product": "Potassium Cyanurate",
        "formula": "K3C3N3O3",
        "ratio": {
            "K": 3,
            "C": 3,
            "N": 3,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "VOCl3": {
        "product": "Vanadium Oxytrichloride",
        "formula": "VOCl3",
        "ratio": {
            "V": 1,
            "O": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C21H27NO6": {
        "product": "Hydrastine",
        "formula": "C21H27NO6",
        "ratio": {
            "C": 21,
            "H": 27,
            "N": 1,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C24H30": {
        "product": "Alkylbenzene",
        "formula": "C24H30",
        "ratio": {
            "C": 24,
            "H": 30
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C15H14O": {
        "product": "Dibenzyl Ketone",
        "formula": "C15H14O",
        "ratio": {
            "C": 15,
            "H": 14,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CrSiF6": {
        "product": "Chromium Hexafluorosilicate",
        "formula": "CrSiF6",
        "ratio": {
            "Cr": 1,
            "Si": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C8H10": {
        "product": "Xylie",
        "formula": "C8H10",
        "ratio": {
            "C": 8,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "B4C": {
        "product": "Boron Carbide",
        "formula": "B4C",
        "ratio": {
            "B": 4,
            "C": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Na2ZnO2": {
        "product": "Sodium Zincate",
        "formula": "Na2ZnO2",
        "ratio": {
            "Na": 2,
            "Zn": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CCl2F2": {
        "product": "Freon-12",
        "formula": "CCl2F2",
        "ratio": {
            "C": 1,
            "Cl": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NBr5": {
        "product": "Nitrogen Pentabromide",
        "formula": "NBr5",
        "ratio": {
            "N": 1,
            "Br": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CaS4": {
        "product": "Calcium Tetrasulfide",
        "formula": "CaS4",
        "ratio": {
            "Ca": 1,
            "S": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Na3C6H5O7": {
        "product": "Trisodium Citrate",
        "formula": "Na3C6H5O7",
        "ratio": {
            "Na": 3,
            "C": 6,
            "H": 5,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SO2ClF": {
        "product": "Sulfuryl Chloride Fluoride",
        "formula": "SO2ClF",
        "ratio": {
            "S": 1,
            "O": 2,
            "Cl": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C7H6N4O": {
        "product": "Carbonyldiimidazole",
        "formula": "C7H6N4O",
        "ratio": {
            "C": 7,
            "H": 6,
            "N": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cu2(OH)3Cl": {
        "product": "Dicopper Chloride Trihydroxide",
        "formula": "Cu2(OH)3Cl",
        "ratio": {
            "Cu": 2,
            "O": 3,
            "H": 3,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HgO": {
        "product": "Mercuric Oxide",
        "formula": "HgO",
        "ratio": {
            "Hg": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BrF3": {
        "product": "Bromine Trifluoride",
        "formula": "BrF3",
        "ratio": {
            "Br": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PI3": {
        "product": "Phosphorus Triiodide",
        "formula": "PI3",
        "ratio": {
            "P": 1,
            "I": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "N2S5": {
        "product": "Dinitrogen Pentasulfide",
        "formula": "N2S5",
        "ratio": {
            "N": 2,
            "S": 5
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "O2F": {
        "product": "Dioxygenyl Fluoride",
        "formula": "O2F",
        "ratio": {
            "O": 2,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KN3": {
        "product": "Potassium Nitride",
        "formula": "KN3",
        "ratio": {
            "K": 1,
            "N": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "BiPS4": {
        "product": "Bismuth Thiophosphate",
        "formula": "BiPS4",
        "ratio": {
            "Bi": 1,
            "P": 1,
            "S": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "S2N4": {
        "product": "Disulfur Tetranitride",
        "formula": "S2N4",
        "ratio": {
            "S": 2,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "NI3": {
        "product": "Nitrogen Triiodide",
        "formula": "NI3",
        "ratio": {
            "N": 1,
            "I": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Cr(CO)5": {
        "product": "Chromium Pentacarbonyl",
        "formula": "Cr(CO)5",
        "ratio": {
            "Cr": 1,
            "C": 5,
            "O": 5
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "(C\u2261C)n": {
        "product": "Graphyne",
        "formula": "(C\u2261C)n",
        "ratio": {
            "C": 2,
            "H": 0
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Si4H10": {
        "product": "Tetrasilane",
        "formula": "Si4H10",
        "ratio": {
            "Si": 4,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "H(m)": {
        "product": "Metallic Hydrogen",
        "formula": "H(m)",
        "ratio": {
            "H": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "PN": {
        "product": "Red Phosphorus Mononitride",
        "formula": "PN",
        "ratio": {
            "P": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CrF4": {
        "product": "Chromium Tetrafluoride",
        "formula": "CrF4",
        "ratio": {
            "Cr": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "PH2+": {
        "product": "Phosphenium ion",
        "formula": "PH2+",
        "ratio": {
            "P": 1,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(CH3)4N+": {
        "product": "Tetramethylammonium",
        "formula": "(CH3)4N+",
        "ratio": {
            "C": 4,
            "H": 12,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PtF6": {
        "product": "Platinum Hexafluoride",
        "formula": "PtF6",
        "ratio": {
            "Pt": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na2TiO3": {
        "product": "Sodium Titanate",
        "formula": "Na2TiO3",
        "ratio": {
            "Na": 2,
            "Ti": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "GeH2": {
        "product": "Germylene",
        "formula": "GeH2",
        "ratio": {
            "Ge": 1,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Mn2(CO)10": {
        "product": "Bis(pentacarbonyl)manganese",
        "formula": "Mn2(CO)10",
        "ratio": {
            "Mn": 2,
            "C": 10,
            "O": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cd(CH3)2": {
        "product": "Dimethylcadmium",
        "formula": "Cd(CH3)2",
        "ratio": {
            "Cd": 1,
            "C": 2,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "[XeF3]\u2212": {
        "product": "Xenon Trifluoride Anion",
        "formula": "[XeF3]\u2212",
        "ratio": {
            "Xe": 1,
            "F": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SN4": {
        "product": "Sulfur Tetranitride",
        "formula": "SN4",
        "ratio": {
            "S": 1,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "[Co(NH3)5Cl]Cl2": {
        "product": "Chloropentaamminecobalt(III) Chloride",
        "formula": "[Co(NH3)5Cl]Cl2",
        "ratio": {
            "Co": 1,
            "N": 5,
            "H": 15,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "MgH2": {
        "product": "Magnesium Hydride",
        "formula": "MgH2",
        "ratio": {
            "Mg": 1,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Rb2O": {
        "product": "Rubidium Oxide",
        "formula": "Rb2O",
        "ratio": {
            "Rb": 2,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AlI3": {
        "product": "Aluminium Iodide",
        "formula": "AlI3",
        "ratio": {
            "Al": 1,
            "I": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Be(ClO3)2": {
        "product": "Beryllium Chlorate",
        "formula": "Be(ClO3)2",
        "ratio": {
            "Be": 1,
            "Cl": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "P4S4": {
        "product": "Tetraphosphorus Tetrasulfide",
        "formula": "P4S4",
        "ratio": {
            "P": 4,
            "S": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CH2N2": {
        "product": "Diazomethane",
        "formula": "CH2N2",
        "ratio": {
            "C": 1,
            "H": 2,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C8H8O": {
        "product": "Acetophenone",
        "formula": "C8H8O",
        "ratio": {
            "C": 8,
            "H": 8,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "P4N6": {
        "product": "Tetraphosphorus Hexanitride",
        "formula": "P4N6",
        "ratio": {
            "P": 4,
            "N": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H12N4": {
        "product": "Hexamine",
        "formula": "C6H12N4",
        "ratio": {
            "C": 6,
            "H": 12,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CH2(OH)2": {
        "product": "Formaldehyde Hydrate",
        "formula": "CH2(OH)2",
        "ratio": {
            "C": 1,
            "H": 4,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C2N2": {
        "product": "Cyanogen",
        "formula": "C2N2",
        "ratio": {
            "C": 2,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C2N3": {
        "product": "Dicyanamide Ion",
        "formula": "C2N3",
        "ratio": {
            "C": 2,
            "N": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PS": {
        "product": "Phosphine Sulfide",
        "formula": "PS",
        "ratio": {
            "P": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "MgBr2\u00b76H2O": {
        "product": "Magnesium Bromide Hexahydrate",
        "formula": "MgBr2\u00b76H2O",
        "ratio": {
            "Mg": 1,
            "Br": 2,
            "H": 12,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H6N12O12": {
        "product": "Hexanitrohexaazaisowurtzitane",
        "formula": "C6H6N12O12",
        "ratio": {
            "C": 6,
            "H": 6,
            "N": 12,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "FmSO4": {
        "product": "Fermium(II) Sulfate",
        "formula": "FmSO4",
        "ratio": {
            "Fm": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H5NO2": {
        "product": "Nitroethane",
        "formula": "C2H5NO2",
        "ratio": {
            "C": 2,
            "H": 5,
            "N": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "B4H10": {
        "product": "Diboran(4)",
        "formula": "B4H10",
        "ratio": {
            "B": 4,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CfO3": {
        "product": "Californium Trioxide",
        "formula": "CfO3",
        "ratio": {
            "Cf": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HSO3F": {
        "product": "Fluorosulfuric Acid",
        "formula": "HSO3F",
        "ratio": {
            "H": 1,
            "S": 1,
            "O": 3,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2O4": {
        "product": "Dicarbon Tetraoxide",
        "formula": "C2O4",
        "ratio": {
            "C": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "WN": {
        "product": "Tungsten Nitride",
        "formula": "WN",
        "ratio": {
            "W": 1,
            "N": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "[Co(NH3)6]Cl3": {
        "product": "Hexaamminecobalt(III) Chloride",
        "formula": "[Co(NH3)6]Cl3",
        "ratio": {
            "Co": 1,
            "N": 6,
            "H": 18,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H3P": {
        "product": "Phosphaethene",
        "formula": "C2H3P",
        "ratio": {
            "C": 2,
            "H": 3,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "O3\u207b": {
        "product": "Ozonide Ion",
        "formula": "O3\u207b",
        "ratio": {
            "O": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CaMgSiO4": {
        "product": "Calcium Magnesium Silicate",
        "formula": "CaMgSiO4",
        "ratio": {
            "Ca": 1,
            "Mg": 1,
            "Si": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H4NO2Na": {
        "product": "Sodium Nitrophenoxide",
        "formula": "C6H4NO2Na",
        "ratio": {
            "C": 6,
            "H": 4,
            "N": 1,
            "O": 2,
            "Na": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2BrCl": {
        "product": "Bromine Chloroacetylene",
        "formula": "C2BrCl",
        "ratio": {
            "C": 2,
            "Br": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "BH3NH3": {
        "product": "Borohydride Ammonia Complex",
        "formula": "BH3NH3",
        "ratio": {
            "B": 1,
            "H": 6,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SCl5": {
        "product": "Sulfur Pentachloride",
        "formula": "SCl5",
        "ratio": {
            "S": 1,
            "Cl": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S2F6": {
        "product": "Disulfur Hexafluoride",
        "formula": "S2F6",
        "ratio": {
            "S": 2,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CrN": {
        "product": "Chromium(II) Nitride",
        "formula": "CrN",
        "ratio": {
            "Cr": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Tm2O3": {
        "product": "Thulium(III) Oxide",
        "formula": "Tm2O3",
        "ratio": {
            "Tm": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H4N2O3": {
        "product": "Barbituric Acid",
        "formula": "C4H4N2O3",
        "ratio": {
            "C": 4,
            "H": 4,
            "N": 2,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2O2Cl4": {
        "product": "Phosgene Dimer",
        "formula": "C2O2Cl4",
        "ratio": {
            "C": 2,
            "O": 2,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C10H10Ni": {
        "product": "Nickel Cyclopentadienyl",
        "formula": "C10H10Ni",
        "ratio": {
            "C": 10,
            "H": 10,
            "Ni": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "H3PO4Cl": {
        "product": "Hydrogen Tetrachlorophosphate",
        "formula": "H3PO4Cl",
        "ratio": {
            "H": 3,
            "P": 1,
            "O": 4,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NH4CHO2": {
        "product": "Ammonium Formate",
        "formula": "NH4CHO2",
        "ratio": {
            "N": 1,
            "H": 5,
            "C": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "K[C6H2(NO2)3O]": {
        "product": "Potassium Picrate",
        "formula": "K[C6H2(NO2)3O]",
        "ratio": {
            "K": 1,
            "C": 6,
            "H": 2,
            "N": 3,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "BNNT": {
        "product": "Boron Nitride Nanotube",
        "formula": "BNNT",
        "ratio": {
            "B": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KBO2": {
        "product": "Potassium Borate",
        "formula": "KBO2",
        "ratio": {
            "K": 1,
            "B": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ga2O3": {
        "product": "Gallium Oxide",
        "formula": "Ga2O3",
        "ratio": {
            "Ga": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H2N2": {
        "product": "Diazirine",
        "formula": "C2H2N2",
        "ratio": {
            "C": 2,
            "H": 2,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "SmI3": {
        "product": "Samarium(III) Iodide",
        "formula": "SmI3",
        "ratio": {
            "Sm": 1,
            "I": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C10H10Fe+": {
        "product": "Ferrocenium Ion",
        "formula": "C10H10Fe+",
        "ratio": {
            "C": 10,
            "H": 10,
            "Fe": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KBH4": {
        "product": "Potassium Borohydride",
        "formula": "KBH4",
        "ratio": {
            "K": 1,
            "B": 1,
            "H": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HOONO2": {
        "product": "Peroxynitric Acid",
        "formula": "HOONO2",
        "ratio": {
            "H": 1,
            "O": 3,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CClF3": {
        "product": "Chlorotrifluoromethane",
        "formula": "CClF3",
        "ratio": {
            "C": 1,
            "Cl": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BeS": {
        "product": "Beryllium Sulfide",
        "formula": "BeS",
        "ratio": {
            "Be": 1,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C\u221e": {
        "product": "Carbyne",
        "formula": "C\u221e",
        "ratio": {
            "C": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "OF2": {
        "product": "Oxygen Difluoride",
        "formula": "OF2",
        "ratio": {
            "O": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H2S3O6": {
        "product": "Trithionic Acid",
        "formula": "H2S3O6",
        "ratio": {
            "H": 2,
            "S": 3,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "COF2": {
        "product": "Carbonyl Difluoride",
        "formula": "COF2",
        "ratio": {
            "C": 1,
            "O": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H2SiF6": {
        "product": "Fluorosilicic Acid",
        "formula": "H2SiF6",
        "ratio": {
            "H": 2,
            "Si": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Al2S3": {
        "product": "Aluminum Sulfide",
        "formula": "Al2S3",
        "ratio": {
            "Al": 2,
            "S": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NiSO4": {
        "product": "Nickel(II) Sulfate",
        "formula": "NiSO4",
        "ratio": {
            "Ni": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HOF": {
        "product": "Hypofluorous Acid",
        "formula": "HOF",
        "ratio": {
            "H": 1,
            "O": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "HOBr": {
        "product": "Hypobromous Acid",
        "formula": "HOBr",
        "ratio": {
            "H": 1,
            "O": 1,
            "Br": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "BH3\u00b7NH3": {
        "product": "Borane Ammonia",
        "formula": "BH3\u00b7NH3",
        "ratio": {
            "B": 1,
            "H": 6,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C8H8": {
        "product": "Cyclooctatetraene",
        "formula": "C8H8",
        "ratio": {
            "C": 8,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "PBr6": {
        "product": "Phosphorus Hexabromide",
        "formula": "PBr6",
        "ratio": {
            "P": 1,
            "Br": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li2O2": {
        "product": "Lithium Peroxide",
        "formula": "Li2O2",
        "ratio": {
            "Li": 2,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Al2Cl(OH)5": {
        "product": "Aluminum Chlorohydrate",
        "formula": "Al2Cl(OH)5",
        "ratio": {
            "Al": 2,
            "Cl": 1,
            "O": 5,
            "H": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NaOCN": {
        "product": "Sodium Cyanate",
        "formula": "NaOCN",
        "ratio": {
            "Na": 1,
            "O": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "H4XeO6": {
        "product": "Perxenic Acid",
        "formula": "H4XeO6",
        "ratio": {
            "H": 4,
            "Xe": 1,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "HAuCl4": {
        "product": "Tetrachloroauric Acid",
        "formula": "HAuCl4",
        "ratio": {
            "H": 1,
            "Au": 1,
            "Cl": 4
        },
        "type": "Ionic",
        "behavior": "liquid"
    },
    "PCl": {
        "product": "Phosphorus Monochloride",
        "formula": "PCl",
        "ratio": {
            "P": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Be(CN)2": {
        "product": "Beryllium Cyanide",
        "formula": "Be(CN)2",
        "ratio": {
            "Be": 1,
            "C": 2,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CfF6": {
        "product": "Californium Hexafluoride",
        "formula": "CfF6",
        "ratio": {
            "Cf": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "XeO3F2": {
        "product": "Xenon Difluoride Trioxide",
        "formula": "XeO3F2",
        "ratio": {
            "Xe": 1,
            "O": 3,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S8F4": {
        "product": "Octasulfur Tetrafluoride",
        "formula": "S8F4",
        "ratio": {
            "S": 8,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "RuO2": {
        "product": "Ruthenium Dioxide",
        "formula": "RuO2",
        "ratio": {
            "Ru": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "B5H11": {
        "product": "Pentaborane-11",
        "formula": "B5H11",
        "ratio": {
            "B": 5,
            "H": 11
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Ts2": {
        "product": "Diatomic Tennessine",
        "formula": "Ts2",
        "ratio": {
            "Ts": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "WF4": {
        "product": "Tungsten Tetrafluoride",
        "formula": "WF4",
        "ratio": {
            "W": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "O2PtF6": {
        "product": "Dioxygenyl Hexafluoroplatinate",
        "formula": "O2PtF6",
        "ratio": {
            "O": 2,
            "Pt": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NO2F": {
        "product": "Nitryl Fluoride",
        "formula": "NO2F",
        "ratio": {
            "N": 1,
            "O": 2,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "UC": {
        "product": "Uranium Monocarbide",
        "formula": "UC",
        "ratio": {
            "U": 1,
            "C": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CH2O2": {
        "product": "Formyl Peroxide",
        "formula": "CH2O2",
        "ratio": {
            "C": 1,
            "H": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "HSO3Cl": {
        "product": "Chlorosulfuric Acid",
        "formula": "HSO3Cl",
        "ratio": {
            "H": 1,
            "S": 1,
            "O": 3,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Na2HPO2": {
        "product": "Sodium Phosphinate",
        "formula": "Na2HPO2",
        "ratio": {
            "Na": 2,
            "H": 1,
            "P": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "ICN": {
        "product": "Cyanogen Iodide",
        "formula": "ICN",
        "ratio": {
            "I": 1,
            "C": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C18H26ClN3O": {
        "product": "Hydroxychloroquine",
        "formula": "C18H26ClN3O",
        "ratio": {
            "C": 18,
            "H": 26,
            "Cl": 1,
            "N": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "N2Cl4": {
        "product": "Dinitrogen Tetrachloride",
        "formula": "N2Cl4",
        "ratio": {
            "N": 2,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CAgNO": {
        "product": "Silver Fulminate",
        "formula": "CAgNO",
        "ratio": {
            "C": 1,
            "Ag": 1,
            "N": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C8HF15O2": {
        "product": "Perfluorooctanoic Acid",
        "formula": "C8HF15O2",
        "ratio": {
            "C": 8,
            "H": 1,
            "F": 15,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "WN6": {
        "product": "Tungsten Hexanitride",
        "formula": "WN6",
        "ratio": {
            "W": 1,
            "N": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P2H2": {
        "product": "Diphosphene",
        "formula": "P2H2",
        "ratio": {
            "P": 2,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2HF": {
        "product": "Fluoroacetylene",
        "formula": "C2HF",
        "ratio": {
            "C": 2,
            "H": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CH4\u00b7nH2O": {
        "product": "Clathrate Hydrate of Methane",
        "formula": "CH4\u00b7nH2O",
        "ratio": {
            "C": 1,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C7H5N3O6": {
        "product": "Trinitrotoluene (TNT)",
        "formula": "C7H5N3O6",
        "ratio": {
            "C": 7,
            "H": 5,
            "N": 3,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C4H4": {
        "product": "Cyclobutadiene",
        "formula": "C4H4",
        "ratio": {
            "C": 4,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na2Se": {
        "product": "Sodium Selenide",
        "formula": "Na2Se",
        "ratio": {
            "Na": 2,
            "Se": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ru2(CO)5": {
        "product": "Diruthenium Pentacarbonyl",
        "formula": "Ru2(CO)5",
        "ratio": {
            "Ru": 2,
            "C": 5,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NBr3": {
        "product": "Nitrogen Tribromide",
        "formula": "NBr3",
        "ratio": {
            "N": 1,
            "Br": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "BH4O": {
        "product": "Borohydroxide",
        "formula": "BH4O",
        "ratio": {
            "B": 1,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "P2O5": {
        "product": "Diphosphorus Pentoxide",
        "formula": "P2O5",
        "ratio": {
            "P": 2,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ClF": {
        "product": "Chlorine Monofluoride",
        "formula": "ClF",
        "ratio": {
            "Cl": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NaO2": {
        "product": "Sodium Superoxide",
        "formula": "NaO2",
        "ratio": {
            "Na": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "FNO": {
        "product": "Nitrosyl Fluoride",
        "formula": "FNO",
        "ratio": {
            "N": 1,
            "O": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C2H8Si": {
        "product": "Dimethylsilane",
        "formula": "C2H8Si",
        "ratio": {
            "C": 2,
            "H": 8,
            "Si": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "AlF3": {
        "product": "Aluminum Fluoride",
        "formula": "AlF3",
        "ratio": {
            "Al": 1,
            "F": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Cs2O": {
        "product": "Cesium Oxide",
        "formula": "Cs2O",
        "ratio": {
            "Cs": 2,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2O": {
        "product": "Dicarbon Monoxide",
        "formula": "C2O",
        "ratio": {
            "C": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S4N2": {
        "product": "Tetrasulfur Dinitride",
        "formula": "S4N2",
        "ratio": {
            "S": 4,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PH3\u00b7BH3": {
        "product": "Phosphine Borane",
        "formula": "PH3\u00b7BH3",
        "ratio": {
            "P": 1,
            "H": 6,
            "B": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Fe(CO)5": {
        "product": "Iron Carbonyl",
        "formula": "Fe(CO)5",
        "ratio": {
            "Fe": 1,
            "C": 5,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C3HF6O": {
        "product": "Hexafluoroisopropanol",
        "formula": "C3HF6O",
        "ratio": {
            "C": 3,
            "H": 1,
            "F": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CHF3": {
        "product": "Fluoroform",
        "formula": "CHF3",
        "ratio": {
            "C": 1,
            "H": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2HCl3": {
        "product": "Trichloroethylene",
        "formula": "C2HCl3",
        "ratio": {
            "C": 2,
            "H": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NaClO2": {
        "product": "Sodium Chlorite",
        "formula": "NaClO2",
        "ratio": {
            "Na": 1,
            "Cl": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "P4O7": {
        "product": "Phosphorus Heptoxide",
        "formula": "P4O7",
        "ratio": {
            "P": 4,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li2(CO)4": {
        "product": "Dilithium Tetracarbonyl",
        "formula": "Li2(CO)4",
        "ratio": {
            "Li": 2,
            "C": 4,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "unstable"
    },
    "CH4N2O2S": {
        "product": "Thiourea Dioxide",
        "formula": "CH4N2O2S",
        "ratio": {
            "C": 1,
            "H": 4,
            "N": 2,
            "O": 2,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Be(OH)2": {
        "product": "Beryllium Hydroxide",
        "formula": "Be(OH)2",
        "ratio": {
            "Be": 1,
            "O": 2,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CaH2": {
        "product": "Calcium Hydride",
        "formula": "CaH2",
        "ratio": {
            "Ca": 1,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "OsO7": {
        "product": "Osmium Tetroxide Trioxide",
        "formula": "OsO7",
        "ratio": {
            "Os": 1,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C4H2": {
        "product": "Diacetylene",
        "formula": "C4H2",
        "ratio": {
            "C": 4,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4HF9O3S": {
        "product": "Perfluorobutanesulfonic Acid",
        "formula": "C4HF9O3S",
        "ratio": {
            "C": 4,
            "H": 1,
            "F": 9,
            "O": 3,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4H13NO": {
        "product": "Tetramethylammonium Hydroxide",
        "formula": "C4H13NO",
        "ratio": {
            "C": 4,
            "H": 13,
            "N": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "KO3": {
        "product": "Potassium Ozonide",
        "formula": "KO3",
        "ratio": {
            "K": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C4F6": {
        "product": "Hexafluoroisobutylene",
        "formula": "C4F6",
        "ratio": {
            "C": 4,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "XeF8": {
        "product": "Xenon Octafluoride",
        "formula": "XeF8",
        "ratio": {
            "Xe": 1,
            "F": 8
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Si5H12": {
        "product": "Pentasilane",
        "formula": "Si5H12",
        "ratio": {
            "Si": 5,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "S7": {
        "product": "Heptasulfur",
        "formula": "S7",
        "ratio": {
            "S": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na2Te": {
        "product": "Sodium Telluride",
        "formula": "Na2Te",
        "ratio": {
            "Na": 2,
            "Te": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "H3Si3O3": {
        "product": "Trisilanol",
        "formula": "H3Si3O3",
        "ratio": {
            "H": 3,
            "Si": 3,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Fe(ClO4)2": {
        "product": "Iron(II) Perchlorate",
        "formula": "Fe(ClO4)2",
        "ratio": {
            "Fe": 1,
            "Cl": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AlO4": {
        "product": "Tetraoxoaluminate",
        "formula": "AlO4",
        "ratio": {
            "Al": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "O3F2": {
        "product": "Ozone Difluoride",
        "formula": "O3F2",
        "ratio": {
            "O": 3,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2Cl2": {
        "product": "Dichloroacetylene",
        "formula": "C2Cl2",
        "ratio": {
            "C": 2,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Na3[Co(NO2)6]": {
        "product": "Sodium Cobaltinitrite",
        "formula": "Na3[Co(NO2)6]",
        "ratio": {
            "Na": 3,
            "Co": 1,
            "N": 6,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "O4": {
        "product": "Tetraoxygen",
        "formula": "O4",
        "ratio": {
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C5H12N2O4P": {
        "product": "Phosphoribosylamine",
        "formula": "C5H12N2O4P",
        "ratio": {
            "C": 5,
            "H": 12,
            "N": 2,
            "O": 4,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SiF4": {
        "product": "Silicon Tetrafluoride",
        "formula": "SiF4",
        "ratio": {
            "Si": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "XeOF4": {
        "product": "Perxenonyl Fluoride",
        "formula": "XeOF4",
        "ratio": {
            "Xe": 1,
            "O": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NaAsO2": {
        "product": "Sodium Arsenite",
        "formula": "NaAsO2",
        "ratio": {
            "Na": 1,
            "As": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "LiNO3": {
        "product": "Lithium Nitrate",
        "formula": "LiNO3",
        "ratio": {
            "Li": 1,
            "N": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(NH4)PF6": {
        "product": "Ammonium Hexafluorophosphate",
        "formula": "(NH4)PF6",
        "ratio": {
            "N": 1,
            "H": 4,
            "P": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H8MgO4": {
        "product": "Magnesium Acrylate",
        "formula": "C6H8MgO4",
        "ratio": {
            "C": 6,
            "H": 8,
            "Mg": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3H7KNO2": {
        "product": "Potassium Dimethylcarbamate",
        "formula": "C3H7KNO2",
        "ratio": {
            "C": 3,
            "H": 7,
            "K": 1,
            "N": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "OsF8": {
        "product": "Osium(VIII) Fluoride",
        "formula": "OsF8",
        "ratio": {
            "Os": 1,
            "F": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "H3+": {
        "product": "Trihydrogen Cation",
        "formula": "H3+",
        "ratio": {
            "H": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NaB(C6H5)4": {
        "product": "Sodium Tetraphenylborate",
        "formula": "NaB(C6H5)4",
        "ratio": {
            "Na": 1,
            "B": 1,
            "C": 24,
            "H": 20
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Si3H8": {
        "product": "Trisilane",
        "formula": "Si3H8",
        "ratio": {
            "Si": 3,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Cr(C2H3O2)2": {
        "product": "Chromous Acetate",
        "formula": "Cr(C2H3O2)2",
        "ratio": {
            "Cr": 1,
            "C": 4,
            "H": 6,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "P2O4": {
        "product": "Diphosphorus Tetraoxide",
        "formula": "P2O4",
        "ratio": {
            "P": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FeSO4\u00b7H2O": {
        "product": "Ferrous Sulfate Monohydrate",
        "formula": "FeSO4\u00b7H2O",
        "ratio": {
            "Fe": 1,
            "S": 1,
            "O": 5,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NaAlO2": {
        "product": "Sodium Aluminate",
        "formula": "NaAlO2",
        "ratio": {
            "Na": 1,
            "Al": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "BO": {
        "product": "Boron Monoxide",
        "formula": "BO",
        "ratio": {
            "B": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ca(CN)2": {
        "product": "Calcium Cyanide",
        "formula": "Ca(CN)2",
        "ratio": {
            "Ca": 1,
            "C": 2,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "TaF5": {
        "product": "Tantalum Pentafluoride",
        "formula": "TaF5",
        "ratio": {
            "Ta": 1,
            "F": 5
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "P2S6": {
        "product": "Diphosphorus Hexasulfide",
        "formula": "P2S6",
        "ratio": {
            "P": 2,
            "S": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "T2O": {
        "product": "Tritium Oxide",
        "formula": "T2O",
        "ratio": {
            "T": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "MnCl7": {
        "product": "Manganese Heptachloride",
        "formula": "MnCl7",
        "ratio": {
            "Mn": 1,
            "Cl": 7
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "US6": {
        "product": "Uranium Hexasulfide",
        "formula": "US6",
        "ratio": {
            "U": 1,
            "S": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CrF6": {
        "product": "Chromium(VI) Fluoride",
        "formula": "CrF6",
        "ratio": {
            "Cr": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "SOF2": {
        "product": "Thionyl Fluoride",
        "formula": "SOF2",
        "ratio": {
            "S": 1,
            "O": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "LiNH2": {
        "product": "Lithium Amide",
        "formula": "LiNH2",
        "ratio": {
            "Li": 1,
            "N": 1,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AgN3": {
        "product": "Silver Azide",
        "formula": "AgN3",
        "ratio": {
            "Ag": 1,
            "N": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Fe(C4H4)(CO)3": {
        "product": "Cyclobutadieneiron Tricarbonyl",
        "formula": "Fe(C4H4)(CO)3",
        "ratio": {
            "Fe": 1,
            "C": 7,
            "H": 4,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "P2N5": {
        "product": "Diphosphorus Pentanitride",
        "formula": "P2N5",
        "ratio": {
            "P": 2,
            "N": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "OCN-": {
        "product": "Cyanate Ion",
        "formula": "OCN-",
        "ratio": {
            "O": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "KSeCN": {
        "product": "Potassium Selenocyanate",
        "formula": "KSeCN",
        "ratio": {
            "K": 1,
            "Se": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "liquid"
    },
    "C22H8O4": {
        "product": "Graphyne Oxide",
        "formula": "C22H8O4",
        "ratio": {
            "C": 22,
            "H": 8,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "As4O6": {
        "product": "Tetraarsenic Hexoxide",
        "formula": "As4O6",
        "ratio": {
            "As": 4,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C10H10FeBF4": {
        "product": "Ferrocenium Tetrafluoroborate",
        "formula": "C10H10FeBF4",
        "ratio": {
            "C": 10,
            "H": 10,
            "Fe": 1,
            "B": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "TiSi2": {
        "product": "Titanium Silicide",
        "formula": "TiSi2",
        "ratio": {
            "Ti": 1,
            "Si": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Fe(NO3)3": {
        "product": "Iron(III) Nitrate",
        "formula": "Fe(NO3)3",
        "ratio": {
            "Fe": 1,
            "N": 3,
            "O": 9
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ag2C2O4": {
        "product": "Silver Oxalate",
        "formula": "Ag2C2O4",
        "ratio": {
            "Ag": 2,
            "C": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "CH": {
        "product": "Graphane",
        "formula": "CH",
        "ratio": {
            "C": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CNCl": {
        "product": "Cyanogen Chloride",
        "formula": "CNCl",
        "ratio": {
            "C": 1,
            "N": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "POS": {
        "product": "Phosphine Oxide Sulfide",
        "formula": "POS",
        "ratio": {
            "P": 1,
            "O": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C6H9AlO6": {
        "product": "Aluminum Acetate",
        "formula": "C6H9AlO6",
        "ratio": {
            "C": 6,
            "H": 9,
            "Al": 1,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Mg(BH4)2": {
        "product": "Magnesium Borohydride",
        "formula": "Mg(BH4)2",
        "ratio": {
            "Mg": 1,
            "B": 2,
            "H": 8
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ca5(PO4)3OH": {
        "product": "Hydroxyapatite",
        "formula": "Ca5(PO4)3OH",
        "ratio": {
            "Ca": 5,
            "P": 3,
            "O": 13,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "ZnSO4": {
        "product": "Zinc Sulfate",
        "formula": "ZnSO4",
        "ratio": {
            "Zn": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Al2(SO4)3": {
        "product": "Aluminum Sulfate",
        "formula": "Al2(SO4)3",
        "ratio": {
            "Al": 2,
            "S": 3,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "ZnCl2": {
        "product": "Zinc Chloride",
        "formula": "ZnCl2",
        "ratio": {
            "Zn": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "liquid"
    },
    "CfBr3": {
        "product": "Californium(III) Bromide",
        "formula": "CfBr3",
        "ratio": {
            "Cf": 1,
            "Br": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Fe3(PO4)2": {
        "product": "Iron(II) Phosphate",
        "formula": "Fe3(PO4)2",
        "ratio": {
            "Fe": 3,
            "P": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NH4C2Cl2O2": {
        "product": "Ammonium Dichloroacetate",
        "formula": "NH4C2Cl2O2",
        "ratio": {
            "N": 1,
            "H": 4,
            "C": 2,
            "Cl": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(CH3)2Hg": {
        "product": "Dimethyl Mercury",
        "formula": "(CH3)2Hg",
        "ratio": {
            "C": 2,
            "H": 6,
            "Hg": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "PuF5": {
        "product": "Plutonium Pentafluoride",
        "formula": "PuF5",
        "ratio": {
            "Pu": 1,
            "F": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C3H5N": {
        "product": "Ethyl Isocyanide",
        "formula": "C3H5N",
        "ratio": {
            "C": 3,
            "H": 5,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CH3SCl": {
        "product": "Methanesulfenyl Chloride",
        "formula": "CH3SCl",
        "ratio": {
            "C": 1,
            "H": 3,
            "S": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H4S": {
        "product": "Thiirane",
        "formula": "C2H4S",
        "ratio": {
            "C": 2,
            "H": 4,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "N6": {
        "product": "Hexazene",
        "formula": "N6",
        "ratio": {
            "N": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "FeO4^2-": {
        "product": "Ferrate Ion",
        "formula": "FeO4^2-",
        "ratio": {
            "Fe": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Pt(NH3)2Cl2": {
        "product": "Cisplatin",
        "formula": "Pt(NH3)2Cl2",
        "ratio": {
            "Pt": 1,
            "N": 2,
            "H": 6,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "K2[Ni(CN)4]": {
        "product": "Potassium Tetracyanonickelate",
        "formula": "K2[Ni(CN)4]",
        "ratio": {
            "K": 2,
            "Ni": 1,
            "C": 4,
            "N": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "OsCl4": {
        "product": "Osmium(IV) Chloride",
        "formula": "OsCl4",
        "ratio": {
            "Os": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na4Si4": {
        "product": "Sodium Silicide",
        "formula": "Na4Si4",
        "ratio": {
            "Na": 4,
            "Si": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Re2O7": {
        "product": "Dirhenium Heptoxide",
        "formula": "Re2O7",
        "ratio": {
            "Re": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P4Cl20": {
        "product": "Phosphorus Pentachloride Tetramer",
        "formula": "P4Cl20",
        "ratio": {
            "P": 4,
            "Cl": 20
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "LuF16": {
        "product": "Lutetium Hexadecafluoride",
        "formula": "LuF16",
        "ratio": {
            "Lu": 1,
            "F": 16
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HFe(CO)3": {
        "product": "Tricarbonyl Iron Hydride",
        "formula": "HFe(CO)3",
        "ratio": {
            "H": 1,
            "Fe": 1,
            "C": 3,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "TiB5": {
        "product": "Titanium Pentaboride",
        "formula": "TiB5",
        "ratio": {
            "Ti": 1,
            "B": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NSF3": {
        "product": "Thiazyl Trifluoride",
        "formula": "NSF3",
        "ratio": {
            "N": 1,
            "S": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NbCl5": {
        "product": "Niobium Pentachloride",
        "formula": "NbCl5",
        "ratio": {
            "Nb": 1,
            "Cl": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Mg(HS)2": {
        "product": "Magnesium Hydrosulfide",
        "formula": "Mg(HS)2",
        "ratio": {
            "Mg": 1,
            "H": 2,
            "S": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "H3PO": {
        "product": "Phosphine Sulfoxide",
        "formula": "H3PO",
        "ratio": {
            "P": 1,
            "H": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "MgBr4": {
        "product": "Magnesium Tetrabromide",
        "formula": "MgBr4",
        "ratio": {
            "Mg": 1,
            "Br": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3H2": {
        "product": "Cyclopropenylidene",
        "formula": "C3H2",
        "ratio": {
            "C": 3,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AgF": {
        "product": "Silver(I) Fluoride",
        "formula": "AgF",
        "ratio": {
            "Ag": 1,
            "F": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H6UO6": {
        "product": "Uranyl Acetate",
        "formula": "C4H6UO6",
        "ratio": {
            "C": 4,
            "H": 6,
            "U": 1,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "KNbO3": {
        "product": "Potassium Niobate",
        "formula": "KNbO3",
        "ratio": {
            "K": 1,
            "Nb": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C10H10FeCl": {
        "product": "Ferrocenium Chloride",
        "formula": "C10H10FeCl",
        "ratio": {
            "C": 10,
            "H": 10,
            "Fe": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C15H16O2": {
        "product": "Bisphenol A",
        "formula": "C15H16O2",
        "ratio": {
            "C": 15,
            "H": 16,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "TiCl4\u00b76H2O": {
        "product": "Titanium Tetrachloride Hydrate",
        "formula": "TiCl4\u00b76H2O",
        "ratio": {
            "Ti": 1,
            "Cl": 4,
            "H": 12,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AlH3": {
        "product": "Aluminum Hydride",
        "formula": "AlH3",
        "ratio": {
            "Al": 1,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "unstable"
    },
    "N4O8H2": {
        "product": "Tetranitrohydrazine",
        "formula": "N4O8H2",
        "ratio": {
            "N": 4,
            "O": 8,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Na3AsS4": {
        "product": "Sodium Thioarsenate",
        "formula": "Na3AsS4",
        "ratio": {
            "Na": 3,
            "As": 1,
            "S": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C7H7+": {
        "product": "Tropylium Ion",
        "formula": "C7H7+",
        "ratio": {
            "C": 7,
            "H": 7
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Li2": {
        "product": "Dilithium",
        "formula": "Li2",
        "ratio": {
            "Li": 2
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "C6(NO2)6": {
        "product": "Hexanitrobenzene",
        "formula": "C6(NO2)6",
        "ratio": {
            "C": 6,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CCl4S": {
        "product": "Thiotetrachloromethane",
        "formula": "CCl4S",
        "ratio": {
            "C": 1,
            "Cl": 4,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "B2O3": {
        "product": "Boron Trioxide",
        "formula": "B2O3",
        "ratio": {
            "B": 2,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HTcO4": {
        "product": "Pertechnetic Acid",
        "formula": "HTcO4",
        "ratio": {
            "H": 1,
            "Tc": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Zn3N2": {
        "product": "Zinc Nitride",
        "formula": "Zn3N2",
        "ratio": {
            "Zn": 3,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Cl2O2": {
        "product": "Dichlorine Dioxide",
        "formula": "Cl2O2",
        "ratio": {
            "Cl": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "KSCN": {
        "product": "Potassium Thiocyanate",
        "formula": "KSCN",
        "ratio": {
            "K": 1,
            "S": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C1O1": {
        "product": "Graphene Oxide",
        "formula": "C1O1",
        "ratio": {
            "C": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S4": {
        "product": "Tetrasulfur",
        "formula": "S4",
        "ratio": {
            "S": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CfBr6": {
        "product": "Californium Hexabromide",
        "formula": "CfBr6",
        "ratio": {
            "Cf": 1,
            "Br": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C6N7": {
        "product": "Heptazine",
        "formula": "C6N7",
        "ratio": {
            "C": 6,
            "N": 7
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "B12P2": {
        "product": "Boron Subphosphide",
        "formula": "B12P2",
        "ratio": {
            "B": 12,
            "P": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NaHS": {
        "product": "Sodium Hydrosulfide",
        "formula": "NaHS",
        "ratio": {
            "Na": 1,
            "H": 1,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "BP": {
        "product": "Boron Phosphide",
        "formula": "BP",
        "ratio": {
            "B": 1,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Li2C2O4": {
        "product": "Lithium Oxalate",
        "formula": "Li2C2O4",
        "ratio": {
            "Li": 2,
            "C": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Fe(CO)4": {
        "product": "Iron Tetracarbonyl",
        "formula": "Fe(CO)4",
        "ratio": {
            "Fe": 1,
            "C": 4,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H7NO2": {
        "product": "Ammonium Acetate",
        "formula": "C2H7NO2",
        "ratio": {
            "C": 2,
            "H": 7,
            "N": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BCl3": {
        "product": "Boron Trichloride",
        "formula": "BCl3",
        "ratio": {
            "B": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "N2F2": {
        "product": "Dinitrogen Difluoride",
        "formula": "N2F2",
        "ratio": {
            "N": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Nb2O5": {
        "product": "Niobium Pentoxide",
        "formula": "Nb2O5",
        "ratio": {
            "Nb": 2,
            "O": 5
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Zr(SO4)2": {
        "product": "Zirconium Sulfate",
        "formula": "Zr(SO4)2",
        "ratio": {
            "Zr": 1,
            "S": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H4O2": {
        "product": "Cyclobutane Dione",
        "formula": "C4H4O2",
        "ratio": {
            "C": 4,
            "H": 4,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "N2H5+": {
        "product": "Hydrazinium Ion",
        "formula": "N2H5+",
        "ratio": {
            "N": 2,
            "H": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "PSF3": {
        "product": "Thiophosphoryl Fluoride",
        "formula": "PSF3",
        "ratio": {
            "P": 1,
            "S": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "N(Si(CH3)3)3": {
        "product": "Tris(Trimethylsilyl)amine",
        "formula": "N(Si(CH3)3)3",
        "ratio": {
            "N": 1,
            "Si": 3,
            "C": 9,
            "H": 27
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C10H8": {
        "product": "Naphthalene",
        "formula": "C10H8",
        "ratio": {
            "C": 10,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NH2Cl": {
        "product": "Chloramine",
        "formula": "NH2Cl",
        "ratio": {
            "N": 1,
            "H": 2,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KBr": {
        "product": "Potassium Bromide",
        "formula": "KBr",
        "ratio": {
            "K": 1,
            "Br": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C9H18O6": {
        "product": "Triacetone Triperoxide",
        "formula": "C9H18O6",
        "ratio": {
            "C": 9,
            "H": 18,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CH3ONa": {
        "product": "Sodium Methoxide",
        "formula": "CH3ONa",
        "ratio": {
            "C": 1,
            "H": 3,
            "O": 1,
            "Na": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "K2FeO4": {
        "product": "Potassium Ferrate",
        "formula": "K2FeO4",
        "ratio": {
            "K": 2,
            "Fe": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BBr3O": {
        "product": "Boron Tribromide Monoxide",
        "formula": "BBr3O",
        "ratio": {
            "B": 1,
            "Br": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "OsO3F": {
        "product": "Osmium Trioxide Fluoride",
        "formula": "OsO3F",
        "ratio": {
            "Os": 1,
            "O": 3,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C4H10Zn": {
        "product": "Diethylzinc",
        "formula": "C4H10Zn",
        "ratio": {
            "C": 4,
            "H": 10,
            "Zn": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P4N5": {
        "product": "Tetraphosphorus Pentanitride",
        "formula": "P4N5",
        "ratio": {
            "P": 4,
            "N": 5
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C26H26": {
        "product": "Hexaphenylethane",
        "formula": "C26H26",
        "ratio": {
            "C": 26,
            "H": 26
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C5H5P": {
        "product": "Phosphorine",
        "formula": "C5H5P",
        "ratio": {
            "C": 5,
            "H": 5,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CfB6": {
        "product": "Californium Boride",
        "formula": "CfB6",
        "ratio": {
            "Cf": 1,
            "B": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "B10H14": {
        "product": "Decaborane",
        "formula": "B10H14",
        "ratio": {
            "B": 10,
            "H": 14
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3H4O": {
        "product": "Cyclopropanone",
        "formula": "C3H4O",
        "ratio": {
            "C": 3,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C10H10Ru": {
        "product": "Ruthenocene",
        "formula": "C10H10Ru",
        "ratio": {
            "C": 10,
            "H": 10,
            "Ru": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3O": {
        "product": "Tricarbon monoxide",
        "formula": "C3O",
        "ratio": {
            "C": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "MgB2O4": {
        "product": "Magnesium Borate",
        "formula": "MgB2O4",
        "ratio": {
            "Mg": 1,
            "B": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CFO2": {
        "product": "Fluoroformate",
        "formula": "CFO2",
        "ratio": {
            "C": 1,
            "F": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P4Se3": {
        "product": "Tetraphosphorus Triselenide",
        "formula": "P4Se3",
        "ratio": {
            "P": 4,
            "Se": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "O2^2-": {
        "product": "Peroxide Ion",
        "formula": "O2^2-",
        "ratio": {
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(NH4)2[PtCl6]": {
        "product": "Ammonium Hexachloroplatinate",
        "formula": "(NH4)2[PtCl6]",
        "ratio": {
            "N": 2,
            "H": 8,
            "Pt": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "[Co(en)3]Cl3": {
        "product": "Tris(ethylenediamine)cobalt(III) Chloride",
        "formula": "[Co(en)3]Cl3",
        "ratio": {
            "Co": 1,
            "C": 6,
            "H": 24,
            "Cl": 3,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H6O3": {
        "product": "Hydroxymethylfurfural",
        "formula": "C6H6O3",
        "ratio": {
            "C": 6,
            "H": 6,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ca(NH4)2(SO3)2": {
        "product": "Calcium Ammonium Sulfite",
        "formula": "Ca(NH4)2(SO3)2",
        "ratio": {
            "Ca": 1,
            "N": 2,
            "H": 8,
            "S": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Na2B4O7\u00b710H2O": {
        "product": "Disodium Tetraborate Decahydrate",
        "formula": "Na2B4O7\u00b710H2O",
        "ratio": {
            "Na": 2,
            "B": 4,
            "O": 17,
            "H": 20
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PBr3": {
        "product": "Phosporous Tribromide",
        "formula": "PBr3",
        "ratio": {
            "P": 1,
            "Br": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Fe(SCN)3": {
        "product": "Iron(III) Thiocyanate",
        "formula": "Fe(SCN)3",
        "ratio": {
            "Fe": 1,
            "S": 3,
            "C": 3,
            "N": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C4H6": {
        "product": "Cyclobutene",
        "formula": "C4H6",
        "ratio": {
            "C": 4,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Na2SeO4": {
        "product": "Sodium Selenate",
        "formula": "Na2SeO4",
        "ratio": {
            "Na": 2,
            "Se": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SClF5": {
        "product": "Sulfur Chloride Pentafluoride",
        "formula": "SClF5",
        "ratio": {
            "S": 1,
            "Cl": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PH2Cl": {
        "product": "Phosphenium Chloride",
        "formula": "PH2Cl",
        "ratio": {
            "P": 1,
            "H": 2,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Fe(NO)2": {
        "product": "Dinitrosyl Iron Complex",
        "formula": "Fe(NO)2",
        "ratio": {
            "Fe": 1,
            "N": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C5H6": {
        "product": "Cyclopentyne",
        "formula": "C5H6",
        "ratio": {
            "C": 5,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CfOCl": {
        "product": "Californium Oxychloride",
        "formula": "CfOCl",
        "ratio": {
            "Cf": 1,
            "O": 1,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "PaCl4": {
        "product": "Protoactinium Tetrachloride",
        "formula": "PaCl4",
        "ratio": {
            "Pa": 1,
            "Cl": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C24H20PBr": {
        "product": "Tetraphenylphosphonium Bromide",
        "formula": "C24H20PBr",
        "ratio": {
            "C": 24,
            "H": 20,
            "P": 1,
            "Br": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CH2Si": {
        "product": "Silaethyne",
        "formula": "CH2Si",
        "ratio": {
            "C": 1,
            "H": 2,
            "Si": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C27H44N7O19P3S": {
        "product": "Hydroxymethylglutaryl-CoA",
        "formula": "C27H44N7O19P3S",
        "ratio": {
            "C": 27,
            "H": 44,
            "N": 7,
            "O": 19,
            "P": 3,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C18H15N": {
        "product": "Triphenylamine",
        "formula": "C18H15N",
        "ratio": {
            "C": 18,
            "H": 15,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C7H3N6O12": {
        "product": "Hexanitrobenzyl Alcohol",
        "formula": "C7H3N6O12",
        "ratio": {
            "C": 7,
            "H": 3,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "BF3\u00b7CH3OH": {
        "product": "Boron Trifluoride Methanol Complex",
        "formula": "BF3\u00b7CH3OH",
        "ratio": {
            "B": 1,
            "F": 3,
            "C": 1,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "H2S2O8": {
        "product": "Peroxydisulfuric Acid",
        "formula": "H2S2O8",
        "ratio": {
            "H": 2,
            "S": 2,
            "O": 8
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na2SiF6": {
        "product": "Sodium Hexafluorosilicate",
        "formula": "Na2SiF6",
        "ratio": {
            "Na": 2,
            "Si": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CrO3\u00b72H2O": {
        "product": "Chromium Trioxide Dihydrate",
        "formula": "CrO3\u00b72H2O",
        "ratio": {
            "Cr": 1,
            "O": 5,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KH": {
        "product": "Potassium Hydride",
        "formula": "KH",
        "ratio": {
            "K": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C9H7NO": {
        "product": "Hydroxyquinoline",
        "formula": "C9H7NO",
        "ratio": {
            "C": 9,
            "H": 7,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KFeO2": {
        "product": "Potassium Ferrite",
        "formula": "KFeO2",
        "ratio": {
            "K": 1,
            "Fe": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CF3OF": {
        "product": "Trifluoromethylhypofluorite",
        "formula": "CF3OF",
        "ratio": {
            "C": 1,
            "F": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Re2(CO)10": {
        "product": "Dirhenium Decacarbonyl",
        "formula": "Re2(CO)10",
        "ratio": {
            "Re": 2,
            "C": 10,
            "O": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3H2F4": {
        "product": "Hydrofluoroolefin",
        "formula": "C3H2F4",
        "ratio": {
            "C": 3,
            "H": 2,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "PH4Br": {
        "product": "Phosphonium Bromide",
        "formula": "PH4Br",
        "ratio": {
            "P": 1,
            "H": 4,
            "Br": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C8H20IN": {
        "product": "Tetraethylammonium Iodide",
        "formula": "C8H20IN",
        "ratio": {
            "C": 8,
            "H": 20,
            "I": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CsAu": {
        "product": "Cesium Auride",
        "formula": "CsAu",
        "ratio": {
            "Cs": 1,
            "Au": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Cr2O3": {
        "product": "Chromium Sesquioxide",
        "formula": "Cr2O3",
        "ratio": {
            "Cr": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PtO2": {
        "product": "Platinum(IV) Oxide",
        "formula": "PtO2",
        "ratio": {
            "Pt": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ti(SO4)2": {
        "product": "Titanium(IV) Sulfate",
        "formula": "Ti(SO4)2",
        "ratio": {
            "Ti": 1,
            "S": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "N2O6": {
        "product": "Dinitrogen Hexoxide",
        "formula": "N2O6",
        "ratio": {
            "N": 2,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S6O3": {
        "product": "Hexasulfur Trioxide",
        "formula": "S6O3",
        "ratio": {
            "S": 6,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CrCl5": {
        "product": "Chromium Pentachloride",
        "formula": "CrCl5",
        "ratio": {
            "Cr": 1,
            "Cl": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C5O2": {
        "product": "Pentacarbon Dioxide",
        "formula": "C5O2",
        "ratio": {
            "C": 5,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "H3N": {
        "product": "Trihydrogen Mononitride",
        "formula": "H3N",
        "ratio": {
            "H": 3,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H4O": {
        "product": "Graphene Oxide Quantum Dots",
        "formula": "C6H4O",
        "ratio": {
            "C": 6,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PxOy": {
        "product": "Phosphorene Oxide Nanosheet",
        "formula": "PxOy",
        "ratio": {
            "P": 12,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "SiClF3": {
        "product": "Chlorotrifluorosilane",
        "formula": "SiClF3",
        "ratio": {
            "Si": 1,
            "Cl": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ne2": {
        "product": "Diatomic Neon",
        "formula": "Ne2",
        "ratio": {
            "Ne": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2O6^-2": {
        "product": "Peroxidicarbonate",
        "formula": "C2O6^-2",
        "ratio": {
            "C": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "(NH4)2S2O8": {
        "product": "Ammonium Persulfate",
        "formula": "(NH4)2S2O8",
        "ratio": {
            "N": 2,
            "H": 8,
            "S": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "H2NSO2NH2": {
        "product": "Sulfurylamide",
        "formula": "H2NSO2NH2",
        "ratio": {
            "H": 4,
            "N": 2,
            "S": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3S": {
        "product": "Tricarbon Sulfide",
        "formula": "C3S",
        "ratio": {
            "C": 3,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "K2NiF6": {
        "product": "Potassium Hexafluoronickelate(IV)",
        "formula": "K2NiF6",
        "ratio": {
            "K": 2,
            "Ni": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2N4": {
        "product": "Cyanogen Azide",
        "formula": "C2N4",
        "ratio": {
            "C": 2,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "BHCl3": {
        "product": "Boron Trichloride Hydrogen Complex",
        "formula": "BHCl3",
        "ratio": {
            "B": 1,
            "H": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3N4": {
        "product": "Carbon Subnitride",
        "formula": "C3N4",
        "ratio": {
            "C": 3,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Th(NO3)4": {
        "product": "Thorium Nitrate",
        "formula": "Th(NO3)4",
        "ratio": {
            "Th": 1,
            "N": 4,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CsClO3": {
        "product": "Cesium Chlorate",
        "formula": "CsClO3",
        "ratio": {
            "Cs": 1,
            "Cl": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "XeF5+": {
        "product": "XeF5+",
        "formula": "XeF5+",
        "ratio": {
            "Xe": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cl2O4": {
        "product": "Chlorine Tetroxide",
        "formula": "Cl2O4",
        "ratio": {
            "Cl": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Mg2Si": {
        "product": "Magnesium Silicide",
        "formula": "Mg2Si",
        "ratio": {
            "Mg": 2,
            "Si": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "B2H2": {
        "product": "Diborene",
        "formula": "B2H2",
        "ratio": {
            "B": 2,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Fe3C": {
        "product": "Iron Carbide",
        "formula": "Fe3C",
        "ratio": {
            "Fe": 3,
            "C": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "Ca(OH)Cl": {
        "product": "Calcium Hydroxychloride",
        "formula": "Ca(OH)Cl",
        "ratio": {
            "Ca": 1,
            "O": 1,
            "H": 1,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HNO": {
        "product": "Nitrosyl Hydride",
        "formula": "HNO",
        "ratio": {
            "H": 1,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FePO4": {
        "product": "Iron(III) Phosphate",
        "formula": "FePO4",
        "ratio": {
            "Fe": 1,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6I6": {
        "product": "Hexaiodobenzene",
        "formula": "C6I6",
        "ratio": {
            "C": 6,
            "I": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "POCl5": {
        "product": "Phosphorus Pentachloride Monoxide",
        "formula": "POCl5",
        "ratio": {
            "P": 1,
            "O": 1,
            "Cl": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H4O3": {
        "product": "Pyruvic Acid",
        "formula": "C3H4O3",
        "ratio": {
            "C": 3,
            "H": 4,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "SiHCl3": {
        "product": "Trichlorosilane",
        "formula": "SiHCl3",
        "ratio": {
            "Si": 1,
            "H": 1,
            "Cl": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "GaAs": {
        "product": "Gallium Arsenide",
        "formula": "GaAs",
        "ratio": {
            "Ga": 1,
            "As": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NH4COONH2": {
        "product": "Ammonium Carbamate",
        "formula": "NH4COONH2",
        "ratio": {
            "N": 2,
            "H": 6,
            "C": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H10O3": {
        "product": "Claisen Condensation Product",
        "formula": "C6H10O3",
        "ratio": {
            "C": 6,
            "H": 10,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C4H4Fe(CO)3": {
        "product": "Cyclobutadieneiron Tricarbonyl",
        "formula": "C4H4Fe(CO)3",
        "ratio": {
            "C": 7,
            "H": 4,
            "Fe": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C5H5NHCrO3Cl": {
        "product": "Pyridinium Chlorochromate",
        "formula": "C5H5NHCrO3Cl",
        "ratio": {
            "C": 5,
            "H": 6,
            "N": 1,
            "Cr": 1,
            "O": 3,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "N2H6ClO4": {
        "product": "Hydrazinium Perchlorate",
        "formula": "N2H6ClO4",
        "ratio": {
            "N": 2,
            "H": 6,
            "Cl": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Si(C2H5O)4": {
        "product": "Tetraethyl Orthosilicate",
        "formula": "Si(C2H5O)4",
        "ratio": {
            "Si": 1,
            "C": 8,
            "H": 20,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "N2H5[CoCl4]": {
        "product": "Hydrazinium Tetrachlorocobaltate",
        "formula": "N2H5[CoCl4]",
        "ratio": {
            "N": 2,
            "H": 5,
            "Co": 1,
            "Cl": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4F8": {
        "product": "Perfluorocyclobutane",
        "formula": "C4F8",
        "ratio": {
            "C": 4,
            "F": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ArCl": {
        "product": "Argon Chloride",
        "formula": "ArCl",
        "ratio": {
            "Ar": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cl2O5": {
        "product": "Chlorine Pentoxide",
        "formula": "Cl2O5",
        "ratio": {
            "Cl": 2,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Pd(NO3)4": {
        "product": "Tetranitratopalladate(II)",
        "formula": "Pd(NO3)4",
        "ratio": {
            "Pd": 1,
            "N": 4,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ca(MnO4)2": {
        "product": "Calcium Permanganate",
        "formula": "Ca(MnO4)2",
        "ratio": {
            "Ca": 1,
            "Mn": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3H7NO2": {
        "product": "Sarcosine",
        "formula": "C3H7NO2",
        "ratio": {
            "C": 3,
            "H": 7,
            "N": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CH3SO2Cl": {
        "product": "Methanesulfonyl Chloride",
        "formula": "CH3SO2Cl",
        "ratio": {
            "C": 1,
            "H": 3,
            "S": 1,
            "O": 2,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "LuTaO4": {
        "product": "Lutetium Tantalate",
        "formula": "LuTaO4",
        "ratio": {
            "Lu": 1,
            "Ta": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2HCl3Si": {
        "product": "Trichlorosilylacetylene",
        "formula": "C2HCl3Si",
        "ratio": {
            "C": 2,
            "H": 1,
            "Cl": 3,
            "Si": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "P8H10": {
        "product": "Octaphosphane",
        "formula": "P8H10",
        "ratio": {
            "P": 8,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CCl2NO": {
        "product": "Phosgene Oxime",
        "formula": "CCl2NO",
        "ratio": {
            "C": 1,
            "Cl": 2,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "As4S4": {
        "product": "Tetraarsenic Tetrasulfide",
        "formula": "As4S4",
        "ratio": {
            "As": 4,
            "S": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C24H12": {
        "product": "Graphdiyne",
        "formula": "C24H12",
        "ratio": {
            "C": 24,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C5H11N2O4P": {
        "product": "Phosphoribosylamine",
        "formula": "C5H11N2O4P",
        "ratio": {
            "C": 5,
            "H": 11,
            "N": 2,
            "O": 4,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ag2C2": {
        "product": "Silver Acetylide",
        "formula": "Ag2C2",
        "ratio": {
            "Ag": 2,
            "C": 2
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C3H6O2": {
        "product": "Hydroxyacetone",
        "formula": "C3H6O2",
        "ratio": {
            "C": 3,
            "H": 6,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Hg(CNO)2": {
        "product": "Mercury(II) Fulminate",
        "formula": "Hg(CNO)2",
        "ratio": {
            "Hg": 1,
            "C": 2,
            "N": 2,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "PH4I": {
        "product": "Phosphonium Iodide",
        "formula": "PH4I",
        "ratio": {
            "P": 1,
            "H": 4,
            "I": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "MgCO3": {
        "product": "Magnesium Carbonate",
        "formula": "MgCO3",
        "ratio": {
            "Mg": 1,
            "C": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "KNH2": {
        "product": "Potassium Amide",
        "formula": "KNH2",
        "ratio": {
            "K": 1,
            "N": 1,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C5HF6O2": {
        "product": "Hexafluoroacetylacetone",
        "formula": "C5HF6O2",
        "ratio": {
            "C": 5,
            "H": 1,
            "F": 6,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C4H6MnO4": {
        "product": "Manganese Acetate",
        "formula": "C4H6MnO4",
        "ratio": {
            "C": 4,
            "H": 6,
            "Mn": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Hg2F2": {
        "product": "Mercurous Fluoride",
        "formula": "Hg2F2",
        "ratio": {
            "Hg": 2,
            "F": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CrO2F2": {
        "product": "Chromyl Fluoride",
        "formula": "CrO2F2",
        "ratio": {
            "Cr": 1,
            "O": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C5H5N5O\u00b7H2O": {
        "product": "Guanoine Hydrate",
        "formula": "C5H5N5O\u00b7H2O",
        "ratio": {
            "C": 5,
            "H": 7,
            "N": 5,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3Cl": {
        "product": "Tricarbon Monochloride",
        "formula": "C3Cl",
        "ratio": {
            "C": 3,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "B6O": {
        "product": "Boron Suboxide",
        "formula": "B6O",
        "ratio": {
            "B": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H2O": {
        "product": "Graphene Oxide Quantum Dot",
        "formula": "C6H2O",
        "ratio": {
            "C": 6,
            "H": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CSeO": {
        "product": "Carbonyl Selenide",
        "formula": "CSeO",
        "ratio": {
            "C": 1,
            "Se": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4H5As": {
        "product": "Arsole",
        "formula": "C4H5As",
        "ratio": {
            "C": 4,
            "H": 5,
            "As": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H6N2O2": {
        "product": "Cupferron",
        "formula": "C6H6N2O2",
        "ratio": {
            "C": 6,
            "H": 6,
            "N": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "UO2(NO3)2": {
        "product": "Uranyl Nitrate",
        "formula": "UO2(NO3)2",
        "ratio": {
            "U": 1,
            "O": 6,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C16H10": {
        "product": "Pyrene",
        "formula": "C16H10",
        "ratio": {
            "C": 16,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4F9NH2": {
        "product": "Perfluorobutylamine",
        "formula": "C4F9NH2",
        "ratio": {
            "C": 4,
            "F": 9,
            "N": 1,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "I3-": {
        "product": "Triiodide Ion",
        "formula": "I3-",
        "ratio": {
            "I": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Cr(H2O)6": {
        "product": "Chromium Hexahydrate",
        "formula": "Cr(H2O)6",
        "ratio": {
            "Cr": 1,
            "H": 12,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "LiBH3": {
        "product": "Lithium Trihydroborate",
        "formula": "LiBH3",
        "ratio": {
            "Li": 1,
            "B": 1,
            "H": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "N2S4": {
        "product": "Dinitrogen Tetrasulfide",
        "formula": "N2S4",
        "ratio": {
            "N": 2,
            "S": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cr2O3S": {
        "product": "Chromium Sesquioxide Monosulfide",
        "formula": "Cr2O3S",
        "ratio": {
            "Cr": 2,
            "O": 3,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "GaF3": {
        "product": "Gallium Trifluoride",
        "formula": "GaF3",
        "ratio": {
            "Ga": 1,
            "F": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SF5S": {
        "product": "Sulfur Hexafluoride Monosulfide",
        "formula": "SF5S",
        "ratio": {
            "S": 2,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FmF4": {
        "product": "Fermium Tetrafluoride",
        "formula": "FmF4",
        "ratio": {
            "Fm": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Mg(SH)6": {
        "product": "Magnesium Hexahydrosulfide",
        "formula": "Mg(SH)6",
        "ratio": {
            "Mg": 1,
            "S": 6,
            "H": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CS3": {
        "product": "Carbon Trisulphide",
        "formula": "CS3",
        "ratio": {
            "C": 1,
            "S": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "BF7": {
        "product": "Boron Heptafluoride",
        "formula": "BF7",
        "ratio": {
            "B": 1,
            "F": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Si2H6": {
        "product": "Disilane",
        "formula": "Si2H6",
        "ratio": {
            "Si": 2,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(NH4)2SiF6": {
        "product": "Ammonium Hexafluorosilicate",
        "formula": "(NH4)2SiF6",
        "ratio": {
            "N": 2,
            "H": 8,
            "Si": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H8O4": {
        "product": "Erythrose",
        "formula": "C4H8O4",
        "ratio": {
            "C": 4,
            "H": 8,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SOBr2": {
        "product": "Thionyl Bromide",
        "formula": "SOBr2",
        "ratio": {
            "S": 1,
            "O": 1,
            "Br": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "XeOCl2": {
        "product": "Xenon Oxychloride",
        "formula": "XeOCl2",
        "ratio": {
            "Xe": 1,
            "O": 1,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CfCl2": {
        "product": "Californium Dichloride",
        "formula": "CfCl2",
        "ratio": {
            "Cf": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HIO": {
        "product": "Hypoiodous Acid",
        "formula": "HIO",
        "ratio": {
            "H": 1,
            "I": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Be3N2": {
        "product": "Beryllium Nitride",
        "formula": "Be3N2",
        "ratio": {
            "Be": 3,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NO2ClO4": {
        "product": "Nitryl Perchlorate",
        "formula": "NO2ClO4",
        "ratio": {
            "N": 1,
            "O": 6,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C5H10O14P3": {
        "product": "Phosphoribosyl Pyrophosphate (PRPP)",
        "formula": "C5H10O14P3",
        "ratio": {
            "C": 5,
            "H": 10,
            "O": 14,
            "P": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ca(ClO3)2": {
        "product": "Calcium Chlorate",
        "formula": "Ca(ClO3)2",
        "ratio": {
            "Ca": 1,
            "Cl": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CH2N4": {
        "product": "Tetrazole",
        "formula": "CH2N4",
        "ratio": {
            "C": 1,
            "H": 2,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cu(N3)2": {
        "product": "Copper Azide",
        "formula": "Cu(N3)2",
        "ratio": {
            "Cu": 1,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Ga(NO3)3": {
        "product": "Gallium Nitrate",
        "formula": "Ga(NO3)3",
        "ratio": {
            "Ga": 1,
            "N": 3,
            "O": 9
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C12H6N6O12": {
        "product": "Hexanitrodiphenylamine",
        "formula": "C12H6N6O12",
        "ratio": {
            "C": 12,
            "H": 6,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C7H8O3": {
        "product": "Trihydroxytoluene",
        "formula": "C7H8O3",
        "ratio": {
            "C": 7,
            "H": 8,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CaS2O4": {
        "product": "Calcium Dithionite",
        "formula": "CaS2O4",
        "ratio": {
            "Ca": 1,
            "S": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C24H20AsCl": {
        "product": "Tetraphenylarsonium Chloride",
        "formula": "C24H20AsCl",
        "ratio": {
            "C": 24,
            "H": 20,
            "As": 1,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "KBrO3": {
        "product": "Potassium Bromate",
        "formula": "KBrO3",
        "ratio": {
            "K": 1,
            "Br": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "oxidizing"
    },
    "Xe[NiF6]": {
        "product": "Xenon Hexafluoronickelate(II)",
        "formula": "Xe[NiF6]",
        "ratio": {
            "Xe": 1,
            "Ni": 1,
            "F": 6
        },
        "type": "Coordination Complex",
        "behavior": "stable"
    },
    "PBr4": {
        "product": "Phosphorus Tetrabromide",
        "formula": "PBr4",
        "ratio": {
            "P": 1,
            "Br": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na2CN2": {
        "product": "Sodium Cyanamide",
        "formula": "Na2CN2",
        "ratio": {
            "Na": 2,
            "C": 1,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H4N2O2S": {
        "product": "Thiobarbituric Acid",
        "formula": "C4H4N2O2S",
        "ratio": {
            "C": 4,
            "H": 4,
            "N": 2,
            "O": 2,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NH4Br": {
        "product": "Ammonium Bromide",
        "formula": "NH4Br",
        "ratio": {
            "N": 1,
            "H": 4,
            "Br": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H6O2S": {
        "product": "Dimethylsulfone",
        "formula": "C2H6O2S",
        "ratio": {
            "C": 2,
            "H": 6,
            "O": 2,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NaBO3": {
        "product": "Sodium Perborate",
        "formula": "NaBO3",
        "ratio": {
            "Na": 1,
            "B": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2^2-": {
        "product": "Carbide Ion",
        "formula": "C2^2-",
        "ratio": {
            "C": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "PuC2": {
        "product": "Plutonium Dicarbide",
        "formula": "PuC2",
        "ratio": {
            "Pu": 1,
            "C": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CPO\u2212": {
        "product": "Phosphaethynolate",
        "formula": "CPO\u2212",
        "ratio": {
            "C": 1,
            "P": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "BH2NO2": {
        "product": "Borohydroxamic Acid",
        "formula": "BH2NO2",
        "ratio": {
            "B": 1,
            "H": 2,
            "N": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C3N2": {
        "product": "Dicyanocarbene",
        "formula": "C3N2",
        "ratio": {
            "C": 3,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S4N2O": {
        "product": "Tetrasulfur Dinitride Oxide",
        "formula": "S4N2O",
        "ratio": {
            "S": 4,
            "N": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "XeF2\u00b7nH2O": {
        "product": "Xenon Difluoride Hydrate",
        "formula": "XeF2\u00b7nH2O",
        "ratio": {
            "Xe": 1,
            "F": 2,
            "H": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "AlH2O2": {
        "product": "Aluminum Dihydroxide Peroxide",
        "formula": "AlH2O2",
        "ratio": {
            "Al": 1,
            "H": 2,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "ArF": {
        "product": "Argon Fluoride",
        "formula": "ArF",
        "ratio": {
            "Ar": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "LiO2": {
        "product": "Lithium Superoxide",
        "formula": "LiO2",
        "ratio": {
            "Li": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "AlCl3\u00b76H2O": {
        "product": "Aluminum Chloride Hexahydrate",
        "formula": "AlCl3\u00b76H2O",
        "ratio": {
            "Al": 1,
            "Cl": 3,
            "H": 12,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NF3": {
        "product": "Nitrogen Trifluoride",
        "formula": "NF3",
        "ratio": {
            "N": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C12H28O4Ti": {
        "product": "Titanium Tetraisopropylate",
        "formula": "C12H28O4Ti",
        "ratio": {
            "C": 12,
            "H": 28,
            "O": 4,
            "Ti": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "ClFO3": {
        "product": "Chlorine Trifluoride Oxide",
        "formula": "ClFO3",
        "ratio": {
            "Cl": 1,
            "F": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H12NO": {
        "product": "Tetramethylammonium Hydroxide",
        "formula": "C4H12NO",
        "ratio": {
            "C": 4,
            "H": 12,
            "N": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "liquid"
    },
    "BBr3\u00b7NH3": {
        "product": "Boron Tribromide Ammonia Complex",
        "formula": "BBr3\u00b7NH3",
        "ratio": {
            "B": 1,
            "Br": 3,
            "N": 1,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NaBF4": {
        "product": "Sodium Tetrafluoroborate",
        "formula": "NaBF4",
        "ratio": {
            "Na": 1,
            "B": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Mg(C5H7O2)2": {
        "product": "Magnesium Acetylacetonate",
        "formula": "Mg(C5H7O2)2",
        "ratio": {
            "Mg": 1,
            "C": 10,
            "H": 14,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AsF5": {
        "product": "Arsenic Pentafluoride",
        "formula": "AsF5",
        "ratio": {
            "As": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CaCNO": {
        "product": "Calcium Cyanate",
        "formula": "CaCNO",
        "ratio": {
            "Ca": 1,
            "C": 1,
            "N": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Fe(C5H7O2)3": {
        "product": "Tris(acetylacetonato)iron(III)",
        "formula": "Fe(C5H7O2)3",
        "ratio": {
            "Fe": 1,
            "C": 15,
            "H": 21,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "(NH4)3P": {
        "product": "Ammonium Phosphide",
        "formula": "(NH4)3P",
        "ratio": {
            "N": 3,
            "H": 12,
            "P": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Cu2C2": {
        "product": "Copper Acetylide",
        "formula": "Cu2C2",
        "ratio": {
            "Cu": 2,
            "C": 2
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "P2F2": {
        "product": "Diphosphine Difluoride",
        "formula": "P2F2",
        "ratio": {
            "P": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NaC2H": {
        "product": "Sodium Acetylide",
        "formula": "NaC2H",
        "ratio": {
            "Na": 1,
            "C": 2,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "(C2H5)2S": {
        "product": "Diethyl Sulfide",
        "formula": "(C2H5)2S",
        "ratio": {
            "C": 4,
            "H": 10,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "P2Se5": {
        "product": "Phosphine Selenide",
        "formula": "P2Se5",
        "ratio": {
            "P": 2,
            "Se": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "RSNH2": {
        "product": "Sulfenamide",
        "formula": "RSNH2",
        "ratio": {
            "R": 1,
            "S": 1,
            "N": 1,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ca2ClP": {
        "product": "Calcium Chlorophosphate",
        "formula": "Ca2ClP",
        "ratio": {
            "Ca": 2,
            "Cl": 1,
            "P": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "VC": {
        "product": "Vanadium Carbide",
        "formula": "VC",
        "ratio": {
            "V": 1,
            "C": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "C3S2": {
        "product": "Tricarbon Disulfide",
        "formula": "C3S2",
        "ratio": {
            "C": 3,
            "S": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cr(OH)3": {
        "product": "Chromium(III) Hydroxide",
        "formula": "Cr(OH)3",
        "ratio": {
            "Cr": 1,
            "O": 3,
            "H": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "LiClO4": {
        "product": "Lithium Perchlorate",
        "formula": "LiClO4",
        "ratio": {
            "Li": 1,
            "Cl": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "H3OCl": {
        "product": "Hydronium Chloride",
        "formula": "H3OCl",
        "ratio": {
            "H": 3,
            "O": 1,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Cl2O6": {
        "product": "Dichlorine Hexoxide",
        "formula": "Cl2O6",
        "ratio": {
            "Cl": 2,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Fe(C2H3O2)3": {
        "product": "Iron(III) Acetate",
        "formula": "Fe(C2H3O2)3",
        "ratio": {
            "Fe": 1,
            "C": 6,
            "H": 9,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "KF": {
        "product": "Potassium Fluoride",
        "formula": "KF",
        "ratio": {
            "K": 1,
            "F": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SCl4": {
        "product": "Sulfur Tetrachloride",
        "formula": "SCl4",
        "ratio": {
            "S": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "ThBr4": {
        "product": "Thorium Tetrabromide",
        "formula": "ThBr4",
        "ratio": {
            "Th": 1,
            "Br": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "2Mg + O2 -> 2MgO": {
        "product": "Burning Magnesium",
        "formula": "2Mg + O2 -> 2MgO",
        "ratio": {
            "Mg": 2,
            "O": 2
        },
        "type": "Metallic",
        "behavior": "reactive"
    },
    "SCl6": {
        "product": "Sulfur Hexachloride",
        "formula": "SCl6",
        "ratio": {
            "S": 1,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PH+": {
        "product": "Phosphenium",
        "formula": "PH+",
        "ratio": {
            "P": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CH(CN)3": {
        "product": "Cyanoform",
        "formula": "CH(CN)3",
        "ratio": {
            "C": 4,
            "H": 1,
            "N": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NH4ReO4": {
        "product": "Ammonium Perrhenate",
        "formula": "NH4ReO4",
        "ratio": {
            "N": 1,
            "H": 4,
            "Re": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C10H14N5O10P2": {
        "product": "Phosphoribosyladenosine Diphosphate (PRADP)",
        "formula": "C10H14N5O10P2",
        "ratio": {
            "C": 10,
            "H": 14,
            "N": 5,
            "O": 10,
            "P": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C2F4": {
        "product": "Polytetrafluoroethylene Monomer",
        "formula": "C2F4",
        "ratio": {
            "C": 2,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cu2OCl2": {
        "product": "Copper Oxychloride",
        "formula": "Cu2OCl2",
        "ratio": {
            "Cu": 2,
            "O": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "H3PO3": {
        "product": "Phosphorous Acid",
        "formula": "H3PO3",
        "ratio": {
            "H": 3,
            "P": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SnCl4": {
        "product": "Stannic Chloride",
        "formula": "SnCl4",
        "ratio": {
            "Sn": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "OP(C6H5)3": {
        "product": "Triphenylphosphine Oxide",
        "formula": "OP(C6H5)3",
        "ratio": {
            "O": 1,
            "P": 1,
            "C": 18,
            "H": 15
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PSH3": {
        "product": "Phosphine Sulfur",
        "formula": "PSH3",
        "ratio": {
            "P": 1,
            "S": 1,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "BeB2": {
        "product": "Beryllium Diboride",
        "formula": "BeB2",
        "ratio": {
            "Be": 1,
            "B": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "GaPO4": {
        "product": "Gallium Phosphate",
        "formula": "GaPO4",
        "ratio": {
            "Ga": 1,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ag2CO3": {
        "product": "Trisilver Carbonate",
        "formula": "Ag2CO3",
        "ratio": {
            "Ag": 2,
            "C": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "S2O3": {
        "product": "Disulfur Trioxide",
        "formula": "S2O3",
        "ratio": {
            "S": 2,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "BH3CO": {
        "product": "Borane Carbonyl",
        "formula": "BH3CO",
        "ratio": {
            "B": 1,
            "H": 3,
            "C": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "I2O5": {
        "product": "Diiodine Pentoxide",
        "formula": "I2O5",
        "ratio": {
            "I": 2,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KHSO5": {
        "product": "Potassium Peroxymonosulfate",
        "formula": "KHSO5",
        "ratio": {
            "K": 1,
            "H": 1,
            "S": 1,
            "O": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "BiO2CO3": {
        "product": "Bismuth Subcarbonate",
        "formula": "BiO2CO3",
        "ratio": {
            "Bi": 1,
            "O": 3,
            "C": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "XeCl6": {
        "product": "Xenon Hexachloride",
        "formula": "XeCl6",
        "ratio": {
            "Xe": 1,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CuC2H3O2": {
        "product": "Copper(I) Acetate",
        "formula": "CuC2H3O2",
        "ratio": {
            "Cu": 1,
            "C": 2,
            "H": 3,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SiN": {
        "product": "Silicon Mononitride",
        "formula": "SiN",
        "ratio": {
            "Si": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NaAr": {
        "product": "Sodium Argide",
        "formula": "NaAr",
        "ratio": {
            "Na": 1,
            "Ar": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "TaC": {
        "product": "Tantalum Carbide",
        "formula": "TaC",
        "ratio": {
            "Ta": 1,
            "C": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "(NH4)2MoS4": {
        "product": "Ammonium Thiomolybdate",
        "formula": "(NH4)2MoS4",
        "ratio": {
            "N": 2,
            "H": 8,
            "Mo": 1,
            "S": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PH3\u00b7H2O": {
        "product": "Phosphine Hydrate",
        "formula": "PH3\u00b7H2O",
        "ratio": {
            "P": 1,
            "H": 5,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "N2H2": {
        "product": "Diimide",
        "formula": "N2H2",
        "ratio": {
            "N": 2,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PH4F": {
        "product": "Phosphonium Fluoride",
        "formula": "PH4F",
        "ratio": {
            "P": 1,
            "H": 4,
            "F": 1
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "AgHg": {
        "product": "Silver Amalgam",
        "formula": "AgHg",
        "ratio": {
            "Ag": 1,
            "Hg": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "PH5": {
        "product": "Phosphorane",
        "formula": "PH5",
        "ratio": {
            "P": 1,
            "H": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PH3NCO": {
        "product": "Phosphinecarboxamide",
        "formula": "PH3NCO",
        "ratio": {
            "P": 1,
            "H": 3,
            "N": 1,
            "C": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H3N2NaO3": {
        "product": "Barbituric Acid Sodium Salt",
        "formula": "C4H3N2NaO3",
        "ratio": {
            "C": 4,
            "H": 3,
            "N": 2,
            "Na": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Fe^0": {
        "product": "Zerovalent Iron Nanoparticles",
        "formula": "Fe^0",
        "ratio": {
            "Fe": 1
        },
        "type": "Metallic",
        "behavior": "reactive"
    },
    "N(NO2)3": {
        "product": "Trinitramide",
        "formula": "N(NO2)3",
        "ratio": {
            "N": 4,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "H3O+NO3-": {
        "product": "Hydroxonium Nitrate",
        "formula": "H3O+NO3-",
        "ratio": {
            "H": 3,
            "O": 4,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "[C2B10H12]-": {
        "product": "Carborane Anion",
        "formula": "[C2B10H12]-",
        "ratio": {
            "C": 2,
            "B": 10,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "GaI3": {
        "product": "Gallium Triiodide",
        "formula": "GaI3",
        "ratio": {
            "Ga": 1,
            "I": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C14H10O4": {
        "product": "Dibenzoyl Peroxide",
        "formula": "C14H10O4",
        "ratio": {
            "C": 14,
            "H": 10,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C2LiH": {
        "product": "Lithium Acetylide",
        "formula": "C2LiH",
        "ratio": {
            "C": 2,
            "Li": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ag2CrO4": {
        "product": "Silver Chromate",
        "formula": "Ag2CrO4",
        "ratio": {
            "Ag": 2,
            "Cr": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "B6H6": {
        "product": "Diborane(6)",
        "formula": "B6H6",
        "ratio": {
            "B": 6,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P2O6": {
        "product": "Diphosphorous Hexoxide",
        "formula": "P2O6",
        "ratio": {
            "P": 2,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3F6S": {
        "product": "Hexafluorothioacetone",
        "formula": "C3F6S",
        "ratio": {
            "C": 3,
            "F": 6,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CSCl2": {
        "product": "Thiophosgene",
        "formula": "CSCl2",
        "ratio": {
            "C": 1,
            "S": 1,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li2SO4": {
        "product": "Lithium Sulfate",
        "formula": "Li2SO4",
        "ratio": {
            "Li": 2,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HNCO": {
        "product": "Isocyanic Acid",
        "formula": "HNCO",
        "ratio": {
            "H": 1,
            "N": 1,
            "C": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C32H18N8": {
        "product": "Phthalocyanine",
        "formula": "C32H18N8",
        "ratio": {
            "C": 32,
            "H": 18,
            "N": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "B2H6C2O4": {
        "product": "Diborane Dicarboxylate",
        "formula": "B2H6C2O4",
        "ratio": {
            "B": 2,
            "H": 6,
            "C": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Co(CO)3NO": {
        "product": "Tricarbonylnitrosyl Cobalt",
        "formula": "Co(CO)3NO",
        "ratio": {
            "Co": 1,
            "C": 3,
            "O": 4,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KMgCl3": {
        "product": "Potassium Magnesium Chloride",
        "formula": "KMgCl3",
        "ratio": {
            "K": 1,
            "Mg": 1,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H6Cl6": {
        "product": "Benzene Hexachloride",
        "formula": "C6H6Cl6",
        "ratio": {
            "C": 6,
            "H": 6,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Na2Cr2O7": {
        "product": "Sodium Dichromate",
        "formula": "Na2Cr2O7",
        "ratio": {
            "Na": 2,
            "Cr": 2,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "K2SnO3": {
        "product": "Potassium Stannate",
        "formula": "K2SnO3",
        "ratio": {
            "K": 2,
            "Sn": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "P4F6": {
        "product": "Tetraphosphorus Hexafluoride",
        "formula": "P4F6",
        "ratio": {
            "P": 4,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CfCl3": {
        "product": "Californium Chloride",
        "formula": "CfCl3",
        "ratio": {
            "Cf": 1,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2(NO2)6": {
        "product": "Hexanitroethane",
        "formula": "C2(NO2)6",
        "ratio": {
            "C": 2,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Fe6": {
        "product": "Hexaferrum",
        "formula": "Fe6",
        "ratio": {
            "Fe": 6
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "C2N14": {
        "product": "Azidoazide Azide",
        "formula": "C2N14",
        "ratio": {
            "C": 2,
            "N": 14
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "P5O10": {
        "product": "Pentaphosphorus Decaoxide",
        "formula": "P5O10",
        "ratio": {
            "P": 5,
            "O": 10
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H2O2": {
        "product": "Aquadag",
        "formula": "C2H2O2",
        "ratio": {
            "C": 2,
            "H": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "H3PO3S": {
        "product": "Thiophosphoric Acid",
        "formula": "H3PO3S",
        "ratio": {
            "H": 3,
            "P": 1,
            "O": 3,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NH4CO2NH2": {
        "product": "Ammonium Carbamate",
        "formula": "NH4CO2NH2",
        "ratio": {
            "N": 2,
            "H": 6,
            "C": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CrCl6": {
        "product": "Chromium Hexachloride",
        "formula": "CrCl6",
        "ratio": {
            "Cr": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C4H6O": {
        "product": "Cyclobutanone",
        "formula": "C4H6O",
        "ratio": {
            "C": 4,
            "H": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "FeS2": {
        "product": "Fool's Gold (Pyrite)",
        "formula": "FeS2",
        "ratio": {
            "Fe": 1,
            "S": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H3BrO": {
        "product": "Acetyl Bromide",
        "formula": "C2H3BrO",
        "ratio": {
            "C": 2,
            "H": 3,
            "Br": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "ClO3F": {
        "product": "Perchloryl Fluoride",
        "formula": "ClO3F",
        "ratio": {
            "Cl": 1,
            "O": 3,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "As2S5": {
        "product": "Arsenic Pentasulfide",
        "formula": "As2S5",
        "ratio": {
            "As": 2,
            "S": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H10O": {
        "product": "Cyclohexanone",
        "formula": "C6H10O",
        "ratio": {
            "C": 6,
            "H": 10,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "K2PtCl6": {
        "product": "Dipotassium Hexachloroplatinate",
        "formula": "K2PtCl6",
        "ratio": {
            "K": 2,
            "Pt": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "FeB4": {
        "product": "Iron Tetraboride",
        "formula": "FeB4",
        "ratio": {
            "Fe": 1,
            "B": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CF2S": {
        "product": "Thiocarbonyl Fluoride",
        "formula": "CF2S",
        "ratio": {
            "C": 1,
            "F": 2,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li4Si": {
        "product": "Lithium Silicide",
        "formula": "Li4Si",
        "ratio": {
            "Li": 4,
            "Si": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "SiB6": {
        "product": "Silicon Boride",
        "formula": "SiB6",
        "ratio": {
            "Si": 1,
            "B": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Si6H6": {
        "product": "Hexasilabenzene",
        "formula": "Si6H6",
        "ratio": {
            "Si": 6,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ag3N": {
        "product": "Argentous Nitride",
        "formula": "Ag3N",
        "ratio": {
            "Ag": 3,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "SbF6-": {
        "product": "Fluoroantimonate Ion",
        "formula": "SbF6-",
        "ratio": {
            "Sb": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BiVO4": {
        "product": "Bismuth Vanadate",
        "formula": "BiVO4",
        "ratio": {
            "Bi": 1,
            "V": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "XeO6^4-": {
        "product": "Perxenate",
        "formula": "XeO6^4-",
        "ratio": {
            "Xe": 1,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BeBr2": {
        "product": "Beryllium Bromide",
        "formula": "BeBr2",
        "ratio": {
            "Be": 1,
            "Br": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "B2H4": {
        "product": "Diborane(4)",
        "formula": "B2H4",
        "ratio": {
            "B": 2,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "As4S6": {
        "product": "Tetraarsenic Hexasulfide",
        "formula": "As4S6",
        "ratio": {
            "As": 4,
            "S": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CrO4": {
        "product": "Chromium Tetraoxide",
        "formula": "CrO4",
        "ratio": {
            "Cr": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FO2C(O)OH": {
        "product": "Fluoroxyperoxoformic Acid",
        "formula": "FO2C(O)OH",
        "ratio": {
            "F": 1,
            "O": 4,
            "C": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C5H12O5": {
        "product": "Xylitol",
        "formula": "C5H12O5",
        "ratio": {
            "C": 5,
            "H": 12,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ROO": {
        "product": "Peroxyl Radical",
        "formula": "ROO",
        "ratio": {
            "R": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cr2(OAc)4": {
        "product": "Chromium(II) Acetate",
        "formula": "Cr2(OAc)4",
        "ratio": {
            "Cr": 2,
            "O": 4,
            "C": 4,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C59H90O4": {
        "product": "Ubiquinone",
        "formula": "C59H90O4",
        "ratio": {
            "C": 59,
            "H": 90,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CH3NCS": {
        "product": "Methyl Isothiocyanate",
        "formula": "CH3NCS",
        "ratio": {
            "C": 2,
            "H": 3,
            "N": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "K[Fe(CN)4]": {
        "product": "Potassium Tetracyanoethylene",
        "formula": "K[Fe(CN)4]",
        "ratio": {
            "K": 1,
            "C": 4,
            "N": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Cl2F6": {
        "product": "Dichlorine Hexafluoride",
        "formula": "Cl2F6",
        "ratio": {
            "Cl": 2,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Mg(HCO3)2": {
        "product": "Magnesium Bicarbonate",
        "formula": "Mg(HCO3)2",
        "ratio": {
            "Mg": 1,
            "C": 2,
            "H": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "BH3\u00b7THF": {
        "product": "Borane Tetrahydrofuran",
        "formula": "BH3\u00b7THF",
        "ratio": {
            "B": 1,
            "H": 3,
            "C": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C12H8N2O2": {
        "product": "Naphthalenediimide",
        "formula": "C12H8N2O2",
        "ratio": {
            "C": 12,
            "H": 8,
            "N": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ru3O2Cl6(H2O)2": {
        "product": "Ruthenium Red",
        "formula": "Ru3O2Cl6(H2O)2",
        "ratio": {
            "Ru": 3,
            "O": 4,
            "Cl": 6,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "SBr6": {
        "product": "Sulfur Hexabromide",
        "formula": "SBr6",
        "ratio": {
            "S": 1,
            "Br": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C12H18": {
        "product": "Hexamethylbenzene",
        "formula": "C12H18",
        "ratio": {
            "C": 12,
            "H": 18
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CF3\u2022": {
        "product": "Trifluoromethyl Radical",
        "formula": "CF3\u2022",
        "ratio": {
            "C": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NOFSO3": {
        "product": "Nitrosyl Fluorosulfate",
        "formula": "NOFSO3",
        "ratio": {
            "N": 1,
            "O": 4,
            "F": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "FNO3": {
        "product": "Fluorine Nitrate",
        "formula": "FNO3",
        "ratio": {
            "F": 1,
            "N": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C6H18OSi2": {
        "product": "Hexamethyldisiloxane",
        "formula": "C6H18OSi2",
        "ratio": {
            "C": 6,
            "H": 18,
            "O": 1,
            "Si": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "KAu(CN)2": {
        "product": "Potassium Gold Cyanide",
        "formula": "KAu(CN)2",
        "ratio": {
            "K": 1,
            "Au": 1,
            "C": 2,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "K4[Fe(CN)6]": {
        "product": "Ferrocyanide",
        "formula": "K4[Fe(CN)6]",
        "ratio": {
            "K": 4,
            "Fe": 1,
            "C": 6,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CH3N2O": {
        "product": "Nitramide",
        "formula": "CH3N2O",
        "ratio": {
            "C": 1,
            "H": 3,
            "N": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P5N5": {
        "product": "Phosphorus Pentanitride",
        "formula": "P5N5",
        "ratio": {
            "P": 5,
            "N": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Si2H4": {
        "product": "Disilene",
        "formula": "Si2H4",
        "ratio": {
            "Si": 2,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "B2Hn": {
        "product": "Borophene",
        "formula": "B2Hn",
        "ratio": {
            "B": 2,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "GaON": {
        "product": "Gallium Oxynitride",
        "formula": "GaON",
        "ratio": {
            "Ga": 1,
            "O": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "MnF7": {
        "product": "Manganese Heptafluoride",
        "formula": "MnF7",
        "ratio": {
            "Mn": 1,
            "F": 7
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "PtCl4": {
        "product": "Platinum Tetrachloride",
        "formula": "PtCl4",
        "ratio": {
            "Pt": 1,
            "Cl": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2Cl6": {
        "product": "Dicarbon Hexachloride",
        "formula": "C2Cl6",
        "ratio": {
            "C": 2,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ClO": {
        "product": "Chlorine Monoxide",
        "formula": "ClO",
        "ratio": {
            "Cl": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H4": {
        "product": "Cyclopropene",
        "formula": "C3H4",
        "ratio": {
            "C": 3,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "As2O5": {
        "product": "Arsenic Pentoxide",
        "formula": "As2O5",
        "ratio": {
            "As": 2,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ti(CH3)4": {
        "product": "Titanium Tetramethyl",
        "formula": "Ti(CH3)4",
        "ratio": {
            "Ti": 1,
            "C": 4,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "HSiCl": {
        "product": "Chlorosilylene",
        "formula": "HSiCl",
        "ratio": {
            "Si": 1,
            "Cl": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C5H10O5N": {
        "product": "Phosphoribosyltransferase",
        "formula": "C5H10O5N",
        "ratio": {
            "C": 5,
            "H": 10,
            "O": 5,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "TiCl3OH": {
        "product": "Titanium Tetrachlorohydroxide",
        "formula": "TiCl3OH",
        "ratio": {
            "Ti": 1,
            "Cl": 3,
            "O": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2HN2B": {
        "product": "Dicyanodihydroborate",
        "formula": "C2HN2B",
        "ratio": {
            "C": 2,
            "H": 1,
            "N": 2,
            "B": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C8H18AlCl": {
        "product": "Chlorodiisobutylaluminum",
        "formula": "C8H18AlCl",
        "ratio": {
            "C": 8,
            "H": 18,
            "Al": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Cr(OC2H5)2": {
        "product": "Chromium Diethoxide",
        "formula": "Cr(OC2H5)2",
        "ratio": {
            "Cr": 1,
            "O": 2,
            "C": 4,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P3H5": {
        "product": "Triphosphine",
        "formula": "P3H5",
        "ratio": {
            "P": 3,
            "H": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "F-SO2-NCO": {
        "product": "Fluorosulfonyl Isocyanate",
        "formula": "F-SO2-NCO",
        "ratio": {
            "F": 1,
            "S": 1,
            "O": 2,
            "N": 1,
            "C": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "ClN3": {
        "product": "Chlorine Azide",
        "formula": "ClN3",
        "ratio": {
            "Cl": 1,
            "N": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C3F6Xe": {
        "product": "Xenon Hexafluoropropane",
        "formula": "C3F6Xe",
        "ratio": {
            "C": 3,
            "F": 6,
            "Xe": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "N2O4O2": {
        "product": "Dinitrogen Tetroxide Peroxide",
        "formula": "N2O4O2",
        "ratio": {
            "N": 2,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "SiI6": {
        "product": "Hexaiodosilane",
        "formula": "SiI6",
        "ratio": {
            "Si": 1,
            "I": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CuCl2\u00b76H2O": {
        "product": "Copper(II) Chloride Hexahydrate",
        "formula": "CuCl2\u00b76H2O",
        "ratio": {
            "Cu": 1,
            "Cl": 2,
            "H": 12,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "WS2": {
        "product": "Tungsten Disulfide",
        "formula": "WS2",
        "ratio": {
            "W": 1,
            "S": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NbC": {
        "product": "Niobium Carbide",
        "formula": "NbC",
        "ratio": {
            "Nb": 1,
            "C": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "Ge2H6": {
        "product": "Digermane",
        "formula": "Ge2H6",
        "ratio": {
            "Ge": 2,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P2N4": {
        "product": "Diphosphorus Tetranitride",
        "formula": "P2N4",
        "ratio": {
            "P": 2,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CfI4": {
        "product": "Californium Tetraiodide",
        "formula": "CfI4",
        "ratio": {
            "Cf": 1,
            "I": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Li3N\u00b7LiH": {
        "product": "Lithium Nitride Hydride",
        "formula": "Li3N\u00b7LiH",
        "ratio": {
            "Li": 4,
            "N": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HSO4-": {
        "product": "Hydrogen Sulfate Ion",
        "formula": "HSO4-",
        "ratio": {
            "H": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NO2I": {
        "product": "Nitryl Iodide",
        "formula": "NO2I",
        "ratio": {
            "N": 1,
            "O": 2,
            "I": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NaHg": {
        "product": "Sodium Amalgam",
        "formula": "NaHg",
        "ratio": {
            "Na": 1,
            "Hg": 1
        },
        "type": "Metallic",
        "behavior": "reactive"
    },
    "CCl3NO2": {
        "product": "Chloropicrin",
        "formula": "CCl3NO2",
        "ratio": {
            "C": 1,
            "Cl": 3,
            "N": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CH6N2": {
        "product": "Methylhydrazine",
        "formula": "CH6N2",
        "ratio": {
            "C": 1,
            "H": 6,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "UO3": {
        "product": "Uranium Trioxide",
        "formula": "UO3",
        "ratio": {
            "U": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H6O2": {
        "product": "Hydroquinone",
        "formula": "C6H6O2",
        "ratio": {
            "C": 6,
            "H": 6,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cr2(CrO4)3": {
        "product": "Chromium(III) Chromate",
        "formula": "Cr2(CrO4)3",
        "ratio": {
            "Cr": 5,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "FmCl6": {
        "product": "Fermium Hexachloride",
        "formula": "FmCl6",
        "ratio": {
            "Fm": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Al(OH)4Cl": {
        "product": "Aluminum Tetrahydroxychloride",
        "formula": "Al(OH)4Cl",
        "ratio": {
            "Al": 1,
            "O": 4,
            "H": 4,
            "Cl": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H2N4O8": {
        "product": "Tetranitroethane",
        "formula": "C2H2N4O8",
        "ratio": {
            "C": 2,
            "H": 2,
            "N": 4,
            "O": 8
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "SiP": {
        "product": "Silicon Monophosphide",
        "formula": "SiP",
        "ratio": {
            "Si": 1,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "[Fe(NH3)6](NO3)3": {
        "product": "Hexaammineiron(III) Nitrate",
        "formula": "[Fe(NH3)6](NO3)3",
        "ratio": {
            "Fe": 1,
            "N": 9,
            "H": 18,
            "O": 9
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HClO4 \u00b7 4H2O": {
        "product": "Perchloric Acid Tetrahydrate",
        "formula": "HClO4 \u00b7 4H2O",
        "ratio": {
            "H": 9,
            "Cl": 1,
            "O": 8
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Ag4O8": {
        "product": "Silver Tetraperoxide",
        "formula": "Ag4O8",
        "ratio": {
            "Ag": 4,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "B2O": {
        "product": "Borophene Oxide",
        "formula": "B2O",
        "ratio": {
            "B": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NaBH3CN": {
        "product": "Sodium Cyanoborohydride",
        "formula": "NaBH3CN",
        "ratio": {
            "Na": 1,
            "B": 1,
            "H": 3,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "WC": {
        "product": "Tungsten Carbide",
        "formula": "WC",
        "ratio": {
            "W": 1,
            "C": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "P2S3": {
        "product": "Diphosphorus Trisulfide",
        "formula": "P2S3",
        "ratio": {
            "P": 2,
            "S": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H4N2": {
        "product": "Diaziridine",
        "formula": "C2H4N2",
        "ratio": {
            "C": 2,
            "H": 4,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C3H5+": {
        "product": "Allyl Cation",
        "formula": "C3H5+",
        "ratio": {
            "C": 3,
            "H": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "O3-": {
        "product": "Ozonide",
        "formula": "O3-",
        "ratio": {
            "O": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C2HF3O": {
        "product": "Trifluoroacetaldehyde",
        "formula": "C2HF3O",
        "ratio": {
            "C": 2,
            "H": 1,
            "F": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Eu2O3": {
        "product": "Europium Oxide",
        "formula": "Eu2O3",
        "ratio": {
            "Eu": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "FeCl3\u00b76H2O": {
        "product": "Iron(III) Chloride Hexahydrate",
        "formula": "FeCl3\u00b76H2O",
        "ratio": {
            "Fe": 1,
            "Cl": 3,
            "H": 12,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H6O2": {
        "product": "Diacetyl",
        "formula": "C4H6O2",
        "ratio": {
            "C": 4,
            "H": 6,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Al2ClH7O6": {
        "product": "Aluminium Chlorohydrate",
        "formula": "Al2ClH7O6",
        "ratio": {
            "Al": 2,
            "Cl": 1,
            "H": 7,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(NH4)2Ce(NO3)6": {
        "product": "Ammonium Cerium Nitrate",
        "formula": "(NH4)2Ce(NO3)6",
        "ratio": {
            "N": 8,
            "H": 8,
            "Ce": 1,
            "O": 18
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "WCl6": {
        "product": "Tungsten Hexachloride",
        "formula": "WCl6",
        "ratio": {
            "W": 1,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HN3": {
        "product": "Hydrozoic Acid",
        "formula": "HN3",
        "ratio": {
            "H": 1,
            "N": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "HSCN": {
        "product": "Hypothiocyanous Acid",
        "formula": "HSCN",
        "ratio": {
            "H": 1,
            "S": 1,
            "C": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "AgO": {
        "product": "Silver(II) Oxide",
        "formula": "AgO",
        "ratio": {
            "Ag": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NbOF5": {
        "product": "Niobium Oxyfluoride",
        "formula": "NbOF5",
        "ratio": {
            "Nb": 1,
            "O": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "OsF3": {
        "product": "Osmium Trifluoride",
        "formula": "OsF3",
        "ratio": {
            "Os": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "S6Se4": {
        "product": "Hexasulfur Tetraselenide",
        "formula": "S6Se4",
        "ratio": {
            "S": 6,
            "Se": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "HArF": {
        "product": "Argon Difluorohydride",
        "formula": "HArF",
        "ratio": {
            "H": 1,
            "Ar": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NeF4": {
        "product": "Neon Tetrafluoride",
        "formula": "NeF4",
        "ratio": {
            "Ne": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AgClO4": {
        "product": "Silver Perchlorate",
        "formula": "AgClO4",
        "ratio": {
            "Ag": 1,
            "Cl": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "MnO2": {
        "product": "MnO2 (Manganese Dioxide)",
        "formula": "MnO2",
        "ratio": {
            "Mn": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "(SO3)2": {
        "product": "Sulfur Trioxide Dimer",
        "formula": "(SO3)2",
        "ratio": {
            "S": 2,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Bi2O3": {
        "product": "Bismuth(III) Oxide",
        "formula": "Bi2O3",
        "ratio": {
            "Bi": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "ClF6": {
        "product": "Chlorine Hexafluoride",
        "formula": "ClF6",
        "ratio": {
            "Cl": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S2O10": {
        "product": "Disulfur Decoxide",
        "formula": "S2O10",
        "ratio": {
            "S": 2,
            "O": 10
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "D2O": {
        "product": "Deuterium Oxide",
        "formula": "D2O",
        "ratio": {
            "D": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C8H4O2": {
        "product": "Cyclooctatetraene Dione",
        "formula": "C8H4O2",
        "ratio": {
            "C": 8,
            "H": 4,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "P3N3Cl6": {
        "product": "Phosphonitrilic Chloride",
        "formula": "P3N3Cl6",
        "ratio": {
            "P": 3,
            "N": 3,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li3N2O2": {
        "product": "Lithium Nitride Peroxide",
        "formula": "Li3N2O2",
        "ratio": {
            "Li": 3,
            "N": 2,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Fe2(CO)14": {
        "product": "Iron Tetradecacarbonyl",
        "formula": "Fe2(CO)14",
        "ratio": {
            "Fe": 2,
            "C": 14,
            "O": 14
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "OsO3Cl2": {
        "product": "Osmium Tetroxychloride",
        "formula": "OsO3Cl2",
        "ratio": {
            "Os": 1,
            "O": 3,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C8H1N7O14": {
        "product": "Heptanitrocubane",
        "formula": "C8H1N7O14",
        "ratio": {
            "C": 8,
            "H": 1,
            "N": 7,
            "O": 14
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Mn(CO)5Cl": {
        "product": "Pentacarbonyl Chloromanganese",
        "formula": "Mn(CO)5Cl",
        "ratio": {
            "Mn": 1,
            "C": 5,
            "O": 5,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "P4Se6": {
        "product": "Tetraphosphorus Hexaselenide",
        "formula": "P4Se6",
        "ratio": {
            "P": 4,
            "Se": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2HF3O3": {
        "product": "Trifluoroperacetic Acid",
        "formula": "C2HF3O3",
        "ratio": {
            "C": 2,
            "H": 1,
            "F": 3,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C8HF15NO2": {
        "product": "Ammonium Perfluorooctanoate",
        "formula": "C8HF15NO2",
        "ratio": {
            "C": 8,
            "H": 1,
            "F": 15,
            "N": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H5OLi": {
        "product": "Lithium Ethoxide",
        "formula": "C2H5OLi",
        "ratio": {
            "C": 2,
            "H": 5,
            "O": 1,
            "Li": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Zn(C2H3O2)2": {
        "product": "Zinc Acetate",
        "formula": "Zn(C2H3O2)2",
        "ratio": {
            "Zn": 1,
            "C": 4,
            "H": 6,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CH5P": {
        "product": "Methylphosphine",
        "formula": "CH5P",
        "ratio": {
            "C": 1,
            "H": 5,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H3FO2": {
        "product": "Fluoroacetic Acid",
        "formula": "C2H3FO2",
        "ratio": {
            "C": 2,
            "H": 3,
            "F": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NH4BF4": {
        "product": "Ammonium Tetrafluoroborate",
        "formula": "NH4BF4",
        "ratio": {
            "N": 1,
            "H": 4,
            "B": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "LiCoO2": {
        "product": "Lithium Cobalt Oxide",
        "formula": "LiCoO2",
        "ratio": {
            "Li": 1,
            "Co": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BPH3": {
        "product": "Borophosphane",
        "formula": "BPH3",
        "ratio": {
            "B": 1,
            "P": 1,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H2SnCl6": {
        "product": "Chlorostannic Acid",
        "formula": "H2SnCl6",
        "ratio": {
            "H": 2,
            "Sn": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "liquid"
    },
    "Pu(C2O4)2": {
        "product": "Plutonium Oxalate",
        "formula": "Pu(C2O4)2",
        "ratio": {
            "Pu": 1,
            "C": 4,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "VP": {
        "product": "Vanadium Phosphide",
        "formula": "VP",
        "ratio": {
            "V": 1,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C7H10": {
        "product": "Norbornene",
        "formula": "C7H10",
        "ratio": {
            "C": 7,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Fe(C5H5)2": {
        "product": "Ferrocene",
        "formula": "Fe(C5H5)2",
        "ratio": {
            "Fe": 1,
            "C": 10,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C8(NO2)8": {
        "product": "Octanitrocubane",
        "formula": "C8(NO2)8",
        "ratio": {
            "C": 8,
            "N": 8,
            "O": 16
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CaCP": {
        "product": "Calcium Carbophosphide",
        "formula": "CaCP",
        "ratio": {
            "Ca": 1,
            "C": 1,
            "P": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Li2O4\u00b74H2O": {
        "product": "Lithium Tetrahydrate Peroxide",
        "formula": "Li2O4\u00b74H2O",
        "ratio": {
            "Li": 2,
            "O": 4,
            "H": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "LiN3": {
        "product": "Lithium Azide",
        "formula": "LiN3",
        "ratio": {
            "Li": 1,
            "N": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Co3O4": {
        "product": "Cobalt Tetraoxide",
        "formula": "Co3O4",
        "ratio": {
            "Co": 3,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AgNO3\u00b73H2O": {
        "product": "Silver Nitrate Trihydrate",
        "formula": "AgNO3\u00b73H2O",
        "ratio": {
            "Ag": 1,
            "N": 1,
            "O": 6,
            "H": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "CI4": {
        "product": "Carbon Tetraiodide",
        "formula": "CI4",
        "ratio": {
            "C": 1,
            "I": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H16N2": {
        "product": "Hexamethylenediamine",
        "formula": "C6H16N2",
        "ratio": {
            "C": 6,
            "H": 16,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "AlGaN": {
        "product": "Aluminum Gallium Nitride",
        "formula": "AlGaN",
        "ratio": {
            "Al": 1,
            "Ga": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "H3": {
        "product": "Trihydrogen",
        "formula": "H3",
        "ratio": {
            "H": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "K2C2O4": {
        "product": "Dipotassium Oxalate",
        "formula": "K2C2O4",
        "ratio": {
            "K": 2,
            "C": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ca(C3H7NO2)2": {
        "product": "Calcium Alanine Complex",
        "formula": "Ca(C3H7NO2)2",
        "ratio": {
            "Ca": 1,
            "C": 6,
            "H": 14,
            "N": 2,
            "O": 4
        },
        "type": "Coordination",
        "behavior": "stable"
    },
    "Fe2(C2O4)3": {
        "product": "Iron(III) Oxalate",
        "formula": "Fe2(C2O4)3",
        "ratio": {
            "Fe": 2,
            "C": 6,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C21H30O2": {
        "product": "Tetrahydrocannabinol",
        "formula": "C21H30O2",
        "ratio": {
            "C": 21,
            "H": 30,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "ReF7": {
        "product": "Rhenium Heptafluoride",
        "formula": "ReF7",
        "ratio": {
            "Re": 1,
            "F": 7
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KHS": {
        "product": "Potassium Hydrosulfide",
        "formula": "KHS",
        "ratio": {
            "K": 1,
            "H": 1,
            "S": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ti[OCH(CH3)2]4": {
        "product": "Titanium Tetraisopropoxide",
        "formula": "Ti[OCH(CH3)2]4",
        "ratio": {
            "Ti": 1,
            "O": 4,
            "C": 12,
            "H": 28
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CH3NHClO": {
        "product": "Methylamine Hypochlorite",
        "formula": "CH3NHClO",
        "ratio": {
            "C": 1,
            "H": 4,
            "N": 1,
            "Cl": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C3H5NO3": {
        "product": "Nitroacetone",
        "formula": "C3H5NO3",
        "ratio": {
            "C": 3,
            "H": 5,
            "N": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "PHBr2": {
        "product": "Phosphine Dibromide",
        "formula": "PHBr2",
        "ratio": {
            "P": 1,
            "H": 1,
            "Br": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "MoF6": {
        "product": "Molybdenum Hexafluoride",
        "formula": "MoF6",
        "ratio": {
            "Mo": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "AsF3": {
        "product": "Arsenic Trifluoride",
        "formula": "AsF3",
        "ratio": {
            "As": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "N2H6(ClO4)2": {
        "product": "Hydrazinium Diperchlorate",
        "formula": "N2H6(ClO4)2",
        "ratio": {
            "N": 2,
            "H": 6,
            "Cl": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "U3O8": {
        "product": "Triuranium Octoxide",
        "formula": "U3O8",
        "ratio": {
            "U": 3,
            "O": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "I3Br": {
        "product": "Triiodide Bromide",
        "formula": "I3Br",
        "ratio": {
            "I": 3,
            "Br": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C10H10": {
        "product": "Cyclodecapentaene",
        "formula": "C10H10",
        "ratio": {
            "C": 10,
            "H": 10
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "[Cr(NH3)6]Cl3": {
        "product": "Hexaamminechromium(III) Chloride",
        "formula": "[Cr(NH3)6]Cl3",
        "ratio": {
            "Cr": 1,
            "N": 6,
            "H": 18,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "B10H16": {
        "product": "Decaborane(16)",
        "formula": "B10H16",
        "ratio": {
            "B": 10,
            "H": 16
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "(Fe,Mg)O": {
        "product": "Ferropericlase",
        "formula": "(Fe,Mg)O",
        "ratio": {
            "Fe": 1,
            "Mg": 1,
            "O": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "Rh4(CO)12": {
        "product": "Rhodium Carbonyl",
        "formula": "Rh4(CO)12",
        "ratio": {
            "Rh": 4,
            "C": 12,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CH3OK": {
        "product": "Potassium Methoxide",
        "formula": "CH3OK",
        "ratio": {
            "C": 1,
            "H": 3,
            "O": 1,
            "K": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "BBr3\u00b7H2O": {
        "product": "Boron Tribromide Hydrate",
        "formula": "BBr3\u00b7H2O",
        "ratio": {
            "B": 1,
            "Br": 3,
            "H": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "K2HN3O4": {
        "product": "Potassium Hydronitrate",
        "formula": "K2HN3O4",
        "ratio": {
            "K": 2,
            "H": 1,
            "N": 3,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Fe(CO)5S": {
        "product": "Iron Carbonyl Sulfide",
        "formula": "Fe(CO)5S",
        "ratio": {
            "Fe": 1,
            "C": 5,
            "O": 5,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Tl2S3": {
        "product": "Thallium(III) Sulfide",
        "formula": "Tl2S3",
        "ratio": {
            "Tl": 2,
            "S": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2HP": {
        "product": "Phosphinoethyne",
        "formula": "C2HP",
        "ratio": {
            "C": 2,
            "H": 1,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H8N2": {
        "product": "Ammonium Carbide",
        "formula": "C2H8N2",
        "ratio": {
            "C": 2,
            "H": 8,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "W2C2O2H2": {
        "product": "Dicarbonyldihydrotungsten",
        "formula": "W2C2O2H2",
        "ratio": {
            "W": 2,
            "C": 2,
            "O": 2,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C25H40": {
        "product": "Pentaisopropylcyclopentafulvalene",
        "formula": "C25H40",
        "ratio": {
            "C": 25,
            "H": 40
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cu3P": {
        "product": "Copper(I) Phosphide",
        "formula": "Cu3P",
        "ratio": {
            "Cu": 3,
            "P": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SO2\u00b7nH2O": {
        "product": "Sulfur Dioxide Clathrate",
        "formula": "SO2\u00b7nH2O",
        "ratio": {
            "S": 1,
            "O": 2,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "RnF4": {
        "product": "Radon Tetrafluoride",
        "formula": "RnF4",
        "ratio": {
            "Rn": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C5H10O3": {
        "product": "Diethylcarbonate",
        "formula": "C5H10O3",
        "ratio": {
            "C": 5,
            "H": 10,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "P2O": {
        "product": "Diphosphorus Monoxide",
        "formula": "P2O",
        "ratio": {
            "P": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2I4": {
        "product": "Tetraiodoethylene",
        "formula": "C2I4",
        "ratio": {
            "C": 2,
            "I": 4
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "RbO2": {
        "product": "Rubidium Superoxide",
        "formula": "RbO2",
        "ratio": {
            "Rb": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "As2Se3": {
        "product": "Diarsenic Triselenide",
        "formula": "As2Se3",
        "ratio": {
            "As": 2,
            "Se": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Co(CO)3(NO)": {
        "product": "Cobalt Tricarbonyl Nitrosyl",
        "formula": "Co(CO)3(NO)",
        "ratio": {
            "Co": 1,
            "C": 3,
            "O": 4,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2H5Cl": {
        "product": "Chloroethane",
        "formula": "C2H5Cl",
        "ratio": {
            "C": 2,
            "H": 5,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "(CF3CO)3": {
        "product": "Hexafluoroacetone Trimer",
        "formula": "(CF3CO)3",
        "ratio": {
            "C": 6,
            "F": 18,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "H2K2TeO4": {
        "product": "Potassium Tellurous Acid",
        "formula": "H2K2TeO4",
        "ratio": {
            "H": 2,
            "K": 2,
            "Te": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "liquid"
    },
    "POF3": {
        "product": "Phosphorus Oxyfluoride",
        "formula": "POF3",
        "ratio": {
            "P": 1,
            "O": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "WBr6": {
        "product": "Tungsten Hexabromide",
        "formula": "WBr6",
        "ratio": {
            "W": 1,
            "Br": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ca(BrO3)2": {
        "product": "Calcium Bromate",
        "formula": "Ca(BrO3)2",
        "ratio": {
            "Ca": 1,
            "Br": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "[Fe(C5H5N)3]": {
        "product": "Iron(III) Pyridine Complex",
        "formula": "[Fe(C5H5N)3]",
        "ratio": {
            "Fe": 1,
            "C": 15,
            "H": 15,
            "N": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C5H5NiNO": {
        "product": "Cyclopentadienyl Nickel Nitrosyl",
        "formula": "C5H5NiNO",
        "ratio": {
            "C": 5,
            "H": 5,
            "Ni": 1,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CrBr5": {
        "product": "Chromium Pentabromide",
        "formula": "CrBr5",
        "ratio": {
            "Cr": 1,
            "Br": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C6N6O12": {
        "product": "Hexanitrobenzene",
        "formula": "C6N6O12",
        "ratio": {
            "C": 6,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CH5NO": {
        "product": "Methoxyamine",
        "formula": "CH5NO",
        "ratio": {
            "C": 1,
            "H": 5,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C2H3": {
        "product": "Graphane",
        "formula": "C2H3",
        "ratio": {
            "C": 2,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Fe(H2O)6^3+": {
        "product": "Hexaaquairon(III) Ion",
        "formula": "Fe(H2O)6^3+",
        "ratio": {
            "Fe": 1,
            "O": 6,
            "H": 12
        },
        "type": "Ionic",
        "behavior": "liquid"
    },
    "B12H12": {
        "product": "Dodecaborane",
        "formula": "B12H12",
        "ratio": {
            "B": 12,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AgBF4": {
        "product": "Silver Tetrafluoroborate",
        "formula": "AgBF4",
        "ratio": {
            "Ag": 1,
            "B": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "NH4BrO4": {
        "product": "Ammonium Perbromate",
        "formula": "NH4BrO4",
        "ratio": {
            "N": 1,
            "H": 4,
            "Br": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Fe2(CO)9": {
        "product": "Diiron Nonacarbonyl",
        "formula": "Fe2(CO)9",
        "ratio": {
            "Fe": 2,
            "C": 9,
            "O": 9
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ClNS": {
        "product": "Thionitrosyl Chloride",
        "formula": "ClNS",
        "ratio": {
            "Cl": 1,
            "N": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "K2SeO3": {
        "product": "Potassium Selenite",
        "formula": "K2SeO3",
        "ratio": {
            "K": 2,
            "Se": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CHP": {
        "product": "Phosphaalkyne",
        "formula": "CHP",
        "ratio": {
            "C": 1,
            "H": 1,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "IF7": {
        "product": "Iodine Heptafluoride",
        "formula": "IF7",
        "ratio": {
            "I": 1,
            "F": 7
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BrF5": {
        "product": "Bromine Pentafluoride",
        "formula": "BrF5",
        "ratio": {
            "Br": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Mn3O4": {
        "product": "Manganese Tetraoxide",
        "formula": "Mn3O4",
        "ratio": {
            "Mn": 3,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Li(NH3)n": {
        "product": "Lithium Ammonia Solution",
        "formula": "Li(NH3)n",
        "ratio": {
            "Li": 1,
            "N": 1,
            "H": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HNO3 + 3HCl": {
        "product": "Aqua Regia",
        "formula": "HNO3 + 3HCl",
        "ratio": {
            "H": 4,
            "N": 1,
            "O": 3,
            "Cl": 3
        },
        "type": "Reactive Mixture",
        "behavior": "explosive"
    },
    "ROONO": {
        "product": "Alkyl Peroxynitrite",
        "formula": "ROONO",
        "ratio": {
            "R": 1,
            "O": 3,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "BrCl": {
        "product": "Bromine Monochloride",
        "formula": "BrCl",
        "ratio": {
            "Br": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SO2F6": {
        "product": "Sulfur Dioxide Hexafluoride",
        "formula": "SO2F6",
        "ratio": {
            "S": 1,
            "O": 2,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "ArOH": {
        "product": "Argon Hydroxide",
        "formula": "ArOH",
        "ratio": {
            "Ar": 1,
            "O": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "WOCl4": {
        "product": "Tungsten Oxychloride",
        "formula": "WOCl4",
        "ratio": {
            "W": 1,
            "O": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3Cl4": {
        "product": "Tricarbon Tetrachloride",
        "formula": "C3Cl4",
        "ratio": {
            "C": 3,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KBrO4": {
        "product": "Potassium Perbromate",
        "formula": "KBrO4",
        "ratio": {
            "K": 1,
            "Br": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Mg3N2": {
        "product": "Magnesium Nitride",
        "formula": "Mg3N2",
        "ratio": {
            "Mg": 3,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "WO2Cl4": {
        "product": "Tungsten Tetrachlorodioxide",
        "formula": "WO2Cl4",
        "ratio": {
            "W": 1,
            "O": 2,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H6Si2O": {
        "product": "Disiloxane",
        "formula": "H6Si2O",
        "ratio": {
            "Si": 2,
            "O": 1,
            "H": 6
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "PtS2": {
        "product": "Platinum Sulfide",
        "formula": "PtS2",
        "ratio": {
            "Pt": 1,
            "S": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "N4": {
        "product": "Tetranitrogen",
        "formula": "N4",
        "ratio": {
            "N": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Cu2Se": {
        "product": "Copper Selenide",
        "formula": "Cu2Se",
        "ratio": {
            "Cu": 2,
            "Se": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CaNH": {
        "product": "Calcium Imide",
        "formula": "CaNH",
        "ratio": {
            "Ca": 1,
            "N": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C16H36O4Ti": {
        "product": "Titanium Tetrabutoxide",
        "formula": "C16H36O4Ti",
        "ratio": {
            "C": 16,
            "H": 36,
            "O": 4,
            "Ti": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C2H9BS": {
        "product": "Borane-Dimethylsulfide",
        "formula": "C2H9BS",
        "ratio": {
            "C": 2,
            "H": 9,
            "B": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3O4": {
        "product": "Dioxygen Carbonyl",
        "formula": "C3O4",
        "ratio": {
            "C": 3,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PbCrO4": {
        "product": "Lead(II) Chromate",
        "formula": "PbCrO4",
        "ratio": {
            "Pb": 1,
            "Cr": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C9H15N3O6": {
        "product": "Hexaacetyltrihydrotriazine",
        "formula": "C9H15N3O6",
        "ratio": {
            "C": 9,
            "H": 15,
            "N": 3,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2HF5": {
        "product": "Pentafluoroethane",
        "formula": "C2HF5",
        "ratio": {
            "C": 2,
            "H": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "N4H4O4": {
        "product": "Ammonium Dinitramide",
        "formula": "N4H4O4",
        "ratio": {
            "N": 4,
            "H": 4,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "SbCl5": {
        "product": "Antimony Pentachloride",
        "formula": "SbCl5",
        "ratio": {
            "Sb": 1,
            "Cl": 5
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "BF4": {
        "product": "Borane Tetrafluoride",
        "formula": "BF4",
        "ratio": {
            "B": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cl2O3": {
        "product": "Chlorine Trioxide",
        "formula": "Cl2O3",
        "ratio": {
            "Cl": 2,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li2O": {
        "product": "Dilithium Monoxide",
        "formula": "Li2O",
        "ratio": {
            "Li": 2,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Na2PbO3": {
        "product": "Sodium Plumbate",
        "formula": "Na2PbO3",
        "ratio": {
            "Na": 2,
            "Pb": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "FlF4": {
        "product": "Flerovium Tetrafluoride",
        "formula": "FlF4",
        "ratio": {
            "Fl": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ac(NO3)3": {
        "product": "Actinium Nitrate",
        "formula": "Ac(NO3)3",
        "ratio": {
            "Ac": 1,
            "N": 3,
            "O": 9
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "RaCl2": {
        "product": "Radium Dichloride",
        "formula": "RaCl2",
        "ratio": {
            "Ra": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C5H5-": {
        "product": "Cyclopentadienyl Anion",
        "formula": "C5H5-",
        "ratio": {
            "C": 5,
            "H": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H10N3O5P": {
        "product": "Phosphocreatine",
        "formula": "C4H10N3O5P",
        "ratio": {
            "C": 4,
            "H": 10,
            "N": 3,
            "O": 5,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2H3NO2": {
        "product": "Nitroethene",
        "formula": "C2H3NO2",
        "ratio": {
            "C": 2,
            "H": 3,
            "N": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "K2Sx": {
        "product": "Potassium Polysulfide",
        "formula": "K2Sx",
        "ratio": {
            "K": 2,
            "S": "x"
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C9H19LiN": {
        "product": "Lithium Tetramethylpiperidide",
        "formula": "C9H19LiN",
        "ratio": {
            "C": 9,
            "H": 19,
            "Li": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PCl5F": {
        "product": "Phosphorus Pentachloride Fluoride",
        "formula": "PCl5F",
        "ratio": {
            "P": 1,
            "Cl": 5,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C6H6N6O12": {
        "product": "Hexanitrocyclohexane",
        "formula": "C6H6N6O12",
        "ratio": {
            "C": 6,
            "H": 6,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "RuO4Cl2": {
        "product": "Ruthenium Tetroxide Dichloride",
        "formula": "RuO4Cl2",
        "ratio": {
            "Ru": 1,
            "O": 4,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CN4O4": {
        "product": "Tetranitromethane Peroxide",
        "formula": "CN4O4",
        "ratio": {
            "C": 1,
            "N": 4,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "KAuCl2": {
        "product": "Potassium Dichloroaurate(III)",
        "formula": "KAuCl2",
        "ratio": {
            "K": 1,
            "Au": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ra(NO3)2": {
        "product": "Radium Nitrate",
        "formula": "Ra(NO3)2",
        "ratio": {
            "Ra": 1,
            "N": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "FrOH": {
        "product": "Francium Hydroxide",
        "formula": "FrOH",
        "ratio": {
            "Fr": 1,
            "O": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "PQD": {
        "product": "Phosphorene Quantum Dot",
        "formula": "PQD",
        "ratio": {
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CuC2O4": {
        "product": "Copper(I) Oxalate",
        "formula": "CuC2O4",
        "ratio": {
            "Cu": 1,
            "C": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "S4N4O3": {
        "product": "Tetrasulfur Tetranitride Trioxide",
        "formula": "S4N4O3",
        "ratio": {
            "S": 4,
            "N": 4,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C6H2": {
        "product": "Cyclohexatriyne",
        "formula": "C6H2",
        "ratio": {
            "C": 6,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li2C": {
        "product": "Dilithium Carbide",
        "formula": "Li2C",
        "ratio": {
            "Li": 2,
            "C": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NH4HCO3": {
        "product": "Ammonium bicarbonate",
        "formula": "NH4HCO3",
        "ratio": {
            "N": 1,
            "H": 5,
            "C": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Al2Cl6": {
        "product": "Dimeric aluminum chloride",
        "formula": "Al2Cl6",
        "ratio": {
            "Al": 2,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "HBrO4": {
        "product": "Perbromic Acid",
        "formula": "HBrO4",
        "ratio": {
            "H": 1,
            "Br": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KCNO": {
        "product": "Potassium Fulminate",
        "formula": "KCNO",
        "ratio": {
            "K": 1,
            "C": 1,
            "N": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Li2NH": {
        "product": "Lithium Imide",
        "formula": "Li2NH",
        "ratio": {
            "Li": 2,
            "N": 1,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C21H27O9P": {
        "product": "Tris(2,4,6-trimethoxyphenyl)phosphine",
        "formula": "C21H27O9P",
        "ratio": {
            "C": 21,
            "H": 27,
            "O": 9,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C3H5NO": {
        "product": "Cyclopropanone Oxime",
        "formula": "C3H5NO",
        "ratio": {
            "C": 3,
            "H": 5,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S6N4": {
        "product": "Tetrasulfur Tetranitride Disulfide",
        "formula": "S6N4",
        "ratio": {
            "S": 6,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "NaSi": {
        "product": "Sodium Silicide",
        "formula": "NaSi",
        "ratio": {
            "Na": 1,
            "Si": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AlBr2": {
        "product": "Aluminum Dibromide",
        "formula": "AlBr2",
        "ratio": {
            "Al": 1,
            "Br": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "KHg": {
        "product": "Potassium Amalgam",
        "formula": "KHg",
        "ratio": {
            "K": 1,
            "Hg": 1
        },
        "type": "Metallic",
        "behavior": "reactive"
    },
    "RaF2\u00b7xH2O": {
        "product": "Radium Fluoride Hydrate",
        "formula": "RaF2\u00b7xH2O",
        "ratio": {
            "Ra": 1,
            "F": 2,
            "H": 2,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ni2O3": {
        "product": "Nickel(III) Oxide",
        "formula": "Ni2O3",
        "ratio": {
            "Ni": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BiI": {
        "product": "Bismuth Subiodide",
        "formula": "BiI",
        "ratio": {
            "Bi": 1,
            "I": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NH2": {
        "product": "Amidogen Radical",
        "formula": "NH2",
        "ratio": {
            "N": 1,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S4O5": {
        "product": "Tetrasulfur Pentoxide",
        "formula": "S4O5",
        "ratio": {
            "S": 4,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S6": {
        "product": "Hexasulfur",
        "formula": "S6",
        "ratio": {
            "S": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "O2BF4": {
        "product": "Dioxygenyl Tetrafluoroborate",
        "formula": "O2BF4",
        "ratio": {
            "O": 2,
            "B": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "FN3": {
        "product": "Fluorine Azide",
        "formula": "FN3",
        "ratio": {
            "F": 1,
            "N": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "As2Te5": {
        "product": "Arsenic Pentatelluride",
        "formula": "As2Te5",
        "ratio": {
            "As": 2,
            "Te": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cs2C2O4": {
        "product": "Caesium Oxalate",
        "formula": "Cs2C2O4",
        "ratio": {
            "Cs": 2,
            "C": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "P\u221e": {
        "product": "Phosphorene Ribbon",
        "formula": "P\u221e",
        "ratio": {
            "P": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(NH4)C4Cl2O4": {
        "product": "Ammonium Dichloromaleate",
        "formula": "(NH4)C4Cl2O4",
        "ratio": {
            "N": 1,
            "H": 4,
            "C": 4,
            "Cl": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CfB4O7": {
        "product": "Californium Tetraborate",
        "formula": "CfB4O7",
        "ratio": {
            "Cf": 1,
            "B": 4,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C10H10Fe": {
        "product": "Ferrocene",
        "formula": "C10H10Fe",
        "ratio": {
            "C": 10,
            "H": 10,
            "Fe": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C10H16": {
        "product": "Adamantane",
        "formula": "C10H16",
        "ratio": {
            "C": 10,
            "H": 16
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "TeF6": {
        "product": "Tellurium Hexafluoride",
        "formula": "TeF6",
        "ratio": {
            "Te": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "N(NO2)2-": {
        "product": "Dinitramide Ion",
        "formula": "N(NO2)2-",
        "ratio": {
            "N": 3,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ca(C2H3O2)2": {
        "product": "Calcium Acetate",
        "formula": "Ca(C2H3O2)2",
        "ratio": {
            "Ca": 1,
            "C": 4,
            "H": 6,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HCo(CO)4": {
        "product": "Tetracarbonylcobalt Hydride",
        "formula": "HCo(CO)4",
        "ratio": {
            "H": 1,
            "Co": 1,
            "C": 4,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Si3N4": {
        "product": "Ditetrahedral Silicon Nitride",
        "formula": "Si3N4",
        "ratio": {
            "Si": 3,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NH3O3S": {
        "product": "Hydroxylamine-O-sulfonic Acid",
        "formula": "NH3O3S",
        "ratio": {
            "N": 1,
            "H": 3,
            "O": 3,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2H5NS": {
        "product": "Thioacetamide",
        "formula": "C2H5NS",
        "ratio": {
            "C": 2,
            "H": 5,
            "N": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "MgB2": {
        "product": "Magnesium Diboride",
        "formula": "MgB2",
        "ratio": {
            "Mg": 1,
            "B": 2
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "CN2F2": {
        "product": "Difluorodiazirine",
        "formula": "CN2F2",
        "ratio": {
            "C": 1,
            "N": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(NH4)3PO3": {
        "product": "Ammonium Phosphite",
        "formula": "(NH4)3PO3",
        "ratio": {
            "N": 3,
            "H": 12,
            "P": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ge(CH3)4": {
        "product": "Tetramethylgermanium",
        "formula": "Ge(CH3)4",
        "ratio": {
            "Ge": 1,
            "C": 4,
            "H": 12
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "SF2": {
        "product": "Sulfur Difluoride",
        "formula": "SF2",
        "ratio": {
            "S": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cl2CO": {
        "product": "Phosgene Dichloride",
        "formula": "Cl2CO",
        "ratio": {
            "Cl": 2,
            "C": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ra(OH)2": {
        "product": "Radium Hydroxide",
        "formula": "Ra(OH)2",
        "ratio": {
            "Ra": 1,
            "O": 2,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "XeF2O2": {
        "product": "Perxenon Difluoride",
        "formula": "XeF2O2",
        "ratio": {
            "Xe": 1,
            "F": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "FeO4": {
        "product": "Iron Ferrate",
        "formula": "FeO4",
        "ratio": {
            "Fe": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Mg(NH3)2Br2": {
        "product": "Magnesium Diamine Bromide",
        "formula": "Mg(NH3)2Br2",
        "ratio": {
            "Mg": 1,
            "N": 2,
            "H": 6,
            "Br": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "OsO4Cl2": {
        "product": "Osmium Tetroxychloride",
        "formula": "OsO4Cl2",
        "ratio": {
            "Os": 1,
            "O": 4,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "BAs": {
        "product": "Boron Arsenide",
        "formula": "BAs",
        "ratio": {
            "B": 1,
            "As": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "MoBr6": {
        "product": "Molybdenum Hexabromide",
        "formula": "MoBr6",
        "ratio": {
            "Mo": 1,
            "Br": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "TaS2": {
        "product": "Tantalum Disulfide",
        "formula": "TaS2",
        "ratio": {
            "Ta": 1,
            "S": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CrOCl2": {
        "product": "Chromium Oxychloride",
        "formula": "CrOCl2",
        "ratio": {
            "Cr": 1,
            "O": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "N2F6": {
        "product": "Dinitrogen Hexafluoride",
        "formula": "N2F6",
        "ratio": {
            "N": 2,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Li3O": {
        "product": "Trithium Oxide",
        "formula": "Li3O",
        "ratio": {
            "Li": 3,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "MgB6": {
        "product": "Magnesium Hexaboride",
        "formula": "MgB6",
        "ratio": {
            "Mg": 1,
            "B": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Br2O7": {
        "product": "Dibromine Heptoxide",
        "formula": "Br2O7",
        "ratio": {
            "Br": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CCl6": {
        "product": "Carbon Hexachloride",
        "formula": "CCl6",
        "ratio": {
            "C": 1,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "RaBr2": {
        "product": "Radium Bromide",
        "formula": "RaBr2",
        "ratio": {
            "Ra": 1,
            "Br": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Zr(NO3)4": {
        "product": "Zirconium Nitrate",
        "formula": "Zr(NO3)4",
        "ratio": {
            "Zr": 1,
            "N": 4,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "TiT2": {
        "product": "Titanium Tritiide",
        "formula": "TiT2",
        "ratio": {
            "Ti": 1,
            "T": 2
        },
        "type": "Metallic",
        "behavior": "reactive"
    },
    "C6H6N6": {
        "product": "Hexaazaisowurtzitane",
        "formula": "C6H6N6",
        "ratio": {
            "C": 6,
            "H": 6,
            "N": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Ca3(VO4)2": {
        "product": "Calcium Orthovanadate",
        "formula": "Ca3(VO4)2",
        "ratio": {
            "Ca": 3,
            "V": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2S": {
        "product": "Dicarbon Sulfide",
        "formula": "C2S",
        "ratio": {
            "C": 2,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "FeC2O4": {
        "product": "Iron(II) Oxalate",
        "formula": "FeC2O4",
        "ratio": {
            "Fe": 1,
            "C": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "RhF6": {
        "product": "Rhodium Hexafluoride",
        "formula": "RhF6",
        "ratio": {
            "Rh": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ca3Al2O6": {
        "product": "Calcium Aluminum Oxide",
        "formula": "Ca3Al2O6",
        "ratio": {
            "Ca": 3,
            "Al": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H18Cl2N4Ni": {
        "product": "Tris(ethylenediamine)nickel(II) Chloride",
        "formula": "C6H18Cl2N4Ni",
        "ratio": {
            "C": 6,
            "H": 18,
            "Cl": 2,
            "N": 4,
            "Ni": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "KClO2": {
        "product": "Potassium Chlorite",
        "formula": "KClO2",
        "ratio": {
            "K": 1,
            "Cl": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CaCrO3": {
        "product": "Calcium Chromite",
        "formula": "CaCrO3",
        "ratio": {
            "Ca": 1,
            "Cr": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C18H18N4": {
        "product": "Tris(2-pyridylmethyl)amine",
        "formula": "C18H18N4",
        "ratio": {
            "C": 18,
            "H": 18,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Pb2Cl2CO3": {
        "product": "Phosgenite",
        "formula": "Pb2Cl2CO3",
        "ratio": {
            "Pb": 2,
            "Cl": 2,
            "C": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "K2SiO3": {
        "product": "Potassium Silicate",
        "formula": "K2SiO3",
        "ratio": {
            "K": 2,
            "Si": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HfCl4": {
        "product": "Hafnium Tetrachloride",
        "formula": "HfCl4",
        "ratio": {
            "Hf": 1,
            "Cl": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CfOF": {
        "product": "Californium Oxide Fluoride",
        "formula": "CfOF",
        "ratio": {
            "Cf": 1,
            "O": 1,
            "F": 1
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C2H6O4S": {
        "product": "Dimethyl Sulfate",
        "formula": "C2H6O4S",
        "ratio": {
            "C": 2,
            "H": 6,
            "O": 4,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H7AlO5": {
        "product": "Aluminium Diacetate",
        "formula": "C4H7AlO5",
        "ratio": {
            "C": 4,
            "H": 7,
            "Al": 1,
            "O": 5
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C7H5BiO6": {
        "product": "Bismuth Subgallate",
        "formula": "C7H5BiO6",
        "ratio": {
            "C": 7,
            "H": 5,
            "Bi": 1,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CaH4O2P2": {
        "product": "Calcium Hypophosphite",
        "formula": "CaH4O2P2",
        "ratio": {
            "Ca": 1,
            "H": 4,
            "O": 2,
            "P": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C9H27O4PSi3": {
        "product": "Tris(Trimethylsilyl)phosphate",
        "formula": "C9H27O4PSi3",
        "ratio": {
            "C": 9,
            "H": 27,
            "O": 4,
            "P": 1,
            "Si": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "NaHSO4": {
        "product": "Sodium Bisulfate",
        "formula": "NaHSO4",
        "ratio": {
            "Na": 1,
            "H": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(NH4)2C2O4": {
        "product": "Ammonium Oxalate",
        "formula": "(NH4)2C2O4",
        "ratio": {
            "N": 2,
            "H": 8,
            "C": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SO(NH2)2": {
        "product": "Thionyl Amide",
        "formula": "SO(NH2)2",
        "ratio": {
            "S": 1,
            "O": 1,
            "N": 2,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li2CN2": {
        "product": "Lithium Cyanamide",
        "formula": "Li2CN2",
        "ratio": {
            "Li": 2,
            "C": 1,
            "N": 2
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "P3N3": {
        "product": "Triphosphatriazine",
        "formula": "P3N3",
        "ratio": {
            "P": 3,
            "N": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "XeI6": {
        "product": "Xenon Hexaiodide",
        "formula": "XeI6",
        "ratio": {
            "Xe": 1,
            "I": 6
        },
        "type": "Covalent",
        "behavior": "unstable"
    },
    "N2H2O4": {
        "product": "Dinitroamine",
        "formula": "N2H2O4",
        "ratio": {
            "N": 2,
            "H": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C4H8O5": {
        "product": "Tetrahydrofuran Peroxide",
        "formula": "C4H8O5",
        "ratio": {
            "C": 4,
            "H": 8,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "BCl5": {
        "product": "Boron Pentachloride",
        "formula": "BCl5",
        "ratio": {
            "B": 1,
            "Cl": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "TlI3": {
        "product": "Thallium Triiodide",
        "formula": "TlI3",
        "ratio": {
            "Tl": 1,
            "I": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H14LiN": {
        "product": "Lithium Diisopropylamide",
        "formula": "C6H14LiN",
        "ratio": {
            "C": 6,
            "H": 14,
            "Li": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C2H10BN": {
        "product": "Borane Dimethylamine",
        "formula": "C2H10BN",
        "ratio": {
            "B": 1,
            "C": 2,
            "H": 10,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PRPP Synthase": {
        "product": "Phosphoribosylpyrophosphate Synthetase",
        "formula": "PRPP Synthase",
        "ratio": {
            "C": 5,
            "P": 2,
            "O": 8,
            "H": 10,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CNBr": {
        "product": "Cyanogen Bromide",
        "formula": "CNBr",
        "ratio": {
            "C": 1,
            "N": 1,
            "Br": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NOCl4": {
        "product": "Nitrosyl Tetrachloride",
        "formula": "NOCl4",
        "ratio": {
            "N": 1,
            "O": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "S3O2": {
        "product": "Sulfur Sesquioxide",
        "formula": "S3O2",
        "ratio": {
            "S": 3,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H8OS": {
        "product": "Dimethylsulfoxonium Methylide",
        "formula": "C3H8OS",
        "ratio": {
            "C": 3,
            "H": 8,
            "O": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AsCl6": {
        "product": "Arsenic Hexachloride",
        "formula": "AsCl6",
        "ratio": {
            "As": 1,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CH4O": {
        "product": "Hydroxymethane",
        "formula": "CH4O",
        "ratio": {
            "C": 1,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CrO2(SO3F)2": {
        "product": "Chromyl Fluorosulfate",
        "formula": "CrO2(SO3F)2",
        "ratio": {
            "Cr": 1,
            "O": 4,
            "S": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "As2O6": {
        "product": "Diarsenic Hexoxide",
        "formula": "As2O6",
        "ratio": {
            "As": 2,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "AuF9": {
        "product": "Fluoronanogold",
        "formula": "AuF9",
        "ratio": {
            "Au": 1,
            "F": 9
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Se4N4": {
        "product": "Tetraselenium Tetranitride",
        "formula": "Se4N4",
        "ratio": {
            "Se": 4,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "I2O6": {
        "product": "Hypervalent Iodine Oxide",
        "formula": "I2O6",
        "ratio": {
            "I": 2,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NbH3": {
        "product": "Niobium Hydride",
        "formula": "NbH3",
        "ratio": {
            "Nb": 1,
            "H": 3
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "H2S3": {
        "product": "Trisulfane",
        "formula": "H2S3",
        "ratio": {
            "H": 2,
            "S": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "WB4": {
        "product": "Tungsten Tetraboride",
        "formula": "WB4",
        "ratio": {
            "W": 1,
            "B": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C6H2(NO2)5NH2": {
        "product": "Pentanitroaniline",
        "formula": "C6H2(NO2)5NH2",
        "ratio": {
            "C": 6,
            "H": 3,
            "N": 6,
            "O": 10
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "FmCl3": {
        "product": "Fermium(III) Chloride",
        "formula": "FmCl3",
        "ratio": {
            "Fm": 1,
            "Cl": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BiOI": {
        "product": "Bismuth Oxyiodide",
        "formula": "BiOI",
        "ratio": {
            "Bi": 1,
            "O": 1,
            "I": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PuF4": {
        "product": "Plutonium Tetrafluoride",
        "formula": "PuF4",
        "ratio": {
            "Pu": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NaMnO4": {
        "product": "Sodium Permanganate",
        "formula": "NaMnO4",
        "ratio": {
            "Na": 1,
            "Mn": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NaHSO3": {
        "product": "Sodium Bisulfite",
        "formula": "NaHSO3",
        "ratio": {
            "Na": 1,
            "H": 1,
            "S": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Na2IrO3": {
        "product": "Sodium Iridate",
        "formula": "Na2IrO3",
        "ratio": {
            "Na": 2,
            "Ir": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Li2O3": {
        "product": "Dilithium Trioxide",
        "formula": "Li2O3",
        "ratio": {
            "Li": 2,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C5H10O": {
        "product": "Tetrahydropyran",
        "formula": "C5H10O",
        "ratio": {
            "C": 5,
            "H": 10,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "[PtCl4]2-": {
        "product": "Tetrachloroplatinate(II) Ion",
        "formula": "[PtCl4]2-",
        "ratio": {
            "Pt": 1,
            "Cl": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C5F10": {
        "product": "Perfluorocyclopentane",
        "formula": "C5F10",
        "ratio": {
            "C": 5,
            "F": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C2H2O": {
        "product": "Ethenone",
        "formula": "C2H2O",
        "ratio": {
            "C": 2,
            "H": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FmBr2": {
        "product": "Fermium(II) Bromide",
        "formula": "FmBr2",
        "ratio": {
            "Fm": 1,
            "Br": 2
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "CrN6": {
        "product": "Chromium Hexanitride",
        "formula": "CrN6",
        "ratio": {
            "Cr": 1,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C8H9Br": {
        "product": "Xylyl Bromide",
        "formula": "C8H9Br",
        "ratio": {
            "C": 8,
            "H": 9,
            "Br": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C26H20": {
        "product": "Tetraphenylethylene",
        "formula": "C26H20",
        "ratio": {
            "C": 26,
            "H": 20
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "UO2F2": {
        "product": "Uranyl Fluoride",
        "formula": "UO2F2",
        "ratio": {
            "U": 1,
            "O": 2,
            "F": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HClO4(g)": {
        "product": "Perchloric Acid Gas",
        "formula": "HClO4(g)",
        "ratio": {
            "H": 1,
            "Cl": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C18H15ClSn": {
        "product": "Triphenyltin Chloride",
        "formula": "C18H15ClSn",
        "ratio": {
            "C": 18,
            "H": 15,
            "Cl": 1,
            "Sn": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C22H30O4": {
        "product": "Tetrahydrocannabinol-acid",
        "formula": "C22H30O4",
        "ratio": {
            "C": 22,
            "H": 30,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cs2PtCl6": {
        "product": "Cesium Chloroplatinate",
        "formula": "Cs2PtCl6",
        "ratio": {
            "Cs": 2,
            "Pt": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "FmF3": {
        "product": "Fermium(III) Fluoride",
        "formula": "FmF3",
        "ratio": {
            "Fm": 1,
            "F": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C12H5N5O10": {
        "product": "Pentanitrobiphenyl",
        "formula": "C12H5N5O10",
        "ratio": {
            "C": 12,
            "H": 5,
            "N": 5,
            "O": 10
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "FeSe2": {
        "product": "Iron Diselenide",
        "formula": "FeSe2",
        "ratio": {
            "Fe": 1,
            "Se": 2
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4O4": {
        "product": "Cyclobutane Tetrone",
        "formula": "C4O4",
        "ratio": {
            "C": 4,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C6N6": {
        "product": "Hexaazabenzene",
        "formula": "C6N6",
        "ratio": {
            "C": 6,
            "N": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "AtF5": {
        "product": "Astatine Pentafluoride",
        "formula": "AtF5",
        "ratio": {
            "At": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "LiB2": {
        "product": "Lithium Diboride",
        "formula": "LiB2",
        "ratio": {
            "Li": 1,
            "B": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(NH4)2[SnCl6]": {
        "product": "Ammonium Hexachlorostannate",
        "formula": "(NH4)2[SnCl6]",
        "ratio": {
            "N": 2,
            "H": 8,
            "Sn": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H2N6O12": {
        "product": "Hexanitroisobenzofuran",
        "formula": "C6H2N6O12",
        "ratio": {
            "C": 6,
            "H": 2,
            "N": 6,
            "O": 12
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "MoI6": {
        "product": "Molybdenum Hexaiodide",
        "formula": "MoI6",
        "ratio": {
            "Mo": 1,
            "I": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H3PO4\u00b72H2O": {
        "product": "Phosphoric Acid Dihydrate",
        "formula": "H3PO4\u00b72H2O",
        "ratio": {
            "H": 8,
            "P": 1,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cu(HCOO)2": {
        "product": "Copper Formate",
        "formula": "Cu(HCOO)2",
        "ratio": {
            "Cu": 1,
            "C": 2,
            "H": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4F6O3": {
        "product": "Trifluoroacetic Acid Anhydride",
        "formula": "C4F6O3",
        "ratio": {
            "C": 4,
            "F": 6,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "LiOOH": {
        "product": "Lithium Hydroperoxide",
        "formula": "LiOOH",
        "ratio": {
            "Li": 1,
            "O": 2,
            "H": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C7H5N4O8": {
        "product": "Trinitrotoluene (Tetryl)",
        "formula": "C7H5N4O8",
        "ratio": {
            "C": 7,
            "H": 5,
            "N": 4,
            "O": 8
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "HOCN": {
        "product": "Cyanic Acid",
        "formula": "HOCN",
        "ratio": {
            "H": 1,
            "O": 1,
            "C": 1,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Fe2(CrO4)3": {
        "product": "Iron(III) Chromate",
        "formula": "Fe2(CrO4)3",
        "ratio": {
            "Fe": 2,
            "Cr": 3,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AgSCN": {
        "product": "Silver Thiocyanate",
        "formula": "AgSCN",
        "ratio": {
            "Ag": 1,
            "S": 1,
            "C": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "WO2": {
        "product": "Tungsten Suboxide",
        "formula": "WO2",
        "ratio": {
            "W": 1,
            "O": 2
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "SI6": {
        "product": "Sulfur Hexaiodide",
        "formula": "SI6",
        "ratio": {
            "S": 1,
            "I": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Co2(CO)8": {
        "product": "Octacarbonyl Dicobalt",
        "formula": "Co2(CO)8",
        "ratio": {
            "Co": 2,
            "C": 8,
            "O": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "LiNH4BH4": {
        "product": "Lithium Ammonium Borohydride",
        "formula": "LiNH4BH4",
        "ratio": {
            "Li": 1,
            "N": 1,
            "H": 8,
            "B": 1
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C6H12O": {
        "product": "Cyclohexanol",
        "formula": "C6H12O",
        "ratio": {
            "C": 6,
            "H": 12,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4H5OP": {
        "product": "Phosphorine Oxide",
        "formula": "C4H5OP",
        "ratio": {
            "C": 4,
            "H": 5,
            "O": 1,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "SO2Br2": {
        "product": "Sulfuryl Bromide",
        "formula": "SO2Br2",
        "ratio": {
            "S": 1,
            "O": 2,
            "Br": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H3PS3": {
        "product": "Phosphorotrithious Acid",
        "formula": "H3PS3",
        "ratio": {
            "H": 3,
            "P": 1,
            "S": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "As(OH)3": {
        "product": "Arsine Hydroxide",
        "formula": "As(OH)3",
        "ratio": {
            "As": 1,
            "O": 3,
            "H": 3
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "SnCl2": {
        "product": "Stannous Chloride",
        "formula": "SnCl2",
        "ratio": {
            "Sn": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "As4Cl6": {
        "product": "Tetraarsenic Hexachloride",
        "formula": "As4Cl6",
        "ratio": {
            "As": 4,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BH4\u00b7CH3OH": {
        "product": "Borohydride Methanol Complex",
        "formula": "BH4\u00b7CH3OH",
        "ratio": {
            "B": 1,
            "H": 5,
            "C": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "ReF5": {
        "product": "Rhenium Pentafluoride",
        "formula": "ReF5",
        "ratio": {
            "Re": 1,
            "F": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Mn(CO)5Br": {
        "product": "Manganese Pentacarbonyl Bromide",
        "formula": "Mn(CO)5Br",
        "ratio": {
            "Mn": 1,
            "C": 5,
            "O": 5,
            "Br": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2Cl4(NO2)2": {
        "product": "Tetrachlorodinitroethane",
        "formula": "C2Cl4(NO2)2",
        "ratio": {
            "C": 2,
            "Cl": 4,
            "N": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C7H7NO": {
        "product": "Benzamide",
        "formula": "C7H7NO",
        "ratio": {
            "C": 7,
            "H": 7,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CrO6": {
        "product": "Chromium Hexoxide",
        "formula": "CrO6",
        "ratio": {
            "Cr": 1,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H2O": {
        "product": "Cyclopropenone",
        "formula": "C3H2O",
        "ratio": {
            "C": 3,
            "H": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H2SO3": {
        "product": "Sulfurous Acid",
        "formula": "H2SO3",
        "ratio": {
            "H": 2,
            "S": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "WO3": {
        "product": "Tungsten Trioxide",
        "formula": "WO3",
        "ratio": {
            "W": 1,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C15H21AlO6": {
        "product": "Aluminum Acetylacetonate",
        "formula": "C15H21AlO6",
        "ratio": {
            "C": 15,
            "H": 21,
            "Al": 1,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C7H7-": {
        "product": "Cycloheptatrienyl Anion (Tropylium)",
        "formula": "C7H7-",
        "ratio": {
            "C": 7,
            "H": 7
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "AlF3\u00b79H2O": {
        "product": "Aluminium Fluoride Hydrate",
        "formula": "AlF3\u00b79H2O",
        "ratio": {
            "Al": 1,
            "F": 3,
            "H": 18,
            "O": 9
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "K[N(NO2)2]": {
        "product": "Potassium Dinitramide",
        "formula": "K[N(NO2)2]",
        "ratio": {
            "K": 1,
            "N": 3,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Cr(C2H3O2)3": {
        "product": "Hexaacetatochromium(III)",
        "formula": "Cr(C2H3O2)3",
        "ratio": {
            "Cr": 1,
            "C": 6,
            "H": 9,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Ru(C5H7O2)3": {
        "product": "Ruthenium(III) Acetylacetonate",
        "formula": "Ru(C5H7O2)3",
        "ratio": {
            "Ru": 1,
            "C": 15,
            "H": 21,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "BH": {
        "product": "Borylene",
        "formula": "BH",
        "ratio": {
            "B": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "AlPO4": {
        "product": "Aluminium Phosphate",
        "formula": "AlPO4",
        "ratio": {
            "Al": 1,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CaB6": {
        "product": "Calcium Boride",
        "formula": "CaB6",
        "ratio": {
            "Ca": 1,
            "B": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NaNO3": {
        "product": "Sodium Hydronitrate",
        "formula": "NaNO3",
        "ratio": {
            "Na": 1,
            "N": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3H3N3O3": {
        "product": "Cyanuric Acid",
        "formula": "C3H3N3O3",
        "ratio": {
            "C": 3,
            "H": 3,
            "N": 3,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "N2Cl6": {
        "product": "Dinitrogen Hexachloride",
        "formula": "N2Cl6",
        "ratio": {
            "N": 2,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "CaTe": {
        "product": "Calcium Telluride",
        "formula": "CaTe",
        "ratio": {
            "Ca": 1,
            "Te": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PCl2": {
        "product": "Phosphorus Dichloride",
        "formula": "PCl2",
        "ratio": {
            "P": 1,
            "Cl": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CH3NO2": {
        "product": "Carbamic Acid",
        "formula": "CH3NO2",
        "ratio": {
            "C": 1,
            "H": 3,
            "N": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "BeF2": {
        "product": "Beryllium Fluoride",
        "formula": "BeF2",
        "ratio": {
            "Be": 1,
            "F": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CsBr": {
        "product": "Cesium Bromide",
        "formula": "CsBr",
        "ratio": {
            "Cs": 1,
            "Br": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "VF6": {
        "product": "Vanadium Hexafluoride",
        "formula": "VF6",
        "ratio": {
            "V": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "N2H4O2": {
        "product": "Hydrazinium Dioxide",
        "formula": "N2H4O2",
        "ratio": {
            "N": 2,
            "H": 4,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "TiF4": {
        "product": "Titanium Tetrafluoride",
        "formula": "TiF4",
        "ratio": {
            "Ti": 1,
            "F": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NSCl": {
        "product": "Thiazyl Chloride",
        "formula": "NSCl",
        "ratio": {
            "N": 1,
            "S": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H2CPO": {
        "product": "Phosphinoethynol",
        "formula": "H2CPO",
        "ratio": {
            "H": 2,
            "C": 1,
            "P": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "LiBiO3": {
        "product": "Lithium Bismuthate",
        "formula": "LiBiO3",
        "ratio": {
            "Li": 1,
            "Bi": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "P4S7": {
        "product": "Tetraphosphorus Heptasulfide",
        "formula": "P4S7",
        "ratio": {
            "P": 4,
            "S": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ni(CO)5": {
        "product": "Pentacarbonyl Nickel",
        "formula": "Ni(CO)5",
        "ratio": {
            "Ni": 1,
            "C": 5,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "FeF3": {
        "product": "Iron(III) Fluoride",
        "formula": "FeF3",
        "ratio": {
            "Fe": 1,
            "F": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C3H7N": {
        "product": "Cyclopropylamine",
        "formula": "C3H7N",
        "ratio": {
            "C": 3,
            "H": 7,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "P4Se5": {
        "product": "Tetraphosphorus Pentaselenide",
        "formula": "P4Se5",
        "ratio": {
            "P": 4,
            "Se": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ag3PO4": {
        "product": "Trisilver Phosphate",
        "formula": "Ag3PO4",
        "ratio": {
            "Ag": 3,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Pt(NO3)6": {
        "product": "Platinum Hexanitrate",
        "formula": "Pt(NO3)6",
        "ratio": {
            "Pt": 1,
            "N": 6,
            "O": 18
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Si2Cl6": {
        "product": "Hexachlorodisilane",
        "formula": "Si2Cl6",
        "ratio": {
            "Si": 2,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P4F3": {
        "product": "Tetraphosphorus Trifluoride",
        "formula": "P4F3",
        "ratio": {
            "P": 4,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NH4CN": {
        "product": "Ammonium Cyanide",
        "formula": "NH4CN",
        "ratio": {
            "N": 2,
            "H": 4,
            "C": 1
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "C70": {
        "product": "Fullerene C70",
        "formula": "C70",
        "ratio": {
            "C": 70
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C8H4O3": {
        "product": "Phthalic Anhydride",
        "formula": "C8H4O3",
        "ratio": {
            "C": 8,
            "H": 4,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "O2-": {
        "product": "Superoxide Anion",
        "formula": "O2-",
        "ratio": {
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Ge": {
        "product": "Germanene",
        "formula": "Ge",
        "ratio": {
            "Ge": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "PoCl4": {
        "product": "Polonium Tetrachloride",
        "formula": "PoCl4",
        "ratio": {
            "Po": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "WI6": {
        "product": "Tungsten Hexaiodide",
        "formula": "WI6",
        "ratio": {
            "W": 1,
            "I": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cs2O2": {
        "product": "Cesium Peroxide",
        "formula": "Cs2O2",
        "ratio": {
            "Cs": 2,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NaHSeO3": {
        "product": "Sodium Hydrogen Selenite",
        "formula": "NaHSeO3",
        "ratio": {
            "Na": 1,
            "H": 1,
            "Se": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "BH3O4": {
        "product": "Tetrahydroxyboric Acid",
        "formula": "BH3O4",
        "ratio": {
            "B": 1,
            "H": 3,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "P5+": {
        "product": "Phosphorus Cation",
        "formula": "P5+",
        "ratio": {
            "P": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "K2BeO2": {
        "product": "Potassium Beryllate",
        "formula": "K2BeO2",
        "ratio": {
            "K": 2,
            "Be": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CS4": {
        "product": "Carbon Tetrasulfide",
        "formula": "CS4",
        "ratio": {
            "C": 1,
            "S": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "(C2H5)4Pb": {
        "product": "Tetraethyllead",
        "formula": "(C2H5)4Pb",
        "ratio": {
            "C": 8,
            "H": 20,
            "Pb": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "KAl(SO4)2\u00b712H2O": {
        "product": "Potassium Alum",
        "formula": "KAl(SO4)2\u00b712H2O",
        "ratio": {
            "K": 1,
            "Al": 1,
            "S": 2,
            "O": 8,
            "H": 24
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "P3O5": {
        "product": "Triphosphorus Pentoxide",
        "formula": "P3O5",
        "ratio": {
            "P": 3,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "ArF6": {
        "product": "Argon Hexafluoride",
        "formula": "ArF6",
        "ratio": {
            "Ar": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cu2SO4": {
        "product": "Copper(I) Sulfate",
        "formula": "Cu2SO4",
        "ratio": {
            "Cu": 2,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AtH": {
        "product": "Astatine Hydride",
        "formula": "AtH",
        "ratio": {
            "At": 1,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "HgBr2": {
        "product": "Mercury(II) Bromide",
        "formula": "HgBr2",
        "ratio": {
            "Hg": 1,
            "Br": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "NO+": {
        "product": "Nitrosonium Ion",
        "formula": "NO+",
        "ratio": {
            "N": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "KAu": {
        "product": "Potassium Auride",
        "formula": "KAu",
        "ratio": {
            "K": 1,
            "Au": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "H2SO4\u00b7H2O": {
        "product": "Sulfuric Acid Hydrate",
        "formula": "H2SO4\u00b7H2O",
        "ratio": {
            "H": 4,
            "S": 1,
            "O": 5
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "LiPF6": {
        "product": "Lithium Hexafluorophosphate",
        "formula": "LiPF6",
        "ratio": {
            "Li": 1,
            "P": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "KICl2": {
        "product": "Potassium Dichloroiodate(I)",
        "formula": "KICl2",
        "ratio": {
            "K": 1,
            "I": 1,
            "Cl": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NSF": {
        "product": "Thiazyl Fluoride",
        "formula": "NSF",
        "ratio": {
            "N": 1,
            "S": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "As4O3": {
        "product": "Tetraarsenic Trioxide",
        "formula": "As4O3",
        "ratio": {
            "As": 4,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C5F5": {
        "product": "Pentacarbon Pentafluoride",
        "formula": "C5F5",
        "ratio": {
            "C": 5,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Ba(ClO3)2": {
        "product": "Barium Chlorate",
        "formula": "Ba(ClO3)2",
        "ratio": {
            "Ba": 1,
            "Cl": 2,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PtBr4": {
        "product": "Platinum(IV) Bromide",
        "formula": "PtBr4",
        "ratio": {
            "Pt": 1,
            "Br": 4
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HCOONa": {
        "product": "Sodium Formate",
        "formula": "HCOONa",
        "ratio": {
            "H": 1,
            "C": 1,
            "O": 2,
            "Na": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "AlB2": {
        "product": "Aluminium Diboride",
        "formula": "AlB2",
        "ratio": {
            "Al": 1,
            "B": 2
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "NH4H2PO2": {
        "product": "Ammonium Hypophosphite",
        "formula": "NH4H2PO2",
        "ratio": {
            "N": 1,
            "H": 6,
            "P": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C4H6CaN2O4": {
        "product": "Calcium Diglycinate",
        "formula": "C4H6CaN2O4",
        "ratio": {
            "Ca": 1,
            "C": 4,
            "H": 6,
            "N": 2,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "KH2PO4": {
        "product": "Potassium Dihydrogen Phosphate",
        "formula": "KH2PO4",
        "ratio": {
            "K": 1,
            "H": 2,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2H6S": {
        "product": "Dimethyl Sulfide",
        "formula": "C2H6S",
        "ratio": {
            "C": 2,
            "H": 6,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "K3C6O6": {
        "product": "Potassium Trioxalate",
        "formula": "K3C6O6",
        "ratio": {
            "K": 3,
            "C": 6,
            "O": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Al2Br6": {
        "product": "Aluminum Tetrabromide",
        "formula": "Al2Br6",
        "ratio": {
            "Al": 2,
            "Br": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "GeH4": {
        "product": "Germane",
        "formula": "GeH4",
        "ratio": {
            "Ge": 1,
            "H": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "N2O7": {
        "product": "Dinitrogen Heptoxide",
        "formula": "N2O7",
        "ratio": {
            "N": 2,
            "O": 7
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Fe2S3": {
        "product": "Iron(III) Sulfide",
        "formula": "Fe2S3",
        "ratio": {
            "Fe": 2,
            "S": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C2N2S2": {
        "product": "Thiocyanogen",
        "formula": "C2N2S2",
        "ratio": {
            "C": 2,
            "N": 2,
            "S": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H7NO6Na": {
        "product": "Sodium Ammonium Tartrate",
        "formula": "C4H7NO6Na",
        "ratio": {
            "C": 4,
            "H": 7,
            "N": 1,
            "O": 6,
            "Na": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CoF3": {
        "product": "Cobalt(III) Fluoride",
        "formula": "CoF3",
        "ratio": {
            "Co": 1,
            "F": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "NHF2": {
        "product": "Difluoramine",
        "formula": "NHF2",
        "ratio": {
            "N": 1,
            "H": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "KBrO": {
        "product": "Potassium Hypobromite",
        "formula": "KBrO",
        "ratio": {
            "K": 1,
            "Br": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "(NH4)3Cl2PO4": {
        "product": "Ammonium Dichlorophosphate",
        "formula": "(NH4)3Cl2PO4",
        "ratio": {
            "N": 3,
            "H": 12,
            "Cl": 2,
            "P": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "XePtF6": {
        "product": "Xenon Hexafluoroplatinate",
        "formula": "XePtF6",
        "ratio": {
            "Xe": 1,
            "Pt": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(NH4)3[PO4(MoO3)12]": {
        "product": "Ammonium Phosphomolybdate",
        "formula": "(NH4)3[PO4(MoO3)12]",
        "ratio": {
            "N": 3,
            "H": 12,
            "P": 1,
            "O": 40,
            "Mo": 12
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "N2F5": {
        "product": "Dinitrogen Pentafluoride",
        "formula": "N2F5",
        "ratio": {
            "N": 2,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Si6H14": {
        "product": "Hexasilane",
        "formula": "Si6H14",
        "ratio": {
            "Si": 6,
            "H": 14
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "SOD": {
        "product": "Superoxide Dismutase",
        "formula": "SOD",
        "ratio": {
            "Mn": 1,
            "O": 2,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "F2O2": {
        "product": "Fluorine Peroxide",
        "formula": "F2O2",
        "ratio": {
            "F": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "AgHgCNO": {
        "product": "Silver Fulminating Mercury",
        "formula": "AgHgCNO",
        "ratio": {
            "Ag": 1,
            "Hg": 1,
            "C": 1,
            "N": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C8H2F6": {
        "product": "Hexafluoroxylene",
        "formula": "C8H2F6",
        "ratio": {
            "C": 8,
            "H": 2,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "P4Cl6": {
        "product": "Tetraphosphorus Hexachloride",
        "formula": "P4Cl6",
        "ratio": {
            "P": 4,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(NH4)2SeO4": {
        "product": "Ammonium Selenate",
        "formula": "(NH4)2SeO4",
        "ratio": {
            "N": 2,
            "H": 8,
            "Se": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "HF:HSbF6:H2O": {
        "product": "Fluoroantimonic Acid Monohydrate",
        "formula": "HF:HSbF6:H2O",
        "ratio": {
            "H": 3,
            "F": 7,
            "Sb": 1,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "CfBr4\u00b7nH2O": {
        "product": "Californium Tetrabromide Hydrate",
        "formula": "CfBr4\u00b7nH2O",
        "ratio": {
            "Cf": 1,
            "Br": 4,
            "H": 2,
            "O": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "P4Se4": {
        "product": "Tetraphosphorus Tetraselenide",
        "formula": "P4Se4",
        "ratio": {
            "P": 4,
            "Se": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Li2F": {
        "product": "Dilithium Monofluoride",
        "formula": "Li2F",
        "ratio": {
            "Li": 2,
            "F": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "Mg(HS)3": {
        "product": "Magnesium Trihydrosulfide",
        "formula": "Mg(HS)3",
        "ratio": {
            "Mg": 1,
            "H": 3,
            "S": 3
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "VO(SO4)F": {
        "product": "Vanadium Oxyfluorosulfate",
        "formula": "VO(SO4)F",
        "ratio": {
            "V": 1,
            "O": 4,
            "S": 1,
            "F": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C108H138N39O49P10": {
        "product": "Phosphoribosylpyrophosphate Synthetase",
        "formula": "C108H138N39O49P10",
        "ratio": {
            "C": 108,
            "H": 138,
            "N": 39,
            "O": 49,
            "P": 10
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Cr[Fe(CN)6]": {
        "product": "Chromium Hexacyanoferrate(III)",
        "formula": "Cr[Fe(CN)6]",
        "ratio": {
            "Cr": 1,
            "Fe": 1,
            "C": 6,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Cu(NO3)4": {
        "product": "Tetranitratocopper(II)",
        "formula": "Cu(NO3)4",
        "ratio": {
            "Cu": 1,
            "N": 4,
            "O": 12
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "Be(BH4)2": {
        "product": "Beryllium Tetrahydroborate",
        "formula": "Be(BH4)2",
        "ratio": {
            "Be": 1,
            "B": 2,
            "H": 8
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "COOH": {
        "product": "Hydroxycarbonyl radical",
        "formula": "COOH",
        "ratio": {
            "C": 1,
            "O": 2,
            "H": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H10NSF3": {
        "product": "Diethylaminosulfur trifluoride",
        "formula": "C4H10NSF3",
        "ratio": {
            "C": 4,
            "H": 10,
            "N": 1,
            "S": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C3H2N4O3": {
        "product": "Fulminuric acid",
        "formula": "C3H2N4O3",
        "ratio": {
            "C": 3,
            "H": 2,
            "N": 4,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "S2O": {
        "product": "Disulfur monoxide",
        "formula": "S2O",
        "ratio": {
            "S": 2,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4": {
        "product": "Graphdiyne",
        "formula": "C4",
        "ratio": {
            "C": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "CrF5": {
        "product": "Chromium Pentafluoride",
        "formula": "CrF5",
        "ratio": {
            "Cr": 1,
            "F": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "KClMgSO4": {
        "product": "Seawater Salt",
        "formula": "KClMgSO4",
        "ratio": {
            "K": 1,
            "Cl": 1,
            "Mg": 1,
            "S": 1,
            "O": 4
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "KCAAl": {
        "product": "Potassium Chloride Aluminum",
        "formula": "KCAAl",
        "ratio:<": -0.0
    },
    "C4H9F4O": {
        "product": "Hydrofluoroether",
        "formula": "C4H9F4O",
        "ratio": {
            "C": 4,
            "H": 9,
            "F": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C3H9SiCl": {
        "product": "Trimethylsilyl Chloride",
        "formula": "C3H9SiCl",
        "ratio": {
            "C": 3,
            "H": 9,
            "Si": 1,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "CH3Cl": {
        "product": "Methyl Chloride",
        "formula": "CH3Cl",
        "ratio": {
            "C": 1,
            "H": 3,
            "Cl": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Al(BrO3)3": {
        "product": "Aluminum Bromate",
        "formula": "Al(BrO3)3",
        "ratio": {
            "Al": 1,
            "Br": 3,
            "O": 9
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "SF3": {
        "product": "Sulfur Trifluoride",
        "formula": "SF3",
        "ratio": {
            "S": 1,
            "F": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Na3PO4\u00b712H2O": {
        "product": "Trisodium Phosphate Dodecahydrate",
        "formula": "Na3PO4\u00b712H2O",
        "ratio": {
            "Na": 3,
            "P": 1,
            "O": 16,
            "H": 24
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "O2+[PtF6-]": {
        "product": "Dioxygenyl Hexafluoroplatinate",
        "formula": "O2+[PtF6-]",
        "ratio": {
            "O": 2,
            "Pt": 1,
            "F": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "HNO3Pt": {
        "product": "Nitrooxoplatinic Acid",
        "formula": "HNO3Pt",
        "ratio": {
            "H": 1,
            "N": 1,
            "O": 3,
            "Pt": 1
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C2H6O\u00b7H2O": {
        "product": "Dimethyl Ether Hydrate",
        "formula": "C2H6O\u00b7H2O",
        "ratio": {
            "C": 2,
            "H": 8,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Bi2S3": {
        "product": "Bismuthinite",
        "formula": "Bi2S3",
        "ratio": {
            "Bi": 2,
            "S": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PaBr5": {
        "product": "Protactinium Pentabromide",
        "formula": "PaBr5",
        "ratio": {
            "Pa": 1,
            "Br": 5
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "TcF6": {
        "product": "Technetium Hexafluoride",
        "formula": "TcF6",
        "ratio": {
            "Tc": 1,
            "F": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "ThS2": {
        "product": "Thorium Disulfide",
        "formula": "ThS2",
        "ratio": {
            "Th": 1,
            "S": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "[AgO2]-": {
        "product": "Argentate Ion",
        "formula": "[AgO2]-",
        "ratio": {
            "Ag": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "[O2]+": {
        "product": "Dioxygenyl Ion",
        "formula": "[O2]+",
        "ratio": {
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C4H4O": {
        "product": "Furan",
        "formula": "C4H4O",
        "ratio": {
            "C": 4,
            "H": 4,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PBr3O": {
        "product": "Phosphorus Tribromoxide",
        "formula": "PBr3O",
        "ratio": {
            "P": 1,
            "Br": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H2O3": {
        "product": "Hydroxymethylperoxide",
        "formula": "H2O3",
        "ratio": {
            "H": 2,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "O3+": {
        "product": "Ozonium",
        "formula": "O3+",
        "ratio": {
            "O": 3
        },
        "type": "Reactive Intermediate",
        "behavior": "reactive"
    },
    "C5H5Na": {
        "product": "Cyclopentadienyl Sodium",
        "formula": "C5H5Na",
        "ratio": {
            "C": 5,
            "H": 5,
            "Na": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "AlCl4": {
        "product": "Aluminum Tetrachloride",
        "formula": "AlCl4",
        "ratio": {
            "Al": 1,
            "Cl": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "(C3H3NaO2)n": {
        "product": "Sodium Polyacrylate",
        "formula": "(C3H3NaO2)n",
        "ratio": {
            "C": 3,
            "H": 3,
            "Na": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C4H2O2": {
        "product": "Cyclobutadiene Dione",
        "formula": "C4H2O2",
        "ratio": {
            "C": 4,
            "H": 2,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C12H23NaO2": {
        "product": "Sodium Laurate",
        "formula": "C12H23NaO2",
        "ratio": {
            "C": 12,
            "H": 23,
            "Na": 1,
            "O": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "PCl6": {
        "product": "Phosphorus Hexachloride",
        "formula": "PCl6",
        "ratio": {
            "P": 1,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Pt(C2H3O2)4": {
        "product": "Platinum Tetraacetate",
        "formula": "Pt(C2H3O2)4",
        "ratio": {
            "Pt": 1,
            "C": 8,
            "H": 12,
            "O": 8
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NaAlO2\u00b7H2O": {
        "product": "Sodium Aluminate Hydroxide",
        "formula": "NaAlO2\u00b7H2O",
        "ratio": {
            "Na": 1,
            "Al": 1,
            "O": 3,
            "H": 2
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "(CH3)3Si)3P": {
        "product": "Tris(trimethylsilyl)phosphine",
        "formula": "(CH3)3Si)3P",
        "ratio": {
            "C": 9,
            "H": 27,
            "Si": 3,
            "P": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Li2B4O7": {
        "product": "Lithium Tetraborate",
        "formula": "Li2B4O7",
        "ratio": {
            "Li": 2,
            "B": 4,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C6H19NSi2": {
        "product": "Hexamethyldisilazane",
        "formula": "C6H19NSi2",
        "ratio": {
            "C": 6,
            "H": 19,
            "N": 1,
            "Si": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "(C4H9)4NF": {
        "product": "Tetrabutylammonium Fluoride",
        "formula": "(C4H9)4NF",
        "ratio": {
            "C": 16,
            "H": 36,
            "N": 1,
            "F": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "FeN4": {
        "product": "Iron Tetranitride",
        "formula": "FeN4",
        "ratio": {
            "Fe": 1,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "Al2B4O7": {
        "product": "Aluminum Tetraborate",
        "formula": "Al2B4O7",
        "ratio": {
            "Al": 2,
            "B": 4,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "SiCl6": {
        "product": "Silicon Hexachloride",
        "formula": "SiCl6",
        "ratio": {
            "Si": 1,
            "Cl": 6
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "CsIO3": {
        "product": "Cesium Iodate",
        "formula": "CsIO3",
        "ratio": {
            "Cs": 1,
            "I": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CH3N": {
        "product": "Methanimine",
        "formula": "CH3N",
        "ratio": {
            "C": 1,
            "H": 3,
            "N": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "H2O4": {
        "product": "Dihydroxydioxirane",
        "formula": "H2O4",
        "ratio": {
            "H": 2,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "SF5CF3": {
        "product": "Trifluoromethyl Sulfur Pentafluoride",
        "formula": "SF5CF3",
        "ratio": {
            "S": 1,
            "F": 8,
            "C": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "N2F4": {
        "product": "Tetrafluorohydrazine",
        "formula": "N2F4",
        "ratio": {
            "N": 2,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "SiO": {
        "product": "Silicon Monoxide",
        "formula": "SiO",
        "ratio": {
            "Si": 1,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C8H20BrN": {
        "product": "Tetraethylammonium Bromide",
        "formula": "C8H20BrN",
        "ratio": {
            "C": 8,
            "H": 20,
            "Br": 1,
            "N": 1
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Na4[Fe(CN)6]": {
        "product": "Sodium Hexacyanoferrate(II)",
        "formula": "Na4[Fe(CN)6]",
        "ratio": {
            "Na": 4,
            "Fe": 1,
            "C": 6,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C10H10O": {
        "product": "Benzylideneacetone",
        "formula": "C10H10O",
        "ratio": {
            "C": 10,
            "H": 10,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C28H38O19": {
        "product": "Sucrose Octaacetate",
        "formula": "C28H38O19",
        "ratio": {
            "C": 28,
            "H": 38,
            "O": 19
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "NH4VO3": {
        "product": "Ammonium Trioxovanadate(V)",
        "formula": "NH4VO3",
        "ratio": {
            "N": 1,
            "H": 4,
            "V": 1,
            "O": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ca3(AsO4)2": {
        "product": "Calcium Arsenate",
        "formula": "Ca3(AsO4)2",
        "ratio": {
            "Ca": 3,
            "As": 2,
            "O": 8
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Ni2S3": {
        "product": "Dinickel Trisulfide",
        "formula": "Ni2S3",
        "ratio": {
            "Ni": 2,
            "S": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "[Ni(H2O)6]2+": {
        "product": "Aqua Ion",
        "formula": "[Ni(H2O)6]2+",
        "ratio": {
            "Ni": 1,
            "H": 12,
            "O": 6
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PtF3": {
        "product": "Platinum Trifluoride",
        "formula": "PtF3",
        "ratio": {
            "Pt": 1,
            "F": 3
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "Si2Br6": {
        "product": "Disilicon Hexabromide",
        "formula": "Si2Br6",
        "ratio": {
            "Si": 2,
            "Br": 6
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Zn6": {
        "product": "Hexazinc",
        "formula": "Zn6",
        "ratio": {
            "Zn": 6
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "NaN(CH3)2": {
        "product": "Sodium Dimethylamide",
        "formula": "NaN(CH3)2",
        "ratio": {
            "Na": 1,
            "N": 1,
            "C": 2,
            "H": 6
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "H2SiCl2": {
        "product": "Dichlorosilane",
        "formula": "H2SiCl2",
        "ratio": {
            "Si": 1,
            "Cl": 2,
            "H": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "FO2": {
        "product": "Fluorine Dioxide",
        "formula": "FO2",
        "ratio": {
            "F": 1,
            "O": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "Ca(N3)2": {
        "product": "Calcium Azide",
        "formula": "Ca(N3)2",
        "ratio": {
            "Ca": 1,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "explosive"
    },
    "B3H7": {
        "product": "Cyclic Borane",
        "formula": "B3H7",
        "ratio": {
            "B": 3,
            "H": 7
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PO3NO2": {
        "product": "Phosphoryl Nitrate",
        "formula": "PO3NO2",
        "ratio": {
            "P": 1,
            "O": 3,
            "N": 1,
            "O2": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "PFBr2": {
        "product": "Phosphenium Fluoride Dibromide",
        "formula": "PFBr2",
        "ratio": {
            "P": 1,
            "F": 1,
            "Br": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C9H15N5O4": {
        "product": "Tetrahydrobiopterin",
        "formula": "C9H15N5O4",
        "ratio": {
            "C": 9,
            "H": 15,
            "N": 5,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Cr[Co(CN)6]": {
        "product": "Chromium Hexacyanocobaltate",
        "formula": "Cr[Co(CN)6]",
        "ratio": {
            "Cr": 1,
            "Co": 1,
            "C": 6,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "UO4": {
        "product": "Uranyl Peroxide",
        "formula": "UO4",
        "ratio": {
            "U": 1,
            "O": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C10H3N7O14": {
        "product": "Heptanitronaphthalene",
        "formula": "C10H3N7O14",
        "ratio": {
            "C": 10,
            "H": 3,
            "N": 7,
            "O": 14
        },
        "type": "Covalent",
        "behavior": "explosive"
    },
    "C10H21N3O": {
        "product": "Diethylcarbamazine",
        "formula": "C10H21N3O",
        "ratio": {
            "C": 10,
            "H": 21,
            "N": 3,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "C24H20Sn": {
        "product": "Tetraphenyltin",
        "formula": "C24H20Sn",
        "ratio": {
            "C": 24,
            "H": 20,
            "Sn": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "PF4": {
        "product": "Phosphorus Tetrafluoride",
        "formula": "PF4",
        "ratio": {
            "P": 1,
            "F": 4
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C18H15PS": {
        "product": "Triphenylphosphine Sulfide",
        "formula": "C18H15PS",
        "ratio": {
            "C": 18,
            "H": 15,
            "P": 1,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "Re2Cl10": {
        "product": "Dirhenium Decachloride",
        "formula": "Re2Cl10",
        "ratio": {
            "Re": 2,
            "Cl": 10
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "K3[Cr(CN)6]": {
        "product": "Potassium Hexacyanochromate(III)",
        "formula": "K3[Cr(CN)6]",
        "ratio": {
            "K": 3,
            "Cr": 1,
            "C": 6,
            "N": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "OsBr4": {
        "product": "Osmium Tetrabromide",
        "formula": "OsBr4",
        "ratio": {
            "Os": 1,
            "Br": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "AlF3\u00b73H2O": {
        "product": "Aluminum Trifluoride Hydrate",
        "formula": "AlF3\u00b73H2O",
        "ratio": {
            "Al": 1,
            "F": 3,
            "H": 6,
            "O": 3
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "(NH4)2P2O7": {
        "product": "Ammonium Pyrophosphate",
        "formula": "(NH4)2P2O7",
        "ratio": {
            "N": 2,
            "H": 8,
            "P": 2,
            "O": 7
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "CBr2F2": {
        "product": "Dibromodifluoromethane",
        "formula": "CBr2F2",
        "ratio": {
            "C": 1,
            "Br": 2,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "liquid"
    },
    "Li2PtCl6": {
        "product": "Lithium Tetrachloroplatinate",
        "formula": "Li2PtCl6",
        "ratio": {
            "Li": 2,
            "Pt": 1,
            "Cl": 6
        },
        "type": "Ionic",
        "behavior": "stable"
    },
    "C13H22N2": {
        "product": "Dicyclohexylcarbodiimide",
        "formula": "C13H22N2",
        "ratio": {
            "C": 13,
            "H": 22,
            "N": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "POF5": {
        "product": "Phosphorus Pentafluoride Oxide",
        "formula": "POF5",
        "ratio": {
            "P": 1,
            "O": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "NH4ClO4 -> N2 + HCl + 2H2O + 1.5O2": {
        "product": "Ammonium Perchlorate Decomposition",
        "formula": "NH4ClO4 -> N2 + HCl + 2H2O + 1.5O2",
        "ratio": {
            "N": 2,
            "H": 5,
            "Cl": 1,
            "O": 5.5
        },
        "type": "Reactive",
        "behavior": "explosive"
    },
    "2Al + Ga -> Al2Ga": {
        "product": "Aluminum Gallium Refractory Alloy",
        "formula": "2Al + Ga -> Al2Ga",
        "ratio": {
            "Al": 2,
            "Ga": 1
        },
        "type": "Metallic",
        "behavior": "stable"
    },
    "2LiH + BBr3 -> 2LiBr + BH3": {
        "product": "Lithium Borohydride Formation",
        "formula": "2LiH + BBr3 -> 2LiBr + BH3",
        "ratio": {
            "Li": 2,
            "H": 1,
            "B": 1,
            "Br": 3
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "XeOF2": {
        "product": "Xenon Difluoride Oxide",
        "formula": "XeOF2",
        "ratio": {
            "Xe": 1,
            "O": 1,
            "F": 2
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "C2HNa": {
        "product": "Sodium Acetylide",
        "formula": "C2HNa",
        "ratio": {
            "C": 2,
            "H": 1,
            "Na": 1
        },
        "type": "Ionic",
        "behavior": "reactive"
    },
    "C18H30O3S": {
        "product": "Dodecylbenzene Sulfonic Acid",
        "formula": "C18H30O3S",
        "ratio": {
            "C": 18,
            "H": 30,
            "O": 3,
            "S": 1
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "K2Ni(CN)4": {
        "product": "Potassium Tetracyanonickelate",
        "formula": "K2Ni(CN)4",
        "ratio": {
            "K": 2,
            "Ni": 1,
            "C": 4,
            "N": 4
        },
        "type": "Covalent",
        "behavior": "stable"
    },
    "C4F6O": {
        "product": "Hexafluoroisobutylene Oxide",
        "formula": "C4F6O",
        "ratio": {
            "C": 4,
            "F": 6,
            "O": 1
        },
        "type": "Covalent",
        "behavior": "reactive"
    },
    "BF5": {
        "product": "Boron Pentafluoride",
        "formula": "BF5",
        "ratio": {
            "B": 1,
            "F": 5
        },
        "type": "Covalent",
        "behavior": "reactive"
    }
};