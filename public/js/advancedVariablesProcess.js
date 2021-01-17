function advancedVariablesProcess(){
//Advanced Variables

const AVP = { };

 // Advanced Inputs Conversion/Cell
    AVP.AmmoniaSourceMW = 17.031; //(g/mole) for NH3

// Inputs for E. coli
// E. coli(C-3.85 H-6.69 O-1.78 N-1)
    AVP.MicrobeMW=  95.37; // (g/mole) for E. coli
    AVP.FeedstockMW = 180.156; // (g/mole) for glucose
    AVP.biomassYieldCoefficientGlucose = (AVP.MicrobeMW)/(0.84*AVP.FeedstockMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    AVP.biomassYieldCoefficientNH3 = (AVP.MicrobeMW)/(1*AVP.AmmoniaSourceMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    AVP.biomassYieldCoefficientO2 = (AVP.MicrobeMW)/(1.212*32); // g biomass/g O2 based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    AVP.BiomassYieldFraction = 0.80; // the actual biomass yield as a fraction of theoretical maximal biomass yield


//Byproduct

    AVP.byproductYieldCoefficientO2 = (AVP.FeedstockMW)/(6*32); // g glucose consumed /g O2 for byproduct, based on ideal formula 1 Glucose + 6  O2 --> 6 H2O + 6 CO2

//Advanced Inputs Main Fermentation
    AVP.inoculationFraction = 0.01; // fraction of volume at final biomass concentration used to inoculate production fermenters
    AVP.workingVolumeRatio = 0.85; // (L working volume)/(L gross volume)
    AVP.FermenterAspectRatio = 3.0; //
    AVP.NaOHCosts = 0.15; // $/kg, based on $150/tonne https://yosemite.epa.gov/sab/sabproduct.nsf/953CCBEB820F0470852577920076316D/$File/NaOH+Practicality+Study.pdf
    AVP.PeraceticAcidCosts = 5; //$/L for CIP % solution
    AVP.sedimentationVelocity = 1; //$/L for CIP % solution

//Centrifugation
     //Sigma = Flow rate /2uo
     AVP.centrifugeSigma = 200000; //  m2 If you change the Sigma factor you may need change Capital assumptions/costs (advancedVariablesProcess.js)
     AVP.uo =0.00000000681; // m/s sedimentation velocity for bacteria, ie E. coli
     // AVP.uo = 0.000000108; // m/s sedimentation velocity for yeast ie S cerevesia
     centrifugeFlowRate =  AVP.centrifugeSigma*2*AVP.uo; // flow rate in  m3/s
     AVP.centrifugeFlowRate = centrifugeFlowRate*(60*60*1000);  // convert to L/hour
     AVP.centrifugeUptime = 0.80*365*24; // hrs per year 80% uptime

// Additional Opex Assumptions
    AVP.annualLaborCosts_F = 1.13*203923; // annualLaborCosts = Inflation factor*203923*numberOfTanks; (includes overhead labor uses cost per tank (NREL2010))x inflation factor);//
    AVP.annualAdditionalFixedCosts_F = 1.13*0.037; // annualAdditionalFixedCosts = Inflation factor*annualAdditionalFixedCosts_F*(totalDirectCost); // (per NREL2010 x inflation factor); //

    return AVP;

  }