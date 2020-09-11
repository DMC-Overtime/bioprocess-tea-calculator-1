  function UpdateChemistry() {

   MWfeedstock= 180.156; //glucose

   var textInput1 = document.getElementById("ChemicalName");
   textInput1.onkeyup= function() {
   document.getElementById("ChemicalName1").innerHTML = textInput1.value;
   document.getElementById("ChemicalName2").innerHTML = textInput1.value;
   }

    var carbon = document.getElementById("C");
    var hydrogen = document.getElementById("H");
    var oxygen = document.getElementById("O");
    var nitrogen = document.getElementById("N");
    var MWvalue;


    carbon.onclick = function(){
    document.getElementById("C").innerHTML = carbon.value;
    document.getElementById("Cnumber").innerHTML = carbon.value;
    document.getElementById("H").innerHTML = hydrogen.value;
    document.getElementById("Hnumber").innerHTML = hydrogen.value;
    document.getElementById("O").innerHTML = oxygen.value;
    document.getElementById("Onumber").innerHTML = oxygen.value;
    document.getElementById("N").innerHTML = nitrogen.value;
    document.getElementById("Nnumber").innerHTML = nitrogen.value;
    MWvalue = parseFloat(12.0107*(carbon.value)+1.00784*(hydrogen.value)+15.999*(oxygen.value)+14.0067*(nitrogen.value)).toFixed(2);
    balanceEquation(carbon,hydrogen,oxygen,nitrogen,MWvalue);
    document.getElementById("MW").innerHTML = MWvalue;

    }

    hydrogen.onclick = function(){
    document.getElementById("C").innerHTML = carbon.value;
    document.getElementById("Cnumber").innerHTML = carbon.value;
    document.getElementById("H").innerHTML = hydrogen.value;
    document.getElementById("Hnumber").innerHTML = hydrogen.value;
    document.getElementById("O").innerHTML = oxygen.value;
    document.getElementById("Onumber").innerHTML = oxygen.value;
    document.getElementById("N").innerHTML = nitrogen.value;
    document.getElementById("Nnumber").innerHTML = nitrogen.value;;
    MWvalue = parseFloat(12.0107*(carbon.value)+1.00784*(hydrogen.value)+15.999*(oxygen.value)+14.0067*(nitrogen.value)).toFixed(2);
    balanceEquation(carbon,hydrogen,oxygen,nitrogen,MWvalue);
    document.getElementById("MW").innerHTML = MWvalue;
    }

    oxygen.onclick = function(){
    document.getElementById("C").innerHTML = carbon.value;
    document.getElementById("Cnumber").innerHTML = carbon.value;
    document.getElementById("H").innerHTML = hydrogen.value;
    document.getElementById("Hnumber").innerHTML = hydrogen.value;
    document.getElementById("O").innerHTML = oxygen.value;
    document.getElementById("Onumber").innerHTML = oxygen.value;
    document.getElementById("N").innerHTML = nitrogen.value;
    document.getElementById("Nnumber").innerHTML = nitrogen.value;
    MWvalue = parseFloat(12.0107*(carbon.value)+1.00784*(hydrogen.value)+15.999*(oxygen.value)+14.0067*(nitrogen.value)).toFixed(2);
    balanceEquation(carbon,hydrogen,oxygen,nitrogen,MWvalue);
    document.getElementById("MW").innerHTML = MWvalue;
    }

    nitrogen.onclick = function(){
    document.getElementById("C").innerHTML = carbon.value;
    document.getElementById("Cnumber").innerHTML = carbon.value;
    document.getElementById("H").innerHTML = hydrogen.value;
    document.getElementById("Hnumber").innerHTML = hydrogen.value;
    document.getElementById("O").innerHTML = oxygen.value;
    document.getElementById("Onumber").innerHTML = oxygen.value;
    document.getElementById("N").innerHTML = nitrogen.value;
    document.getElementById("Nnumber").innerHTML = nitrogen.value;
    MWvalue = parseFloat(12.0107*(carbon.value)+1.00784*(hydrogen.value)+15.999*(oxygen.value)+14.0067*(nitrogen.value)).toFixed(2);
    balanceEquation(carbon,hydrogen,oxygen,nitrogen, MWvalue);
    document.getElementById("MW").innerHTML = MWvalue;
    }

}