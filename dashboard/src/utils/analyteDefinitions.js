// Analyte definitions for whitelisting support

export const ANALYTE_DEFINITIONS = {
  cannabinoids: [
    { key: 'thc', name: 'THC', fullName: 'Delta-9-Tetrahydrocannabinol' },
    { key: 'thca', name: 'THCa', fullName: 'Tetrahydrocannabinolic Acid' },
    { key: 'cbd', name: 'CBD', fullName: 'Cannabidiol' },
    { key: 'cbda', name: 'CBDa', fullName: 'Cannabidiolic Acid' },
    { key: 'cbg', name: 'CBG', fullName: 'Cannabigerol' },
    { key: 'cbga', name: 'CBGa', fullName: 'Cannabigerolic Acid' },
    { key: 'cbn', name: 'CBN', fullName: 'Cannabinol' },
    { key: 'cbc', name: 'CBC', fullName: 'Cannabichromene' },
    { key: 'thcv', name: 'THCV', fullName: 'Tetrahydrocannabivarin' },
    { key: 'cbdv', name: 'CBDV', fullName: 'Cannabidivarin' },
    { key: 'd8thc', name: 'Δ8-THC', fullName: 'Delta-8-Tetrahydrocannabinol' }
  ],
  
  heavyMetals: [
    { key: 'lead', name: 'Lead', fullName: 'Lead (Pb)' },
    { key: 'cadmium', name: 'Cadmium', fullName: 'Cadmium (Cd)' },
    { key: 'arsenic', name: 'Arsenic', fullName: 'Arsenic (As)' },
    { key: 'mercury', name: 'Mercury', fullName: 'Mercury (Hg)' }
  ],
  
  pesticides: [
    { key: 'abamectin', name: 'Abamectin', fullName: 'Abamectin' },
    { key: 'acephate', name: 'Acephate', fullName: 'Acephate' },
    { key: 'acequinocyl', name: 'Acequinocyl', fullName: 'Acequinocyl' },
    { key: 'acetamiprid', name: 'Acetamiprid', fullName: 'Acetamiprid' },
    { key: 'aldicarb', name: 'Aldicarb', fullName: 'Aldicarb' },
    { key: 'azoxystrobin', name: 'Azoxystrobin', fullName: 'Azoxystrobin' },
    { key: 'bifenazate', name: 'Bifenazate', fullName: 'Bifenazate' },
    { key: 'bifenthrin', name: 'Bifenthrin', fullName: 'Bifenthrin' },
    { key: 'boscalid', name: 'Boscalid', fullName: 'Boscalid' },
    { key: 'captan', name: 'Captan', fullName: 'Captan' },
    { key: 'carbaryl', name: 'Carbaryl', fullName: 'Carbaryl' },
    { key: 'carbofuran', name: 'Carbofuran', fullName: 'Carbofuran' },
    { key: 'chlorantraniliprole', name: 'Chlorantraniliprole', fullName: 'Chlorantraniliprole' },
    { key: 'chlordane', name: 'Chlordane', fullName: 'Chlordane' },
    { key: 'chlorfenapyr', name: 'Chlorfenapyr', fullName: 'Chlorfenapyr' },
    { key: 'chlorpyrifos', name: 'Chlorpyrifos', fullName: 'Chlorpyrifos' },
    { key: 'clofentezine', name: 'Clofentezine', fullName: 'Clofentezine' },
    { key: 'coumaphos', name: 'Coumaphos', fullName: 'Coumaphos' },
    { key: 'cyfluthrin', name: 'Cyfluthrin', fullName: 'Cyfluthrin' },
    { key: 'cypermethrin', name: 'Cypermethrin', fullName: 'Cypermethrin' },
    { key: 'daminozide', name: 'Daminozide', fullName: 'Daminozide' },
    { key: 'ddvp', name: 'DDVP', fullName: 'Dichlorvos (DDVP)' },
    { key: 'diazinon', name: 'Diazinon', fullName: 'Diazinon' },
    { key: 'dimethoate', name: 'Dimethoate', fullName: 'Dimethoate' },
    { key: 'etoxazole', name: 'Etoxazole', fullName: 'Etoxazole' },
    { key: 'fenoxycarb', name: 'Fenoxycarb', fullName: 'Fenoxycarb' },
    { key: 'fenpyroximate', name: 'Fenpyroximate', fullName: 'Fenpyroximate' },
    { key: 'fipronil', name: 'Fipronil', fullName: 'Fipronil' },
    { key: 'flonicamid', name: 'Flonicamid', fullName: 'Flonicamid' },
    { key: 'fludioxonil', name: 'Fludioxonil', fullName: 'Fludioxonil' },
    { key: 'hexythiazox', name: 'Hexythiazox', fullName: 'Hexythiazox' },
    { key: 'imazalil', name: 'Imazalil', fullName: 'Imazalil' },
    { key: 'imidacloprid', name: 'Imidacloprid', fullName: 'Imidacloprid' },
    { key: 'kresoxim', name: 'Kresoxim-methyl', fullName: 'Kresoxim-methyl' },
    { key: 'malathion', name: 'Malathion', fullName: 'Malathion' },
    { key: 'metalaxyl', name: 'Metalaxyl', fullName: 'Metalaxyl' },
    { key: 'methiocarb', name: 'Methiocarb', fullName: 'Methiocarb' },
    { key: 'methomyl', name: 'Methomyl', fullName: 'Methomyl' },
    { key: 'methyl', name: 'Methyl parathion', fullName: 'Methyl parathion' },
    { key: 'mgk', name: 'MGK-264', fullName: 'MGK-264' },
    { key: 'myclobutanil', name: 'Myclobutanil', fullName: 'Myclobutanil' },
    { key: 'naled', name: 'Naled', fullName: 'Naled' },
    { key: 'oxamyl', name: 'Oxamyl', fullName: 'Oxamyl' },
    { key: 'paclobutrazol', name: 'Paclobutrazol', fullName: 'Paclobutrazol' },
    { key: 'parathion', name: 'Parathion', fullName: 'Parathion' },
    { key: 'pentachloronitrobenzene', name: 'PCNB', fullName: 'Pentachloronitrobenzene' },
    { key: 'permethrin', name: 'Permethrin', fullName: 'Permethrin' },
    { key: 'phosmet', name: 'Phosmet', fullName: 'Phosmet' },
    { key: 'piperonyl', name: 'Piperonyl butoxide', fullName: 'Piperonyl butoxide' },
    { key: 'prallethrin', name: 'Prallethrin', fullName: 'Prallethrin' },
    { key: 'propiconazole', name: 'Propiconazole', fullName: 'Propiconazole' },
    { key: 'propoxur', name: 'Propoxur', fullName: 'Propoxur' },
    { key: 'pyrethrins', name: 'Pyrethrins', fullName: 'Pyrethrins' },
    { key: 'pyridaben', name: 'Pyridaben', fullName: 'Pyridaben' },
    { key: 'spinetoram', name: 'Spinetoram', fullName: 'Spinetoram' },
    { key: 'spinosad', name: 'Spinosad', fullName: 'Spinosad' },
    { key: 'spiromesifen', name: 'Spiromesifen', fullName: 'Spiromesifen' },
    { key: 'spirotetramat', name: 'Spirotetramat', fullName: 'Spirotetramat' },
    { key: 'spiroxamine', name: 'Spiroxamine', fullName: 'Spiroxamine' },
    { key: 'tebuconazole', name: 'Tebuconazole', fullName: 'Tebuconazole' },
    { key: 'thiacloprid', name: 'Thiacloprid', fullName: 'Thiacloprid' },
    { key: 'thiamethoxam', name: 'Thiamethoxam', fullName: 'Thiamethoxam' },
    { key: 'trifloxystrobin', name: 'Trifloxystrobin', fullName: 'Trifloxystrobin' }
  ],
  
  mycotoxins: [
    { key: 'aflatoxinB1', name: 'Aflatoxin B1', fullName: 'Aflatoxin B1' },
    { key: 'aflatoxinB2', name: 'Aflatoxin B2', fullName: 'Aflatoxin B2' },
    { key: 'aflatoxinG1', name: 'Aflatoxin G1', fullName: 'Aflatoxin G1' },
    { key: 'aflatoxinG2', name: 'Aflatoxin G2', fullName: 'Aflatoxin G2' },
    { key: 'ochratoxinA', name: 'Ochratoxin A', fullName: 'Ochratoxin A' }
  ],
  
  residualSolvents: [
    { key: 'acetone', name: 'Acetone', fullName: 'Acetone' },
    { key: 'acetonitrile', name: 'Acetonitrile', fullName: 'Acetonitrile' },
    { key: 'benzene', name: 'Benzene', fullName: 'Benzene' },
    { key: 'butane', name: 'Butane', fullName: 'Butane' },
    { key: 'chloroform', name: 'Chloroform', fullName: 'Chloroform' },
    { key: 'dichloromethane', name: 'Dichloromethane', fullName: 'Dichloromethane' },
    { key: 'ethanol', name: 'Ethanol', fullName: 'Ethanol' },
    { key: 'ethylAcetate', name: 'Ethyl Acetate', fullName: 'Ethyl Acetate' },
    { key: 'ethylEther', name: 'Ethyl Ether', fullName: 'Ethyl Ether' },
    { key: 'heptane', name: 'Heptane', fullName: 'Heptane' },
    { key: 'hexane', name: 'Hexane', fullName: 'Hexane' },
    { key: 'isopropanol', name: 'Isopropanol', fullName: 'Isopropanol' },
    { key: 'methanol', name: 'Methanol', fullName: 'Methanol' },
    { key: 'pentane', name: 'Pentane', fullName: 'Pentane' },
    { key: 'propane', name: 'Propane', fullName: 'Propane' },
    { key: 'toluene', name: 'Toluene', fullName: 'Toluene' },
    { key: 'xylenes', name: 'Xylenes', fullName: 'Total Xylenes' }
  ],
  
  // Microbial tests are typically pass/fail, not individual analytes
  salmonella: [{ key: 'salmonella', name: 'Salmonella', fullName: 'Salmonella spp.' }],
  stec: [{ key: 'stec', name: 'STEC', fullName: 'Shiga toxin-producing E. coli' }],
  totalYeastMold: [{ key: 'totalYeastMold', name: 'Total Yeast & Mold', fullName: 'Total Yeast & Mold Count' }],
  aspergillus: [
    { key: 'aspergillus', name: 'Aspergillus', fullName: 'Aspergillus spp.' },
    { key: 'aFlavus', name: 'A. flavus', fullName: 'Aspergillus flavus' },
    { key: 'aFumigatus', name: 'A. fumigatus', fullName: 'Aspergillus fumigatus' },
    { key: 'aNiger', name: 'A. niger', fullName: 'Aspergillus niger' },
    { key: 'aTerreus', name: 'A. terreus', fullName: 'Aspergillus terreus' }
  ],
  totalAerobicBacteria: [{ key: 'totalAerobicBacteria', name: 'Total Aerobic', fullName: 'Total Aerobic Bacteria Count' }],
  totalColiforms: [{ key: 'totalColiforms', name: 'Total Coliforms', fullName: 'Total Coliform Count' }],
  btgn: [{ key: 'btgn', name: 'BTGN', fullName: 'Bile-Tolerant Gram-Negative Bacteria' }],
  ecoli: [{ key: 'ecoli', name: 'E. coli', fullName: 'Escherichia coli' }]
};

// Helper function to get analytes for an assay
export function getAnalytesForAssay(assayKey) {
  return ANALYTE_DEFINITIONS[assayKey] || [];
}

// Helper function to check if an assay has individual analytes
export function hasIndividualAnalytes(assayKey) {
  const analytes = ANALYTE_DEFINITIONS[assayKey];
  return analytes && analytes.length > 1;
}