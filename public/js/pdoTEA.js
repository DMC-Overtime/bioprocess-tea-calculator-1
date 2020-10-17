

Input = [];
Input[7] = 2.23;// selling Price
Input[18] = 0.15; // GlucoseCosts[i];
const myChemical = new chemical();
myChemical.carbon = 3;
myChemical.hydrogen = 8;
myChemical.oxygen = 2;
myChemical.nitrogen = 0;
petroIRR = 30;
myChemical.MW = calcMW(myChemical);
myChemical.H2CO2ratio = calcH2CO2ratio(myChemical);
myChemical.formula = calcFormula(myChemical);
myChemicalEquation = balanceEquation(myChemical);

// Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];


Input[0] = '1,3 PDO';
Input[1] = myChemical.formula;
Input[2] = parseFloat(myChemical.MW);
Input[3] = parseFloat(myChemicalEquation.theorYield);
Input[4] = parseFloat(myChemicalEquation.productYieldCoefficientNH3);
Input[5] = parseFloat(myChemicalEquation.productYieldCoefficientO2);
Input[6] = 1000000;// Vessel Size
Input[8] = 10; // margin
Input[9] = 10; //paybackPeriod,
Input[10] = 20; // discountRate
Input[11] = 21;//taxRate
Input[12] = 60;//percentDebtFinanced
Input[13] = 8;//DebtInterestRate
Input[14] = 15;//LoanTerm,
Input[15] = 50;// plantCapacity
Input[16] = 90;//annualUptime
Input[17] = 95;//batchOnSpec
Input[19] = 0.12;//ammoniaCost,
Input[20] = 3.1;//naturalGasCost
Input[21] = 0.11;//electricityCost
Input[22] = 603;//CEPCI
Input[25] = 90;//Yield,
Input[26] = 16; //turnaroundTime,
Input[27] = 0.4; // 27-mediaCost
Input[28] = 0.4; //28-Temperature,
Input[29] = 95; //29-overallDSPYield,
Input[30] = 15; //  30-dspPercentofOpex
Input[31] = 20; //  31-dspPercentofCapex;
Input[23] = 4; //aveVolumtericRate
Input[24] = 300; //Titer,


            bioprocessOutputs = bioprocessopexcapex(Input);
            DCFOutput = BOO_DCF(Input,bioprocessOutputs);
            IRR = ((DCFOutput.IRR)*100).toFixed(2);
            console.log('IRR: ' + IRR);
            console.log('OPEX per kg: ' + bioprocessOutputs.opexperkg);
            console.log('CAPEX per kg: ' + bioprocessOutputs.capexperkg);
            console.log('TCI: ' + bioprocessOutputs.totaCapitalInvestment);
            console.log('TCI: ' + bioprocessOutputs.plantCapacity);

 function chemical(name, formula, carbon, hydrogen, oxygen, nitrogen, MWvalue, H2CO2ratio){
         this.name = name;
         this.formula = formula;
         this.carbon = carbon;
         this.hydrogen = hydrogen;
         this.oxygen = oxygen;
         this.nitrogen = nitrogen;
         this.MWvalue = MWvalue;
         this.H2CO2ratio = H2CO2ratio;
}
  function chemicalEquation(prodCoeff,oxygenCoeff,ammoniaCoeff,waterCoeff,co2Coeff,theorYield,productYieldCoefficientNH3,productYieldCoefficientO2){
         this.prodCoeff = prodCoeff;
         this.oxygenCoeff = oxygenCoeff;
         this.ammoniaCoeff = ammoniaCoeff;
         this.waterCoeff = waterCoeff;
         this.co2Coeff = co2Coeff;
         this.theorYield = theorYield;
         this.productYieldCoefficientNH3 = productYieldCoefficientNH3 ;
         this.productYieldCoefficientO2 = productYieldCoefficientO2;
 }
 function balanceEquation(chemical){

// Balances the following Equation 1 Glucose + oxygenCoeff * O2 + ammoniaCoeff* NH3 --> prodCoeff * Product + waterCoeff* H2O + co2Coeff * CO2
// where Product  =  C(carbon)H(hydrogen)O(oxygen)N(nitrogen)

    MWfeedstock = 180.156; // glucose


//Calculate Stoichiometry and theoretic Yield

    if (chemical.H2CO2ratio == 2) {
        equationType = "neutral";
        //1 C6H12O6 +  X NH3  → Y  CaHbOcNd+ Z H2O
        prodCoeff = 6/chemical.carbon;
        ammoniaCoeff = 6*(chemical.nitrogen/chemical.carbon);
        waterCoeff = 6-6*(chemical.oxygen/chemical.carbon);
        co2Coeff =0 ;
        oxygenCoeff =0 ;

    } else if (chemical.H2CO2ratio > 2){
        equationType = "reduced";
        //1 C6H12O6 +  W NH3 → X CaHbOcNd + Y H2O +  Z  CO2 
        value1 = chemical.carbon + 0.25*chemical.hydrogen - 0.5*chemical.oxygen - 0.75*chemical.nitrogen;
        prodCoeff = 6/value1;
        ammoniaCoeff = chemical.nitrogen*prodCoeff;
        waterCoeff = 6 + 1.5*chemical.nitrogen*prodCoeff - 0.5*chemical.hydrogen*prodCoeff;
        co2Coeff = 0.25*chemical.hydrogen*prodCoeff - 0.5*chemical.oxygen*prodCoeff - 0.75*chemical.nitrogen*prodCoeff;
        oxygenCoeff =0 ;

    } else { //(chemical.H2CO2ratio < 2)
        equationType = "oxidized";
        prodCoeff = 6/chemical.carbon;
        ammoniaCoeff = 6*(chemical.nitrogen/chemical.carbon);
        waterCoeff = 6 + 9*(chemical.nitrogen/chemical.carbon) - 3*(chemical.hydrogen/chemical.carbon);
        oxygenCoeff = 3*(chemical.oxygen/chemical.carbon) + 4.5*(chemical.nitrogen/chemical.carbon) -1.5*(chemical.hydrogen/chemical.carbon);
        co2Coeff =0 ;
    }

    prodCoeff = prodCoeff.toFixed(2);
    oxygenCoeff = oxygenCoeff.toFixed(2);
    ammoniaCoeff = ammoniaCoeff.toFixed(2);
    waterCoeff = waterCoeff .toFixed(2);
    co2Coeff = co2Coeff.toFixed(2);
    theorYield = (chemical.MW*prodCoeff/MWfeedstock).toFixed(3);
    productYieldCoefficientNH3 = ((chemical.MW*prodCoeff)/(ammoniaCoeff*17.031)).toFixed(4);
    productYieldCoefficientO2 = ((chemical.MW*prodCoeff)/(oxygenCoeff*32)).toFixed(4);

     // Output
     var myChemicalEquation = new chemicalEquation(prodCoeff,oxygenCoeff, ammoniaCoeff,waterCoeff,co2Coeff,theorYield,productYieldCoefficientNH3,productYieldCoefficientO2);

     return myChemicalEquation;

}
function calcMW(chemical){
     MW = (12.0107*(chemical.carbon)+1.00784*(chemical.hydrogen)+15.999*(chemical.oxygen)+14.0067*(chemical.nitrogen)).toFixed(2);
     return MW;
}
function calcH2CO2ratio(chemical){
     H2CO2ratio =  0.5*(chemical.hydrogen/chemical.carbon)-1*(chemical.oxygen/chemical.carbon)-1.5*(chemical.nitrogen/chemical.carbon)+2;
     return H2CO2ratio;
}
function calcFormula(chemical){
    formula = 'C';
    formula += chemical.carbon;
    formula +='H'
    formula += chemical.hydrogen;
    formula +='O'
    formula += chemical.oxygen;
    formula +='N'
    formula += chemical.nitrogen;
    return formula;
}

