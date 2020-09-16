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
    productOverallYield: {
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

}, { timestamps: true});

const Tea = mongoose.model('Tea',teaSchema);
module.exports = Tea;




