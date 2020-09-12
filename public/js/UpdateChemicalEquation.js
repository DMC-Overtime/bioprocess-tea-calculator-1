  function UpdateChemicalEquation(myChemical) {

   MWfeedstock= 180.156; //glucose

   myChemicalEquation = new chemicalEquation();
   myChemicalEquation = balanceEquation(myChemical);
   document.getElementById("theorYield").innerHTML = myChemicalEquation.theorYield;
   document.getElementById("B").innerHTML = myChemicalEquation.ammoniaCoeff;
   document.getElementById("D").innerHTML = myChemicalEquation.oxygenCoeff;
   document.getElementById("E").innerHTML = myChemicalEquation.prodCoeff;
   document.getElementById("F").innerHTML = myChemicalEquation.waterCoeff;
   document.getElementById("G").innerHTML = myChemicalEquation.co2Coeff;

   return myChemicalEquation;
}