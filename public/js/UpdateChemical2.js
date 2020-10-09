  function UpdateChemical2(ChemicalArray) {

   const myChemical = new chemical();

   // Define Starting Chemical Product from Page Input
    myChemical.name = Name
    myChemical.carbon = ChemicalArray[0];
    myChemical.hydrogen = ChemicalArray[1];
    myChemical.oxygen = ChemicalArray[2];
    myChemical.nitrogen = ChemicalArray[3];
    myChemical.MW = calcMW(myChemical);
    myChemical.H2CO2ratio = calcH2CO2ratio(myChemical);
    myChemical.formula = calcFormula(myChemical);
    document.getElementById("MW").innerHTML = myChemical.MW;

    myChemical.MW = calcMW(myChemical);
    myChemical.H2CO2ratio = calcH2CO2ratio(myChemical);
    myChemical.formula = calcFormula(myChemical);
    myChemicalEquation = balanceEquation(myChemical);

    return myChemicalEquation;
}
