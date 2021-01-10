   function dsCentrifugeDesign(totalVolume,CentrifugeFlowRate,uo){
   
    // Primary Cell Removal (Centrifugation) Calculations 
    // Sigma = Q/2uo 
    CentrifugeFlowRate = 10000; //L/hour = 10m3/hr = 0.0028 m3/s) doable with disc stacked centrifuge
    annualCentrifugeVolume = totalAnnualFermWorkingVolume; // Liters
    hoursOfCentrifugationRequired = annualCentrifugeVolume/10000;
    numberOfCentrifuges = Math.ceil(hoursOfCentrifugationRequired/annualUpTime);
    actualAnnualCentrifugeUptime = annualCentrifugeVolume/(numberOfCentrifuges*CentrifugeFlowRate)
    powerConsumptionPerCentrifuge = 3.0 ;// kW  https://onlinelibrary.wiley.com/doi/10.1002/ceat.201800292
    annualCostOfCentrifugation = numberOfCentrifuges*powerConsumptionPerCentrifuge*actualAnnualCentrifugeUptime*ElectricityCost;// $/year
    
    }