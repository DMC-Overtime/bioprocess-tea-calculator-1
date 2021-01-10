//Advanced Variables

 // Advanced Inputs
    AmmoniaSourceMW = 17.031;//(g/mole) for NH3
    MicrobeMW  =  95.37; // (g/mole) for E. coli
    FeedstockMW = 180.156; // (g/mole) for glucose
    biomassYieldCoefficientGlucose = (MicrobeMW)/(0.84*FeedstockMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    biomassYieldCoefficientNH3 = (MicrobeMW)/(1*AmmoniaSourceMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    biomassYieldCoefficientO2 = (MicrobeMW)/(1.212*32); // g biomass/g O2 based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    byproductYieldCoefficientO2 = (FeedstockMW)/(6*32); // g glucose consumed /g O2 for byproduct, based on ideal formula 1 Glucose + 6  O2 --> 6 H2O + 6 CO2
    inoculationFraction = 0.01; // fraction of volume at final biomass concentration used to inoculate production fermenters
    workingVolumeRatio = 0.85; // (L working volume)/(L gross volume)
    BiomassYieldFraction = 0.80; // the actual biomass yield as a fraction of theoretical maximal biomass yield
    FermenterAspectRatio = 3.0; //
    NaOHCosts = 0.15; // $/kg, based on $150/tonne https://yosemite.epa.gov/sab/sabproduct.nsf/953CCBEB820F0470852577920076316D/$File/NaOH+Practicality+Study.pdf
    PeraceticAcidCosts = 5; //$/L for CIP % solution

// Inflation Factors
    PI_2009_2020 = 1.17; // 2009-2020 Producers inflation = 1.17
    PI_2013_2020 = 1.00; // 2013-2020 Producers inflation = 1.00
    PI_2014_2020 = 1.03; // 2014-2020 Producers inflation = 1.03
    PI_2010_2020 = 1.13; // 2010-2020 Producers inflation = 1.13
    PI_2017_2020 = 1.06; // 2010-2020 Producers inflation = 1.06

// Additional Opex Assumptions
    annualLaborCosts_F = 203923; // annualLaborCosts = Inflation factor*203923*numberOfTanks; (includes overhead labor uses cost per tank (NREL2010))x inflation factor);//
    annualAdditionalFixedCosts_F = 0.037; // annualAdditionalFixedCosts = Inflation factor*annualAdditionalFixedCosts_F*(totalDirectCost); // (per NREL2010 x inflation factor); //

// Major Equipment Factors
// For all major equipment
// purchase cost  = (# of units)* Quoted Cost *(Actual Size / Quoted Size)^ Scaling Factor
// TIC = (Inflation Factor)(purchase cost)(Installation Factor)

    Fermenter_SF = 0.5; // Fermenter Scaling Factor
    Fermenter_IF = 2.0; //  Fermenter Installation Factor
    Agitator_SF = 0.5; // Agitator Scaling Factor
    Agitator_IF = 1.5; //  Agitator Installation Factor
    maxBlowerFlowRate = 23.6; //Maximum air flow (m3/s) from a single blower (Seider, Seader, and Lewin 2016)
    airBlower_SF = 0.6; //  Air Blower Scaling Factor
    airBlower_IF = 1.6; //  Air Blower Installation Factor
    TransferPumps_SF = 0.8; //  Transfer Pump Scaling Factor
    TransferPumps_IF = 2.3; //  Transfer Pump Installation Factor
    BrothStorageTank_SF = 0.7; //  Broth Storage Tank Scaling Factor
    BrothStorageTank_IF= 1.8; //  Broth Storage Tank Installation Factor
    SeedFraction = 0.27; // The Seed train capital costs are modelled as a fraction of the production train costs.
    GlucoseStorageTank_SF = 0.7; // Agitated Glucose Storage Tank Scaling Factor
    GlucoseStorageTank_IF= 2.6; //  Agitated Storage Tank Installation Factor
    AgitatedMediaPrepTank_SF = 0.7; // Agitated Media Prep Tank Scaling Factor
    AgitatedMediaPrepTank_IF= 2.6; //  Agitated Media Prep Tank Installation Factor
    AmmoniaStorageTank_SF = 0.7; // Ammonia Storage Tank Scaling Factor
    AmmoniaStorageTank_IF= 2.0; //  Ammonia Storage TankTank Installation Factor
    CausticStorageTank_SF = 0.7; // Caustic Storage Tank Scaling Factor
    CausticStorageTank_IF= 2.0; //  Caustic Storage TankTank Installation Factor
    AcidStorageTank_SF = 0.7; // Acid Storage Tank Scaling Factor
    AcidStorageTank_IF= 2.0; //  Acid  Storage TankTank Installation Factor

// Other Capital Cost Factors

    HomeOffice_F = 0.2;  //  HomeOffice = HomeOffice_F*totalDirectCost;  Engineering &  https://www.sciencedirect.com/topics/engineering/minimum-ethanol-selling-price
    prorateableExpenses_F = 0.1; // prorateableExpenses = prorateableExpenses_F*totalDirectCost;
    fieldExpenses_F = 0.1; //fieldExpenses  = fieldExpenses_F*totalDirectCost;
    projectContingency_F = 0.2; // projectContingency = projectContingency_F*totalDirectCost;
    otherStartupCosts_F = 0.1; // otherStartupCosts = otherStartupCosts_F*totalDirectCost;  permitting etc.
    // totalIndirectCosts = otherStartupCosts + projectContingency +HomeOffice +fieldExpenses  + prorateableExpenses ;
    //fixedCapitalInvestment = totalDirectCost + totalIndirectCosts;
    workingCapital_F = 0.05; // workingCapital = workingCapital_F*fixedCapitalInvestment;
    realEstate_F = 0.06; // =realEstate= realEstate_F*fixedCapitalInvestment;
    // totaCapitalInvestment  = fixedCapitalInvestment + workingCapital + realEstate;

// Advanced Financial Variables
    yearsInConstruction = 2;
    fractionCapitalSpentYearOne = 0.7;
    fractionCapitalSpentYearTwo = 0.3;
    bookDepreciationPeriod = 10;  // years
    ongoingCapitalReinvestmentRate = 0.01;// fraction of TCI
    yearsToRampToFullProduction = 3;// years

// Working capital Assumptions
    accountsReceivableDelay = 45; // days
    inventoryHoldingPeriod = 60; //days
    accountsPayableDelay = 30; // days (currently groups paychecks and raw materials)

