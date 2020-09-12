function calcH2CO2ratio(chemical){
     H2CO2ratio =  0.5*(chemical.hydrogen/chemical.carbon)-1*(chemical.oxygen/chemical.carbon)-1.5*(chemical.nitrogen/chemical.carbon)+2;
     return H2CO2ratio;
}