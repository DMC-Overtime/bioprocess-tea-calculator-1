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
        type: Number,
        required: true
    },
    productTheorYield: {
        type: Number,
        required: true
    },
    margin: {
        type: Number,
        required: true
    },
    paybackPeriod: {
        type: Number,
        required: true
    },
    discountRate: {
        type: Number,
        required: true
    },
    taxRate: {
        type: Number,
        required: true
    },
    percentDebtFinanced: {
        type: Number,
        required: true
    },
    DebtInterestRate: {
        type: Number,
        required: true
    },
    LoanTerm: {
        type: Number,
        required: true
    },
    plantCapacity: {
        type: Number,
        required: true
    },
    annualUptime: {
        type: Number,
        required: true
    },
    batchOnSpec: {
        type: Number,
        required: true
    },
    reactorSize: {
        type: Number,
        required: true
    },
    glucoseCost: {
        type: Number,
        required: true
    },
    ammoniaCost: {
        type: Number,
        required: true
    },
    sulfuricAcidCost: {
        type: Number,
        required: true
    },
    naturalGasCost: {
        type: Number,
        required: true
    },
    electricityCost: {
        type: Number,
        required: true
    },
    CEPCI: {
        type: Number,
        required: true
    },
    aveVolumtericRate: {
        type: Number,
        required: true
    },
    Titer: {
        type: Number,
        required: true
    },
    Yield: {
        type: Number,
        required: true
    },
    turnaroundTime: {
        type: Number,
        required: true
    },
    mediaCost: {
        type: Number,
        required: true
    },
    Temperature: {
        type: Number,
        required: true
    },
    overallDSPYield: {
        type: Number,
        required: true
    },
    dspPercentofOpex: {
        type: Number,
        required: true
    },
    dspPercentofCapex: {
        type: Number,
        required: true
    },
    MSP: {
        type: Number,
        required: true
    },
    OPEX: {
        type: Number,
        required: true
    },
    CAPEX: {
        type: Number,
        required: true
    },
    TCI: {
        type: Number,
        required: true
    },
    NPV: {
        type: Number,
        required: true
    },
    ROI: {
        type: Number,
        required: true
    },
    IRR: {
        type: Number,
        required: true
    },
    optimalPlantCapacity: {
        type: Number,
        required: true
    },
    fermentationYield: {
        type: Number,
        required: true
    },
    overallYield: {
        type: Number,
        required: true
    },
    finalBiomass: {
        type: Number,
        required: true
    },
    spRate: {
        type: Number,
        required: true
    },
    fermTime: {
        type: Number,
        required: true
    },
    proFormaTime: {
        type: Array,
        required: true
    },
    proFormaTBD: {
        type: Array,
        required: true
    },





    proForma: {
        type: Array,
        required: true
    },



}, { timestamps: true});

const Tea = mongoose.model('Tea',teaSchema);
module.exports = Tea;
