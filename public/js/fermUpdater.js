<script src="/js/FermentationTimeCourse.js"></script>

     function fermUpdater(Input,theorYieldGlu) {
     var fermentationOutput = FermentationTimecourse(Input,theorYieldGlu);
     var myFermChart = FermChart(fermentationOutput);
     document.getElementById("Rate").innerHTML = parseFloat(Input[0]).toFixed(2);
     document.getElementById("Titer").innerHTML = parseFloat(Input[1]).toFixed(0);
     document.getElementById("fermYield").innerHTML = (parseFloat(fermentationOutput.overallYield)).toFixed(3);
     document.getElementById("specificRate").innerHTML = parseFloat(fermentationOutput.specificRate).toFixed(2);
     document.getElementById("finalBiomass").innerHTML = parseFloat(fermentationOutput.finalBiomass).toFixed(2);
     document.getElementById("fermTime").innerHTML = parseFloat(fermentationOutput.fermTime).toFixed(0);
     var dspyield = document.getElementById("myRange14");
     document.getElementById("dspYield").innerHTML = dspyield.value/100;
     document.getElementById("overallYield").innerHTML = ((dspyield.value/100)*(parseFloat(fermentationOutput.overallYield))).toFixed(2);
     }
