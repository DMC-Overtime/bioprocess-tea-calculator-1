function balanceEquation(chemical){

// Balances the following Equation 1 Glucose + oxygenCoeff * O2 + ammoniaCoeff* NH3 --> prodCoeff * Product + waterCoeff* H2O + co2Coeff * CO2
// where Product  =  C(carbon)H(hydrogen)O(oxygen)N(nitrogen)

    MWfeedstock = 180.156; // glucose


//Calculate Stoichiometry and theoretic Yield

    if (chemical.H2CO2ratio == 2) {
        equationType = "neutral";
        //1 C6H12O6 +  X NH3  → Y  CaHbOcNd+ Z H2O
        prodCoeff = 6/chemical.carbon;
        ammoniaCoeff = 6*(chemical.nitrogen/chemical.carbon);
        waterCoeff = 6-6*(chemical.oxygen/chemical.carbon);
        co2Coeff =0 ;
        oxygenCoeff =0 ;

    } else if (chemical.H2CO2ratio > 2){
        equationType = "reduced";
        //1 C6H12O6 +  W NH3 → X CaHbOcNd + Y H2O +  Z  CO2 
        value1 = chemical.carbon + 0.25*chemical.hydrogen - 0.5*chemical.oxygen - 0.75*chemical.nitrogen;
        prodCoeff = 6/value1;
        ammoniaCoeff = chemical.nitrogen*prodCoeff;
        waterCoeff = 6 + 1.5*chemical.nitrogen*prodCoeff - 0.5*chemical.hydrogen*prodCoeff;
        co2Coeff = 0.25*chemical.hydrogen*prodCoeff - 0.5*chemical.oxygen*prodCoeff - 0.75*chemical.nitrogen*prodCoeff;
        oxygenCoeff =0 ;

    } else { //(chemical.H2CO2ratio < 2)
        equationType = "oxidized";
        prodCoeff = 6/chemical.carbon;
        ammoniaCoeff = 6*(chemical.nitrogen/chemical.carbon);
        waterCoeff = 6 + 9*(chemical.nitrogen/chemical.carbon) - 3*(chemical.hydrogen/chemical.carbon);
        oxygenCoeff = 3*(chemical.oxygen/chemical.carbon) + 4.5*(chemical.nitrogen/chemical.carbon) -1.5*(chemical.hydrogen/chemical.carbon);
        co2Coeff =0 ;
    }

    prodCoeff = prodCoeff.toFixed(2);
    oxygenCoeff = oxygenCoeff.toFixed(2);
    ammoniaCoeff = ammoniaCoeff.toFixed(2);
    waterCoeff = waterCoeff .toFixed(2);
    co2Coeff = co2Coeff.toFixed(2);
    theorYield = (chemical.MW*prodCoeff/MWfeedstock).toFixed(3);
    productYieldCoefficientNH3 = ((chemical.MW*prodCoeff)/(ammoniaCoeff*17.031)).toFixed(4);
    productYieldCoefficientO2 = ((chemical.MW*prodCoeff)/(oxygenCoeff*32)).toFixed(4);

     // Output
     var myChemicalEquation = new chemicalEquation(prodCoeff,oxygenCoeff, ammoniaCoeff,waterCoeff,co2Coeff,theorYield,productYieldCoefficientNH3,productYieldCoefficientO2);

     return myChemicalEquation;

}