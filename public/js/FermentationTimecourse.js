 function FermentationTimecourse(Input){

 // Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];


    averageVolumetricRate =Input[23];
    finalTiter=Input[24];
    fractionOftheoreticalMaximalYield = Input[25]/100;
    FeedstockMW = 180.156; // (g/mole) for glucose
    //productYieldCoefficientGlucose =0.634;

    time = [];
    biomass = [];
    productTiter = [];

    // Advanced variables which are kept as defaults in the analyses
    AmmoniaSourceMW = 17.031; // (g/mole) for NH3
    MicrobeMW  =  95.37; // (g/mole) for E. coli
    inoculationFraction = 0.01; // fraction of volume at final biomass concentration used to inoculate production fermenters
    workingVolumeRatio = 0.85; // (L working volume)/(L gross volume)
    BiomassYieldFraction = 0.80; // the actual biomass yield as a fraction of theoretical maximal biomass yield

   // Calculate Yield Coefficients
     biomassYieldCoefficientGlucose = BiomassYieldFraction*(MicrobeMW)/(0.84*FeedstockMW); // g biomass/g glucose based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
     biomassYieldCoefficientNH3 = (MicrobeMW)/(1*AmmoniaSourceMW); // g biomass/g NH3 based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
     biomassYieldCoefficientO2 = (MicrobeMW)/(1.212*32); // g biomass/g O2 based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2

  // The following are Calculations based on the Fermentation Targets

    maxProductPerLcapacity = finalTiter*workingVolumeRatio; // (g of product per L of bioreactor capacity )
    totalFermentationTime = finalTiter/averageVolumetricRate;  // hours

   // Biomass Based Calculations - Final Biomass levels are calculated from Titer, Rate and Yield Requirements

    ProductBatchSugarPerLcapacity = (maxProductPerLcapacity/theorYield); // g glucose / L capacity assumes 100% of theoretical yield for glucose not going to biomass
    TotalBatchSugarPerLcapacity = ProductBatchSugarPerLcapacity/fractionOftheoreticalMaximalYield ; // Total sugar consumed assuming target yield losses
    MaxBiomassSugarPerLcapacity =  TotalBatchSugarPerLcapacity -  ProductBatchSugarPerLcapacity; // amount of sugar available for biomass
    finalBiomassConcentration = ((biomassYieldCoefficientGlucose*MaxBiomassSugarPerLcapacity)) ;// gCDW/L Final Biomass Concentration
    specificRate = averageVolumetricRate/finalBiomassConcentration;
    startingBiomassConcentration  = finalBiomassConcentration*inoculationFraction ;// (gCDW/L)
    A = (finalBiomassConcentration - startingBiomassConcentration)/startingBiomassConcentration; // assumes logistic growth
    averageLogisticGrowthRate = -(Math.log(0.01/A))/totalFermentationTime; // (hr-1)
    overallYield = maxProductPerLcapacity/TotalBatchSugarPerLcapacity; //g/g


    // Growth Associated Product Calculations (Assumes Logistic Growth)
    productToCellRatio = finalTiter/(finalBiomassConcentration-startingBiomassConcentration); // (gram product / gram CDW)
    averageLogisiticProductionRate = productToCellRatio*averageLogisticGrowthRate; //(hr-1)
    var biomass = [];
    var time = [];
    var productTiter = [];
    biomass[0] = finalBiomassConcentration*inoculationFraction;
    time[0] = 0;
    productTiter[0] = 0;
    k = averageLogisticGrowthRate;
    for (i = 1; i < totalFermentationTime; i++){
        time[i] = i;
        biomass[i] = finalBiomassConcentration/(1+A*Math.exp(-k*time[i]));
        productTiter[i]=productToCellRatio*biomass[i];
   }

    var fermentationOutput = new Object();
    fermentationOutput.time = time;
    fermentationOutput.biomass = biomass;
    fermentationOutput.productTiter = productTiter;
    fermentationOutput.finalBiomass = finalBiomassConcentration;
    fermentationOutput.specificRate = specificRate;
    fermentationOutput.overallYield = overallYield;
    fermentationOutput.fermTime = totalFermentationTime;
    return fermentationOutput;


    }

  