function bioprocessopexcapex(Input){
//Inputs from User Input
// Set Up Input Array & Define Initial Baseline Inputs & Outputs.
// Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];


    theorYield = Input[3];
    productYieldCoefficientGlucose = theorYield;
    productYieldCoefficientNH3 = Input[4];
    productYieldCoefficientO2 = Input[5];
    vesselSize = Input[6];
    annualProductionVolumeKta = Input[15];
    annualUpTime = (Input[16]/100)*8760; // hrs per year
    fermentationOnSpecRate  = Input[17]/100;
    glucoseCost= Input[18]; //0.18;
    ammoniaCost = Input[19];
    NaturalGasCost = Input[20]; // $/MMBtu,  *2018 Average for  EIA.
    ElectricityCost = Input[21];  // Alternative 0.00013*CEPCI + 0.010*CostOfFuel;// $/KWh Assumes purchase (Ulrich & Vasudevan)
    CEPCI = Input[22]; // 2018 Chemical Engineering Plant Cost Index (Ulrich & Vasudevan)
    CostOfFuel =  NaturalGasCost/1.05505; // 2018 $/GJ (Ulrich & Vasudevan)
    averageVolumetricRate = Input[23];
    finalTiter  = Input[24];
    fractionOftheoreticalMaximalYield = Input[25]/100;
    turnAroundTime = Input[26];
    mediaCost = Input[27]/1000;
    fermentationTemperature = Input[28];
    dspYield = Input[29]/100;
    dspOPEXfraction = Input[30]/100;
    dspCAPEXfraction = Input[31]/100;
    NaOHCosts = 0.15; // $/kg, based on $150/tonne https://yosemite.epa.gov/sab/sabproduct.nsf/953CCBEB820F0470852577920076316D/$File/NaOH+Practicality+Study.pdf
    PeraceticAcidCosts = 5; //$/L for CIP % solution


   // Advanced Inputs
    AmmoniaSourceMW = 17.031;//(g/mole) for NH3
    MicrobeMW  =  95.37; // (g/mole) for E. coli
    FeedstockMW = 180.156; // (g/mole) for glucose
    biomassYieldCoefficientGlucose = (MicrobeMW)/(0.84*FeedstockMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    biomassYieldCoefficientNH3 = (MicrobeMW)/(1*AmmoniaSourceMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    biomassYieldCoefficientO2 = (MicrobeMW)/(1.212*32); // g biomass/g O2 based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    byproductYieldCoefficientO2 = (FeedstockMW)/(6*32); // g glucose consumed /g O2 for byproduct, based on ideal formula 1 Glucose + 6  O2 --> 6 H2O + 6 CO2

    // Advanced variables which are kept as defaults in the analyses
    inoculationFraction = 0.01; // fraction of volume at final biomass concentration used to inoculate production fermenters
    workingVolumeRatio = 0.85; // (L working volume)/(L gross volume)
    BiomassYieldFraction = 0.80; // the actual biomass yield as a fraction of theoretical maximal biomass yield
    FermenterAspectRatio = 3.0; // from Humbird et al.


   // The following are Calculations based on the Fermentation Targets
    targetAnnualFermProduction = annualProductionVolumeKta*1000000/dspYield; // % (kg) accounts for DSP losses
    maxVesselWorkingVolume = workingVolumeRatio*vesselSize; // (Liters)
    maxProductPerVessel = finalTiter*maxVesselWorkingVolume/1000; // (kg or product per batch )
    totalFermentationTime = finalTiter/averageVolumetricRate;  // hours
    timeForOneBatch =  totalFermentationTime + turnAroundTime; // (hours)
    annualFermentationUpTime = (totalFermentationTime/(totalFermentationTime + turnAroundTime))*annualUpTime;  //hrs
    numberOfBatchesPerYearPerTank = Math.floor((annualFermentationUpTime/timeForOneBatch)*fermentationOnSpecRate);
    totalAnnualProductPerTank = numberOfBatchesPerYearPerTank*maxProductPerVessel; // (kg)
    numberOfTanks = Math.ceil(targetAnnualFermProduction/totalAnnualProductPerTank);
    mediaVolume = maxVesselWorkingVolume*numberOfBatchesPerYearPerTank*numberOfTanks ;// (Liters)
    fractionInProduction =  totalFermentationTime/timeForOneBatch;
    AnnualFermentationProduction = numberOfTanks*totalAnnualProductPerTank;
    plantCapacity = AnnualFermentationProduction*dspYield;
    totalAnnualFermWorkingVolume = numberOfTanks*maxVesselWorkingVolume*numberOfBatchesPerYearPerTank;

   // Bioreactor based Calculations
    FermenterRadius = ((vesselSize/1000/3.14159265359)/(2*FermenterAspectRatio))**0.333333; // meters
    FermenterDiameter = 2*FermenterRadius ;// meters
    FermenterHeight = FermenterAspectRatio*FermenterDiameter; // meters
    maxWorkingFillHeight = (maxVesselWorkingVolume/1000/3.14159265359)/(FermenterRadius*FermenterRadius);// meters
    maxFermenterPressure = 1000*9.8066*maxWorkingFillHeight/100000 + 0.25 ; // bar (1 N/m2 =100,000 bar)
    //console.log("max ferm pressure" +maxFermenterPressure );

  // The following are Calculations based on the Fermentation Targets
    maxProductPerLcapacity = finalTiter*workingVolumeRatio; // (g of product per L of bioreactor capacity )
    totalFermentationTime = finalTiter/averageVolumetricRate;  // hours
    ProductBatchSugarPerLcapacity = (maxProductPerLcapacity/theorYield); // g glucose / L capacity assumes 100% of theoretical yield for glucose not going to biomass
    TotalBatchSugarPerLcapacity = ProductBatchSugarPerLcapacity/fractionOftheoreticalMaximalYield ; // Total sugar consumed assuming target yield losses

   // Biomass Based Calculations - Final Biomass levels are calculated from Titer, Rate and Yield Requirements
    MicrobeMW  =  95.37; // (g/mole) for E. coli
    ProductBatchSugar = (maxProductPerVessel/productYieldCoefficientGlucose); // assumes 100% of theoretical yield
    TotalBatchSugar = ProductBatchSugar/(fractionOftheoreticalMaximalYield); // Total sugar consumed assuming biomass yield losses
    MaxBiomassSugar =  TotalBatchSugar -  ProductBatchSugar;
    finalBiomassConcentration = ((BiomassYieldFraction*biomassYieldCoefficientGlucose*MaxBiomassSugar)/maxVesselWorkingVolume)*1000 ;// gCDW/L Final Biomass Concentration
    specificRate = averageVolumetricRate/finalBiomassConcentration;
    startingBiomassConcentration  = finalBiomassConcentration*inoculationFraction ;// (gCDW/L)
    A = (finalBiomassConcentration - startingBiomassConcentration)/startingBiomassConcentration; // assumes logistic growth
    averageLogisticGrowthRate = -(Math.log(0.01/A))/totalFermentationTime; // (hr-1)
    overallFermYield = maxProductPerLcapacity/TotalBatchSugarPerLcapacity; //g/g

    // Growth Associated Product Calculations (Assumes Logistic Growth)
    productToCellRatio = finalTiter/(finalBiomassConcentration-startingBiomassConcentration); // (gram product / gram CDW)
    averageLogisiticProductionRate = productToCellRatio*averageLogisticGrowthRate; //(hr-1)
    var Biomass = [];
    var time = [];
    var productTiter = [];
    Biomass[0] = finalBiomassConcentration*inoculationFraction;
    time[0] = 0;
    productTiter[0] = 0;
    k = averageLogisticGrowthRate;
    for (i = 1; i < totalFermentationTime; i++){
        time[i] = i;
        Biomass[i] = finalBiomassConcentration / (1+A*Math.exp(-k*time[i]));
        productTiter[i]=productToCellRatio*Biomass[i];
   }

   // Water Requirements & Costs
    averageWaterDemandRate = ((mediaVolume/annualFermentationUpTime)/1000)/(3600); // %m3/sec
    waterCost = (0.0007 +0.00003*(Math.pow(averageWaterDemandRate,-0.6)))*CEPCI + 0.02*CostOfFuel; // $/m3
    annualWaterCosts = (mediaVolume/1000)*waterCost; // $

   // Feedstock Requirements & Costs
    cumulativeProductGlucose = ((finalTiter*totalAnnualFermWorkingVolume)/productYieldCoefficientGlucose)/1000 ; //kg glucose needed
    cumulativeBiomassGlucose = ((finalBiomassConcentration*totalAnnualFermWorkingVolume)/biomassYieldCoefficientGlucose)/1000 ;// kg glucose needed
    cumulativeBiomassLostGlucose = (cumulativeBiomassGlucose/BiomassYieldFraction) - cumulativeBiomassGlucose;// kg/year

        if (productYieldCoefficientNH3 != Infinity){
         cumulativeProductNH3 = ((finalTiter*totalAnnualFermWorkingVolume)/productYieldCoefficientNH3)/AmmoniaSourceMW/1000; // kg NH3 needed
        }else{
        cumulativeProductNH3 =0;
         }

    cumulativeBiomassNH3 = ((finalBiomassConcentration*totalAnnualFermWorkingVolume)/biomassYieldCoefficientNH3)/BiomassYieldFraction/1000; //  kg NH3 needed
    cumulativeByProductGlucose = (cumulativeProductGlucose/fractionOftheoreticalMaximalYield) - cumulativeProductGlucose; //kg/year
    cumulativeAnnualGlucose = cumulativeBiomassGlucose +  cumulativeProductGlucose + cumulativeByProductGlucose;// kg/year
    averageGlucoseConsumptionRate = cumulativeAnnualGlucose/annualFermentationUpTime; // kg/hr
    cumulativeAnnualNH3 = cumulativeBiomassNH3 + cumulativeProductNH3; // kg/year
    averageNH3ConsumptionRate = cumulativeAnnualNH3/annualFermentationUpTime ;// kg/hr
    annualCostOfGlucose = cumulativeAnnualGlucose*(glucoseCost*2.20462);  //year
    annualCostOfNH3 = cumulativeAnnualNH3*(ammoniaCost*2.20462); // $/year
    annualCostOfMedia = totalAnnualFermWorkingVolume*finalBiomassConcentration*mediaCost/1000; // $/year (media cost input is $/kg, need to divide by 1000 to conver to $/g)

    // Oxygen/Air Requirements & Costs

   // Cumulative O2/Air Need Needed
    cumulativeProductO2 =  (((finalTiter*totalAnnualFermWorkingVolume)/productYieldCoefficientO2)/32)*1000; //mmoles O2 needed
    cumulativeBiomassO2 =  (((finalBiomassConcentration*totalAnnualFermWorkingVolume)/biomassYieldCoefficientO2)/32/BiomassYieldFraction)*1000;// mmoles O2 needed for Biomass
    cumulativeByProductO2 = (((cumulativeByProductGlucose)/FeedstockMW)*1000)*6*1000;//mmoles O2 needed for biomass and product inefficiencies
    cumulativeO2 = cumulativeBiomassO2 + cumulativeProductO2 + cumulativeByProductO2;// mmoles O2 needed
    averageOTR =  (cumulativeO2/annualFermentationUpTime/totalAnnualFermWorkingVolume);// average mmoles/L-hr O2 needed
    cumulativeAir =  cumulativeO2/(9.375*1000) ;// m3 of air needed, 9.375 mmoles O2 per liter of air
    averageAnnualAirflow = (cumulativeAir/(annualFermentationUpTime*3600))*1.333;// Average m3 of air needed per second (assumes 75% O2 consumption, Benz 2008)
    AnnualCostOfAirperM3 = (0.00005*(Math.pow(averageAnnualAirflow,-0.3))*Math.log(maxFermenterPressure)*CEPCI) + 0.0009*Math.log(maxFermenterPressure)*CostOfFuel;// $/m3 (Ulrich & Vasudevan)
    annualCostOfCompressedAir = AnnualCostOfAirperM3*cumulativeAir;// $/year

    // max OTR & Kla

    // Biomass OTR
    maxBiomassOTR =  (((1/biomassYieldCoefficientO2)/BiomassYieldFraction)*(1000/32)*averageLogisticGrowthRate/4)*finalBiomassConcentration;  // (mmoles O2/ L-hr), assumes logistic growth per tank
    maxByProductOTR =  (((1/byproductYieldCoefficientO2)/(1-BiomassYieldFraction))*(1000/32)*averageLogisticGrowthRate/4)*finalBiomassConcentration;  // (mmoles O2/ L-hr), assumes logistic growth per tank

     // If product biosynthesis requires Oxygen
    if (productYieldCoefficientO2 != Infinity){
        maxProductOTR = 0;// ((productYieldCoefficientO2*averageLogisiticProductionRate)/4)*finalTiter; // (mmoles O2/ L-hr), assumes growth associated production per tank
    }else{
        maxProductOTR =0;
    }
    maxOTR = maxProductOTR +maxByProductOTR+ maxBiomassOTR; // mmoles/L-hr per tank
    maxOxygenFlowRate =  maxOTR*maxVesselWorkingVolume; // mmoles/hr per tank
    maxAirFlowRate = maxOxygenFlowRate/9.375/0.75/1000/3600; // (standard m3 air per second) per tank, 9.375 mmoles O2 per liter of air, divided by fraction which is taken up by liquid
    maxKla = (maxOTR/0.15)/3600; //(sec-1) assumes air as sole oxygen source, assumes logistic growth per tank and maximal driving force at 75% consumption (0.2 - 0.05mmoles O2/L)

    // Mass transfer requirements (Stirred Tank) assumes $2/kg of O2 delivered, 0.233 kg O2 per kg Air
    cumulativeAirkg = cumulativeAir*1.225; //
    annualMassTransferPowerNeed = 1.8*0.233*cumulativeAirkg; //  KWh , assumes  O2 delivered, 0.233 kg O2 per kg Air % Watts,  Humbird et al.
    annualCost0fMassTransfer = annualMassTransferPowerNeed*ElectricityCost; //

    // Cooling Calculations(Cooling Tower Water)
    maxCoolingRate = 0.460*maxOTR; // kJ/hr per tank uses 460kJ/mole O2 consumed (Doran), equal to 110kcal/mole ( Humbird)
    cumulativeCoolingDemand = 0.460*cumulativeO2; // kJ

   // Cooling Tower Water
    coolingWaterTemperature = 29.0 ; // degrees Celsius
    if (fermentationTemperature > 33){
        cumulativeCoolingWaterNeeded =  cumulativeCoolingDemand/(4.184*(fermentationTemperature-4-coolingWaterTemperature))/1000; // (m3 of cooling water), assumes 37C fermentation, 32C outlet cooling water
    }else{
         cumulativeCoolingWaterNeeded =  cumulativeCoolingDemand/(4.184*(1))/1000; // (m3 of cooling water)
    }
    averageCoolingWaterFlowRate = (cumulativeCoolingWaterNeeded/annualFermentationUpTime)/3600; // m3/sec
    annualCostOfCoolingWater = cumulativeCoolingWaterNeeded*((0.0001+(0.00003/averageCoolingWaterFlowRate))*CEPCI + 0.003*CostOfFuel);// $/year (Ulrich & Vasudevan)

    // Sterilization Calculations
    mediaSterilizationTemperature = 120; // (degrees Celsius)
    ambientTemperature = 25; // (degrees Celsius)
    sterilizationEfficiency = 0.2; // Watts consumed per Watt used to sterilize
    mediaSterilizationEnergyConsumption = 1.01*4.184*mediaVolume*sterilizationEfficiency*(mediaSterilizationTemperature-ambientTemperature); // (kJ/year) 1.01 to account for seed ferm volumes which ate 1% of main
    annualCostOfSterilization = (mediaSterilizationEnergyConsumption/1055056)*NaturalGasCost; // $/year

    //CIP Costs  // https://www.chemengonline.com/large-scale-fermentation-systems-hygienic-design-principles/
    // Assumes NAOH at 2wt% treatment after each batch
    annualNaOHCosts = (numberOfBatchesPerYearPerTank*numberOfTanks*vesselSize)*.02*NaOHCosts;
    // Assumes Peracetic Acid used at final concentratio of 200ppm  or 0.02%
    annualPeraceticCosts = (numberOfBatchesPerYearPerTank*numberOfTanks*vesselSize)*.002*PeraceticAcidCosts; //Assumes PA at 15-20%
    annualCIPCosts = annualNaOHCosts+annualPeraceticCosts;

    // Primary Cell Removal Calculations (Centrifugation)
        // Sigma = Q/2uo e coli uo=6.81X10-9 m/s
    CentrifugeFlowRate = 10000; //L/hour = 10m3/hr = 0.0028 m3/s) doable with disc stacked centrifuge
    annualCentrifugeVolume = totalAnnualFermWorkingVolume; // Liters
    hoursOfCentrifugationRequired = annualCentrifugeVolume/10000;
    numberOfCentrifuges = Math.ceil(hoursOfCentrifugationRequired/annualUpTime);
    actualAnnualCentrifugeUptime = annualCentrifugeVolume/(numberOfCentrifuges*CentrifugeFlowRate)
    powerConsumptionPerCentrifuge = 3.0 ;// kW  https://onlinelibrary.wiley.com/doi/10.1002/ceat.201800292
    annualCostOfCentrifugation = numberOfCentrifuges*powerConsumptionPerCentrifuge*actualAnnualCentrifugeUptime*ElectricityCost;// $/year

    // Biomass Heat Kill
    heatKillVolume = (totalAnnualFermWorkingVolume*finalBiomassConcentration)*1.6/1000;//(Liters)
    heatKillTemperature = 60 ; // (degrees Celsius) assumes E. coli process
    ambientTemperature = 25; // (degrees Celsius)
    heatKillEfficiency = 0.2; // Watts consumed per Watt used to sterilize
    heatKillEnergyConsumption = 4.184*heatKillVolume*heatKillEfficiency*(heatKillTemperature-ambientTemperature); // (kJ/year)
    annualCostOfHeatKill =  (heatKillEnergyConsumption/1055056)*NaturalGasCost; //  $/year


// Capex Estimations
// Major Equipment
// For all major equipment
// purchase cost  = (# of units)* Quoted Cost *(Actual Size / Quoted Size)^ Scaling Factor
// TIC = (Inflation Factor)(purchase cost)(Installation Factor)
// 2009-2020 Producers inflation = 1.17
// 2013-2020 Producers inflation = 1.00
// 2014-2020 Producers inflation = 1.03
// 2010-2020 Producers inflation = 1.12
// 2017-2020 Producers inflation = 1.06


         if (vesselSize == 1000000){      // %% NREL 2013, quote year 2010 , inflation - 1.12
             fermenterUnitCost = (176000)*(Math.pow((1000000/76000),0.7));
            }else if (vesselSize = 500000){
             fermenterUnitCost = (176000)*(Math.pow((500000/76000),0.7));
            }else if (vesselSize = 200000){
             fermenterUnitCost = (176000)*(Math.pow((200000/76000),0.7));
          }

// Main Fermenter Area including Air Handling
        fermenterCost = numberOfTanks*(fermenterUnitCost); // NREL 2013 , Quote year 2010
        fermenterTIC = 1.12*fermenterCost*2;
        fermenterAgitatorCost = numberOfTanks*36000*(Math.pow((vesselSize/75708),0.5)); // NREL 2013 , Quote year 2013
        fermenterAgitatorTIC = 1.00*fermenterAgitatorCost*1.5;
        TransferPumpsCost = 2*numberOfTanks*3933*(Math.pow((vesselSize/950000),0.8)); //NREL 2009
        TransferPumpsTIC = 1.17*TransferPumpsCost*2.3;
        fermentationCoolersCost = 0 ; // included in fermenter cost
        fermentationCoolersTIC = 0 ; // included in fermenter cost
        mainFermPiping = 0.045*(fermenterTIC+fermenterAgitatorTIC +TransferPumpsTIC);
        mainFermTIC = (mainFermPiping+fermenterTIC+fermenterAgitatorTIC +TransferPumpsTIC);
        mainFermEquip = fermenterCost + fermenterAgitatorCost +TransferPumpsCost+ fermentationCoolersCost;

// Sugar Storage
        glucoseStorageTankCost = 70000*(Math.pow(((averageGlucoseConsumptionRate*12)/264978),0.7)); // NREL 2013 , Quote year 2009, holds 12 hrs of feed.
        glucoseStorageTankTIC = 1.17*glucoseStorageTankCost*2.6; //
        glucoseStorageTransferPumpsCost = numberOfTanks*3933*(Math.pow(((averageGlucoseConsumptionRate*12)/950000),0.8)); //NREL 2009
        glucoseStorageTransferPumpsTIC= 1.17*glucoseStorageTransferPumpsCost*2.3;
        glucoseStoragepiping = 0.045*(glucoseStorageTankTIC+glucoseStorageTransferPumpsTIC);
        glucoseStorageTIC = (glucoseStoragepiping+glucoseStorageTankTIC+glucoseStorageTransferPumpsTIC);
        glucoseStorageEquip = glucoseStorageTankCost+glucoseStorageTransferPumpsCost;


// Titrant Prep & Storage
        ammoniaStorageTankCost = 196000*(Math.pow(((averageNH3ConsumptionRate*12)/105991),0.7)); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        ammoniaStorageTankTIC = 1.13*ammoniaStorageTankCost*2;//
        acidStorageTankCost = 96000*(Math.pow(((averageNH3ConsumptionRate*12)/45000),0.7)); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        acidStorageTankTIC = 1.13*acidStorageTankCost*1.5;//
        ammoniaTransferPumpsCost = numberOfTanks*3933*(Math.pow(((averageNH3ConsumptionRate*12)/950000),0.8)); //NREL 2009
        ammoniaTransferPumpsCostTIC = 1.17*ammoniaTransferPumpsCost*2.3;
        acidTransferPumpsCost = numberOfTanks*3933*(Math.pow(((averageNH3ConsumptionRate*12)/950000),0.8)); //NREL 2009
        acidTransferPumpsCostTIC  = 1.17*ammoniaTransferPumpsCost*2.3;
        additionPiping = 0.045*(ammoniaStorageTankTIC+acidStorageTankTIC +ammoniaTransferPumpsCostTIC+acidTransferPumpsCostTIC);
        additionsTIC = (additionPiping+ammoniaStorageTankTIC+acidStorageTankTIC +ammoniaTransferPumpsCostTIC+acidTransferPumpsCostTIC);
        additionsEquip =  ammoniaStorageTankCost+acidStorageTankCost +ammoniaTransferPumpsCost+ acidTransferPumpsCost ;

// Agitated Media Prep & Storage
        agitatedMediaPrepTankCost = 91200*(Math.pow((vesselSize/264978),0.7)); // NREL 2013 , Quote year 2009
        agitatedMediaPrepTankTIC = 1.17*agitatedMediaPrepTankCost*2.6;//
        mediaTransferPumpsCost = (numberOfTanks+1)*(3933*(Math.pow((vesselSize/950000),0.8))); //NREL 2009 + 1 for RO water addition
        mediaTransferPumpsCostTIC  = 1.17*mediaTransferPumpsCost*2.3;



// Dry Chemicals
       DryChemicalAddition  = 100000;
       DryChemicalAdditionTIC = 2*DryChemicalAddition; // 2020 Estimate Lynch

        mediaPiping = 0.045*(agitatedMediaPrepTankTIC+mediaTransferPumpsCostTIC);
        mediaPrepTIC = (mediaPiping+agitatedMediaPrepTankTIC+mediaTransferPumpsCostTIC +DryChemicalAdditionTIC );
        mediaPrepEquip = agitatedMediaPrepTankCost +mediaTransferPumpsCost +DryChemicalAddition;


// CIP
        CIPTankCost = 3*(98000*(Math.pow((vesselSize/100)/105991),0.7)); // NREL 2013 , Quote year 2010, holds 1/100 volume of concentrated
        CIPTankTIC = 1.17*CIPTankCost*1.8;//
        CIPTransferPumpsCost = numberOfTanks*(3933*(Math.pow((vesselSize/100)/950000),0.8)); //NREL 2009
        CIPTransferPumpsCostTIC  = 1.17*CIPTransferPumpsCost*2.3;
        CIPFilterCost = 35000; // 2020 Estimate Lynch
        CIPFilterCostTIC = CIPFilterCost *1.8; // 2020 Estimate Lynch
        CIPHeaterCost = 30000;
        CIPHeaterCostTIC = CIPHeaterCost*1.8; // 2020 Estimate Lynch
        CIPpipingTIC = 0.045*(CIPTankTIC +CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC);
        CIPTIC = (CIPpipingTIC+CIPTankTIC +CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC);
        CIPEquip = CIPTankCost+CIPTransferPumpsCost + CIPFilterCost +CIPHeaterCost;
        MainFermAreaEquip = mainFermEquip+glucoseStorageEquip+additionsEquip+mediaPrepEquip+CIPEquip ;
        MainFermAreaTIC = mainFermTIC+glucoseStorageTIC+additionsTIC+mediaPrepTIC+ CIPTIC;


// Area 100: Seed Fermenter Area
        seedEquipment  = 0.27*MainFermAreaEquip;
        seedEquipmentTIC = 0.27*MainFermAreaTIC;  // Assume 0.27 * production fermentation equipment cost per NREL_2013

// Area 400 : Primary Cell Removal Capex

// Centrifugation

        // Sigma = Q/2uo e coli uo=6.81X10-9 m/s
        CentrifugeFlowRate2 = 0.0028; // m3/sec or 10000L/hour ) doable with disc stacked centrifuge
        Sigma = 205580; // needed sigama in m2, at 10000L/hr flow rate
        // cost of 200 X 1000 m2 Cenrifuge is $325,000, 1998 https://www.cheric.org/files/education/cyberlecture/d200301/d200301-1801.pdf
        CentrifugeCost = numberOfCentrifuges*325000*1.59;// 1.59 to correct for time
        CentrifugeTIC = CentrifugeCost*1.8;//
        Centrifugepiping = 0.045*CentrifugeTIC;
        CentrifugeEquip = CentrifugeCost;
        CentrifugeEquipTIC = CentrifugeTIC + Centrifugepiping;

// Broth Storage
        brothStorageTankCost = (1317000*(Math.pow((vesselSize*numberOfTanks*0.5)/4542000),0.7)); // NREL 2013 , Quote year 2011, sized to 1/2 of fermentation capacity
        brothStorageTankTIC = 1.0*brothStorageTankCost*1.8;
        brothStorageTransferPumpCost= (3933*(Math.pow((vesselSize*numberOfTanks*0.5)/950000),0.8)); //NREL 2009
        brothStorageTransferPumpTIC= 1.17*brothStorageTransferPumpCost*2.3;
        brothStoragePiping = 0.045*(brothStorageTankTIC +brothStorageTransferPumpTIC);
        brothStorageEquip = brothStorageTankCost+ brothStorageTransferPumpCost;
        brothStorageTIC = (brothStoragePiping+brothStorageTankTIC +brothStorageTransferPumpTIC);

        PrimaryCellRemovalEquip = brothStorageEquip+ CentrifugeEquip;
        PrimaryCellRemovalTIC = brothStorageTIC+ CentrifugeEquipTIC;


// Area 500 : DSP

    dspRATE = plantCapacity/annualUpTime; // kg/hr

// UltraFiltration

    // Opex
            annualUltrafiltrationInVolume = totalAnnualFermWorkingVolume; // Liters
            UFwashRatio = 0.2; // L wash/L inlet
            UFflux = 25.8; // L/m2-hr //Economic Assessment of an Integrated Membrane System for Secondary Effluent Polishing for Unrestricted Reuse
            UFmembraneCost = 136; // $/m2
            UFfoulingFactor = 0.7;
            UFmembraneLifetime = 0.25; // yr
            UFpowerNeed = 0.0625; // kW/m2
            UFuptime = 0.70*annualUpTime; // hrs
            annualUltrafiltrationOutVolume = annualUltrafiltrationInVolume*(1+UFwashRatio); // L
            UFFlow = annualUltrafiltrationOutVolume/UFuptime; // L-hr
            UFmembraneArea = UFFlow/(UFflux*UFfoulingFactor); //m2
            UFpower = UFmembraneArea*UFpowerNeed; // kW
            annualUFelectricityCosts = UFpower*UFuptime*ElectricityCost; // $/yr
            UFmembraneReplacementCost = UFmembraneCost*(UFmembraneArea/UFmembraneLifetime); // $/year
            annualUFopex = UFmembraneReplacementCost+annualUFelectricityCosts;

       // Capex
            UFFlowM3hr =UFFlow/1000; // convert L to m3
            UFequipCost = 1.66*33837.28*(Math.pow(UFFlowM3hr,0.63)); //1996 dollars to 200 dollar
            UFequipTIC = 2*UFequipCost;
            //console.log('UF Equipment Cost'+ UFequipCost);

// Nanofiltration

    // Opex
            annualNanofiltrationInVolume = annualUltrafiltrationOutVolume; // Liters
            NanowashRatio = 0.25; // L wash/L inlet
            Nanoflux = 52; // L/m2-hr //Economic Assessment of an Integrated Membrane System for Secondary Effluent Polishing for Unrestricted Reuse
            NanomembraneCost = 136; // $/m2
            NanofoulingFactor = 0.7;
            NanomembraneLifetime = 0.25; // yr
            NanopowerNeed = 0.045; // kW/m2
            Nanouptime = 0.70*annualUpTime; // hrs
            annualNanofiltrationOutVolume = annualNanofiltrationInVolume*(1+NanowashRatio); // L
            NanoFlow = annualNanofiltrationOutVolume/Nanouptime; // L-hr
            NanomembraneArea = NanoFlow/(Nanoflux*NanofoulingFactor); //m2
            Nanopower = NanomembraneArea*NanopowerNeed; // kW
            annualNanoelectricityCosts = Nanopower*Nanouptime*ElectricityCost; // $/yr
            NanomembraneReplacementCost = NanomembraneCost*(NanomembraneArea/NanomembraneLifetime); // $/year
            annualNanoopex = NanomembraneReplacementCost+annualNanoelectricityCosts;

       // Capex
            NanoFlowM3hr =UFFlow/1000; // convert L to m3
            NanoequipCost = 1.66*33837.28*(Math.pow(NanoFlowM3hr,0.62)); //1996 dollars to 200 dollar
            NanoequipTIC = 2*NanoequipCost;
            //console.log('Nano Equipment Cost'+ NanoequipCost);

// CACA Chromatography
    // Opex
            CACAInVolume = annualNanofiltrationOutVolume; // Liters
            CACABreakthroughTime = 10; // hr
            CACARegenerationTime  = 1.5; // hr
            CACACycleTime = CACABreakthroughTime + CACARegenerationTime ; // hr/cycle
            CACAUptime  = 0.7*(CACABreakthroughTime/CACACycleTime)*annualUpTime;
            CACACyclesPerYear = CACAUptime/CACACycleTime ; // cycles per year
            CACAInFlow = CACAInVolume/CACAUptime ; // L/hr
            CACAOutVolume = CACAInVolume;
            CACABedSizeSafetyFactor = 1.67;
            CERcapacity = 6; //  L/hr-Lresin
            AERcapacity = 3; //  L/hr-Lresin
            CERbedNumber = 2;
            AERbedNumber  = 4;
            BindingCapacityCER = 1.80; //Eq/L
            BindingCapacityAER = 1.70; //Eq/L
            ProtonPerSiteForRegeneration = 1.60; //mole/mole
            HydroxidePerSiteForRegeneration = 1.60; //mole/mole
            PumpsRequiredperBed = 2; // per column
            ResinLifetime = 1; // year
            CACAElectricalPower = 26.1; // kW/column
            CACAResinCost = 3;// $/L
            SulfuricCosts = 0.104; //$/kg

            CERcolumnSize= ((CACAInFlow*CACABedSizeSafetyFactor)/CERcapacity); // L
            AERcolumnSize = ((CACAInFlow*CACABedSizeSafetyFactor)/AERcapacity); // L

            CERresin = ((CACAInFlow*CACABedSizeSafetyFactor)/CERcapacity)*CERbedNumber; // L
            AERresin = ((CACAInFlow*CACABedSizeSafetyFactor)/AERcapacity)*AERbedNumber; // L
            CERRegenerantStorageVolume = 1.5*CERresin;
            AERRegenerantStorageVolume = 1.5*AERresin;

            CACAh2so4Costs = ((CERresin*ProtonPerSiteForRegeneration*BindingCapacityCER)/(2*98.079*1000)*CACACyclesPerYear)*SulfuricCosts; // kg /yr
            CACAnaohCosts= ((AERresin*HydroxidePerSiteForRegeneration*BindingCapacityAER)/(39.997*1000)*CACACyclesPerYear)*NaOHCosts; // kg /yr
            CACApumpsRequired = PumpsRequiredperBed*(CERbedNumber + AERbedNumber);
            AnnualCACAResinCosts = ((CERresin+AERresin)/ResinLifetime)*CACAResinCost;
            CACAElectricity = CACAElectricalPower*(CERbedNumber+AERbedNumber)*CACAUptime*ElectricityCost; //$/yr

            CACAOpex = AnnualCACAResinCosts + CACAElectricity +CACAh2so4Costs+ CACAnaohCosts;

       // Capex

            CACAColumnCost = (CERbedNumber+AERbedNumber)*(1.03*150000*(Math.pow((CERcolumnSize/4660),0.7))); //2012
            CACAacidStorage =(1.16*91200*(Math.pow((CERRegenerantStorageVolume/264978),0.7))); //2012
            CACAbaseStorage =(1.16*91200*(Math.pow((AERRegenerantStorageVolume/264978),0.7))); //2012
            CACApumpCosts = CACApumpsRequired*(1.16*12150*(Math.pow((CACAInFlow/43154),0.7))); //2012

            CACAColumnTIC = 2.3*CACAColumnCost;
            CACAacidStorageTIC = 2.6*CACAacidStorage;
            CACAbaseStorageTIC = 2.6*CACAbaseStorage;
            CACAPumpsTIC = 2.3*CACApumpCosts;

            CACAEquipment = CACAColumnCost+CACAColumnCost+CACAbaseStorage +CACApumpCosts;
            CACATIC =CACAColumnTIC+CACAacidStorageTIC+CACAbaseStorageTIC+CACAPumpsTIC;

// Primary evaporator
    // Opex
        PrimEvapOutletConcentration = 0.5; //
        PrimEvapInVolume = CACAOutVolume; //L
        PrimEvapFlow = PrimEvapInVolume/annualUpTime; //L/hr
        PrimEvapInFlowWater = PrimEvapFlow -(dspRATE/1.06); // kg/hr
        PrimEvapOutFlowWater = dspRATE/PrimEvapOutletConcentration/1.06 - dspRATE/1.06;
        PrimEvapRATE = PrimEvapInFlowWater - PrimEvapOutFlowWater; // kg/hr
        EvapPowerNeed = 0.021; // kW/(kg/hr)
        PrimEvapOpex =  PrimEvapRATE*EvapPowerNeed*annualUpTime*ElectricityCost; // $/yr
        PrimEvapOutVolume = (dspRATE + PrimEvapOutFlowWater)*annualUpTime;

    // Capex
        PrimEvapEquip =(1.03*6478996*(Math.pow((PrimEvapRATE/174943),0.7))); //2012
        PrimEvapTIC = 2*PrimEvapEquip;

// Secondary evaporator
    // Opex
        SecEvapOutletConcentration = 0.8; //
        SecEvapBoilerEfficiency = 0.85;
        SecEvapInVolume = PrimEvapInVolume; //L
        SecEvapFlow = SecEvapInVolume/annualUpTime; //L/hr
        SecEvapInFlowWater = SecEvapFlow -dspRATE/1.06; // kg
        SecEvapOutFlowWater = dspRATE/SecEvapOutletConcentration/1.06 - dspRATE/1.06;
        SecEvapRATE = SecEvapInFlowWater - SecEvapOutFlowWater; // kg/hr
        SecEvapDuty = SecEvapRATE*2257;// kJ/hr rate by heat of vaporization of water 2257kJ/kg
        SecEvapDuty2 = SecEvapDuty*annualUpTime; //kJ/yr
        SecEvapNatGasDuty = (SecEvapDuty2/SecEvapBoilerEfficiency)*0.00000094708628903179 ;// MMBtu/yr , 1 kJ =9.4708628903179E-7 MMBtu
        SecEvapDuty3 = SecEvapDuty/3600; // kW
        SecEvapOutVolume = (dspRATE + SecEvapOutFlowWater)*annualUpTime;
        SecEvapNatGasCosts = SecEvapNatGasDuty*NaturalGasCost;
        console.log('Sec Evap Nat Gas Costs: ' +SecEvapNatGasCosts );

            SecEvapCoolingDemand = SecEvapDuty2; // kJ/yr
            SecEvapcoolingWaterTemperature = 29.0 ; // degrees Celsius
            SecEvapcumulativeCoolingWaterNeeded =  SecEvapCoolingDemand/(4.184*(212-SecEvapcoolingWaterTemperature))/1000; // (m3 of cooling water), assumes 212C boiler,
            SecEvapaverageCoolingWaterFlowRate = (SecEvapcumulativeCoolingWaterNeeded/annualUpTime)/3600; // m3/sec
            SecEvapannualCostOfCoolingWater = SecEvapcumulativeCoolingWaterNeeded*((0.0001+(0.00003/SecEvapaverageCoolingWaterFlowRate))*CEPCI + 0.003*CostOfFuel);// $/year (Ulrich & Vasudevan)
            SecEvapOpex = SecEvapNatGasCosts + SecEvapannualCostOfCoolingWater;
            console.log('Sec Evap Cooling Water Costs: ' +SecEvapannualCostOfCoolingWater );
    // Capex
        SecEvap=(1.03*6478996*(Math.pow((SecEvapRATE/174943),0.7))); //2012
        SecEvapCondensor =(1.06*103512*(Math.pow((SecEvapDuty3/3622),0.7))); //2012
        SecEvapTIC = 2*PrimEvapEquip;
        SecCondensorTIC = 2.47*PrimEvapEquip;
        SecEvapEquip = SecEvap+ SecEvapCondensor;
        SecEvapTIC = SecEvapTIC +SecCondensorTIC;

// Mixed Bed Chromatography
    // Opex
            MBInVolume = SecEvapOutVolume ; // Liters
            MBBreakthroughTime = 10; // hr
            MBRegenerationTime  = 1.5; // hr
            MBFractionAER = 0.40;
            MBCycleTime = MBBreakthroughTime + MBRegenerationTime ; // hr/cycle
            MBUptime  = 0.7*(MBBreakthroughTime/MBCycleTime)*annualUpTime;
            MBCyclesPerYear = MBUptime/MBCycleTime ; // cycles per year
            MBInFlow = MBInVolume/MBUptime ; // L/hr
            MBOutVolume = MBInVolume;
            MBBedSizeSafetyFactor = 1.67;
            MBcapacity = 6; //  L/hr-Lresin
            MBbedNumber = 2;
            MBBindingCapacityCER = 1.80; //Eq/L
            MBBindingCapacityAER = 1.70; //Eq/L
            MBProtonPerSiteForRegeneration = 1.60; //mole/mole
            MBHydroxidePerSiteForRegeneration = 1.60; //mole/mole
            MBPumpsRequiredperBed = 2; // per column
            MBResinLifetime = 1; // year
            MBElectricalPower = 26.1; // kW/column
            MBResinCost = 3;// $/L
            MBSulfuricCosts = 0.104; //$/kg

            MBcolumnSize= ((MBInFlow*MBBedSizeSafetyFactor)/MBcapacity); // L
            MBresin = ((MBInFlow*MBBedSizeSafetyFactor)/MBcapacity)*MBbedNumber; // L
            MBRegenerantStorageVolume = 1.5*MBresin;
            MBh2so4Costs = (1-MBFractionAER)*((MBresin*MBProtonPerSiteForRegeneration*MBBindingCapacityCER)/(2*98.079*1000)*MBCyclesPerYear)*SulfuricCosts; // kg /yr
            MBnaohCosts= MBFractionAER*((MBresin*MBHydroxidePerSiteForRegeneration*MBBindingCapacityAER)/(2*39.997*1000)*MBCyclesPerYear)*NaOHCosts; // kg /yr
            MBpumpsRequired = MBPumpsRequiredperBed*(MBbedNumber);
            AnnualMBResinCosts = ((MBresin)/MBResinLifetime)*MBResinCost;
            MBElectricity = MBElectricalPower*(MBbedNumber)*MBUptime*ElectricityCost; //$/yr

            MBOpex = AnnualMBResinCosts + MBElectricity +MBh2so4Costs+ MBnaohCosts;

       // Capex

            MBColumnCost = (MBbedNumber)*(1.03*150000*(Math.pow((MBcolumnSize/4660),0.7))); //2012
            MBacidStorage =(1.16*91200*(Math.pow((MBRegenerantStorageVolume/264978),0.7))); //2012
            MBbaseStorage =(1.16*91200*(Math.pow((MBRegenerantStorageVolume/264978),0.7))); //2012
            MBpumpCosts = MBpumpsRequired*(1.16*12150*(Math.pow((MBInFlow/43154),0.7))); //2012

            MBColumnTIC = 2.3*MBColumnCost;
            MBacidStorageTIC = 2.6*MBacidStorage;
            MBbaseStorageTIC = 2.6*MBbaseStorage;
            MBPumpsTIC = 2.3*MBpumpCosts;

            MBEquipment = MBColumnCost+MBColumnCost+MBbaseStorage +MBpumpCosts;
            MBTIC =MBColumnTIC+MBacidStorageTIC+MBbaseStorageTIC+MBPumpsTIC;

// Distillation
       //
            DistillationInVolume = MBOutVolume; // L
            ProductDensity = 1.06; // density of PDO.
            NumberOfDistillationColumns = 4;
            NumberOfStages = 20;
            TraySpacing = 0.61; //m
            ReboilerHeight = 1.83; //m
            OutletProductConc = 0.98//;
            CrossSectionalAreaSafetyFactor  = 1.20;// kW/(kg/hr feed)
            TotalDistillationInFlow =  DistillationInVolume/annualUpTime; // L/hr
            TotalDistillationOutFlow = (dspRATE/OutletProductConc)/ProductDensity;//L-hr
            DistillationCrossSectionalFeedRATE  = 5319; // L/hr-m2
            DisCondensorDutyConst = 0.393; // kW/kg-hr
            DisMinCrossSectionalArea = TotalDistillationInFlow/DistillationCrossSectionalFeedRATE;
            DisUsableCrossSectionalArea = DisMinCrossSectionalArea*CrossSectionalAreaSafetyFactor;
            DisColumnDiameter = 2*(Math.pow((DisUsableCrossSectionalArea/3.14159265359),0.5)); // d = 2*(Area/pi)^0.5
            DisColumnHeight = NumberOfStages*TraySpacing +ReboilerHeight;

          //Condensor
            DisCondensorDuty = TotalDistillationInFlow*CrossSectionalAreaSafetyFactor; // kW

            DisCondensorCoolingDemand = (DisCondensorDuty*annualUpTime/3600); // kJ/yr
            DisCondensorcoolingWaterTemperature = 29.0 ; // degrees Celsius
            DisCondensorcumulativeCoolingWaterNeeded =  DisCondensorCoolingDemand/(4.184*(212-DisCondensorcoolingWaterTemperature))/1000; // (m3 of cooling water), assumes 212C boiler,
            DisCondensoraverageCoolingWaterFlowRate = (DisCondensorcumulativeCoolingWaterNeeded/annualUpTime)/3600; // m3/sec
            DisCondensorannualCostOfCoolingWater = DisCondensorcumulativeCoolingWaterNeeded*((0.0001+(0.00003/DisCondensoraverageCoolingWaterFlowRate))*CEPCI + 0.003*CostOfFuel);// $/year (Ulrich & Vasudevan)

            console.log('Distillation Condensor Cooling Water Costs: ' +DisCondensorannualCostOfCoolingWater );

          //Reboiler
            SteamTemp = 148; // C
            SteamPressure  = 250; // psig
            LiquidTemp = 130; // C

            DisReboilerDutyConst = 0.053; // kW/kg-hr
            DisReboilerEfficiency = 0.85;
            DisReboilerHeatTransferCoeff = 4;// kW/m2-degC
            DisReboilerDuty = TotalDistillationInFlow*DisReboilerDutyConst; // kW
            DisReboilerLMTD = (SteamTemp - SteamTemp)/(Math.log(SteamTemp/SteamTemp)); //C
            DisREboilerHeatTransferArea = DisReboilerDuty/DisReboilerLMTD/DisReboilerHeatTransferCoeff; // m2
            DisReboilerNaturalGasDuty = (DisReboilerDuty)/DisReboilerEfficiency; // kW
            DisReboilerNaturalGasCosts = ((DisReboilerNaturalGasDuty*annualUpTime/3600)*0.00000094708628903179)*NaturalGasCost;// $/yr, 1 kJ =9.4708628903179E-7 MMBtu
            DistillationOpex = NumberOfDistillationColumns*DisReboilerNaturalGasCosts + NumberOfDistillationColumns*DisCondensorannualCostOfCoolingWater;

        // Capex
        DistillationColumnSize = DisColumnHeight*(Math.pow((DisColumnDiameter),1.5));  // LXD^1.5
        DistillationReboilerSize = DisREboilerHeatTransferArea; // m2
        DistillationCondensorSize = DisCondensorDuty ; // kW

        DistillationColumnCost = NumberOfDistillationColumns*(0.6*539912*(Math.pow((DistillationColumnSize/22),0.96))); //Inflation corrected ofr CEPCI =1000
        DistillationCondensorCost =   NumberOfDistillationColumns*(0.6*196984*(Math.pow((DistillationCondensorSize/3622),0.6))); //Inflation corrected ofr CEPCI =1000
        DistillationReboilerCost =  NumberOfDistillationColumns*(0.6*139977*(Math.pow((DistillationReboilerSize/100),0.71))); //Inflation corrected ofr CEPCI =1000
        DistillationEquip = DistillationColumnCost+DistillationCondensorCost + DistillationReboilerCost;
        DistillationColumnTIC = DistillationColumnCost*2.95;
        DistillationCondensorTIC = DistillationCondensorCost*1.7;
        DistillationReboilerTIC = DistillationReboilerCost*2.50;
        DistillationTIC = DistillationColumnTIC+DistillationCondensorTIC+DistillationCondensorTIC;

//Hydrogenation reactor
        // Design
               H2ReactorLHSV = 4;// per hr liquid hour space velocity
               H2ReactorH2FeedRatio = 2.00; //sL/kg product
               H2ReactorFeedDensity = 1.06; // kg/L
               H2ReactorH2Pressure = 400; //psig
               H2ReactorAspectRatio = 6;// H/D
               H2ReactorVolumeSafetyFactor = 1.2; //

               TotalH2ReactorInflow = TotalDistillationOutFlow; //L/hr
               TotalH2ReactorOutflow =TotalH2ReactorInflow; // no volume change
               H2ReactorVolume = (TotalH2ReactorInflow*H2ReactorVolumeSafetyFactor)/H2ReactorLHSV/1000; //m3
               H2ReactorDiameter = Math.pow((4*H2ReactorVolume/3.14159265359/H2ReactorAspectRatio),0.333); // m
               H2ReactorHeight  = H2ReactorDiameter*H2ReactorAspectRatio; //m
               H2ReactorH2RATE = (H2ReactorH2FeedRatio*dspRATE)/(22.4*2.02)/1000; // kg/hr

       // Opex
                annualH2ReactorH2Costs= (H2ReactorH2RATE*annualUpTime)*1.25; // $/yr H2 at $1.25/kg.
                H2ReactorOpex = annualH2ReactorH2Costs;
       // Capex
                H2ReactorSize= H2ReactorHeight*(Math.pow((H2ReactorDiameter),1.5));  // LXD^1.5
                H2ReactorCost = (0.6*483921*(Math.pow((H2ReactorSize/20),0.81))); //Inflation corrected ofr CEPCI =1000
                H2ReactorTIC = H2ReactorCost*2.47;

// DSP Totals

    annualDSPOpex  = annualUFopex + annualNanoopex +CACAOpex +PrimEvapEquip + PrimEvapOpex +SecEvapOpex + MBOpex + DistillationOpex +H2ReactorOpex; //
    DSPEquip = NanoequipCost + UFequipCost + CACAEquipment +PrimEvapEquip +SecEvapEquip + MBEquipment + DistillationEquip +H2ReactorCost ;
    dspTIC =  (NanoequipTIC+ UFequipTIC + CACATIC + PrimEvapTIC+ SecEvapTIC+ MBTIC+ DistillationTIC+H2ReactorTIC);
    dspTIC = 1.045*dspTIC;

// Area 0: Utilities

// Process Utilities
        // Cooling Water
           TotalaverageCoolingWaterFlowRate =averageCoolingWaterFlowRate + DisCondensoraverageCoolingWaterFlowRate + SecEvapaverageCoolingWaterFlowRate;
           averageCoolingWaterFlowRateGPM = TotalaverageCoolingWaterFlowRate*1000*60*0.264172;  // m3/sec --> gpm
           coolingTowerEquip = 1.17*1375000*(Math.pow((averageCoolingWaterFlowRateGPM/44200),0.6));//NREL 2010
           coolingTowerTIC = 1.5*coolingTowerEquip; //$/ton NREL 2011
           coolingTowerPumps = 1.17*283671*(Math.pow((averageCoolingWaterFlowRateGPM/16120),0.8));//NREL 2010
           coolingTowerPumpsTIC = 3.1*coolingTowerPumps;
           coolingTowerPiping = 0.045*(coolingTowerTIC+coolingTowerPumpsTIC);
           coolingEquip = coolingTowerEquip +coolingTowerPumps;
           coolingTIC = (coolingTowerPiping+coolingTowerTIC+coolingTowerPumpsTIC);

        // Boiler Sizing

            // Sterlization Steam
                 TimeTransfer1 = 3600*annualUpTime/20; // sec.
                 he = 1910; //kJ/kg assumes 250psig 120C Steam
                 MediaMass = totalAnnualFermWorkingVolume*1.05;//(kg)
                 qSterilization = 4.19*(120-25)*MediaMass/TimeTransfer1; //kW
                 SteamSTERILIZATION = 2.2046*qSterilization/1910; // (lb/sec)

            // Heat Kill Steam
                 TimeTransfer2 = 3600*annualUpTime/20; // sec
                 HeatKillMass = heatKillVolume*1.1; //(kg)
                 qHeatKill = 4.19*(60-25)*HeatKillMass/TimeTransfer2; //kW
                 SteamHEATKILL  =2.2046*qHeatKill/1910; // (lb/sec)




                 TotalSteamRate =(SteamSTERILIZATION +SteamHEATKILL)*3600; // (lb/hr)


            BoilerPackageCosts = 2*1.6*100000*(Math.pow((TotalSteamRate/10000),0.6)); // https://www.osti.gov/servlets/purl/797810/
            BoilerPackageTIC = 1.8*BoilerPackageCosts;
            //console.log(BoilerPackageCosts);

        // AirHandling
            airDensity = 1.225; // 𝑘𝑔/𝑚3
            airflowQ = airDensity*averageAnnualAirflow*(3600) ; // kg/hr - see above, averageAnnualAirflow is in m3/s
            airflowSCFM = 2127*averageAnnualAirflow ; // convert m3/s to scfm
            //console.log(airflowQ);

        // Air Reciever Calcs
            holdTime = 0.5 ; // min , 30 sec
            maxFermenterPressurePsi = 14.5038*maxFermenterPressure; // convert pressure from bar to psi
            ReceiverVolume = holdTime*airflowSCFM*14.7/(50-1.2*maxFermenterPressurePsi); // cubic feet
            ReceiverVolumeGal = ReceiverVolume*7.48; // gallons
            //console.log("receiver Volume Gal" + ReceiverVolumeGal );
            AirReceiver  = 1.11*104600*(Math.pow((ReceiverVolumeGal/25000),1));//NREL 2010
            AirReceiverTIC = AirReceiver*2.0;
           // console.log("Air Receiver" + AirReceiver);

          //Compressor Calculations
            compressorOutletP = 3.4; // bar -
            //console.log(compressorOutletP);
            compressorInletP = 1.013; // bar - atmospheric Pressure
            compressorInletT = 25+273; // ambient temperature
            // for air : y = 1.4;
            //z = (1.4-1)/1.4 = 0.286;
            compressorOutletT = compressorInletT*(Math.pow((compressorOutletP/compressorInletP),0.286));
            //console.log(compressorOutletT-273);
            compressorPower = ((2.31*(3.5)*0.7/28.96)*(compressorOutletT-compressorInletT)*airflowQ)/1000; // kW //https://powderprocess.net/Tools_html/Compressors/Tools_Compressor_Power.html
            //AirCompressor = 1.47*5820*(Math.pow(compressorPower,0.82)); // Douglas 1988
            AirCompressor = 1.03*1318600*(Math.pow((airflowSCFM/25000),0.8)); // NREL https://www.nrel.gov/docs/fy19osti/71949.pdf
           // console.log("Air Compressor " + AirCompressor);
            AirCompressorTIC =1.6*AirCompressor;
            AirDryer = 1.17*(15000)*(Math.pow((airflowQ/83333),0.6));//NREL 2018
            AirDryingTIC = AirDryer*1.8;
            //console.log(AirDryer);

            AirPiping=0.045*(AirDryingTIC+AirReceiverTIC+AirCompressorTIC);
            AirHandlingEquip = AirDryer + AirReceiver +AirCompressor;
            AirHandlingTIC =(AirPiping+AirDryingTIC+AirReceiverTIC+AirCompressorTIC);

        // Water Handling & Purification
        //from opex - averageWaterDemandRate // m3/sec
            averageWaterDemandRateKgperhr = averageWaterDemandRate*1000*3600
            MunicpalWaterTank = 1.17*250000*(Math.pow((averageWaterDemandRateKgperhr/451555),0.6));//NREL 2018
            MunicpalWaterTankTIC = MunicpalWaterTank*1.7;
            MunipalWaterPump = 1.17*(15292+6864)*(Math.pow((averageWaterDemandRateKgperhr/518924),0.6));//NREL 2018
            MunipalWaterPumpTIC  = MunipalWaterPump*3.1;
            SoftenerSystem = 1.17*78000*(Math.pow((averageWaterDemandRateKgperhr/235803),0.6));//NREL 2010
            SoftenerSystemTIC  = SoftenerSystem*1.8;
            PotableWaterTank =50000; // Lynch 2020 Estimate
            PotableWaterTankTIC  = PotableWaterTank*1.7;
            PotableWaterCooler = 25000; // Lynch 2020 Estimate
            PotableWaterCoolerTIC  = PotableWaterCooler*1.7;
            WaterPiping  = 0.045*(MunicpalWaterTankTIC+PotableWaterTankTIC+SoftenerSystemTIC+ PotableWaterCoolerTIC+MunipalWaterPumpTIC);
            WaterHandlingEquip = (MunicpalWaterTank+PotableWaterTank+SoftenerSystem+PotableWaterCooler+MunipalWaterPump);
            WaterHandlingTIC= (WaterPiping+MunicpalWaterTankTIC+PotableWaterTankTIC+SoftenerSystemTIC+ PotableWaterCoolerTIC+MunipalWaterPumpTIC);

       // Waste Disposal
            WasteWaterTankSize = (heatKillVolume/totalAnnualFermWorkingVolume)*vesselSize*numberOfTanks;
            //console.log(WasteWaterTankSize);
            WasteWaterTank = 1317000*(Math.pow((WasteWaterTankSize/4542000),0.7)); //
            //console.log(WasteWaterTank);
            WasteWaterTankTIC = 1.8*WasteWaterTank;
            WasteWaterPump = (3933*(Math.pow((WasteWaterTankSize)/950000),0.8)); //NREL 2009
            WasteWaterPumpTIC= 1.17*WasteWaterPump*2.3;
            //  Heat Kill exchanger Calcs
                 ldT1 = ((201-60)-(60-25))/(Math.log((201-60)/(60-25)));
                 U1 = 1; // kW/m2-K
                 HeatKillExchangerArea = qHeatKill/(U1*ldT1);
                 HeatKillExchanger = 1.59*15000*(Math.pow((HeatKillExchangerArea/140),0.5)); //
                 HeatKillExchangerTIC = HeatKillExchanger*3.1;

            WasteWaterPiping  = 0.045*(WasteWaterTankTIC+HeatKillExchangerTIC+WasteWaterPumpTIC);
            WasteWaterEquip = (WasteWaterPiping +WasteWaterTank+WasteWaterPump+HeatKillExchanger);
            WasteWaterTIC = (WasteWaterPiping +WasteWaterTankTIC+HeatKillExchangerTIC+WasteWaterPumpTIC);


        // Media Heat exchanger Calcs
                 ldT0 = ((201-120)-(120-25))/(Math.log((201-120)/(120-25)));
                 U0 = 1; // kW/m2-K
                 MediaHeatExchangerArea = qSterilization/(U0*ldT0);
                 MediaHeatExchanger = 1.59*15000*(Math.pow((MediaHeatExchangerArea/140),0.5)); //
                 MediaHeatExchangerTIC = MediaHeatExchanger*3.1;

        // Update Media Prep costs

                mediaPiping =  mediaPiping + 0.045*(MediaHeatExchangerTIC);
                mediaPrepTIC  =mediaPrepTIC + 0.045*(MediaHeatExchangerTIC) + MediaHeatExchangerTIC;
                mediaPrepEquip = mediaPrepTIC + MediaHeatExchanger;


       // Utilities Total
            processUtilitiesEquip = (coolingEquip + BoilerPackageCosts + AirHandlingEquip + WaterHandlingEquip + WasteWaterEquip + MediaHeatExchanger +HeatKillExchanger);
            processUtilitiesTIC  = (coolingTIC + BoilerPackageTIC + AirHandlingTIC + WaterHandlingTIC + WasteWaterTIC + MediaHeatExchangerTIC +HeatKillExchangerTIC );



// Area 600 : Instruments & Control
        controlSystems =0.10*(MainFermAreaTIC + seedEquipmentTIC+ PrimaryCellRemovalTIC+ processUtilitiesTIC);
        fermtotalInstalledEquipmentCost = MainFermAreaTIC + seedEquipmentTIC+ PrimaryCellRemovalTIC+ processUtilitiesTIC +controlSystems ;

// DSP
        totalInstalledEquipmentCost =  fermtotalInstalledEquipmentCost+dspTIC;

//  Buildings: administration, Warehousing etc
        warehousing = 0.04*totalInstalledEquipmentCost;
        administrativeBuildings = 0.05*totalInstalledEquipmentCost; //Office
        siteDevelopment = 0.09*totalInstalledEquipmentCost;

// Total Direct Costs
        totalDirectCost =siteDevelopment+warehousing+administrativeBuildings +totalInstalledEquipmentCost;

// Indirect Costs

        HomeOffice = 0.2*totalDirectCost; // Engineering &  https://www.sciencedirect.com/topics/engineering/minimum-ethanol-selling-price
        prorateableExpenses = 0.1*totalDirectCost;
        fieldExpenses  = 0.1*totalDirectCost;
        projectContingency = 0.2*totalDirectCost;
        otherStartupCosts = 0.1*totalDirectCost; // permitting etc.
        totalIndirectCosts = otherStartupCosts + projectContingency +HomeOffice +fieldExpenses  + prorateableExpenses ;
        fixedCapitalInvestment = totalDirectCost + totalIndirectCosts;
        workingCapital = 0.05*fixedCapitalInvestment;
        realEstate= 0.06*fixedCapitalInvestment;
        totaCapitalInvestment  = fixedCapitalInvestment + workingCapital + realEstate;

   // Fermentation Opex Cost Summary
    annualUtilityCosts = annualCostOfHeatKill + annualCostOfSterilization +  annualCostOfCoolingWater + annualCostOfCompressedAir + annualCost0fMassTransfer  + annualCostOfCentrifugation; //
    annualRawMaterialCosts = annualCostOfMedia  + annualCostOfNH3 + annualCostOfGlucose + annualWaterCosts + annualCIPCosts; //
    annualLaborCosts = 1.122*203923*numberOfTanks ; //+ 0.5*1.175*dspTIC; //  (includes overhead labor uses cost per tank (NREL2013))x inflation factor);//
    annualAdditionalFixedCosts = 1.122*0.037*(totalDirectCost); // (per NREL2013 x inflation factor); //
    annualFixedCosts = annualAdditionalFixedCosts + annualLaborCosts; //
    annualfermOpex = annualUtilityCosts + annualRawMaterialCosts +annualFixedCosts;//
    console.log('FERm OPEX util: ' +annualUtilityCosts);
    console.log('FERm OPEX Raw: ' +annualRawMaterialCosts);
    console.log('FERm OPEX Fixed: ' +annualFixedCosts);
    console.log('DSP OPEX Centr: ' +annualCostOfCentrifugation);
    console.log('DSP OPEX UF: ' +annualUFopex);
    console.log('DSP OPEX NF: ' +annualNanoopex);
     console.log('DSP OPEX CACA: ' +CACAOpex);
      console.log('DSP OPEX P evap: ' +PrimEvapOpex);
      console.log('DSP OPEX S Evap: ' +SecEvapOpex);
      console.log('DSP OPEX MB: ' +MBOpex );
      console.log('DSP OPEX MB: ' +DistillationOpex );
      console.log('DSP OPEX MB: ' +H2ReactorOpex );

    console.log('FERm CAPEX ' +mainFermTIC);
    console.log('DSP CAPEX Centr: ' +CentrifugeEquipTIC);
    console.log('DSP CAPEX UF: ' +UFequipTIC);
    console.log('DSP CAPEX NF: ' +NanoequipTIC);
     console.log('DSP CAPEX CACA: ' +CACATIC);
      console.log('DSP CAPEX P evap: ' +PrimEvapTIC);
      console.log('DSP CAPEX S Evap: ' +SecEvapTIC);
      console.log('DSP CAPEX MB: ' +MBTIC );
      console.log('DSP CAPEX Dist: ' +DistillationTIC );
      console.log('DSP CAPEX H2 Reactor: ' +H2ReactorTIC);
     console.log('DSP CAPEX Cooling: ' +coolingTIC );
    console.log('DSP CAPEX Boiler: ' +BoilerPackageTIC);
    console.log('DSP CAPEX Air HAndling: ' +AirHandlingTIC);
    console.log('DSP CAPEX Water HAndling: ' +WaterHandlingTIC);
     console.log('DSP CAPEX Waste Water HAndling: ' +WasteWaterTIC );
    //Total Opex
    annualOpex  =  annualfermOpex + annualDSPOpex

    //per kg outputs
    opexperkg =  annualOpex/plantCapacity;//
    capexperkg = totaCapitalInvestment/plantCapacity;//
    annualLaborCostsperkg  = annualLaborCosts/plantCapacity;//
    annualAdditionalFixedCostsperkg = annualAdditionalFixedCosts/plantCapacity;//
    annualfermOpexperkg = annualfermOpex/plantCapacity;//
    annualFixedCostsperkg = annualFixedCosts/plantCapacity;//
    annualRawMaterialCostsperkg = annualRawMaterialCosts/plantCapacity;//
    annualUtilityCostsperkg = annualUtilityCosts/plantCapacity;//

    costOfGlucoseperkg = annualCostOfGlucose/plantCapacity;
    costOfAmmoniaperkg = annualCostOfNH3/plantCapacity;
    costOfMediaperkg = (annualCostOfMedia+ annualWaterCosts)/plantCapacity;
    costOfCIP = 0;// annualCIPCosts/plantCapacity
    costOfAerationperkg = 0; // (annualCost0fMassTransfer + annualCostOfCompressedAir)/plantCapacity;
    costOfCoolingperkg = annualCostOfCoolingWater/plantCapacity;
    costOfBiomassDisposalperkg = (annualCostOfHeatKill)/plantCapacity;
    costOfSterilizationperkg = annualCostOfSterilization/plantCapacity;
    costOfLaborperkg = annualLaborCosts/plantCapacity;
    otherFixedCostsperkg =  annualAdditionalFixedCosts/plantCapacity;
    dspOPEXperkg = dspOPEXfraction*opexperkg;


    // Return outputs

    var bioprocessOutputs = new Object();

// FermOutputs

    bioprocessOutputs.time = time;
    bioprocessOutputs.biomass = Biomass;
    bioprocessOutputs.productTiter = productTiter;
    bioprocessOutputs.finalBiomass = finalBiomassConcentration;
    bioprocessOutputs.specificRate = specificRate;
    bioprocessOutputs.overallFermYield = overallFermYield;
    bioprocessOutputs.fermTime = totalFermentationTime;
    bioprocessOutputs.maxOTR = maxOTR;
    bioprocessOutputs.maxKla = maxKla;
    bioprocessOutputs.maxCoolingRate = maxCoolingRate;

// OPEX Outputs
    console.log(plantCapacity);
    bioprocessOutputs.annualOpex = annualOpex;
    bioprocessOutputs.opexperkg = opexperkg;
    bioprocessOutputs.totaCapitalInvestment = totaCapitalInvestment;
    bioprocessOutputs.capexperkg = capexperkg;
    bioprocessOutputs.plantCapacity = plantCapacity;
    bioprocessOutputs.costOfGlucoseperkg = costOfGlucoseperkg;
    bioprocessOutputs.costOfAmmoniaperkg =costOfAmmoniaperkg;
    bioprocessOutputs.costOfMediaperkg =costOfMediaperkg;
    bioprocessOutputs.costOfAerationperkg = costOfAerationperkg;
    bioprocessOutputs.costOfCoolingperkg= costOfCoolingperkg;
    bioprocessOutputs.costOfBiomassDisposalperkg =costOfBiomassDisposalperkg;
    bioprocessOutputs.costOfSterilizationperkg =costOfSterilizationperkg;
    bioprocessOutputs.costOfLaborperkg =costOfLaborperkg;
    bioprocessOutputs.otherFixedCostsperkg =otherFixedCostsperkg;
    bioprocessOutputs.dspOPEXperkg = dspOPEXperkg ;

// CAPEX Outputs

        bioprocessOutputs.MainFermAreaEquip = MainFermAreaEquip  ;
        bioprocessOutputs.MainFermAreaTIC = MainFermAreaTIC;

// Main Ferm

        bioprocessOutputs.fermenterCost =  fermenterCost;
        bioprocessOutputs.fermenterTIC = fermenterTIC;
        bioprocessOutputs.fermenterAgitatorCost = fermenterAgitatorCost;
        bioprocessOutputs.fermenterAgitatorTIC = fermenterAgitatorTIC;
        bioprocessOutputs.TransferPumpsCost = TransferPumpsCost;
        bioprocessOutputs.TransferPumpsTIC = TransferPumpsTIC;
        bioprocessOutputs.mainFermPiping = mainFermPiping ;
        bioprocessOutputs.mainFermEquip = mainFermEquip;
        bioprocessOutputs.mainFermTIC = mainFermTIC;

// Sugar Storage
        bioprocessOutputs.glucoseStorageTankCost = glucoseStorageTankCost;
        bioprocessOutputs.glucoseStorageTankTIC = glucoseStorageTankTIC;
        bioprocessOutputs.glucoseStorageTransferPumpsCost = glucoseStorageTransferPumpsCost;
        bioprocessOutputs.glucoseStorageTransferPumpsTIC = glucoseStorageTransferPumpsTIC;
        bioprocessOutputs.glucoseStoragepiping = glucoseStoragepiping;
        bioprocessOutputs.glucoseStorageEquip =  glucoseStorageEquip;
        bioprocessOutputs.glucoseStorageTIC = glucoseStorageTIC ;

// Titrant Storage
        bioprocessOutputs.ammoniaStorageTankCost =ammoniaStorageTankCost;
        bioprocessOutputs.ammoniaStorageTankTIC =ammoniaStorageTankTIC;
        bioprocessOutputs.acidStorageTankCost = ammoniaStorageTankCost;
        bioprocessOutputs.acidStorageTankTIC =acidStorageTankTIC ;
        bioprocessOutputs.ammoniaTransferPumpsCost  =ammoniaTransferPumpsCost;
        bioprocessOutputs.ammoniaTransferPumpsCostTIC =ammoniaTransferPumpsCostTIC;
        bioprocessOutputs.acidTransferPumpsCost = acidTransferPumpsCost ;
        bioprocessOutputs.acidTransferPumpsCostTIC  =acidTransferPumpsCostTIC ;
        bioprocessOutputs.additionPiping =additionPiping ;
        bioprocessOutputs.additionsEquip =additionsEquip;
        bioprocessOutputs.additionsTIC =additionsTIC;

//Media Prep
        bioprocessOutputs.agitatedMediaPrepTankCost =agitatedMediaPrepTankCost;
        bioprocessOutputs.agitatedMediaPrepTankTIC = agitatedMediaPrepTankTIC;
        bioprocessOutputs.mediaTransferPumpsCost = mediaTransferPumpsCost;
        bioprocessOutputs.mediaTransferPumpsCostTIC  = mediaTransferPumpsCostTIC;
        bioprocessOutputs.mediaPiping = mediaPiping;
        bioprocessOutputs.DryChemicalAdditionSkid = DryChemicalAddition;
        bioprocessOutputs.DryChemicalAdditionSkidTIC = DryChemicalAdditionTIC;
        bioprocessOutputs.mediaPrepEquip = mediaPrepEquip;
        bioprocessOutputs.mediaPrepTIC =mediaPrepTIC;

// CIP
        bioprocessOutputs.CIPTankCost = CIPTankCost;
        bioprocessOutputs.CIPTankTIC = CIPTankTIC;
        bioprocessOutputs.CIPTransferPumpsCost =CIPTransferPumpsCost;
        bioprocessOutputs.CIPTransferPumpsCostTIC  = CIPTransferPumpsCostTIC ;
        bioprocessOutputs.CIPFilterCost = CIPFilterCost;
        bioprocessOutputs.CIPFilterCostTIC = CIPFilterCostTIC;
        bioprocessOutputs.CIPHeaterCost = CIPHeaterCost;
        bioprocessOutputs.CIPHeaterCostTIC = CIPHeaterCostTIC;
        bioprocessOutputs.CIPpipingTIC = CIPpipingTIC;
        bioprocessOutputs.CIPEquip = CIPEquip;
        bioprocessOutputs.CIPTIC = CIPTIC;

//Seed
        bioprocessOutputs.seedEquipment = seedEquipment ;
        bioprocessOutputs.seedEquipmentTIC = seedEquipmentTIC;

// Primary Cell Removal
        bioprocessOutputs.CentrifugeCost = CentrifugeCost ;
        bioprocessOutputs.CentrifugeTIC = CentrifugeTIC;
        bioprocessOutputs.Centrifugepiping = Centrifugepiping;
        bioprocessOutputs.CentrifugeEquip = CentrifugeEquip;
        bioprocessOutputs.CentrifugeEquipTIC =  CentrifugeEquipTIC;
        bioprocessOutputs.brothStorageTankCost = brothStorageTankCost;
        bioprocessOutputs.brothStorageTankTIC = brothStorageTankTIC;
        bioprocessOutputs.brothStorageTransferPumpCost= brothStorageTransferPumpCost;
        bioprocessOutputs.brothStorageTransferPumpTIC= brothStorageTransferPumpTIC;
        bioprocessOutputs.brothStoragePiping = brothStoragePiping;
        bioprocessOutputs.brothStorageEquip = brothStorageEquip;
        bioprocessOutputs.brothStorageTIC =brothStorageTIC ;
        bioprocessOutputs.PrimaryCellRemovalEquip= PrimaryCellRemovalEquip;
        bioprocessOutputs.PrimaryCellRemovalTIC = PrimaryCellRemovalTIC;

// Process Utilities


        // Cooling Water
           bioprocessOutputs.coolingTowerEquip = coolingTowerEquip;
           bioprocessOutputs.coolingTowerTIC = coolingTowerTIC;
           bioprocessOutputs.coolingTowerPumps = coolingTowerPumps;
           bioprocessOutputs.coolingTowerPumpsTIC = coolingTowerPumpsTIC;
           bioprocessOutputs.coolingTowerPiping = coolingTowerPiping;
           bioprocessOutputs.coolingEquip =coolingEquip;
           bioprocessOutputs.coolingTIC = coolingTIC;
           bioprocessOutputs.BoilerPackageCosts = BoilerPackageCosts;
           bioprocessOutputs.BoilerPackageTIC = BoilerPackageTIC;
            bioprocessOutputs.AirDryer = AirDryer;
            bioprocessOutputs.AirDryingTIC = AirDryingTIC;
            bioprocessOutputs.AirReceiver = AirReceiver;
            bioprocessOutputs.AirReceiverTIC = AirReceiverTIC;
            bioprocessOutputs.AirCompressor = AirCompressor;
            bioprocessOutputs.AirCompressorTIC = AirCompressorTIC;
            bioprocessOutputs.AirPiping=AirPiping;
            bioprocessOutputs.AirHandlingEquip = AirHandlingEquip;
            bioprocessOutputs.AirHandlingTIC =AirHandlingTIC;
            bioprocessOutputs.MunicpalWaterTank =MunicpalWaterTank;
            bioprocessOutputs.MunicpalWaterTankTIC = MunicpalWaterTankTIC;
            bioprocessOutputs.PotableWaterTank = PotableWaterTank ;
            bioprocessOutputs.PotableWaterTankTIC  = PotableWaterTankTIC;
            bioprocessOutputs.SoftenerSystem = SoftenerSystem;
            bioprocessOutputs.SoftenerSystemTIC  = SoftenerSystemTIC;
            bioprocessOutputs.PotableWaterCooler = PotableWaterCooler;
            bioprocessOutputs.PotableWaterCoolerTIC  = PotableWaterCoolerTIC;
            bioprocessOutputs.MunipalWaterPump = MunipalWaterPump;
            bioprocessOutputs.MunipalWaterPumpTIC  = MunipalWaterPumpTIC;
            bioprocessOutputs.WaterPiping  = WaterPiping;
            bioprocessOutputs.WaterHandlingEquip = WaterHandlingEquip;
            bioprocessOutputs.WaterHandlingTIC= WaterHandlingTIC;
            bioprocessOutputs.WasteWaterTank = WasteWaterTank;
            bioprocessOutputs.WasteWaterTankTIC = WasteWaterTankTIC;
            bioprocessOutputs.MediaHeatExchanger= MediaHeatExchanger;
            bioprocessOutputs.MediaHeatExchangerTIC = MediaHeatExchangerTIC ;
            bioprocessOutputs.HeatKillExchanger= HeatKillExchanger;
            bioprocessOutputs.HeatKillExchangerTIC = HeatKillExchangerTIC ;
            bioprocessOutputs.WasteWaterPump =  WasteWaterPump ;
            bioprocessOutputs.WasteWaterPumpTIC = WasteWaterPumpTIC;
            bioprocessOutputs.WasteWaterPiping  = WasteWaterPiping;
            bioprocessOutputs.WasteWaterEquip = WasteWaterEquip;
            bioprocessOutputs.WasteWaterTIC = WasteWaterTIC;
            bioprocessOutputs.processUtilitiesEquip =processUtilitiesEquip;
            bioprocessOutputs.processUtilitiesTIC  =processUtilitiesTIC;

        bioprocessOutputs.controlSystems =controlSystems;
        bioprocessOutputs.fermtotalInstalledEquipmentCost = fermtotalInstalledEquipmentCost ;
        bioprocessOutputs.dspTIC =dspTIC;
        bioprocessOutputs.totalInstalledEquipmentCost =totalInstalledEquipmentCost;
        bioprocessOutputs.warehousing = warehousing;
        bioprocessOutputs.administrativeBuildings = administrativeBuildings ; //Office
        bioprocessOutputs.siteDevelopment = siteDevelopment;
        bioprocessOutputs.totalDirectCost = totalDirectCost;

// Indirect Costs
        bioprocessOutputs.HomeOffice = HomeOffice;
        bioprocessOutputs.prorateableExpenses = prorateableExpenses;
        bioprocessOutputs.fieldExpenses  = fieldExpenses ;
        bioprocessOutputs.projectContingency = projectContingency ;
        bioprocessOutputs.otherStartupCosts = otherStartupCosts ;
        bioprocessOutputs.totalIndirectCosts = totalIndirectCosts ;
        bioprocessOutputs.fixedCapitalInvestment = fixedCapitalInvestment;
        bioprocessOutputs.workingCapital = workingCapital;
        bioprocessOutputs.totaCapitalInvestment  = totaCapitalInvestment ;


    return bioprocessOutputs;
    }

    function BOO_DCF(Input,bioprocessOutputs){

//Inputs from User Input
// Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];



    //Inputs from User Input
       sellingPrice = Input[7];
       margin = Input[8]/100;
       paybackPeriod = Input[9];
       discountRate  = Input[10]/100;
       taxRate = Input[11]/100;
       fractionDebtFinance  = Input[12]/100;
       debtInterest  = Input[13]/100;
       debtTerm = Input[14];

    //Inputs calculated from user inputs using BioprocessOpexCapex.js
    annualOpex = bioprocessOutputs.annualOpex;// $
    opexperkg = bioprocessOutputs.opexperkg; // $/kg
    totalInitialCapitalInvestment = bioprocessOutputs.totaCapitalInvestment;  // $
    capexperkg = bioprocessOutputs.capexperkg;  // $
    plantCapacity = bioprocessOutputs.plantCapacity ; // (kg)

    // Advanced Financial Variables
    fractionEquityFinance = 1-fractionDebtFinance;
    yearsInConstruction = 2;
    fractionCapitalSpentYearOne = 0.7;
    fractionCapitalSpentYearTwo = 0.3;
    bookDepreciationPeriod = 10;  // years
    ongoingCapitalReinvestmentRate = 0.01;// fraction of TCI
    yearsToRampToFullProduction = 3;// years

    // Working capital Assumptions
    accountsReceivableDelay = 45; // days
    inventoryHoldingPeriod = 60; //days
    accountsPayableDelay = 30; // days (currently groups paychecks and raw materials)


    totalFinanced = fractionDebtFinance*totalInitialCapitalInvestment;

    // Expenses
    // Capital spending
    InitialCapitalInvestment=[];
    for (let projectYear=0; projectYear < paybackPeriod; projectYear ++){
        if (projectYear  == 0){
            InitialCapitalInvestment[projectYear] = fractionCapitalSpentYearOne*totalInitialCapitalInvestment;
        }else if (projectYear  == 1){
            InitialCapitalInvestment[projectYear] = fractionCapitalSpentYearTwo*totalInitialCapitalInvestment;
        }else {
            InitialCapitalInvestment[projectYear] = 0;
        }
    }

    // Ongoing Capital & Total Capital
    ongoingCapitalInvestment=[]
    totalCapitalInvestment =[];
    for (let projectYear=0; projectYear < paybackPeriod; projectYear++){
        if (projectYear== 0){
            ongoingCapitalInvestment[projectYear] = 0;
            totalCapitalInvestment[projectYear] = InitialCapitalInvestment[projectYear];
        }else if (projectYear == 1){
            ongoingCapitalInvestment[projectYear] = 0;
            totalCapitalInvestment[projectYear] = InitialCapitalInvestment[projectYear];
        }else {
            ongoingCapitalInvestment[projectYear] = ongoingCapitalReinvestmentRate*totalInitialCapitalInvestment;
            totalCapitalInvestment[projectYear] = ongoingCapitalInvestment[projectYear]+InitialCapitalInvestment[projectYear];
        }

    }
//Depreciation
    depreciationYear = yearsInConstruction +bookDepreciationPeriod;

// Depreciation of Initial Investment
   initialTCIDepreciation =[];
   for (let projectYear=0; projectYear < paybackPeriod; projectYear++){
        if (projectYear <  yearsInConstruction){
            initialTCIDepreciation[projectYear] =0;
        }else if(projectYear >= yearsInConstruction && projectYear < depreciationYear){
            initialTCIDepreciation[projectYear] =totalInitialCapitalInvestment/bookDepreciationPeriod;
        }else{
            initialTCIDepreciation[projectYear] = 0;
        }
    }

// Depreciation of Ongoing Investment
    ongoingCapitalDepreciation =[];
    for (let projectYear =0; projectYear  < paybackPeriod; projectYear ++){
         if (projectYear <  yearsInConstruction){
              ongoingCapitalDepreciation[projectYear ] =0;
         }else{
              ongoingCapitalDepreciation[projectYear] = ongoingCapitalReinvestmentRate*totalInitialCapitalInvestment;
         }
    }

// Total Depreciation
    totalDepreciation=[];
    for (let projectYear =0; projectYear  < paybackPeriod; projectYear ++){
    totalDepreciation[projectYear] = initialTCIDepreciation[projectYear] +ongoingCapitalDepreciation[projectYear];
    }

// Operating Costs
      Opex=[];
       for(let projectYear=0; projectYear < paybackPeriod; projectYear++){
         if (projectYear < yearsInConstruction){
               Opex[projectYear] =0;
         }else{
               Opex[projectYear] =annualOpex;
         }

        }

// Loan Payments
    interestPayment =[];
    principalPayment =[];
    annualLoanPayments =[];
    annualLoanPayments =[];

    TotalLoanPrinc = fractionDebtFinance*totalInitialCapitalInvestment;
    interestPayment[0] = fractionCapitalSpentYearOne*TotalLoanPrinc*debtInterest;
    principalPayment[0] = 0;
    interestPayment[1] = TotalLoanPrinc*debtInterest;
    principalPayment[1] = 0;
    annualLoanPayments[0] = interestPayment[0];
    annualLoanPayments[1] = interestPayment[1];
    loanTerm = debtTerm-2;
    LoanOutput =calculateLoanPayments(TotalLoanPrinc,debtInterest,loanTerm);
    annualInterest = LoanOutput.annualInterest;
    annualPrincipal = LoanOutput.annualPrincipal;
    annualPrincipal2 =[];

    for (let projectYear =2; projectYear<paybackPeriod; projectYear++){
        if(projectYear < debtTerm){
            annualLoanPayments[projectYear]=annualPrincipal[projectYear-2]+annualInterest[projectYear-2];
            interestPayment[projectYear]= annualInterest[projectYear-2];
            annualPrincipal2[projectYear] = annualLoanPayments[projectYear]-interestPayment[projectYear];
        }else if(projectYear > debtTerm-1){
            annualLoanPayments[projectYear]=0;
            interestPayment[projectYear] =0;
            annualPrincipal2[projectYear] =0;
        }
    }

//  Production & Sales, assumes 3 year Ramp up (.5,.75,1)
    annualProduction =[];
    annualRevenue =[];
    for (let projectYear=0; projectYear<paybackPeriod; projectYear++){
        if (projectYear == 0){
            annualProduction[projectYear]= 0;
        }else if (projectYear == 1){
            annualProduction[projectYear]= 0;
        }else if (projectYear == 2){
            annualProduction[projectYear] = 0.5*plantCapacity;
        }else if (projectYear== 3){
            annualProduction[projectYear] = 0.75*plantCapacity;
        }else {
            annualProduction[projectYear] = plantCapacity;
        }
        annualRevenue[projectYear] =  sellingPrice*annualProduction[projectYear] + 0.05*annualProduction[projectYear]; //include coproduct credit

    }

   // Income
   EBITDA =[];
   EBIT =[];
   EBT =[];
       for (let projectYear=0; projectYear<paybackPeriod; projectYear++){
        if (annualRevenue[projectYear] >0){
            EBITDA[projectYear] = annualRevenue[projectYear] - Opex[projectYear]-ongoingCapitalInvestment[projectYear];
            EBIT[projectYear] = EBITDA[projectYear] - totalDepreciation[projectYear];
            EBT[projectYear] = EBIT[projectYear] - interestPayment[projectYear];

        }else {
            EBITDA[projectYear] = 0;
            EBIT[projectYear]= 0;
            EBT[projectYear] = 0;
        }

    }

   // Taxes & Net Income
   taxes =[];
   netIncome =[];
    for (let projectYear=0; projectYear<paybackPeriod; projectYear++){
        if (EBT[projectYear] > 0){
            taxes[projectYear]= EBT[projectYear]*taxRate;
            netIncome[projectYear] = EBT[projectYear]-taxes[projectYear];
        }else {
            taxes[projectYear] = 0;
            netIncome[projectYear] = 0;
        }
    }


   // Working Capital
   accountsReceivable =[];
   valueOfInventory =[];
   accountsPayable =[];
   netWorkingCapital =[];
   changeInNetWorkingCapital =[];

    for (let projectYear=0; projectYear<paybackPeriod;  projectYear++){
        accountsReceivable[projectYear] = annualRevenue[projectYear]*(accountsReceivableDelay/365);
        valueOfInventory[projectYear] = Opex[projectYear]*(inventoryHoldingPeriod/365);
        accountsPayable[projectYear]= Opex[projectYear]*(accountsPayableDelay/365);
        netWorkingCapital[projectYear] =accountsReceivable[projectYear]+valueOfInventory[projectYear]-accountsPayable[projectYear];
        if (projectYear == 0){
            changeInNetWorkingCapital[projectYear] = netWorkingCapital[projectYear]-0;
        }else{
            changeInNetWorkingCapital[projectYear] = netWorkingCapital[projectYear]-netWorkingCapital[projectYear-1];
        }
    }

    // Cash Flow Calculations

    netCashFlow=[];
    for (let projectYear=0; projectYear<paybackPeriod;  projectYear++){
       netCashFlow[projectYear] = annualRevenue[projectYear] - totalCapitalInvestment[projectYear] - Opex[projectYear]-annualLoanPayments[projectYear]-taxes[projectYear] ;
    }

    cumCashFlow=[];
    cumCashFlow[0] =netCashFlow[0];
    for (let projectYear=1; projectYear<paybackPeriod;  projectYear++){
        cumCashFlow[projectYear] = netCashFlow[projectYear] + cumCashFlow[projectYear-1];
    }


   //ROI
    SumNetCashFlow =0;
    SumcapitalInvestment =0;
    for(let projectYear=0; projectYear<paybackPeriod;  projectYear++){
        SumNetCashFlow = SumNetCashFlow+netCashFlow[projectYear];
        SumcapitalInvestment = SumcapitalInvestment+totalCapitalInvestment[projectYear];
    }
    ROI = SumNetCashFlow/SumcapitalInvestment;



  //  NPV
   npv=0;
   for(let projectYear=0; projectYear<paybackPeriod; projectYear++){
       npv = npv + (netCashFlow[projectYear]/ Math.pow(discountRate/100 + 1, projectYear + 1));
    }

    // IRR
    IRR = calcIRR(netCashFlow,-1.00);

    // MSP assumes you want to hit the target margin in year 4 at full ramp
    initialCostofProductionOnRampUp =  totalCapitalInvestment[4]+Opex[4]+annualLoanPayments[4];
    // Margin = (netsales -COGS)/netsales, netsales = MSP*annualProduction
    // netsales*margin = netsales-COGS
    // netsales -netsales*margin = COGS
    // netsales(1-margin) = COGS
    // nesales = COGS/(1-margin)
    //  MSP*annualProduction = COGS/(1-margin)
    //MSP = COGS/((1-margin)*annualProduction)
    MSP = initialCostofProductionOnRampUp/(annualProduction[4]*(1- margin));




      // Define Time to account for 0 index
    time = [];
    for (let projectYear=0; projectYear < paybackPeriod; projectYear++){
        time[projectYear]=projectYear;
    }


    var DCFOutput = new Object();
        DCFOutput.ROI = ROI;
        DCFOutput.MSP = MSP;
        DCFOutput.NPV = npv;
        DCFOutput.IRR = IRR;
        DCFOutput.time = time;
        DCFOutput.revenue = annualRevenue;
        DCFOutput.COGS = Opex;
        DCFOutput.totalDepreciation = totalDepreciation;
        DCFOutput.EBITDA= EBITDA;
        DCFOutput.EBIT= EBIT;
        DCFOutput.PrincipalPaid = annualPrincipal2;
        DCFOutput.InterestPaid = interestPayment;
        DCFOutput.TaxesPaid = taxes;
        DCFOutput.netIncome = netIncome;
        DCFOutput.netCashFlow = netCashFlow;
        DCFOutput.cumCashFlow = cumCashFlow;

    return DCFOutput;

    }
    function calculateLoanPayments(Principal,rate,years){
// Inputs

//Principal = 100000;// Principal: size of the loan
//rate = 0.1; // rate: annual rate
//years = 15; // years: length of loan in years

N=years*12; // number of payments
r=rate/12; // montlhy rate
P= Principal*(1+r)/((1-(1/(1+r))**N)/(1-1/(1+r))); //defines monthly payment
//Initiate variables
Princs = [];
In = [];
Ps = [];
time =[];
annualPayments =[];
annualInterest =[];
annualPrincipal =[];
LoanOutput = new Object();

Princs[0]=Principal; //  in year 1 principle is total amount
In[0]=0;
Ps[0]=0; //Principal payments
time[0]=1;

for (let i=1;i<N;i++){
    time[i] = i+1;
    In[i]=Princs[i-1]*r;
    Ps[i]=P-In[i];
    Princs[i]=Princs[i-1]-Ps[i];
}

// Total of annual payments

interestSum = 0;
principalSum = 0;


x = 0;
for (let i=0; i<years; i++){
    for (j=0;j<12;j++){
         interestSum = In[x]+interestSum ;
         x=x+1;
    }
    annualInterest[i] =interestSum;
    annualPayments[i] = 12*P;
    annualPrincipal[i] = annualPayments[i]-annualInterest[i];
    interestSum = 0;

}

LoanOutput.annualPrincipal = annualPrincipal;
LoanOutput.annualInterest = annualInterest;

return LoanOutput;
}
function calcIRR(cashFlow, irr) {

     inc =0.0001;

do{
      irr += inc;
      NPV_test = 0;
      for (var i=0; i< cashFlow.length; i++)      {
            NPV_test += cashFlow[i]/Math.pow((1+irr),i);
            }
}while(NPV_test > 0);
return irr;
}
