function UpdateTEA(){

//Inputs from User Input
// Set Up Input Array & Define Initial Baseline Inputs & Outputs.
// Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];



slider = [];
pageInput=[];
Input = [];
pageInput =[];


//Update Vessel Size  & Associated Page Outputs
vesselSize =  UpdateVesselSize();
Input[6] = parseFloat(vesselSize);

//Update  Chemistry  & Associated Page Outputs
myChemical = UpdateChemical();
myChemicalEquation = balanceEquation(myChemical);
Input[0] = myChemical.name;
Input[1] = myChemical.formula;
Input[2] = parseFloat(myChemical.MW);
Input[3] = parseFloat(myChemicalEquation.theorYield);
Input[4] = parseFloat(myChemicalEquation.productYieldCoefficientNH3);
Input[5] = parseFloat(myChemicalEquation.productYieldCoefficientO2);

//Update Selling Price
Input[7] = document.getElementById("sellingPrice1").value;
document.getElementById("sellingPrice2").innerHTML =Input[7];

//Update Sliders & Associated Page Outputs

    for(let i=0; i< 24; i++){
        pageInput[i] = document.getElementById("demo"+i);
        Input[i+8]= parseFloat(pageInput[i].innerHTML);
    }
     document.getElementById("Margin").innerHTML = Input[8];
     document.getElementById("Rate").innerHTML = Input[23];
     document.getElementById("Titer").innerHTML = Input[24];
     document.getElementById("dspYield").innerHTML = Input[29]/100;

//Calculate Bioprocess Outputs & Associated Page Outputs
    bioprocessOutputs = bioprocessopexcapex(Input);

     if (myFermChart) {
          myFermChart.destroy();
     }
     var myFermChart = FermChart(bioprocessOutputs);

     document.getElementById("fermYield").innerHTML = (parseFloat(bioprocessOutputs.overallFermYield)).toFixed(3);
     document.getElementById("specificRate").innerHTML = parseFloat(bioprocessOutputs.specificRate).toFixed(2);
     document.getElementById("finalBiomass").innerHTML = parseFloat(bioprocessOutputs.finalBiomass).toFixed(2);
     document.getElementById("fermTime").innerHTML = parseFloat(bioprocessOutputs.fermTime).toFixed(0);
     document.getElementById("overallYield").innerHTML = ((Input[29]/100)*(parseFloat(bioprocessOutputs.overallFermYield))).toFixed(2);
     document.getElementById("OPEX").innerHTML = bioprocessOutputs.opexperkg.toFixed(2);
     document.getElementById("CAPEX").innerHTML = bioprocessOutputs.capexperkg.toFixed(2);
     document.getElementById("TCI").innerHTML = (bioprocessOutputs.totaCapitalInvestment/1000000).toFixed(2);
     document.getElementById("plantCapacity").innerHTML = (bioprocessOutputs.plantCapacity/1000000).toFixed(2);
     MSP = (bioprocessOutputs.opexperkg/(1-(Input[8]/100))).toFixed(2);



//Update Selling Price & Associated Page Outputs

//Calculate DCF
     DCFOutput = BOO_DCF(Input,bioprocessOutputs);

          document.getElementById("NPV").innerHTML = (DCFOutput.NPV/1000000).toFixed(2);
          document.getElementById("ROI").innerHTML = ((DCFOutput.ROI)*100).toFixed(2);
          document.getElementById("IRR").innerHTML = ((DCFOutput.IRR)*100).toFixed(2);
          document.getElementById("MSP").innerHTML = ((DCFOutput.MSP)).toFixed(2);
          time = DCFOutput.time;
          cumCashFlow = DCFOutput.cumCashFlow;

              if(myProFormaChart){
               myProFormaChart.destroy();
               }
              var myProFormaChart = ProFormaChart(time,cumCashFlow);
              if(myOpexPieChart){
                myOpexPieChart.destroy();
               }
              var myOpexPieChart = OpexPieChart(bioprocessOutputs);
               if(myCapexPieChart){
                myCapexPieChart.destroy();
               }
              var myCapexPieChart = CapexPieChart(bioprocessOutputs);



 // Pull Process Inputs into hidden submission Form
       document.getElementById('productName').value =Input[0];
       document.getElementById('productFormula').value = Input[1];
       document.getElementById('productMW').value = Input[2];
       document.getElementById('productTheorYield').value = Input[3];
       document.getElementById('productYieldCoefficientNH3').value = Input[4];
       document.getElementById('productYieldCoefficientO2').value = Input[5];
       document.getElementById('productVesselSize').value = Input[6];
       document.getElementById('productSellingPrice').value = Input[7];
       document.getElementById('productMargin').value = Input[8];
       document.getElementById('productPaybackPeriod').value = Input[9];
       document.getElementById('productDiscountRate').value = Input[10];
       document.getElementById('productTaxRate').value = Input[11];
       document.getElementById('productPercentDebtFinanced').value = Input[12];
       document.getElementById('productDebtInterestRate').value = Input[13];
       document.getElementById('productLoanTerm').value = Input[14];
       document.getElementById('productPlantCapacity').value = Input[15];
       document.getElementById('productAnnualUptime').value = Input[16];
       document.getElementById('productBatchOnSpec').value = Input[17];
       document.getElementById('productGlucoseCost').value = Input[18];
       document.getElementById('productAmmoniaCost').value = Input[19];
       document.getElementById('productNaturalGasCost').value = Input[20];
       document.getElementById('productElectricityCost').value = Input[21];
       document.getElementById('productCEPCI').value = Input[22];
       document.getElementById('productAveVolumtericRate').value= Input[23];
       document.getElementById('productTiter').value = Input[24];
       document.getElementById('productYield').value = Input[25];
       document.getElementById('productTurnaroundTime').value = Input[26];
       document.getElementById('productMediaCost').value = Input[27];
       document.getElementById('productTemperature').value = Input[28];
       document.getElementById('productOverallDSPYield').value = Input[29];
       document.getElementById('productDspPercentofOpex').value = Input[30];
       document.getElementById('productDspPercentofCapex').value = Input[31];

 // Pull Process Inputs into hidden submission Form

       document.getElementById('productOPEX').value =bioprocessOutputs.opexperkg.toFixed(2);
       document.getElementById('productCAPEX').value = bioprocessOutputs.capexperkg.toFixed(2);
       document.getElementById('productTCI').value =  (bioprocessOutputs.totaCapitalInvestment/1000000).toFixed(2);
       document.getElementById('productNPV').value = DCFOutput.NPV.toFixed(2);
       document.getElementById('productROI').value = DCFOutput.ROI.toFixed(2);
       document.getElementById('productIRR').value = DCFOutput.IRR.toFixed(2);
       document.getElementById('productMSP').value = DCFOutput.MSP.toFixed(2);
       document.getElementById('productOptimalPlantCapacity').value = (bioprocessOutputs.plantCapacity/1000000).toFixed(2);
       document.getElementById('productFermentationYield').value =  (parseFloat(bioprocessOutputs.overallFermYield)).toFixed(3);
       document.getElementById('productFinalBiomass').value = parseFloat(bioprocessOutputs.finalBiomass).toFixed(2);
       document.getElementById('productSpRate').value = parseFloat(bioprocessOutputs.specificRate).toFixed(2);
       document.getElementById('productFermTime').value =parseFloat(bioprocessOutputs.fermTime).toFixed(0);
       document.getElementById('productOverallYield').value = ((Input[29]/100)*(parseFloat(bioprocessOutputs.overallFermYield))).toFixed(2);
       document.getElementById('productFermTimeCourseTime').value = bioprocessOutputs.time.toString();
       document.getElementById('productFermTimeCourseBiomass').value = bioprocessOutputs.biomass.toString();
       document.getElementById('productFermTimeCourseProductTiter').value = bioprocessOutputs.productTiter.toString();

       DCFOutput_time = DCFOutput.time;
       DCFOutput_revenue = DCFOutput.revenue;
       DCFOutput_COGS = DCFOutput.COGS;
       DCFOutput_totalDepreciation =DCFOutput.totalDepreciation;
       DCFOutput_EBITDA =DCFOutput.EBITDA;
       DCFOutput_EBIT = DCFOutput.EBIT;
       DCFOutput_PrincipalPaid = DCFOutput.PrincipalPaid;
       DCFOutput_InterestPaid = DCFOutput.InterestPaid;
       DCFOutput_TaxesPaid = DCFOutput.TaxesPaid;
       DCFOutput_netIncome = DCFOutput.netIncome;
       DCFOutput_netCashFlow = DCFOutput.netCashFlow;
       DCFOutput_cumCashFlow = DCFOutput.cumCashFlow;

       document.getElementById('productProFormaTime').value = DCFOutput_time.toString();
       document.getElementById('productProFormaRevenue').value = DCFOutput_revenue.toString();
       document.getElementById('productProFormaCOGS').value = DCFOutput_COGS.toString();
       document.getElementById('productProFormaDepreciation').value = DCFOutput_totalDepreciation.toString();
       document.getElementById('productProFormaEBITDA').value = DCFOutput_EBITDA.toString();
       document.getElementById('productProFormaEBIT').value = DCFOutput_EBIT.toString();
       document.getElementById('productProFormaPrincipal').value = DCFOutput_PrincipalPaid.toString();
       document.getElementById('productProFormaInterest').value = DCFOutput_InterestPaid.toString();
       document.getElementById('productProFormaTaxes').value = DCFOutput_TaxesPaid.toString();
       document.getElementById('productProFormaNetIncome').value = DCFOutput_netIncome.toString();
       document.getElementById('productProFormaNetCashFlow').value = DCFOutput_netCashFlow.toString();
       document.getElementById('productProFormaCumCashFlow').value = DCFOutput_cumCashFlow.toString();

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
    FermenterAspectRatio = 2.55; // from Humbird et al.


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
    annualCostOfMedia = totalAnnualFermWorkingVolume*finalBiomassConcentration*mediaCost/1000; // $/year (media cost input is $/kg, need to divide by 1000 to conver to $/g)

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
    cumulativeCoolingRateDemand = numberOfTanks*cumulativeCoolingRateDemandperTank; //ton

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

    //CIP Costs  // https://www.chemengonline.com/large-scale-fermentation-systems-hygienic-design-principles/
    // Assumes NAOH at 2wt% treatment after each batch
    annualNaOHCosts = (numberOfBatchesPerYearPerTank*numberOfTanks*vesselSize)*.02*NaOHCosts;
    // Assumes Peracetic Acid used at final concentratio of 200ppm  or 0.02%
    annualPeraceticCosts = (numberOfBatchesPerYearPerTank*numberOfTanks*vesselSize)*.002*PeraceticAcidCosts; //Assumes PA at 15-20%
    annualCIPCosts = annualNaOHCosts+annualPeraceticCosts;

    // Primary Cell Removal Calculations (Centrifugation)
    annualCentrifugeVolume = totalAnnualFermWorkingVolume; // Liters
    decanterCentrifugeFlowRate = 264000; // (L/hour) SuperPro estimate from https://www.nap.edu/read/12620/chapter/22#353 (4400L/min =26400L/hr)
    hoursOfCentrifugationRequired = annualCentrifugeVolume/25000;
    numberOfCentrigfuges = Math.ceil(hoursOfCentrifugationRequired/annualUpTime);
    actualAnnualCentrifugeUptime = annualCentrifugeVolume/(numberOfCentrigfuges*decanterCentrifugeFlowRate)
    powerConsumptionPerCentrigfuge = 50 ;// kW  include 40 kW for centrifuge and 10kW for pumps
    annualCostOfCentrifugation = numberOfCentrigfuges*powerConsumptionPerCentrigfuge*actualAnnualCentrifugeUptime*ElectricityCost;// $/year

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
// 2017-2020 Producers inflation = 1.06


         if (vesselSize == 1000000){      // %% Humbird and NREL 2013
             fermenterUnitCost = 1631000*1.06;
            }else if (vesselSize == 500000){
             fermenterUnitCost = 974000*1.06;
            }else if (vesselSize == 200000){
             fermenterUnitCost = 442000*1.06;
          }

// Area 200

// Main Fermenter Area including Air Handling
        fermenterCost = numberOfTanks*(fermenterUnitCost); // Humbird and NREL 2013 , Quote year 2009
        fermenterTIC = 1.17*fermenterCost*2;
        fermenterAgitatorCost = numberOfTanks*(36000*(vesselSize/75708)^0.5); // NREL 2013 , Quote year 2013
        fermenterAgitatorTIC = 1.00*fermenterAgitatorCost*1.5;
        maxBlowerFlowRate = 23.6; //Maximum air flow (m3/s) from a single blower (Seider, Seader, and Lewin 2016)
        numberOfBlowers = Math.ceil(numberOfTanks*maxAirFlowRate*(totalFermentationTime/(totalFermentationTime+turnAroundTime))/maxBlowerFlowRate);// Number of blowers required
        flowRatePerBlower = numberOfTanks*maxAirFlowRate*(totalFermentationTime/(totalFermentationTime+turnAroundTime))/numberOfBlowers;
        airBlowerCost = numberOfBlowers*29000*(flowRatePerBlower/43.333)^0.6; // NREL 2013 , Quote year 2013, based on $29k for each 43.3m3/s blower
        airBlowerTIC = 1.00*airBlowerCost*1.6;
        TransferPumpsCost = 2*numberOfTanks*(3933*(vesselSize/950000)^0.8); //NREL 2009
        TransferPumpsTIC = 1.17*TransferPumpsCost*2.3;
        fermentationCoolersCost = 0 ; // included in fermenter cost
        fermentationCoolersTIC = 0 ; // included in fermenter cost
        mainFermPiping = 0.05*(fermenterTIC+fermenterAgitatorTIC+airBlowerTIC+TransferPumpsTIC);
        mainFermTIC = (mainFermPiping+fermenterTIC+fermenterAgitatorTIC+airBlowerTIC+TransferPumpsTIC);

// Sugar Storage
        glucoseStorageTankCost = (70000*((averageGlucoseConsumptionRate*12)/264978)^0.7); // NREL 2013 , Quote year 2009, holds 12 hrs of feed.
        glucoseStorageTankTIC = 1.17*glucoseStorageTankCost*2.6; //
        glucoseStorageTransferPumpsCost = numberOfTanks*(3933*((averageGlucoseConsumptionRate*12)/950000)^0.8); //NREL 2009
        glucoseStorageTransferPumpsTIC= 1.17*glucoseStorageTransferPumpsCost*2.3;
        glucoseStoragepiping = 0.05*(glucoseStorageTankTIC+glucoseStorageTransferPumpsTIC);
        glucoseStorageTIC = (glucoseStoragepiping+glucoseStorageTankTIC+glucoseStorageTransferPumpsTIC);

// Titrant Prep & Storage
        ammoniaStorageTankCost = (98000*((averageNH3ConsumptionRate*12)/105991)^0.7); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        ammoniaStorageTankTIC = 1.13*ammoniaStorageTankCost*2;//
        acidStorageTankTIC = ammoniaStorageTankTIC;
        ammoniaTransferPumpsCost = numberOfTanks*(3933*((averageNH3ConsumptionRate*12)/950000)^0.8); //NREL 2009
        ammoniaTransferPumpsCostTIC = 1.17*ammoniaTransferPumpsCost*2.3;
        acidTransferPumpsCostTIC  = 1.17*ammoniaTransferPumpsCost*2.3;
        additionPiping = 0.05*(ammoniaStorageTankTIC+acidStorageTankTIC +ammoniaTransferPumpsCostTIC+acidTransferPumpsCostTIC);
        additionsTIC = (additionPiping+ammoniaStorageTankTIC+acidStorageTankTIC +ammoniaTransferPumpsCostTIC+acidTransferPumpsCostTIC);

// Agitated Media Prep & Storage
        agitatedMediaPrepTankCost = (91200*(vesselSize/264978)^0.7); // NREL 2013 , Quote year 2009
        agitatedMediaPrepTankTIC = 1.17*agitatedMediaPrepTankCost*2.6;//
        mediaTransferPumpsCost = (numberOfTanks+1)*(3933*(vesselSize/950000)^0.8); //NREL 2009 + 1 for RO water addition
        mediaTransferPumpsCostTIC  = 1.17*mediaTransferPumpsCost*2.3;
        MediaHeatExchangerTIC = 25000*2;
        MediaWaterHeaterTIC  = 25000*2;
        mediaPiping = 0.05*(agitatedMediaPrepTankTIC+mediaTransferPumpsCostTIC+MediaWaterHeaterTIC);
        mediaPrepTIC = (mediaPiping+agitatedMediaPrepTankTIC+mediaTransferPumpsCostTIC+MediaWaterHeaterTIC);

// Dry Chemicals
       DryChemicalAddition  = 100000;
       DryChemicalAdditionTIC = 2*DryChemicalAddition; // 2020 Estimate Lynch

// CIP
        CIPTankCost = 3*(98000*((vesselSize/100)/105991)^0.7); // NREL 2013 , Quote year 2010, holds 1/100 volume of concentrated
        CIPTankTIC = 1.13*CIPTankCost*2;//
        CIPTransferPumpsCost = numberOfTanks*(3933*((vesselSize/100)/950000)^0.8); //NREL 2009
        CIPTransferPumpsCostTIC  = 1.17*CIPTransferPumpsCost*2.3;
        CIPFilterCostTIC = 35000*2; // 2020 Estimate Lynch
        CIPHeaterCostTIC = 30000*2; // 2020 Estimate Lynch
        CIPpipingTIC = 0.05*(CIPTankTIC +CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC);
        CIPTIC = (CIPpipingTIC+CIPTankTIC +CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC);

        MainFermAreaTIC = mainFermTIC+glucoseStorageTIC+additionsTIC+mediaPrepTIC+DryChemicalAdditionTIC+ CIPTIC;


// Area 100: Seed Fermenter Area
         seedEquipmentTIC = 0.27*(mainFermTIC + glucoseStorageTIC + additionsTIC + mediaPrepTIC );  // Assume 0.27 * production fermentation equipment cost per NREL_2013

// Area 400 : Primary Cell Removal Capex

// Centrifugation
        CentrifugeCost = numberOfCentrigfuges*(2748000*((25000)/264000)^0.8); //  SuperPro estimate from https://www.nap.edu/read/12620/chapter/22#353 (4400L/min =264000L/hr)
        CentrifugeTIC = 1.17*CentrifugeCost*1.8;//
        Centrifugepiping = 0.05*CentrifugeTIC;
        CentrifugeTIC = Centrifugepiping + Centrifugepiping;

// Broth Storage
        brothStorageTankCost = (1317000*((vesselSize*numberOfTanks*0.5)/4542000)^0.7); // NREL 2013 , Quote year 2011, sized to 1/2 of fermentation capacity
        brothStorageTankTIC = 1.0*brothStorageTankCost*1.8;
        brothStorageTransferPumpCost= (3933*((vesselSize*numberOfTanks*0.5)/950000)^0.8); //NREL 2009
        brothStorageTransferPumpTIC= 1.17*brothStorageTransferPumpCost*2.3;
        brothStoragePiping = 0.05*(brothStorageTankTIC +brothStorageTransferPumpTIC);
        brothStorageTIC = (brothStoragePiping+brothStorageTankTIC +brothStorageTransferPumpTIC);

// Cell heat Kill
        HeatTreatmentpackageTIC = 2*250000; // 2020 Lynch Estimate, includes Piping
        PrimaryCellRemovalTIC = (CentrifugeTIC + brothStorageTIC + HeatTreatmentpackageTIC);

// Area 0: Utilities

// Process Utilities
        // Cooling Water
           coolingTowerTIC = 250*cumulativeCoolingRateDemand;
           coolingTowerPumpsTIC = coolingTowerTIC;
           coolingTowerPiping = 0.05*(coolingTowerTIC+coolingTowerPumpsTIC);
           coolingTIC = (coolingTowerPiping+coolingTowerTIC+coolingTowerPumpsTIC);

        // Boiler Package
            BoilerPackageCosts = 1000000;
            BoilerPackageTIC = 2*BoilerPackageCosts;

        // AirHandling
            AirDryingTIC = 100000*2;
            AirReceiverTIC = 100000*2;
            AirPiping=0.05*(AirDryingTIC+AirReceiverTIC);
            AirHandlingTIC =(AirPiping+AirDryingTIC+AirReceiverTIC);

        // Water Handling & Purification
            MunicpalWaterTankTIC = 50000*2;
            PotableWaterTankTIC  = 50000*2;
            SoftenerTankTIC  = 20000*2;
            BrineTankTIC  = 20000*2;
            PotableWaterCoolerTIC  = 30000*2;
            MunipalWaterPumpTIC  = 15000*2;
            ROSystemTIC  = 20000*2;
            WaterPipingTIC  = 0.05*(MunicpalWaterTankTIC+PotableWaterTankTIC+SoftenerTankTIC+BrineTankTIC+ PotableWaterCoolerTIC+MunipalWaterPumpTIC+ROSystemTIC);
            WaterHandlingTIC= (WaterPipingTIC+MunicpalWaterTankTIC+PotableWaterTankTIC+SoftenerTankTIC+BrineTankTIC+ PotableWaterCoolerTIC+MunipalWaterPumpTIC+ROSystemTIC);

       // Waste Disposal
            WasteWaterTankTIC = 100000*2;
            WasteWaterHeatExchangerTIC = 25000*2;
            WasteWaterHeaterTIC  = 25000*2;
            WasteWaterHeaterPumpTIC = 8000*2;
            WasteWaterPipingTIC  = 0.05*(WasteWaterTankTIC+WasteWaterHeatExchangerTIC+WasteWaterHeaterTIC+WasteWaterHeaterPumpTIC);
            WasteWaterTIC = (WasteWaterPipingTIC +WasteWaterTankTIC+WasteWaterHeatExchangerTIC+WasteWaterHeaterTIC+WasteWaterHeaterPumpTIC);

       // Utilities Total

        processUtilitiesTIC  = (coolingTIC + BoilerPackageTIC + AirHandlingTIC+WaterHandlingTIC+WasteWaterTIC)


// Area 600 : Instruments & Control
        controlSystems =0.10*(MainFermAreaTIC + seedEquipmentTIC+ PrimaryCellRemovalTIC+ processUtilitiesTIC);
        fermtotalInstalledEquipmentCost = MainFermAreaTIC + seedEquipmentTIC+ PrimaryCellRemovalTIC+ processUtilitiesTIC +controlSystems ;
          console.log(MainFermAreaTIC);
          console.log(seedEquipmentTIC);
          console.log(PrimaryCellRemovalTIC);
           console.log(processUtilitiesTIC);
           console.log(controlSystems);
// DSP
        totalInstalledEquipmentCost =  fermtotalInstalledEquipmentCost/(1-dspCAPEXfraction);
        dspTIC = dspCAPEXfraction*totalInstalledEquipmentCost;
        console.log(dspTIC);
        console.log(totalInstalledEquipmentCost);
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
    annualUtilityCosts = annualCostOfHeatKill + annualCostOfSterilization +  annualCostOfCoolingWater + annualCostOfCompressedAir + annualCost0fMassTransfer + CostofBiomassDisposal + annualCostOfCentrifugation; //
    annualRawMaterialCosts = annualCostOfMedia  + annualCostOfNH3 + annualCostOfGlucose + annualWaterCosts + annualCIPCosts; //
    annualLaborCosts = 1.122*203923*numberOfTanks; //  (includes overhead labor uses cost per tank (NREL2013))x inflation factor);//
    annualAdditionalFixedCosts = 1.122*0.037*1.175*(totalDirectCost); // (per NREL2013 x inflation factor); //
    annualFixedCosts = annualAdditionalFixedCosts + annualLaborCosts; //
    annualfermOpex = annualUtilityCosts + annualRawMaterialCosts +annualFixedCosts;//

    //Total Opex
    annualOpex  =  annualfermOpex/(1-dspOPEXfraction);

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
    costOfCIP = annualCIPCosts/plantCapacity
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
    bioprocessOutputs.transferPumpsTIC = TransferPumpsTIC;
    bioprocessOutputs.storageTanksTIC =  glucoseStorageTankTIC+brothStorageTankTIC+ammoniaStorageTankTIC;
    bioprocessOutputs.prepTankTIC = agitatedMediaPrepTankTIC;
    bioprocessOutputs.seedEquipmentTIC = seedEquipmentTIC;
    bioprocessOutputs.coolingTIC= coolingTowerTIC;
    bioprocessOutputs.dspTIC= dspTIC;


    return bioprocessOutputs;
    }