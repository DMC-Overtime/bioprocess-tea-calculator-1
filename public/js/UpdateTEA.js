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
     document.getElementById("Margin").innerHTML = Input[8];

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
     document.getElementById("MSP").innerHTML = MSP;



//Update Selling Price & Associated Page Outputs

//Calculate DCF
     DCFOutput = BOO_DCF(Input,bioprocessOutputs);

          document.getElementById("NPV").innerHTML = (DCFOutput.NPV/1000000).toFixed(2);
          document.getElementById("ROI").innerHTML = ((DCFOutput.ROI)*100).toFixed(2);
          document.getElementById("IRR").innerHTML = 'TBD';
          time = DCFOutput.time;
          cumCashFlow = DCFOutput.cumCashFlow;
            if (myProFormaChart) {
               myProFormaChart.destroy();
            }
          var myProFormaChart = ProFormaChart(time,cumCashFlow);
            if (myOpexPieChart) {
               myOpexPieChart.destroy();
            }
          var myOpexPieChart = OpexPieChart(bioprocessOutputs);
            if (myCapexPieChart) {
               myCapexPieChart.destroy();
            }
          var myCapexPieChart = CapexPieChart(bioprocessOutputs);


}