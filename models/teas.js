const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teaSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productFormula: {
        type: String,
        required: true
    },
    productMW: {
        type: String,
        required: true
    },
    productTheorYield: {
        type: String,
        required: true
    },
    productYieldCoefficientNH3: {
        type: String,
        required: true
    },
    productYieldCoefficientO2: {
        type: String,
        required: true
    },
     productVesselSize: {
        type: Number,
        required: true
    },
     productSellingPrice: {
        type: String,
        required: true
    },
    productMargin: {
        type: String,
        required: true
    },
    productPaybackPeriod: {
        type: String,
        required: true
    },
    productDiscountRate: {
        type: String,
        required: true
    },
    productTaxRate: {
        type: String,
        required: true
    },
    productPercentDebtFinanced: {
        type: String,
        required: true
    },
    productDebtInterestRate: {
        type: String,
        required: true
    },
    productLoanTerm: {
        type: String,
        required: true
    },
    productPlantCapacity: {
        type: String,
        required: true
    },
    productAnnualUptime: {
        type: String,
        required: true
    },
    productBatchOnSpec: {
        type: String,
        required: true
    },
    productGlucoseCost: {
        type: String,
        required: true
    },
    productAmmoniaCost: {
        type: String,
        required: true
    },
    productNaturalGasCost: {
        type: String,
        required: true
    },
    productElectricityCost: {
        type: String,
        required: true
    },
    productCEPCI: {
        type: String,
        required: true
    },
    productAveVolumtericRate: {
        type: String,
        required: true
    },
    productTiter: {
        type: String,
        required: true
    },
    productYield: {
        type: String,
        required: true
    },
    productTurnaroundTime: {
        type: String,
        required: true
    },
    productMediaCost: {
        type: String,
        required: true
    },
    productTemperature: {
        type: String,
        required: true
    },
    productOverallDSPYield: {
        type: String,
        required: true
    },
    productDspPercentofOpex: {
        type: String,
        required: true
    },
    productDspPercentofCapex: {
        type: String,
        required: true
    },
    productOPEX: {
        type: String,
        required: true
    },
    productCAPEX: {
        type: String,
        required: true
    },
    productTCI: {
        type: String,
        required: true
    },
    productNPV: {
        type: String,
        required: true
    },
    productROI: {
        type: String,
        required: true
    },
    productIRR: {
        type: String,
        required: true
    },
    productMSP: {
        type: String,
        required: true
    },
    productOptimalPlantCapacity: {
        type: String,
        required: true
    },
    productFermentationYield: {
        type: String,
        required: true
    },
    productFinalBiomass: {
        type: String,
        required: true
    },
    productSpRate: {
        type: String,
        required: true
    },
    productFermTime: {
        type: String,
        required: true
    },
    productMaxOTR: {
        type: String,
        required: true
    },
    productMaxKLA: {
        type: String,
        required: true
    },
    productMaxCoolingRate: {
        type: String,
        required: true
    },
    productOverallYield: {
        type: String,
        required: true
    },
    productFermTimeCourseTime: {
        type: String,
        required: true
    },
    productFermTimeCourseBiomass: {
        type: String,
        required: true
    },
    productFermTimeCourseProductTiter: {
        type: String,
        required: true
    },
    productProFormaTime: {
        type: String,
        required: true
    },
    productProFormaRevenue: {
        type: String,
        required: true
    },
    productProFormaCOGS: {
        type: String,
        required: true
    },
    productProFormaDepreciation: {
        type: String,
        required: true
    },
    productProFormaEBITDA: {
        type: String,
        required: true
    },
    productProFormaEBIT: {
        type: String,
        required: true
    },
    productProFormaPrincipal: {
        type: String,
        required: true
    },
    productProFormaInterest: {
        type: String,
        required: true
    },
    productProFormaTaxes: {
        type: String,
        required: true
    },
    productProFormaNetIncome: {
        type: String,
        required: true
    },
    productProFormaNetCashFlow: {
        type: String,
        required: true
    },
    productProFormaCumCashFlow: {
        type: String,
        required: true
    },
    MainFermAreaEquip: {
        type: String,
        required: true
    },
    MainFermAreaTIC: {
        type: String,
        required: true
    },
    fermenterCost: {
        type: String,
        required: true
    },
    fermenterTIC: {
        type: String,
        required: true
    },
    fermenterAgitatorCost: {
        type: String,
        required: true
    },
    fermenterAgitatorTIC: {
        type: String,
        required: true
    },
    FermTransferPumpsCost: {
        type: String,
        required: true
    },
    FermTransferPumpsTIC: {
        type: String,
        required: true
    },
    mainFermPiping: {
        type: String,
        required: true
    },
    mainFermTanksEquip: {
        type: String,
        required: true
    },
    mainFermTanksTIC: {
        type: String,
        required: true
    },
    glucoseStorageTankCost: {
        type: String,
        required: true
    },
    glucoseStorageTankTIC: {
        type: String,
        required: true
    },
    glucoseStorageTransferPumpsCost: {
        type: String,
        required: true
    },
    glucoseStorageTransferPumpsTIC: {
        type: String,
        required: true
    },
    glucoseStoragepiping: {
        type: String,
        required: true
    },
    glucoseStorageEquip: {
        type: String,
        required: true
    },
    glucoseStorageTIC: {
        type: String,
        required: true
    },
    ammoniaStorageTankCost: {
        type: String,
        required: true
    },
    ammoniaStorageTankTIC: {
        type: String,
        required: true
    },
    acidStorageTankCost: {
        type: String,
        required: true
    },
    acidStorageTankTIC: {
        type: String,
        required: true
    },
    ammoniaTransferPumpsCost: {
        type: String,
        required: true
    },
    ammoniaTransferPumpsCostTIC: {
        type: String,
        required: true
    },
    acidTransferPumpsCost: {
        type: String,
        required: true
    },
    acidTransferPumpsCostTIC: {
        type: String,
        required: true
    },
    additionPiping : {
        type: String,
        required: true
    },
    additionsEquip: {
        type: String,
        required: true
    },
    additionsTIC: {
        type: String,
        required: true
    },
    agitatedMediaPrepTankCost: {
        type: String,
        required: true
    },
    agitatedMediaPrepTankTIC: {
        type: String,
        required: true
    },
    mediaTransferPumpsCost: {
        type: String,
        required: true
    },
    mediaTransferPumpsCostTIC: {
        type: String,
        required: true
    },
    MediaHeatExchanger: {
        type: String,
        required: true
    },
    MediaHeatExchangerTIC: {
        type: String,
        required: true
    },
    mediaPiping: {
        type: String,
        required: true
    },
    DryChemicalAdditionSkid : {
        type: String,
        required: true
    },
    DryChemicalAdditionSkidTIC: {
        type: String,
        required: true
    },
    mediaPrepEquip : {
        type: String,
        required: true
    },
    mediaPrepTIC: {
        type: String,
        required: true
    },
    CIPTankCost: {
        type: String,
        required: true
    },
    CIPTankTIC: {
        type: String,
        required: true
    },
    CIPTransferPumpsCost: {
        type: String,
        required: true
    },
    CIPTransferPumpsCostTIC: {
        type: String,
        required: true
    },
    CIPFilterCost: {
        type: String,
        required: true
    },
    CIPFilterCostTIC: {
        type: String,
        required: true
    },
    CIPHeaterCost: {
        type: String,
        required: true
    },
    CIPHeaterCostTIC: {
        type: String,
        required: true
    },
    CIPpipingTIC: {
        type: String,
        required: true
    },
    CIPEquip: {
        type: String,
        required: true
    },
    CIPTIC: {
        type: String,
        required: true
    },
    seedEquipment: {
        type: String,
        required: true
    },
    seedEquipmentTIC: {
        type: String,
        required: true
    },
    CentrifugeCost: {
        type: String,
        required: true
    },
    CentrifugeTIC: {
        type: String,
        required: true
    },
    Centrifugepiping: {
        type: String,
        required: true
    },
    CentrifugeEquip: {
        type: String,
        required: true
    },
    CentrifugeEquipTIC: {
        type: String,
        required: true
    },
    brothStorageTankCost: {
        type: String,
        required: true
    },
    brothStorageTankTIC: {
        type: String,
        required: true
    },
    brothStorageTransferPumpCost: {
        type: String,
        required: true
    },
    brothStorageTransferPumpTIC: {
        type: String,
        required: true
    },
    brothStoragePiping: {
        type: String,
        required: true
    },
    brothStorageEquip: {
        type: String,
        required: true
    },
    brothStorageTIC: {
        type: String,
        required: true
    },
    PrimaryCellRemovalEquip: {
        type: String,
        required: true
    },
    PrimaryCellRemovalTIC: {
        type: String,
        required: true
    },
    coolingTowerEquip: {
        type: String,
        required: true
    },
    coolingTowerTIC: {
        type: String,
        required: true
    },
    coolingTowerPumps: {
        type: String,
        required: true
    },
    coolingTowerPumpsTIC: {
        type: String,
        required: true
    },
    coolingTowerPiping: {
        type: String,
        required: true
    },
    coolingEquip: {
        type: String,
        required: true
    },
    coolingTIC: {
        type: String,
        required: true
    },
    BoilerPackageCosts: {
        type: String,
        required: true
    },
    BoilerPackageTIC: {
        type: String,
        required: true
    },
    AirDryer: {
        type: String,
        required: true
    },
    AirDryingTIC: {
        type: String,
        required: true
    },
    AirReceiver: {
        type: String,
        required: true
    },
    AirReceiverTIC: {
        type: String,
        required: true
    },
    AirCompressor: {
        type: String,
        required: true
    },
    AirCompressorTIC: {
        type: String,
        required: true
    },
    AirPiping: {
        type: String,
        required: true
    },
    AirHandlingEquip: {
        type: String,
        required: true
    },
    AirHandlingTIC: {
        type: String,
        required: true
    },
    MunicipalWaterTank: {
        type: String,
        required: true
    },
    MunicipalWaterTankTIC: {
        type: String,
        required: true
    },
    PotableWaterTank: {
        type: String,
        required: true
    },
    PotableWaterTankTIC: {
        type: String,
        required: true
    },
    SoftenerSystem: {
        type: String,
        required: true
    },
    SoftenerSystemTIC: {
        type: String,
        required: true
    },
    PotableWaterCooler: {
        type: String,
        required: true
    },
   PotableWaterCoolerTIC: {
        type: String,
        required: true
    },
   MunicipalWaterPump: {
        type: String,
        required: true
    },
   MunicipalWaterPumpTIC: {
        type: String,
        required: true
    },
   WaterPiping: {
        type: String,
        required: true
    },
   WaterHandlingEquip: {
        type: String,
        required: true
    },
   WaterHandlingTIC: {
        type: String,
        required: true
    },
   WasteWaterTank: {
        type: String,
        required: true
    },
   WasteWaterTankTIC: {
        type: String,
        required: true
    },
   HeatKillExchanger: {
        type: String,
        required: true
    },
   HeatKillExchangerTIC: {
        type: String,
        required: true
    },
   WasteWaterPump: {
        type: String,
        required: true
    },
   WasteWaterPumpTIC: {
        type: String,
        required: true
    },
   WasteWaterPiping: {
        type: String,
        required: true
    },
   WasteWaterEquip: {
        type: String,
        required: true
    },
   WasteWaterTIC: {
        type: String,
        required: true
    },
   processUtilitiesEquip: {
        type: String,
        required: true
    },
   processUtilitiesTIC: {
        type: String,
        required: true
    },
   controlSystems: {
        type: String,
        required: true
    },
   fermtotalInstalledEquipmentCost: {
        type: String,
        required: true
    },
   dspTIC: {
        type: String,
        required: true
    },
   totalInstalledEquipmentCost: {
        type: String,
        required: true
    },
   warehousing: {
        type: String,
        required: true
    },
   administrativeBuildings: {
        type: String,
        required: true
    },
   siteDevelopment: {
        type: String,
        required: true
    },
   totalDirectCost: {
        type: String,
        required: true
    },
   HomeOffice: {
        type: String,
        required: true
    },
   prorateableExpenses: {
        type: String,
        required: true
    },
   fieldExpenses: {
        type: String,
        required: true
    },
   projectContingency: {
        type: String,
        required: true
    },
   otherStartupCosts: {
        type: String,
        required: true
    },
   totalIndirectCosts: {
        type: String,
        required: true
    },
   fixedCapitalInvestment: {
        type: String,
        required: true
    },
    workingCapital: {
        type: String,
        required: true
    },
   totaCapitalInvestment: {
        type: String,
        required: true
    },

}, { timestamps: true});

const Tea = mongoose.model('Tea',teaSchema);
module.exports = Tea;




