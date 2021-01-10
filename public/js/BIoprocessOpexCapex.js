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



   // Advanced Inputs
    AmmoniaSourceMW = 17.031;//(g/mole) for NH3
    MicrobeMW  =  95.37; // (g/mole) for E. coli/bacteria
    FeedstockMW = 180.156; // (g/mole) for glucose
    biomassYieldCoefficientGlucose = (MicrobeMW)/(0.84*FeedstockMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    biomassYieldCoefficientNH3 = (MicrobeMW)/(1*AmmoniaSourceMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    biomassYieldCoefficientO2 = (MicrobeMW)/(1.212*32); // g biomass/g O2 based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    byproductYieldCoefficientO2 = (FeedstockMW)/(6*32); // g glucose consumed /g O2 for byproduct, based on ideal formula 1 Glucose + 6  O2 --> 6 H2O + 6 CO2


    // Advanced variables which are kept as defaults in the current  analyses

    inoculationFraction = 0.01; // fraction of volume at final biomass concentration used to inoculate production fermenters
    workingVolumeRatio = 0.85; // (L working volume)/(L gross volume)
    BiomassYieldFraction = 0.80; // the actual biomass yield as a fraction of theoretical maximal biomass yield
    FermenterAspectRatio = 2.55; // from Humbird et al.


   // Calculations

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


   // Bioreactor  based Calculations
    FermenterRadius = ((vesselSize/1000/3.14159265359)/(2*FermenterAspectRatio))**0.333333; // meters
    FermenterDiameter = 2*FermenterRadius ;// meters
    FermenterHeight = FermenterAspectRatio*FermenterDiameter; // meters
    maxWorkingFillHeight = (maxVesselWorkingVolume/1000/3.14159265359)/(FermenterRadius*FermenterRadius);// meters
    maxFermenterPressure = 1000*9.8066*maxWorkingFillHeight/100000 + 0.25 ; // bar (1 N/m2 =100,000 bar)

  // The following are Calculations based on the Fermentation Targets

    maxProductPerLcapacity = finalTiter*workingVolumeRatio; // (g of product per L of bioreactor capacity )
    totalFermentationTime = finalTiter/averageVolumetricRate;  // hours
    ProductBatchSugarPerLcapacity = (maxProductPerLcapacity/theorYield); // g glucose / L capacity assumes 100% of theoretical yield for glucose not going to biomass
    TotalBatchSugarPerLcapacity = ProductBatchSugarPerLcapacity/fractionOftheoreticalMaximalYield ; // Total sugar consumed assuming target yield losses

   // Biomass Based Calculations - Final Biomass levels are calculated from Titer, Rate and Yield Requirements
    MicrobeMW  =  95.37; // (g/mole) for E. coli
    ProductBatchSugar = (maxProductPerVessel/productYieldCoefficientGlucose); // assumes 100% of theoretical yield
    //console.log(ProductBatchSugar);
    TotalBatchSugar = ProductBatchSugar/(fractionOftheoreticalMaximalYield); // Total sugar consumed assuming biomass yield losses
    //console.log(TotalBatchSugar);
    MaxBiomassSugar =  TotalBatchSugar -  ProductBatchSugar;
    finalBiomassConcentration = ((biomassYieldCoefficientGlucose*MaxBiomassSugar)/maxVesselWorkingVolume)*1000 ;// gCDW/L Final Biomass Concentration
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
    waterCost = (0.0007 +0.00003*(averageWaterDemandRate^(-0.6)))*CEPCI + 0.02*CostOfFuel; // $/m3
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
    annualCostOfMedia = totalAnnualFermWorkingVolume*mediaCost; // $/year

    // Oxygen/Air Requirements & Costs

   // Cumulative O2/Air Need Needed
    cumulativeProductO2 = (((finalTiter*totalAnnualFermWorkingVolume)/productYieldCoefficientO2)/32)*1000; //mmoles O2 needed
    cumulativeBiomassO2 = (((finalBiomassConcentration*totalAnnualFermWorkingVolume)/biomassYieldCoefficientO2)/32/BiomassYieldFraction)*1000;// mmoles O2 needed for Biomass
    cumulativeByProductO2 = (((cumulativeByProductGlucose)/FeedstockMW)*1000)*6*1000;//mmoles O2 needed for biomass and product inefficiencies
    cumulativeO2 = cumulativeBiomassO2 + cumulativeProductO2 + cumulativeByProductO2;// mmoles O2 needed
    averageOTR = (cumulativeO2/annualFermentationUpTime/totalAnnualFermWorkingVolume);// average mmoles/L-hr O2 needed
    cumulativeAir = cumulativeO2/9.375/1000 ;// m3 of air needed, 9.375 mmoles O2 per liter of air
    averageAnnualAirflow = (cumulativeAir/(annualFermentationUpTime*3600))*1.333;// Average m3 of air needed per second (assumes 75% O2 consumption, Benz 2008)
    AnnualCostOfAirperM3 = (0.00005*(averageAnnualAirflow^-0.3))*Math.log(maxFermenterPressure)*CEPCI + 0.0009*Math.log(maxFermenterPressure)*CostOfFuel;// $/m3 (Ulrich & Vasudevan)
    annualCostOfCompressedAir = AnnualCostOfAirperM3*cumulativeAir;// $/year

    // max OTR & Kla

    // Biomass OTR
    maxBiomassOTR = (((1/biomassYieldCoefficientO2)/BiomassYieldFraction)*(1000/32)*averageLogisticGrowthRate/4)*finalBiomassConcentration;  // (mmoles O2/ L-hr), assumes logistic growth per tank
    maxByProductOTR = (((1/byproductYieldCoefficientO2)/(1-BiomassYieldFraction))*(1000/32)*averageLogisticGrowthRate/4)*finalBiomassConcentration;  // (mmoles O2/ L-hr), assumes logistic growth per tank

     // If product biosynthesis requires Oxygen
    if (productYieldCoefficientO2 != Infinity){
        maxProductOTR = ((productYieldCoefficientO2*averageLogisiticProductionRate)/4)*finalTiter; // (mmoles O2/ L-hr), assumes growth associated production per tank
    }else{
        maxProductOTR =0;
    }
    maxOTR = maxProductOTR +maxByProductOTR+ maxBiomassOTR; // mmoles/L-hr per tank
    maxOxygenFlowRate = maxOTR*maxVesselWorkingVolume; // mmoles/hr per tank
    maxAirFlowRate = maxOxygenFlowRate/9.375/0.5/1000/3600; // (standard m3 air per second) per tank, 9.375 mmoles O2 per liter of air, divided by fraction which is taken up by liquid
    maxKla = (maxOTR/0.15)/3600; //(sec-1) assumes air as sole oxygen source, assumes logistic growth per tank and maximal driving force at 75% consumption (0.2 - 0.05mmoles O2/L)

    // Mass transfer requirements (Stirred Tank) assumes $2/kg of O2 delivered, 0.233 kg O2 per kg Air
    cumulativeAirkg = cumulativeAir*1.225; //
    annualMassTransferPowerNeed = 1.8*0.233*cumulativeAirkg; //  KWh , assumes  O2 delivered, 0.233 kg O2 per kg Air % Watts,  Humbird et al.
    annualCost0fMassTransfer = annualMassTransferPowerNeed*ElectricityCost; //

    // Cooling Calculations(Cooling Tower Water)
    maxCoolingRate = 0.460*maxOTR*totalAnnualFermWorkingVolume; // kJ/hr per tank uses 460kJ/mole O2 consumed (Doran), equal to 110kcal/mole ( Humbird)
    cumulativeCoolingDemand = 0.460*cumulativeO2; // kJ
    cumulativeCoolingRateDemandperTank = 0.0000789848*cumulativeCoolingDemand/annualFermentationUpTime; // needed cooling capacity ton
    cumulativeCoolingRateDemand = numberOfTanks*cumulativeCoolingRateDemandperTank; //

   // Cooling Tower Water
    coolingWaterTemperature = 29.4 ; // degrees Celsius
    cumulativeCoolingWaterNeeded =  cumulativeCoolingDemand/(4.184*(fermentationTemperature-5-coolingWaterTemperature))/1000/1000; // (m3 of cooling water), assumes 37C fermentation, 32C outlet cooling water
    averageCoolingWaterFlowRate = (cumulativeCoolingWaterNeeded/annualFermentationUpTime)/3600; // m3/sec
    annualCostOfCoolingWater = cumulativeCoolingWaterNeeded*((0.0001+(0.00003/averageCoolingWaterFlowRate))*CEPCI + 0.003*CostOfFuel);// $/year (Ulrich & Vasudevan)

    // Sterilization Calculations
    mediaSterilizationTemperature = 120; // (degrees Celsius)
    ambientTemperature = 20; // (degrees Celsius)
    sterilizationEfficiency = 0.2; // Watts consumed per Watt used to sterilize
    mediaSterilizationEnergyConsumption = 4.184*mediaVolume*sterilizationEfficiency*(mediaSterilizationTemperature-ambientTemperature); // (kJ/year)
    annualCostOfSterilization = (mediaSterilizationEnergyConsumption/1055056)*NaturalGasCost; // $/year

    // Biomass Heat Kill
    heatKillVolume = mediaVolume;//(Liters)
    heatKillTemperature = 60 ; // (degrees Celsius) assumes E. coli process
    ambientTemperature = 20; // (degrees Celsius)
    heatKillEfficiency = 0.2; // Watts consumed per Watt used to sterilize
    heatKillEnergyConsumption = 4.184*heatKillVolume*heatKillEfficiency*(heatKillTemperature-ambientTemperature); // (kJ/year)
    annualCostOfHeatKill =  (heatKillEnergyConsumption/1055056)*NaturalGasCost; //  $/year

    // Biomass Disposal Fees
    totalAnnualBiomass = finalBiomassConcentration*totalAnnualFermWorkingVolume/1000; // kg biomass per year
    CostofBiomassDisposal = 0.0003*totalAnnualBiomass*CEPCI + 0*CostOfFuel; // $/year (Ulrich & Vasudevan)

// Capex Estimations
// Major Equipment
// For all major equipment
// purchase cost  = (# of units)* Quoted Cost *(Actual Size / Quoted Size)^ Scaling Factor
// TIC = (Inflation Factor)(purchase cost)(Installation Factor)
// 2009-2020 Producers inflation = 1.17
// 2013-2020 Producers inflation = 1.00
// 2010-2020 Producers inflation = 1.12

         if (vesselSize == 1000000){      // %% Humbird and NREL 2013
             fermenterUnitCost = 1631000;
            }else if (vesselSize == 500000){
             fermenterUnitCost = 974000;
            }else if (vesselSize == 200000){
             fermenterUnitCost = 442000;
          }

        // Main Fermenters
        fermenterCost = numberOfTanks*(fermenterUnitCost); // Humbird and NREL 2013 , Quote year 2009
        fermenterTIC = 1.17*fermenterCost*2;
        fermenterAgitatorCost = numberOfTanks*(36000*(vesselSize/75708)^0.5); // NREL 2013 , Quote year 2013
        fermenterAgitatorTIC = 1.00*fermenterAgitatorCost*1.5;
        maxBlowerFlowRate = 23.6; //Maximum air flow (m3/s) from a single blower (Seider, Seader, and Lewin 2016)
        numberOfBlowers = Math.ceil(numberOfTanks*maxAirFlowRate*(totalFermentationTime/(totalFermentationTime+turnAroundTime))/maxBlowerFlowRate);// Number of blowers required
        flowRatePerBlower = numberOfTanks*maxAirFlowRate*(totalFermentationTime/(totalFermentationTime+turnAroundTime))/numberOfBlowers;
        airBlowerCost = numberOfTanks*(9000*(vesselSize/1000000)^0.6); // NREL 2013 , Quote year 2013
        airBlowerCost = numberOfBlowers*29000*(flowRatePerBlower/43.333)^0.6; // NREL 2013 , Quote year 2013, based on $29k for each 43.3m3/s blower
        airBlowerTIC = 1.00*airBlowerCost*1.6;
        fermentationCoolersCost = 0 ; // included in fermenter cost
        fermentationCoolersTIC = 0 ; // included in fermenter cost
        mainFermTransferPumpsCost = numberOfTanks*(3933*(vesselSize/950000)^0.8); //NREL 2009
        mainFermTransferPumpsTIC = 1.17*mainFermTransferPumpsCost*2.3;
        mainFermTIC = fermenterTIC + fermenterAgitatorTIC + airBlowerTIC + fermentationCoolersTIC+ mainFermTransferPumpsTIC;

        // Broth Storage & Transfer
        brothStorageTankCost = (1317000*((vesselSize*numberOfTanks*0.5)/4542000)^0.7); // NREL 2013 , Quote year 2011, sized to 1/2 of fermentation capacity
        brothStorageTankTIC = 1.0*brothStorageTankCost*1.8;
        brothStorageTankTransferPumpsCost = numberOfTanks*(3933*(vesselSize*0.5/950000)^0.8); //NREL 2009, sized to 1/2 of fermentation capacity
        brothStorageTankTransferPumpsTIC = 1.17*brothStorageTankTransferPumpsCost*2.3;
        brothStorageTIC = brothStorageTankTIC + brothStorageTankTransferPumpsTIC;

        // Seed Equipment
        seedEquipmentTIC = 0.27*(fermenterTIC + fermenterAgitatorTIC + airBlowerTIC + mainFermTransferPumpsTIC+ brothStorageTIC);  // Assume 0.27 * production fermentation equipment cost per NREL_2013

        // Glucose Storage & Transfer
        glucoseStorageTankCost = (70000*((averageGlucoseConsumptionRate*12)/264978)^0.7); // NREL 2013 , Quote year 2009, holds 12 hrs of feed.
        glucoseStorageTankTIC = 1.17*glucoseStorageTankCost*2.6; //
        glucoseStorageTankTransferPumpsCost = (3933*(averageGlucoseConsumptionRate*12/950000)^0.8); //NREL 2009, sized to holds 12 hrs of feed
        glucoseStorageTankTransferPumpsTIC = 1.17*glucoseStorageTankTransferPumpsCost*2.3;
        glucoseStorageTIC = glucoseStorageTankTIC  + glucoseStorageTankTransferPumpsCost ;

        // Media Prep & Transfer

        agitatedMediaPrepTankCost = (91200*(vesselSize/264978)^0.7); // NREL 2013 , Quote year 2009
        agitatedMediaPrepTankTIC = 1.17*agitatedMediaPrepTankCost*2.6;//
        mediaStorageTankTransferPumpsCost = (3933*(averageGlucoseConsumptionRate*12/950000)^0.8); //NREL 2009, sized to holds 12 hrs of feed
        mediaStorageTankTransferPumpsTIC = 1.17*glucoseStorageTankTransferPumpsCost *2.3;
        mediaStorageTIC = glucoseStorageTankTIC  + glucoseStorageTankTransferPumpsCost ;

        // Ammonia Storage & Transfer
        ammoniaStorageTankCost = (98000*((averageNH3ConsumptionRate*12)/105991)^0.7); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        ammoniaStorageTankTIC = 1.13*ammoniaStorageTankCost*2;//


        // Caustic (NaOH) Storage & Transfer used for Clean in Place

        //causticStorageTankCost = (98000*((averageNH3ConsumptionRate*12)/105991)^0.7); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        //causticStorageTankTIC = 1.13*ammoniaStorageTankCost*2;//

        // Acid Storage & Transfer
        //acidStorageTankCost = (98000*((averageNH3ConsumptionRate*12)/105991)^0.7); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        //acidStorageTankTIC = 1.13*ammoniaStorageTankCost*2;//

        coolingTowerTIC = 250*cumulativeCoolingRateDemand; //
        fermtotalInstalledEquipmentCost = mainFermTIC + brothStorageTIC + seedEquipmentTIC + glucoseStorageTIC + mediaPrepTIC + ammoniaStorageTIC +  coolingTowerTIC ;
        totalInstalledEquipmentCost =  fermtotalInstalledEquipmentCost/(1-dspCAPEXfraction);
        dspTIC = dspCAPEXfraction*totalInstalledEquipmentCost;
        additionalPiping = 0.045*totalInstalledEquipmentCost;
        warehousing = 0.04*totalInstalledEquipmentCost;
        siteDevelopment = 0.09*totalInstalledEquipmentCost;
        totalDirectCost = additionalPiping+siteDevelopment+warehousing+totalInstalledEquipmentCost;
        prorateableExpenses = 0.1*totalDirectCost;
        fieldExpenses  = 0.1*totalDirectCost;
        officeAndConstructionFee = 0.2*totalDirectCost;
        // engineering fees
        projectContingency = 0.2*totalDirectCost;
        otherStartupCosts = 0.1*totalDirectCost; // permitting etc.
        totalIndirectCosts = otherStartupCosts + projectContingency +officeAndConstructionFee +fieldExpenses  + prorateableExpenses ;
        fixedCapitalInvestment = totalDirectCost + totalIndirectCosts;
        workingCapital = 0.1*fixedCapitalInvestment;
        totaCapitalInvestment  = fixedCapitalInvestment + workingCapital ;

   // Fermentation Opex Cost Summary
    annualUtilityCosts = annualCostOfHeatKill + annualCostOfSterilization +  annualCostOfCoolingWater + annualCostOfCompressedAir + annualCost0fMassTransfer + CostofBiomassDisposal; //
    annualFeedstockCosts = annualCostOfMedia  + annualCostOfNH3 + annualCostOfGlucose + annualWaterCosts; //
    annualLaborCosts = 1.122*203923*numberOfTanks; //  (includes labor cost per tank (NREL2013))x inflation factor);//
    annualAdditionalFixedCosts = 1.122*0.037*1.175*(totalDirectCost); // (per NREL2013 x inflation factor); //
    annualFixedCosts = annualAdditionalFixedCosts + annualLaborCosts; //
    annualfermOpex = 1.1*(annualUtilityCosts + annualFeedstockCosts +annualFixedCosts);// With 10% Contingency

    //Total Opex
    annualOpex  =  annualfermOpex/(1-dspOPEXfraction);

    //per kg outputs
    opexperkg =  annualOpex/plantCapacity;//
    capexperkg = totaCapitalInvestment/plantCapacity;//
    annualLaborCostsperkg  = annualLaborCosts/plantCapacity;//
    annualAdditionalFixedCostsperkg = annualAdditionalFixedCosts/plantCapacity;//
    annualfermOpexperkg = annualfermOpex/plantCapacity;//
    annualFixedCostsperkg = annualFixedCosts/plantCapacity;//
    annualFeedstockCostsperkg = annualFeedstockCosts/plantCapacity;//
    annualUtilityCostsperkg = annualUtilityCosts/plantCapacity;//

    costOfGlucoseperkg = annualCostOfGlucose/plantCapacity;
    costOfAmmoniaperkg = annualCostOfNH3/plantCapacity;
    costOfMediaperkg = (annualCostOfMedia+ annualWaterCosts)/plantCapacity;
    costOfAerationperkg = (annualCost0fMassTransfer + annualCostOfCompressedAir)/plantCapacity;
    costOfCoolingperkg = annualCostOfCoolingWater/plantCapacity;
    costOfBiomassDisposalperkg = (CostofBiomassDisposal+annualCostOfHeatKill)/plantCapacity;
    costOfSterilizationperkg = annualCostOfSterilization/plantCapacity;
    costOfLaborperkg = annualLaborCosts/plantCapacity;
    otherFixedCostsperkg =  annualAdditionalFixedCosts/plantCapacity;
    dspOPEXperkg = dspOPEXfraction*opexperkg;


    // Return outputs

    var bioprocessOutputs = new Object();

    bioprocessOutputs.time = time;
    bioprocessOutputs.biomass = Biomass;
    bioprocessOutputs.productTiter = productTiter;
    bioprocessOutputs.finalBiomass = finalBiomassConcentration;
    bioprocessOutputs.specificRate = specificRate;
    bioprocessOutputs.overallFermYield = overallFermYield;
    bioprocessOutputs.fermTime = totalFermentationTime;

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
    bioprocessOutputs.fermTIC = fermenterTIC + fermenterAgitatorTIC+ airBlowerTIC;
    bioprocessOutputs.transferPumpsTIC = transferPumpsTIC;
    bioprocessOutputs.storageTanksTIC =  glucoseStorageTankTIC+brothStorageTankTIC+ammoniaStorageTankTIC;
    bioprocessOutputs.prepTankTIC = agitatedMediaPrepTankTIC;
    bioprocessOutputs.seedEquipmentTIC = seedEquipmentTIC;
    bioprocessOutputs.coolingTIC= coolingTowerTIC;
    bioprocessOutputs.dspTIC= dspTIC;


    return bioprocessOutputs;
    }