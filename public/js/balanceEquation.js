function balanceEquation(carbon,hydrogen,oxygen,nitrogen, MWvalue){


    MWfeedstock = 180.156; // glucose
    carbon_value = Number(carbon.value);
    hydrogen_value = Number(hydrogen.value);
    oxygen_value = Number(oxygen.value);
    nitrogen_value = Number(nitrogen.value);


  
//Calculate Stoichiometry and theoretic Yield
  H2CO2_ratio =  0.5*(hydrogen_value/carbon_value)-1*(oxygen_value/carbon_value)-1.5*(nitrogen_value/carbon_value)+2;

    if (H2CO2_ratio == 2) {
        equationType = "neutral";
        //1 C6H12O6 +  X NH3  → Y  CaHbOcNd+ Z H2O
        prodCoeff = 6/carbon_value;
        ammoniaCoeff = 6*(nitrogen_value/carbon_value);
        waterCoeff = 6-6*(oxygen_value/carbon_value);
        co2Coeff =0 ;
        oxygenCoeff =0 ;

    } else if (H2CO2_ratio > 2){
        equationType = "reduced";
        //1 C6H12O6 +  W NH3 → X CaHbOcNd + Y H2O +  Z  CO2 
        value1 = carbon_value + 0.25*hydrogen_value - 0.5*oxygen_value - 0.75*nitrogen_value;
        prodCoeff = 6/value1;
        ammoniaCoeff = nitrogen_value*prodCoeff;
        waterCoeff = 6 + 1.5*nitrogen_value*prodCoeff - 0.5*hydrogen_value*prodCoeff;
        co2Coeff = 0.25*hydrogen_value*prodCoeff - 0.5*oxygen_value*prodCoeff - 0.75*nitrogen_value*prodCoeff;
        oxygenCoeff =0 ;

    } else { //(H2CO2_ratio < 2)
        equationType = "oxidized";
        prodCoeff = 6/carbon_value;
        ammoniaCoeff = 6*(nitrogen_value/carbon_value);
        waterCoeff = 6 + 9*(nitrogen_value/carbon_value) - 3*(hydrogen_value/carbon_value);
        oxygenCoeff = 3*(oxygen_value/carbon_value) + 4.5*(nitrogen_value/carbon_value) -1.5*(hydrogen_value/carbon_value);
        co2Coeff =0 ;
    }

    theorYield = (MWvalue*prodCoeff/MWfeedstock).toFixed(3);
    chemistryOutputs = [equationType,prodCoeff,ammoniaCoeff,oxygenCoeff,co2Coeff,waterCoeff, theorYield];
    document.getElementById("A").innerHTML = 1 ; // Glucose coefficient
    document.getElementById("B").innerHTML = chemistryOutputs[2].toFixed(2); // NH3 coefficient
    document.getElementById("D").innerHTML = chemistryOutputs[3].toFixed(2); // O2 coefficient ( C is already used)
    document.getElementById("E").innerHTML = chemistryOutputs[1].toFixed(2);  // Product coefficient ( C is already used)
    document.getElementById("F").innerHTML = chemistryOutputs[5].toFixed(2); // Water coefficient ( C is already used)
    document.getElementById("G").innerHTML = chemistryOutputs[4].toFixed(2); // CO2 coefficient ( C is already used)
    document.getElementById("theorYield").innerHTML = theorYield;
    return chemistryOutputs;
    
    
}