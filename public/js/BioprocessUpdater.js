     function BioprocessUpdater(Input){

// Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];



     var myFermChart = FermChart(fermentationOutput);
     document.getElementById("Rate").innerHTML = parseFloat(Input[23]).toFixed(2);
     document.getElementById("Titer").innerHTML = parseFloat(Input[24]).toFixed(0);
     document.getElementById("fermYield").innerHTML = (parseFloat(fermentationOutput.overallYield)).toFixed(3);
     document.getElementById("specificRate").innerHTML = parseFloat(fermentationOutput.specificRate).toFixed(2);
     document.getElementById("finalBiomass").innerHTML = parseFloat(fermentationOutput.finalBiomass).toFixed(2);
     document.getElementById("fermTime").innerHTML = parseFloat(fermentationOutput.fermTime).toFixed(0);
     var dspyield = document.getElementById("myRange14");
     document.getElementById("dspYield").innerHTML = dspyield.value/100;
     document.getElementById("overallYield").innerHTML = ((dspyield.value/100)*(parseFloat(fermentationOutput.overallYield))).toFixed(2);
     var bioprocessOutputs = bioprocessopexcapex(Input);
     return bioprocessOutputs;
     }


