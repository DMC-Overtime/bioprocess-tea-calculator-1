  function UpdateChemical() {

   const myChemical = new chemical();

   // Define Starting Chemical Product from Page Input
    myChemical.name = document.getElementById("ChemicalName").value;
    document.getElementById("ChemicalName1").innerHTML = myChemical.name;
    document.getElementById("ChemicalName2").innerHTML = myChemical.name;
    myChemical.carbon = parseFloat(document.getElementById("C").value);
    document.getElementById("Cnumber").innerHTML = myChemical.carbon;
    myChemical.hydrogen = parseFloat(document.getElementById("H").value);
    document.getElementById("Hnumber").innerHTML = myChemical.hydrogen;
    myChemical.oxygen = parseFloat(document.getElementById("O").value);
    document.getElementById("Onumber").innerHTML = myChemical.oxygen;
    myChemical.nitrogen = parseFloat(document.getElementById("N").value);
    document.getElementById("Nnumber").innerHTML = myChemical.nitrogen;
    myChemical.MW = calcMW(myChemical);
    myChemical.H2CO2ratio = calcH2CO2ratio(myChemical);
    myChemical.formula = calcFormula(myChemical);
    document.getElementById("MW").innerHTML = myChemical.MW;
    myChemicalEquation = UpdateChemicalEquation(myChemical);

   // Update Chemical Product Name with User Input
   var textInput1 = document.getElementById("ChemicalName");
   textInput1.onkeyup= function() {
   document.getElementById("ChemicalName1").innerHTML = textInput1.value;
   document.getElementById("ChemicalName2").innerHTML = textInput1.value;
   }


   // Update Chemical Product Info on User Input

    carbon = document.getElementById("C");
    hydrogen = document.getElementById("H");
    oxygen = document.getElementById("O");
    nitrogen = document.getElementById("N");

    carbon.onchange = function(){
    document.getElementById("C").innerHTML = carbon.value;
    document.getElementById("Cnumber").innerHTML = carbon.value;
    myChemical.carbon = parseFloat(document.getElementById("C").value);
    myChemical.MW = calcMW(myChemical);
    myChemical.H2CO2ratio = calcH2CO2ratio(myChemical);
    myChemical.formula = calcFormula(myChemical);
    document.getElementById("MW").innerHTML = myChemical.MW;
    myChemicalEquation = UpdateChemicalEquation(myChemical);
    }

    hydrogen.onchange = function(){
    document.getElementById("H").innerHTML = hydrogen.value;
    document.getElementById("Hnumber").innerHTML = hydrogen.value;
    myChemical.hydrogen = parseFloat(document.getElementById("H").value);
    myChemical.MW = calcMW(myChemical);
    myChemical.H2CO2ratio = calcH2CO2ratio(myChemical);
    myChemical.formula = calcFormula(myChemical);
    document.getElementById("MW").innerHTML = myChemical.MW;
    myChemicalEquation = UpdateChemicalEquation(myChemical);
    }

    oxygen.onchange = function(){
    document.getElementById("O").innerHTML = oxygen.value;
    document.getElementById("Onumber").innerHTML = oxygen.value;
    myChemical.oxygen = parseFloat(document.getElementById("O").value);
    myChemical.MW = calcMW(myChemical);
    myChemical.H2CO2ratio = calcH2CO2ratio(myChemical);
    myChemical.formula = calcFormula(myChemical);
    document.getElementById("MW").innerHTML = myChemical.MW;
    myChemicalEquation = UpdateChemicalEquation(myChemical);
    }

    nitrogen.onchange = function(){
    document.getElementById("N").innerHTML = nitrogen.value;
    document.getElementById("Nnumber").innerHTML = nitrogen.value;
    myChemical.nitrogen = parseFloat(document.getElementById("N").value);
    myChemical.MW = calcMW(myChemical);
    myChemical.H2CO2ratio = calcH2CO2ratio(myChemical);
    myChemical.formula = calcFormula(myChemical);
    document.getElementById("MW").innerHTML = myChemical.MW;
    myChemicalEquation = UpdateChemicalEquation(myChemical);
    }

    return myChemical;
}

