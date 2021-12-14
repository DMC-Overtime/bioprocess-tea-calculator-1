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

var slider = [];
var pageInput=[];
var Input = [];
var pageInput =[];

//Update Vessel Size  & Associated Page Outputs
vesselSize =  UpdateVesselSize();
AVP = advancedVariablesProcess();
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

            for(let z=0; z< 32; z++){
            console.log(Input[z]);
            }
    bioprocessOutputs = bioprocessopexcapex(Input);

     window.myFermChart = FermChart(bioprocessOutputs);

     document.getElementById("fermYield").innerHTML = (parseFloat(bioprocessOutputs.overallFermYield)).toFixed(3);
     document.getElementById("specificRate").innerHTML = parseFloat(bioprocessOutputs.specificRate).toFixed(2);
     document.getElementById("finalBiomass").innerHTML = parseFloat(bioprocessOutputs.finalBiomass).toFixed(2);
     document.getElementById("fermTime").innerHTML = parseFloat(bioprocessOutputs.fermTime).toFixed(0);
     document.getElementById("maxOTR").innerHTML = parseFloat(bioprocessOutputs.maxOTR).toFixed(2);
     document.getElementById("maxKla").innerHTML = parseFloat(bioprocessOutputs.maxKla).toFixed(2);
     document.getElementById("maxCooling").innerHTML = parseFloat(bioprocessOutputs.maxCoolingRate).toFixed(2);
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


               window.myProFormaChart = ProFormaChart(time,cumCashFlow);
               window.myOpexPieChart = OpexPieChart(bioprocessOutputs);
               window.myCapexPieChart1 = CapexPieChart1(bioprocessOutputs);

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
       document.getElementById('productMaxOTR').value =parseFloat(bioprocessOutputs.maxOTR).toFixed(2);
       document.getElementById('productMaxKLA').value =parseFloat(bioprocessOutputs.maxKla).toFixed(2);
       document.getElementById('productMaxCoolingRate').value =parseFloat(bioprocessOutputs.maxCoolingRate).toFixed(2);
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


 // Pull Bioprocess CAPEX Outputs into hidden submission Form

      document.getElementById('MainFermAreaEquip').value = (bioprocessOutputs.MainFermAreaEquip).toFixed(2);
      document.getElementById('MainFermAreaTIC').value = (bioprocessOutputs.MainFermAreaTIC).toFixed(2);
      document.getElementById('fermenterCost').value =(bioprocessOutputs.fermenterCost).toFixed(2);
      document.getElementById('fermenterTIC').value =(bioprocessOutputs.fermenterTIC).toFixed(2);
      document.getElementById('fermenterAgitatorCost').value =(bioprocessOutputs.fermenterAgitatorCost).toFixed(2);
      document.getElementById('fermenterAgitatorTIC').value =(bioprocessOutputs.fermenterAgitatorTIC).toFixed(2);
      document.getElementById('FermTransferPumpsCost').value =(bioprocessOutputs.TransferPumpsCost).toFixed(2);
      document.getElementById('FermTransferPumpsTIC').value =(bioprocessOutputs.TransferPumpsTIC).toFixed(2);
      document.getElementById('mainFermPiping').value =(bioprocessOutputs.mainFermPiping).toFixed(2);
      document.getElementById('mainFermTanksEquip').value = (bioprocessOutputs.mainFermEquip).toFixed(2);
      document.getElementById('mainFermTanksTIC').value =(bioprocessOutputs.mainFermTIC).toFixed(2);
      document.getElementById('glucoseStorageTankCost').value =(bioprocessOutputs.glucoseStorageTankCost).toFixed(2);
      document.getElementById('glucoseStorageTankTIC').value =(bioprocessOutputs.glucoseStorageTankTIC).toFixed(2);
      document.getElementById('glucoseStorageTransferPumpsCost').value =(bioprocessOutputs.glucoseStorageTransferPumpsCost).toFixed(2);
      document.getElementById('glucoseStorageTransferPumpsTIC').value = (bioprocessOutputs.glucoseStorageTransferPumpsTIC).toFixed(2);
      document.getElementById('glucoseStoragepiping').value =(bioprocessOutputs.glucoseStoragepiping).toFixed(2);
      document.getElementById('glucoseStorageEquip').value = (bioprocessOutputs.glucoseStorageEquip).toFixed(2);
      document.getElementById('glucoseStorageTIC').value =(bioprocessOutputs.glucoseStorageTIC).toFixed(2);
      document.getElementById('ammoniaStorageTankCost').value = (bioprocessOutputs.ammoniaStorageTankCost).toFixed(2);
      document.getElementById('ammoniaStorageTankTIC').value =(bioprocessOutputs.ammoniaStorageTankTIC).toFixed(2);
      document.getElementById('acidStorageTankCost').value = (bioprocessOutputs.acidStorageTankCost).toFixed(2);
      document.getElementById('acidStorageTankTIC').value =(bioprocessOutputs.acidStorageTankTIC).toFixed(2);
      document.getElementById('ammoniaTransferPumpsCost').value = (bioprocessOutputs.ammoniaTransferPumpsCost).toFixed(2);
      document.getElementById('ammoniaTransferPumpsCostTIC').value =(bioprocessOutputs.ammoniaTransferPumpsCostTIC).toFixed(2);
      document.getElementById('acidTransferPumpsCost').value = (bioprocessOutputs.acidTransferPumpsCost).toFixed(2);
      document.getElementById('acidTransferPumpsCostTIC').value =(bioprocessOutputs.acidTransferPumpsCostTIC).toFixed(2);
      document.getElementById('additionPiping').value = (bioprocessOutputs.additionPiping).toFixed(2);
      document.getElementById('additionsEquip').value =(bioprocessOutputs.additionsEquip).toFixed(2);
      document.getElementById('additionsTIC').value = (bioprocessOutputs.additionsTIC).toFixed(2);
      document.getElementById('agitatedMediaPrepTankCost').value =(bioprocessOutputs.agitatedMediaPrepTankCost).toFixed(2);
      document.getElementById('agitatedMediaPrepTankTIC').value = (bioprocessOutputs.agitatedMediaPrepTankTIC).toFixed(2);
      document.getElementById('mediaTransferPumpsCost').value =(bioprocessOutputs.mediaTransferPumpsCost).toFixed(2);
      document.getElementById('mediaTransferPumpsCostTIC').value = (bioprocessOutputs.mediaTransferPumpsCostTIC).toFixed(2);
      document.getElementById('MediaHeatExchanger').value =(bioprocessOutputs.MediaHeatExchanger).toFixed(2);
      document.getElementById('MediaHeatExchangerTIC').value =(bioprocessOutputs.MediaHeatExchangerTIC).toFixed(2);
      document.getElementById('mediaPiping').value =(bioprocessOutputs.mediaPiping).toFixed(2);
      document.getElementById('DryChemicalAdditionSkid').value =(bioprocessOutputs.DryChemicalAdditionSkid).toFixed(2);
      document.getElementById('DryChemicalAdditionSkidTIC').value =(bioprocessOutputs.DryChemicalAdditionSkidTIC).toFixed(2);
      document.getElementById('mediaPrepEquip').value =(bioprocessOutputs.mediaPrepEquip).toFixed(2);
      document.getElementById('mediaPrepTIC').value =(bioprocessOutputs.mediaPrepTIC).toFixed(2);
      document.getElementById('CIPTankCost').value =(bioprocessOutputs.CIPTankCost).toFixed(2);
      document.getElementById('CIPTankTIC').value =(bioprocessOutputs.CIPTankTIC).toFixed(2);
      document.getElementById('CIPTransferPumpsCost').value =(bioprocessOutputs.CIPTransferPumpsCost).toFixed(2);
      document.getElementById('CIPTransferPumpsCostTIC').value =(bioprocessOutputs.CIPTransferPumpsCostTIC).toFixed(2);
      document.getElementById('CIPFilterCost').value =(bioprocessOutputs.CIPFilterCost).toFixed(2);
      document.getElementById('CIPFilterCostTIC').value =(bioprocessOutputs.CIPFilterCostTIC).toFixed(2)
      document.getElementById('CIPHeaterCost').value =(bioprocessOutputs.CIPHeaterCost).toFixed(2);
      document.getElementById('CIPHeaterCostTIC').value =(bioprocessOutputs.CIPHeaterCostTIC).toFixed(2);
      document.getElementById('CIPpipingTIC').value =(bioprocessOutputs.CIPpipingTIC).toFixed(2);
      document.getElementById('CIPEquip').value =(bioprocessOutputs.CIPEquip).toFixed(2);
      document.getElementById('CIPTIC').value =(bioprocessOutputs.CIPTIC).toFixed(2);
      document.getElementById('seedEquipment').value =(bioprocessOutputs.seedEquipment).toFixed(2);
      document.getElementById('seedEquipmentTIC').value =(bioprocessOutputs.seedEquipmentTIC).toFixed(2);
      document.getElementById('CentrifugeCost').value =(bioprocessOutputs.CentrifugeCost).toFixed(2);
      document.getElementById('CentrifugeTIC').value =(bioprocessOutputs.CentrifugeTIC).toFixed(2);
      document.getElementById('Centrifugepiping').value =(bioprocessOutputs.Centrifugepiping).toFixed(2);
      document.getElementById('CentrifugeEquip').value =(bioprocessOutputs.CentrifugeEquip).toFixed(2);
      document.getElementById('CentrifugeEquipTIC').value =(bioprocessOutputs.CentrifugeEquipTIC).toFixed(2);
      document.getElementById('brothStorageTankCost').value =(bioprocessOutputs.brothStorageTankCost).toFixed(2);
      document.getElementById('brothStorageTankTIC').value =(bioprocessOutputs.brothStorageTankTIC).toFixed(2);
      document.getElementById('brothStorageTransferPumpCost').value =(bioprocessOutputs.brothStorageTransferPumpCost).toFixed(2);
      document.getElementById('brothStorageTransferPumpTIC').value =(bioprocessOutputs.brothStorageTransferPumpTIC).toFixed(2);
      document.getElementById('brothStoragePiping').value =(bioprocessOutputs.brothStoragePiping).toFixed(2);
      document.getElementById('brothStorageEquip').value =(bioprocessOutputs.brothStorageEquip).toFixed(2);
      document.getElementById('brothStorageTIC').value =(bioprocessOutputs.brothStorageTIC).toFixed(2);
      document.getElementById('PrimaryCellRemovalEquip').value =(bioprocessOutputs.PrimaryCellRemovalEquip).toFixed(2);
      document.getElementById('PrimaryCellRemovalTIC').value =(bioprocessOutputs.PrimaryCellRemovalTIC).toFixed(2);
      document.getElementById('coolingTowerEquip').value =(bioprocessOutputs.coolingTowerEquip).toFixed(2);
      document.getElementById('coolingTowerTIC').value =(bioprocessOutputs.coolingTowerTIC).toFixed(2);
      document.getElementById('coolingTowerPumps').value =(bioprocessOutputs.coolingTowerPumps).toFixed(2);
      document.getElementById('coolingTowerPumpsTIC').value =(bioprocessOutputs.coolingTowerPumpsTIC).toFixed(2);
      document.getElementById('coolingTowerPiping').value =(bioprocessOutputs.coolingTowerPiping).toFixed(2);
      document.getElementById('coolingEquip').value =(bioprocessOutputs.coolingEquip).toFixed(2);
      document.getElementById('coolingTIC').value =(bioprocessOutputs.coolingTIC).toFixed(2);
      document.getElementById('BoilerPackageCosts').value =(bioprocessOutputs.BoilerPackageCosts).toFixed(2);
      document.getElementById('BoilerPackageTIC').value =(bioprocessOutputs.BoilerPackageTIC).toFixed(2);
      document.getElementById('AirDryer').value =(bioprocessOutputs.AirDryer).toFixed(2);
      document.getElementById('AirDryingTIC').value =(bioprocessOutputs.AirDryingTIC).toFixed(2);
      document.getElementById('AirReceiver').value =(bioprocessOutputs.AirReceiver).toFixed(2);
      document.getElementById('AirReceiverTIC').value =(bioprocessOutputs.AirReceiverTIC).toFixed(2);
      document.getElementById('AirCompressor').value =(bioprocessOutputs.AirCompressor).toFixed(2);
      document.getElementById('AirCompressorTIC').value =(bioprocessOutputs.AirCompressorTIC).toFixed(2);
      document.getElementById('AirPiping').value =(bioprocessOutputs.AirPiping).toFixed(2);
      document.getElementById('AirHandlingEquip').value =(bioprocessOutputs.AirHandlingEquip).toFixed(2);
      document.getElementById('AirHandlingTIC').value =(bioprocessOutputs.AirHandlingTIC).toFixed(2);
      document.getElementById('MunicipalWaterTank').value =(bioprocessOutputs.MunicipalWaterTank).toFixed(2);
      document.getElementById('MunicipalWaterTankTIC').value =(bioprocessOutputs.MunicipalWaterTankTIC).toFixed(2);
      document.getElementById('PotableWaterTank').value =(bioprocessOutputs.PotableWaterTank).toFixed(2);
      document.getElementById('PotableWaterTankTIC').value =(bioprocessOutputs.PotableWaterTankTIC).toFixed(2);
      document.getElementById('SoftenerSystem').value =(bioprocessOutputs.SoftenerSystem).toFixed(2);
      document.getElementById('SoftenerSystemTIC').value =(bioprocessOutputs.SoftenerSystemTIC).toFixed(2);
      document.getElementById('PotableWaterCooler').value =(bioprocessOutputs.PotableWaterCooler).toFixed(2);
      document.getElementById('PotableWaterCoolerTIC').value =(bioprocessOutputs.PotableWaterCoolerTIC).toFixed(2);
      document.getElementById('MunicipalWaterPump').value =(bioprocessOutputs.MunicipalWaterPump).toFixed(2);
      document.getElementById('MunicipalWaterPumpTIC').value =(bioprocessOutputs.MunicipalWaterPumpTIC).toFixed(2);
      document.getElementById('WaterPiping').value =(bioprocessOutputs.WaterPiping).toFixed(2);
      document.getElementById('WaterHandlingEquip').value =(bioprocessOutputs.WaterHandlingEquip).toFixed(2);
      document.getElementById('WaterHandlingTIC').value =(bioprocessOutputs.WaterHandlingTIC).toFixed(2);
      document.getElementById('WasteWaterTank').value =(bioprocessOutputs.WasteWaterTank).toFixed(2);
      document.getElementById('WasteWaterTankTIC').value =(bioprocessOutputs.WasteWaterTankTIC).toFixed(2);
      document.getElementById('HeatKillExchanger').value =(bioprocessOutputs.HeatKillExchanger).toFixed(2);
      document.getElementById('HeatKillExchangerTIC').value =(bioprocessOutputs.HeatKillExchangerTIC).toFixed(2);
      document.getElementById('WasteWaterPump').value =(bioprocessOutputs.WasteWaterPump).toFixed(2);
      document.getElementById('WasteWaterPumpTIC').value =(bioprocessOutputs.WasteWaterPumpTIC).toFixed(2);
      document.getElementById('WasteWaterPiping').value =(bioprocessOutputs.WasteWaterPiping).toFixed(2);
      document.getElementById('WasteWaterEquip').value =(bioprocessOutputs.WasteWaterEquip).toFixed(2);
      document.getElementById('WasteWaterTIC').value =(bioprocessOutputs.WasteWaterTIC).toFixed(2);
      document.getElementById('processUtilitiesEquip').value =(bioprocessOutputs.processUtilitiesEquip).toFixed(2);
      document.getElementById('processUtilitiesTIC').value =(bioprocessOutputs.processUtilitiesTIC).toFixed(2);
      document.getElementById('controlSystems').value =(bioprocessOutputs.controlSystems).toFixed(2);
      document.getElementById('fermtotalInstalledEquipmentCost').value =(bioprocessOutputs.fermtotalInstalledEquipmentCost).toFixed(2);
      document.getElementById('dspTIC').value =(bioprocessOutputs.dspTIC).toFixed(2);
      document.getElementById('totalInstalledEquipmentCost').value =(bioprocessOutputs.totalInstalledEquipmentCost).toFixed(2);
      document.getElementById('warehousing').value =(bioprocessOutputs.warehousing).toFixed(2);
      document.getElementById('administrativeBuildings').value =(bioprocessOutputs.administrativeBuildings).toFixed(2);
      document.getElementById('siteDevelopment').value =(bioprocessOutputs.siteDevelopment).toFixed(2);
      document.getElementById('totalDirectCost').value =(bioprocessOutputs.totalDirectCost).toFixed(2);
      document.getElementById('HomeOffice').value =(bioprocessOutputs.HomeOffice).toFixed(2);
      document.getElementById('prorateableExpenses').value =(bioprocessOutputs.prorateableExpenses).toFixed(2);
      document.getElementById('fieldExpenses').value =(bioprocessOutputs.fieldExpenses).toFixed(2);
      document.getElementById('projectContingency').value =(bioprocessOutputs.projectContingency).toFixed(2);
      document.getElementById('otherStartupCosts').value =(bioprocessOutputs.otherStartupCosts).toFixed(2);
      document.getElementById('totalIndirectCosts').value =(bioprocessOutputs.totalIndirectCosts).toFixed(2);
      document.getElementById('fixedCapitalInvestment').value =(bioprocessOutputs.fixedCapitalInvestment).toFixed(2);
      document.getElementById('workingCapital').value =(bioprocessOutputs.workingCapital).toFixed(2);
      document.getElementById('totaCapitalInvestment').value =(bioprocessOutputs.totaCapitalInvestment).toFixed(2);
      document.getElementById('bioprocessoutputsTIC').innerHTML = (bioprocessOutputs.totalInstalledEquipmentCost).toFixed(0);

    //PW New December 2021, per Rusty's request
    document.getElementById('opexperkg').value =(bioprocessOutputs.opexperkg).toFixed(5);
    document.getElementById('costOfGlucoseperkg').value =(bioprocessOutputs.costOfGlucoseperkg).toFixed(5);
    document.getElementById('costOfAmmoniaperkg').value =(bioprocessOutputs.costOfAmmoniaperkg).toFixed(5);
    document.getElementById('costOfMediaperkg').value =(bioprocessOutputs.costOfMediaperkg).toFixed(5);
    document.getElementById('costOfAerationperkg').value =(bioprocessOutputs.costOfAerationperkg).toFixed(5);
    document.getElementById('costOfCoolingperkg').value =(bioprocessOutputs.costOfCoolingperkg).toFixed(5);
    document.getElementById('costOfBiomassDisposalperkg').value =(bioprocessOutputs.costOfBiomassDisposalperkg).toFixed(5);
    document.getElementById('costOfSterilizationperkg').value =(bioprocessOutputs.costOfSterilizationperkg).toFixed(5);
    document.getElementById('costOfLaborperkg').value =(bioprocessOutputs.costOfLaborperkg).toFixed(5);
    document.getElementById('costOfCentrifugationperkg').value =(bioprocessOutputs.costOfCentrifugationperkg).toFixed(5);
    document.getElementById('otherFixedCostsperkg').value =(bioprocessOutputs.otherFixedCostsperkg).toFixed(5);
    document.getElementById('dspOPEXperkg').value =(bioprocessOutputs.dspOPEXperkg).toFixed(5);



}
function bioprocessopexcapex(Input,AV){
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
    mediaCost = Input[27];
    fermentationTemperature = Input[28];
    dspYield = Input[29]/100;
    dspOPEXfraction = Input[30]/100;
    dspCAPEXfraction = Input[31]/100;



    NaOHCosts = AVP.NaOHCosts;
    PeraceticAcidCosts = AVP.PeraceticAcidCosts;
    AmmoniaSourceMW = AVP.AmmoniaSourceMW;
    MicrobeMW  = AVP.MicrobeMW;
    FeedstockMW = AVP.FeedstockMW;
    biomassYieldCoefficientGlucose = AVP.biomassYieldCoefficientGlucose;
    biomassYieldCoefficientNH3 = AVP.biomassYieldCoefficientNH3;
    biomassYieldCoefficientO2 = AVP.biomassYieldCoefficientO2;
    byproductYieldCoefficientO2 = AVP.byproductYieldCoefficientO2;
    inoculationFraction = AVP.inoculationFraction;
    workingVolumeRatio = AVP.workingVolumeRatio;
    BiomassYieldFraction = AVP.BiomassYieldFraction;
    FermenterAspectRatio = AVP.FermenterAspectRatio;


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
    MicrobeMW = AVP.MicrobeMW ; // (g/mole)
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
    annualCostOfMedia = totalAnnualFermWorkingVolume*finalBiomassConcentration*mediaCost/1000; // $/year (media cost input is $/kg, need to divide by 1000 to convert biomass from g to kg )

    // Oxygen/Air Requirements & Costs

   // Cumulative O2/Air Need Needed
    cumulativeProductO2 = (((finalTiter*totalAnnualFermWorkingVolume)/productYieldCoefficientO2)/32)*1000; //mmoles O2 needed
    cumulativeBiomassO2 = (((finalBiomassConcentration*totalAnnualFermWorkingVolume)/biomassYieldCoefficientO2)/32/BiomassYieldFraction)*1000;// mmoles O2 needed for Biomass
    cumulativeByProductO2 = (((cumulativeByProductGlucose)/FeedstockMW)*1000)*6*1000;//mmoles O2 needed for biomass and product inefficiencies
    cumulativeO2 = cumulativeBiomassO2 + cumulativeProductO2 + cumulativeByProductO2;// mmoles O2 needed
    averageOTR = (cumulativeO2/annualFermentationUpTime/totalAnnualFermWorkingVolume);// average mmoles/L-hr O2 needed
    cumulativeAir = cumulativeO2/(9.375*1000) ;// m3 of air needed, 9.375 mmoles O2 per liter of air
    averageAnnualAirflow = (cumulativeAir/(annualFermentationUpTime*3600))*1.333;// Average m3 of air needed per second (assumes 75% O2 consumption, Benz 2008)
    AnnualCostOfAirperM3 = (0.00005*(Math.pow(averageAnnualAirflow,-0.3))*Math.log(maxFermenterPressure)*CEPCI) + 0.0009*Math.log(maxFermenterPressure)*CostOfFuel;// $/m3 (Ulrich & Vasudevan)
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
    annualNaOHCosts = (numberOfBatchesPerYearPerTank*numberOfTanks*vesselSize)*0.02*NaOHCosts;
    // Assumes Peracetic Acid used at final concentratio of 200ppm  or 0.02%
    annualPeraceticCosts = (numberOfBatchesPerYearPerTank*numberOfTanks*vesselSize)*0.002*PeraceticAcidCosts; //
    annualCIPCosts = annualNaOHCosts+annualPeraceticCosts;

    // Primary Cell Removal Calculations (Centrifugation)
    // Sigma = Q/2uo e coli uo=6.81X10-9 m/s
    CentrifugeFlowRate = AVP.centrifugeFlowRate; //L/hour
    annualCentrifugeVolume = totalAnnualFermWorkingVolume; // Liters
    CentrifugeUptime = AVP.centrifugeUptime;
    neededTotalCentrifugeFlowRate = annualCentrifugeVolume/CentrifugeUptime;
    numberOfCentrifuges = Math.ceil(neededTotalCentrifugeFlowRate/CentrifugeFlowRate);
    actualAnnualCentrifugeUptime = annualCentrifugeVolume/(numberOfCentrifuges*CentrifugeFlowRate)
    powerConsumptionPerCentrifuge = 3.0 ;// kW  https://onlinelibrary.wiley.com/doi/10.1002/ceat.201800292
    annualCostOfCentrifugation = numberOfCentrifuges*powerConsumptionPerCentrifuge*actualAnnualCentrifugeUptime*ElectricityCost;// $/year
    console.log(numberOfCentrifuges);
    console.log(CentrifugeFlowRate);

    // Biomass Heat Kill - To disinfect any waster biomass
    heatKillVolume = (totalAnnualFermWorkingVolume*finalBiomassConcentration)*1.6/1000;//(Liters)
    heatKillTemperature = 60 ; // (degrees Celsius) assumes E. coli process
    ambientTemperature = 25; // (degrees Celsius)
    heatKillEfficiency = 0.2; // Watts consumed per Watt used to sterilize
    heatKillEnergyConsumption = 4.184*heatKillVolume*heatKillEfficiency*(heatKillTemperature-ambientTemperature); // (kJ/year)
    annualCostOfHeatKill =  (heatKillEnergyConsumption/1055056)*NaturalGasCost; //  $/year


// Capex Estimations

AVC = advancedVariablesCapital();

// Major Equipment


         if (vesselSize == 1000000){
             fermenterUnitCost = (AVC.Fermenter_quote)*(Math.pow((1000000/AVC.Fermenter_quotesize),AVC.Fermenter_SF));
            }else if (vesselSize = 500000){
             fermenterUnitCost = (AVC.Fermenter_quote)*(Math.pow((500000/AVC.Fermenter_quotesize),AVC.Fermenter_SF));
            }else if (vesselSize = 200000){
             fermenterUnitCost = (AVC.Fermenter_quote)*(Math.pow((200000/AVC.Fermenter_quotesize),AVC.Fermenter_SF));
          }

// Main Fermenter Area including Air Handling
        fermenterCost = numberOfTanks*(fermenterUnitCost); // NREL 2013 , Quote year 2010
        fermenterTIC = fermenterCost*AVC.Fermenter_IF;
        fermenterAgitatorCost = numberOfTanks*AVC.Agitator_quote*(Math.pow((vesselSize/AVC.Agitator_quotesize),AVC.Agitator_SF));
        fermenterAgitatorTIC = fermenterAgitatorCost*AVC.Agitator_IF;
        TransferPumpsCost = 2*numberOfTanks*AVC.TransferPumps_quote*(Math.pow((vesselSize/AVC.TransferPumps_quotesize),AVC.TransferPumps_SF)); //NREL 2009
        TransferPumpsTIC = TransferPumpsCost*AVC.TransferPumps_IF;
        fermentationCoolersCost = AVC.fermentationCoolersCost ;
        fermentationCoolersTIC = AVC.fermentationCoolersTIC ;
        mainFermPiping = AVC.piping_F*(fermenterTIC+fermenterAgitatorTIC +TransferPumpsTIC);
        mainFermTIC = (mainFermPiping+fermenterTIC+fermenterAgitatorTIC +TransferPumpsTIC);
        mainFermEquip = fermenterCost + fermenterAgitatorCost +TransferPumpsCost+ fermentationCoolersCost;
        //console.log(mainFermTIC);

// Sugar Storage
        glucoseStorageTankCost = AVC.GlucoseStorageTank_quote*(Math.pow(((averageGlucoseConsumptionRate*AVC.GlucoseStorageTank_hold_time)/AVC.GlucoseStorageTank_quotesize),AVC.GlucoseStorageTank_SF)); // NREL 2013 , Quote year 2009, holds 12 hrs of feed.
        glucoseStorageTankTIC = AVC.PI2009_INF*glucoseStorageTankCost*AVC.GlucoseStorageTank_IF; //
        glucoseStorageTransferPumpsCost = numberOfTanks*AVC.TransferPumps_quote*(Math.pow(((averageGlucoseConsumptionRate*AVC.GlucoseStorageTank_hold_time)/AVC.TransferPumps_quotesize),AVC.TransferPumps_SF)); //NREL 2009
        glucoseStorageTransferPumpsTIC= glucoseStorageTransferPumpsCost*AVC.TransferPumps_IF;
        glucoseStoragepiping = AVC.piping_F*(glucoseStorageTankTIC+glucoseStorageTransferPumpsTIC);
        glucoseStorageTIC = (glucoseStoragepiping+glucoseStorageTankTIC+glucoseStorageTransferPumpsTIC);
        glucoseStorageEquip = glucoseStorageTankCost+glucoseStorageTransferPumpsCost;
        //console.log(glucoseStorageTIC);

// Titrant Prep & Storage
        ammoniaStorageTankCost = AVC.AmmoniaStorageTank_quote*(Math.pow(((averageNH3ConsumptionRate*AVC.AmmoniaStorageTank_hold_time)/AVC.AmmoniaStorageTank_quotesize),AVC.AmmoniaStorageTank_SF)); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        ammoniaStorageTankTIC = ammoniaStorageTankCost*AVC.AmmoniaStorageTank_IF;//
        acidStorageTankCost = AVC.AcidStorageTank_quote*(Math.pow(((averageNH3ConsumptionRate*AVC.AcidStorageTank_hold_time)/AVC.AcidStorageTank_quotesize),AVC.AcidStorageTank_SF)); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        acidStorageTankTIC = acidStorageTankCost*AVC.AcidStorageTank_IF;//
        ammoniaTransferPumpsCost = numberOfTanks*AVC.TransferPumps_quote*(Math.pow(((averageNH3ConsumptionRate*AVC.AmmoniaStorageTank_hold_time)/AVC.TransferPumps_quotesize),AVC.TransferPumps_SF)); //NREL 2009
        ammoniaTransferPumpsCostTIC = ammoniaTransferPumpsCost*AVC.TransferPumps_IF;
        acidTransferPumpsCost = numberOfTanks*AVC.TransferPumps_quote*(Math.pow(((averageNH3ConsumptionRate*AVC.AcidStorageTank_hold_time)/AVC.AcidStorageTank_quotesize),AVC.TransferPumps_SF)); //NREL 2009
        acidTransferPumpsCostTIC  = acidTransferPumpsCost*AVC.TransferPumps_IF;
        additionPiping = AVC.piping_F*(ammoniaStorageTankTIC+acidStorageTankTIC +ammoniaTransferPumpsCostTIC+acidTransferPumpsCostTIC);
        additionsTIC = (additionPiping+ammoniaStorageTankTIC+acidStorageTankTIC +ammoniaTransferPumpsCostTIC+acidTransferPumpsCostTIC);
        additionsEquip =  ammoniaStorageTankCost+acidStorageTankCost +ammoniaTransferPumpsCost+ acidTransferPumpsCost ;
        //console.log(ammoniaStorageTankCost);

// Agitated Media Prep & Storage
        agitatedMediaPrepTankCost = AVC.AgitatedMediaPrepTank_quote*(Math.pow((vesselSize/AVC.AgitatedMediaPrepTank_quotesize),AVC.AgitatedMediaPrepTank_SF)); // NREL 2013 , Quote year 2009
        agitatedMediaPrepTankTIC = agitatedMediaPrepTankCost*AVC.AgitatedMediaPrepTank_IF;//
        mediaTransferPumpsCost = (numberOfTanks+1)*(AVC.TransferPumps_quote*(Math.pow((vesselSize/AVC.TransferPumps_quotesize),AVC.TransferPumps_SF))); //NREL 2009 + 1 for RO water addition
        mediaTransferPumpsCostTIC  = mediaTransferPumpsCost*AVC.TransferPumps_IF;

// Dry Chemicals
       DryChemicalAddition  = AVC.DryChemicalAddition;
       DryChemicalAdditionTIC = AVC.DryChemicalAddition_IF*DryChemicalAddition; // 2020 Estimate Lynch
       mediaPiping = AVC.piping_F*(agitatedMediaPrepTankTIC+mediaTransferPumpsCostTIC);
       mediaPrepTIC = (mediaPiping+agitatedMediaPrepTankTIC+mediaTransferPumpsCostTIC +DryChemicalAdditionTIC );
       mediaPrepEquip = agitatedMediaPrepTankCost +mediaTransferPumpsCost +DryChemicalAddition;


// CIP
        CIPTankCost = 3*(AVC.CIPvesselquote*(Math.pow((vesselSize*AVC.CIPvesselSize)/AVC.CIPvesselquotesize),AVC.CIPvessel_SF)); // NREL 2013 , Quote year 2010, holds 1/100 volume of concentrated
        CIPTankTIC = CIPTankCost*AVC.CIPvessel_IF;//
        CIPTransferPumpsCost = numberOfTanks*(AVC.TransferPumps_quote*(Math.pow((vesselSize*AVC.CIPvesselSize)/AVC.TransferPumps_quotesize),AVC.TransferPumps_SF)); //NREL 2009
        CIPTransferPumpsCostTIC  = CIPTransferPumpsCost*AVC.TransferPumps_IF;
        CIPFilterCost = AVC.CIPFilterCost;
        CIPFilterCostTIC = AVC.CIPFilterCost_IF*CIPFilterCost;
        CIPHeaterCost = AVC.CIPHeaterCost;
        CIPHeaterCostTIC = AVC.CIPHeaterCost_IF*CIPHeaterCost;
        CIPpipingTIC = AVC.piping_F*(CIPTankTIC +CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC);
        CIPTIC = (CIPpipingTIC+CIPTankTIC +CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC);
        CIPEquip = CIPTankCost+CIPTransferPumpsCost + CIPFilterCost +CIPHeaterCost;


// Summary of Main Ferm

        MainFermAreaEquip = mainFermEquip+glucoseStorageEquip+additionsEquip+mediaPrepEquip+CIPEquip ;
        MainFermAreaTIC = mainFermTIC+glucoseStorageTIC+additionsTIC+mediaPrepTIC+ CIPTIC;


// Area 100: Seed Fermenter Area
        seedEquipment  = AVC.seed_F*MainFermAreaEquip;
        seedEquipmentTIC = AVC.seed_F*MainFermAreaTIC;  // Assume 0.27 * production fermentation equipment cost per NREL_2013

// Area 400 : Primary Cell Removal Capex

// Centrifugation

        CentrifugeCost = numberOfCentrifuges*AVC.CentrifugeCost;
        CentrifugeTIC = CentrifugeCost*AVC.CentrifugeCost_IF;//
        Centrifugepiping = AVC.piping_F*CentrifugeTIC;
        CentrifugeEquip = CentrifugeCost;
        CentrifugeEquipTIC = CentrifugeTIC + Centrifugepiping;


// Broth Storage
        brothStorageTankCost = (AVC.brothStorageTankquote*(Math.pow((vesselSize*numberOfTanks*AVC.brothStorageTankSize)/AVC.brothStorageTankquotesize),AVC.brothStorageTank_SF)); // NREL 2013 , Quote year 2011, sized to 1/2 of fermentation capacity
        brothStorageTankTIC = brothStorageTankCost*AVC.brothStorageTank_IF;
        brothStorageTransferPumpCost= (AVC.TransferPumps_quote*(Math.pow((vesselSize*numberOfTanks*AVC.brothStorageTankSize)/AVC.TransferPumps_quotesize),AVC.TransferPumps_SF)); //NREL 2009
        brothStorageTransferPumpTIC= brothStorageTransferPumpCost*AVC.TransferPumps_IF;
        brothStoragePiping = AVC.piping_F*(brothStorageTankTIC +brothStorageTransferPumpTIC);
        brothStorageEquip = brothStorageTankCost+ brothStorageTransferPumpCost;
        brothStorageTIC = (brothStoragePiping+brothStorageTankTIC +brothStorageTransferPumpTIC);

        PrimaryCellRemovalEquip = brothStorageEquip+ CentrifugeEquip;
        PrimaryCellRemovalTIC = brothStorageTIC+ CentrifugeEquipTIC;


// Area 0: Utilities

// Process Utilities

        // Cooling Water
           averageCoolingWaterFlowRateGPM = averageCoolingWaterFlowRate*1000*60*0.264172;  // m3/sec --> gpm
           coolingTowerEquip = AVC.coolingTowerEquipquote*(Math.pow((averageCoolingWaterFlowRateGPM/AVC.coolingTowerEquipquotesize),AVC.coolingTowerEquip_SF));
           coolingTowerTIC = AVC.coolingTowerEquip_IF*coolingTowerEquip;
           coolingTowerPumps = AVC.coolingTowerPumpsquote*(Math.pow((averageCoolingWaterFlowRateGPM/AVC.coolingTowerPumpsquotesize),AVC.coolingTowerPumps_SF));
           coolingTowerPumpsTIC = AVC.coolingTowerPumps_IF*coolingTowerPumps;
           coolingTowerPiping = AVC.piping_F*(coolingTowerTIC+coolingTowerPumpsTIC);
           coolingEquip = coolingTowerEquip +coolingTowerPumps;
           coolingTIC = (coolingTowerPiping+coolingTowerTIC+coolingTowerPumpsTIC);


        // Boiler
                 TimeTransfer1 = 3600*annualUpTime/20; // sec.
                 he = 1910; //kJ/kg assumes 250psig Steam
                 MediaMass = totalAnnualFermWorkingVolume*1.05;//(kg)
                 qSterilization = 4.19*(120-25)*MediaMass/TimeTransfer1; //kW
                 SteamSTERILIZATION = 2.2046*qSterilization/1910; // (lb/sec)

                 TimeTransfer2 = 3600*annualUpTime/20; // sec
                 HeatKillMass = heatKillVolume*1.1; //(kg)
                 qHeatKill = 4.19*(60-25)*HeatKillMass/TimeTransfer2; //kW
                 SteamHEATKILL  =2.2046*qHeatKill/1910; // (lb/sec)
                 TotalSteamRate =(SteamSTERILIZATION +SteamHEATKILL)*3600; // (lb/hr)

            BoilerPackageCosts = AVC.BoilerPackageCostsquote*(Math.pow((TotalSteamRate/AVC.BoilerPackageCostsquotesize),AVC.BoilerPackageCosts_SF));
            BoilerPackageTIC = AVC.BoilerPackageCosts_SF*BoilerPackageCosts;


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
            AirReceiver  = AVC.AirReceiverquote*(Math.pow((ReceiverVolumeGal/AVC.AirReceiverquotesize),AVC.AirReceiver_SF));//NREL 2010
            AirReceiverTIC = AirReceiver*AVC.AirReceiver_IF;
            //console.log("Air Receiver" + AirReceiver);

        //Compressor Calculations
            compressorOutletP = 3.4; // bar -
            compressorInletP = 1.013; // bar - atmospheric Pressure
            compressorInletT = 25+273; // ambient temperature
            compressorOutletT = compressorInletT*(Math.pow((compressorOutletP/compressorInletP),0.286));
            AirCompressor = AVC.AirCompressorquote*(Math.pow((airflowSCFM/AVC.AirCompressorquotesize),AVC.AirCompressor_SF)); // NREL https://www.nrel.gov/docs/fy19osti/71949.pdf
            AirCompressorTIC = AVC.AirCompressor_IF*AirCompressor;
            AirDryer = AVC.AirDryerquote*(Math.pow((airflowQ/AVC.AirDryerquotesize),AVC.AirDryer_SF));//NREL 2018
            AirDryingTIC = AVC.AirDryer_IF*AirDryer;
            AirPiping=AVC.piping_F*(AirDryingTIC+AirReceiverTIC+AirCompressorTIC);
            AirHandlingEquip = AirDryer + AirReceiver +AirCompressor;
            AirHandlingTIC =(AirPiping+AirDryingTIC+AirReceiverTIC+AirCompressorTIC);
            //console.log(AirHandlingTIC);

        // Water Handling & Purification
        //from opex - averageWaterDemandRate // m3/sec
            averageWaterDemandRateKgperhr = averageWaterDemandRate*1000*3600;
            MunicipalWaterTank = AVC.MunicipalWaterTankquote*(Math.pow((averageWaterDemandRateKgperhr/AVC.MunicipalWaterTankquotesize),AVC.MunicipalWaterTank_SF));//NREL 2018
            MunicipalWaterTankTIC = AVC.MunicipalWaterTank_IF*MunicipalWaterTank;
            MunicipalWaterPump = AVC.MunicipalWaterPumpquote *(Math.pow((averageWaterDemandRateKgperhr/AVC.MunicipalWaterPumpquotesize),AVC.MunicipalWaterPump_SF));//NREL 2018
            MunicipalWaterPumpTIC  = AVC.MunicipalWaterPump_IF*MunicipalWaterPump
            SoftenerSystem = AVC.SoftenerSystemquote*(Math.pow((averageWaterDemandRateKgperhr/AVC.SoftenerSystemquotesize),AVC.SoftenerSystem_SF));//NREL 2010
            SoftenerSystemTIC  = AVC.SoftenerSystem_IF *SoftenerSystem;
            PotableWaterTank =AVC.PotableWaterTankquote; // Lynch 2020 Estimate
            PotableWaterTankTIC  = PotableWaterTank*AVC.PotableWaterTank_IF;
            PotableWaterCooler = AVC.PotableWaterCoolerquote;
            PotableWaterCoolerTIC  = PotableWaterCooler*AVC.PotableWaterCooler_IF;
            WaterPiping  = AVC.piping_F*(MunicipalWaterTankTIC+PotableWaterTankTIC+SoftenerSystemTIC+ PotableWaterCoolerTIC+MunicipalWaterPumpTIC);
            WaterHandlingEquip = (MunicipalWaterTank+PotableWaterTank+SoftenerSystem+PotableWaterCooler+MunicipalWaterPump);
            WaterHandlingTIC= (WaterPiping+MunicipalWaterTankTIC+PotableWaterTankTIC+SoftenerSystemTIC+ PotableWaterCoolerTIC+MunicipalWaterPumpTIC);
            console.log(WaterHandlingTIC);

       // Waste Disposal
            WasteWaterTankSize = (heatKillVolume/totalAnnualFermWorkingVolume)*vesselSize*numberOfTanks;
            WasteWaterTank = AVC.WasteWaterTankquote *(Math.pow((WasteWaterTankSize/AVC.WasteWaterTankquotesize),AVC.WasteWaterTank_SF)); //
            WasteWaterTankTIC = AVC.WasteWaterTank_IF*WasteWaterTank;
            WasteWaterPump = (AVC.TransferPumps_quote*(Math.pow((WasteWaterTankSize)/AVC.TransferPumps_quotesize),AVC.TransferPumps_SF)); //NREL 2009
            WasteWaterPumpTIC= WasteWaterPump*AVC.TransferPumps_IF;

            //  Heat Kill exchanger Calcs
                 ldT1 = ((201-60)-(60-25))/(Math.log((201-60)/(60-25)));
                 U1 = 1; // kW/m2-K
                 HeatKillExchangerArea = qHeatKill/(U1*ldT1);
                 HeatKillExchanger = AVC.HeatKillExchangerquote*(Math.pow((HeatKillExchangerArea/AVC.HeatKillExchangerquotesize),AVC.HeatKillExchanger_SF)); //
                 HeatKillExchangerTIC = HeatKillExchanger*AVC.HeatKillExchanger_IF;

            WasteWaterPiping  = AVC.piping_F*(WasteWaterTankTIC+HeatKillExchangerTIC+WasteWaterPumpTIC);
            WasteWaterEquip = (WasteWaterPiping +WasteWaterTank+WasteWaterPump+HeatKillExchanger);
            WasteWaterTIC = (WasteWaterPiping +WasteWaterTankTIC+HeatKillExchangerTIC+WasteWaterPumpTIC);


        // Media Heat exchanger Calcs
                 ldT0 = ((201-120)-(120-25))/(Math.log((201-120)/(120-25)));
                 U0 = 1; // kW/m2-K
                 MediaHeatExchangerArea = qSterilization/(U0*ldT0);
                 MediaHeatExchanger = AVC.MediaHeatExchangerquote*(Math.pow((MediaHeatExchangerArea/AVC.MediaHeatExchangerquotesize),AVC.MediaHeatExchanger_SF)); //
                 MediaHeatExchangerTIC = MediaHeatExchanger*AVC.MediaHeatExchanger_IF;

        // Update Media Prep costs

                mediaPiping =  mediaPiping + AVC.piping_F*(MediaHeatExchangerTIC);
                mediaPrepTIC  = mediaPrepTIC + AVC.piping_F*(MediaHeatExchangerTIC) + MediaHeatExchangerTIC;
                mediaPrepEquip = mediaPrepTIC + MediaHeatExchanger;


       // Utilities Total
            processUtilitiesEquip = (coolingEquip + BoilerPackageCosts + AirHandlingEquip + WaterHandlingEquip + WasteWaterEquip + MediaHeatExchanger +HeatKillExchanger);
            processUtilitiesTIC  = (coolingTIC + BoilerPackageTIC + AirHandlingTIC + WaterHandlingTIC + WasteWaterTIC + MediaHeatExchangerTIC +HeatKillExchangerTIC );



// Area 600 : Instruments & Control
        controlSystems =AVC.controlSystem_F*(MainFermAreaTIC + seedEquipmentTIC+ PrimaryCellRemovalTIC+ processUtilitiesTIC);
        fermtotalInstalledEquipmentCost = MainFermAreaTIC + seedEquipmentTIC+ PrimaryCellRemovalTIC+ processUtilitiesTIC +controlSystems ;

// DSP
        totalInstalledEquipmentCost =  fermtotalInstalledEquipmentCost/(1-dspCAPEXfraction);
        dspTIC = dspCAPEXfraction*totalInstalledEquipmentCost;

//  Buildings: administration, Warehousing etc
        warehousing = AVC.warehousing_F*totalInstalledEquipmentCost;
        administrativeBuildings = AVC.administrativeBuildings_F*totalInstalledEquipmentCost; //Office
        siteDevelopment = AVC.siteDevelopment_F*totalInstalledEquipmentCost;

// Total Direct Costs
        totalDirectCost =siteDevelopment+warehousing+administrativeBuildings +totalInstalledEquipmentCost;

// Indirect Costs

        HomeOffice = AVC.HomeOffice_F*totalDirectCost; // Engineering &  https://www.sciencedirect.com/topics/engineering/minimum-ethanol-selling-price
        prorateableExpenses = AVC.prorateableExpenses_F*totalDirectCost;
        fieldExpenses  = AVC.fieldExpenses_F*totalDirectCost;
        projectContingency = AVC.projectContingency_F*totalDirectCost;
        otherStartupCosts = AVC.otherStartupCosts_F*totalDirectCost; // permitting etc.
        totalIndirectCosts = otherStartupCosts + projectContingency +HomeOffice +fieldExpenses  + prorateableExpenses ;
        fixedCapitalInvestment = totalDirectCost + totalIndirectCosts;
        workingCapital = AVC.workingCapital_F*fixedCapitalInvestment;
        realEstate= AVC.realEstate_F*fixedCapitalInvestment;
        totaCapitalInvestment  = fixedCapitalInvestment + workingCapital + realEstate;

   // Fermentation Opex Cost Summary
    annualUtilityCosts = annualCostOfHeatKill + annualCostOfSterilization +  annualCostOfCoolingWater + annualCostOfCompressedAir + annualCost0fMassTransfer  + annualCostOfCentrifugation; //
    annualRawMaterialCosts = annualCostOfMedia  + annualCostOfNH3 + annualCostOfGlucose + annualWaterCosts + annualCIPCosts; //
    annualLaborCosts = AVP.annualLaborCosts_F*numberOfTanks; //  (includes overhead labor uses cost per tank (NREL2013))x inflation factor);//
    annualAdditionalFixedCosts = AVP.annualAdditionalFixedCosts_F*(totalDirectCost); // (per NREL2013 x inflation factor); //
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
    costOfBiomassDisposalperkg = (annualCostOfHeatKill)/plantCapacity;
    costOfSterilizationperkg = annualCostOfSterilization/plantCapacity;
    costOfLaborperkg = annualLaborCosts/plantCapacity;
    otherFixedCostsperkg =  annualAdditionalFixedCosts/plantCapacity;
    costOfCentrifugationperkg = annualCostOfCentrifugation/plantCapacity;
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
    bioprocessOutputs.costOfCentrifugationperkg =costOfCentrifugationperkg;
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
            bioprocessOutputs.MunicipalWaterTank =MunicipalWaterTank;
            bioprocessOutputs.MunicipalWaterTankTIC = MunicipalWaterTankTIC;
            bioprocessOutputs.PotableWaterTank = PotableWaterTank ;
            bioprocessOutputs.PotableWaterTankTIC  = PotableWaterTankTIC;
            bioprocessOutputs.SoftenerSystem = SoftenerSystem;
            bioprocessOutputs.SoftenerSystemTIC  = SoftenerSystemTIC;
            bioprocessOutputs.PotableWaterCooler = PotableWaterCooler;
            bioprocessOutputs.PotableWaterCoolerTIC  = PotableWaterCoolerTIC;
            bioprocessOutputs.MunicipalWaterPump = MunicipalWaterPump;
            bioprocessOutputs.MunicipalWaterPumpTIC  = MunicipalWaterPumpTIC;
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