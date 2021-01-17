function advancedVariablesCapital(){
//Advanced Variables

const AVC = { };

// Inflation Factors
    AVC.PI1998_INF  = 1.59; // 1998-2020 Producers inflation = 1.59
    AVC.PI2002_INF  = 1.6; // 2002-2020 Producers inflation = 1.6
    AVC.PI2009_INF  = 1.17; // 2009-2020 Producers inflation = 1.17
    AVC.PI2013_INF = 1.00; // 2013-2020 Producers inflation = 1.00
    AVC.PI2014_INF= 1.03; // 2014-2020 Producers inflation = 1.03
    AVC.PI2010_INF = 1.12; // 2010-2020 Producers inflation = 1.12
    AVC.PI2017_INF = 1.06; // 2010-2020 Producers inflation = 1.06


// Scaling and Installation Factors
// For all major equipment
// purchase cost  = (# of units)* Quoted Cost *(Actual Size / Quoted Size)^ Scaling Factor (_SF)
// TIC = (Inflation factor _INF)(purchase cost)(Installation Factor (_IF))

// Main Fermenters
    AVC.Fermenter_quotesize = 76000; //L size estimated  %% NREL 2013, quote year 2010
    AVC.Fermenter_quote = AVC.PI2010_INF*176000; // $ estimate cost   %% NREL 2013, quote year 2010
    AVC.Fermenter_SF = 0.7; // Fermenter Scaling Factor
    AVC.Fermenter_IF = 2.0; //  Fermenter Installation Factor
    AVC.fermentationCoolersCost =0; //Included in Fermenter Cost
    AVC.fermentationCoolersTIC =0; //Included in Fermenter Cost
 AVC.Agitator_quotesize = 75708; //size estimated  %% NREL 2013, quote year 2010
    AVC.Agitator_quote = AVC.PI2010_INF*36000; // $ estimate cost   %% NREL 2013, quote year 2010
    AVC.Agitator_SF = 0.5; // Agitator Scaling Factor
    AVC.Agitator_IF = 1.5; //  Agitator Installation Factor

// Area 100: Seed Fermenter Area
    AVC.seed_F = 0.27; // Fraction of main fermentation equipment costs estiamted for seed train

//Air Storage/Prep Tanks

    AVC.GlucoseStorageTank_quotesize = 264978; //L size estimated  %% NREL 2013, quote year 2009
    AVC.GlucoseStorageTank_hold_time = 12; // holds 12 hrs of feed
    AVC.GlucoseStorageTank_quote = AVC.PI2009_INF*70000; // $ estimate cost   %% NREL 2013, quote year 2010
    AVC.GlucoseStorageTank_SF = 0.7; // Agitated Glucose Storage Tank Scaling Factor
    AVC.GlucoseStorageTank_IF= 2.6; //  Agitated Storage Tank Installation Factor

    AVC.AmmoniaStorageTank_quotesize = 105991; //L size estimated  %% NREL 2013, quote year 2010
    AVC.AmmoniaStorageTank_hold_time = 12; // holds 12 hrs of feed
    AVC.AmmoniaStorageTank_quote = AVC.PI2010_INF*96000; // $ estimate cost   %% NREL 2013, quote year 2010
    AVC.AmmoniaStorageTank_SF = 0.7; // Ammonia Storage Tank Scaling Factor
    AVC.AmmoniaStorageTank_IF= 2.0; //  Ammonia Storage TankTank Installation Factor

    AVC.AcidStorageTank_quotesize = 45000; //L size estimated  %% NREL 2013, quote year 2010
    AVC.AcidStorageTank_hold_time = 12; // holds 12 hrs of feed
    AVC.AcidStorageTank_quote = AVC.PI2010_INF*96000; // $ estimate cost   %% NREL 2013, quote year 2010
    AVC.AcidStorageTank_SF = 0.7; // Acid Storage Tank Scaling Factor
    AVC.AcidStorageTank_IF= 2.0; //  Acid  Storage TankTank Installation Factor

    AVC.AgitatedMediaPrepTank_quotesize = 264978; //L size estimated  %% NREL 2013, quote year 2010
    AVC.AgitatedMediaPrepTank_hold_time = 12; // holds 12 hrs of feed
    AVC.AgitatedMediaPrepTank_quote = AVC.PI2010_INF*91200; // $ estimate cost  %% NREL 2013, quote year 2010
    AVC.AgitatedMediaPrepTank_SF = 0.7; // Agitated Media Prep Tank Scaling Factor
    AVC.AgitatedMediaPrepTank_IF= 2.6; //  Agitated Media Prep Tank Installation Factor

    AVC.DryChemicalAddition = 100000; // $ Lynch Estiamte 2020
    AVC.DryChemicalAddition_IF =2; //Lynch Estiamte 2020

//Transfer Pumps

AVC.TransferPumps_quotesize = 950000; //size estimated  %% NREL 2013, quote year 2009
    AVC.TransferPumps_quote = AVC.PI2009_INF*3933; // $ estimate cost   %% NREL 2013, quote year 2009
    AVC.TransferPumps_SF = 0.8; //  Transfer Pump Scaling Factor
    AVC.TransferPumps_IF = 2.3; //  Transfer Pump Installation Factor

// CIP
    AVC.CIPvesselSize = 0.01; // Fraction of main fermenter size for each CIP Tanks
    AVC.CIPvesselquotesize = 105991; //L
    AVC.CIPvesselquote = AVC.PI2010_INF*98000; //$
    AVC.CIPvessel_SF = 0.7; // Scaling Factor
    AVC.CIPvessel_IF = 1.8; //  Installation Factor
    AVC.CIPFilterCost = 35000; // $ 2020 Estimate Lynch
    AVC.CIPFilterCost_IF = 1.8; // 2020 Estimate Lynch
    AVC.CIPHeaterCost = 30000;// $ 2020 Estimate Lynch
    AVC.CIPHeaterCost_IF = 1.8; // 2020 Estimate Lynch

// Broth Clarification & Storage

    // cost of 200,000 m2 Cenrifuge is ~$300,000, 1998 https://www.cheric.org/files/education/cyberlecture/d200301/d200301-1801.pdf
    AVC.CentrifugeCost = AVC.PI1998_INF*300000;// $
    AVC.CentrifugeCost_IF = 1.8;
    AVC.brothStorageTankSize = 0.5; // Fraction of main fermenter size for each CIP Tanks
    AVC.brothStorageTankquotesize = 4542000; //L
    AVC.brothStorageTankquote = AVC.PI2010_INF*1317000; //$ NREL 2013
    AVC.brothStorageTank_SF = 0.7; // Scaling Factor
    AVC.brothStorageTank_IF = 1.8; //  Installation Factor

// Process Utilities

    AVC.coolingTowerEquipquotesize = 44200; //gpm
    AVC.coolingTowerEquipquote = AVC.PI2010_INF*1375000; // $/ton NREL 2011
    AVC.coolingTowerEquip_IF = 1.5;
    AVC.coolingTowerEquip_SF = 0.6;
    AVC.coolingTowerPumpsquotesize = 16120; //gpm
    AVC.coolingTowerPumpsquote = AVC.PI2010_INF*283671; // NREL 2010
    AVC.coolingTowerPumps_IF = 3.1;
    AVC.coolingTowerPumps_SF = 0.8;
    AVC.BoilerPackageCostsquotesize = 10000;// steam rate (lb/hr) // https://www.osti.gov/servlets/purl/797810/
    AVC.BoilerPackageCostsquote = AVC.PI2002_INF*100000; // $
    AVC.BoilerPackageCosts_SF = 0.6;
    AVC.BoilerPackageCosts_SF = 1,8;
    AVC.AirReceiverquotesize = 25000;//
    AVC.AirReceiverquote = AVC.PI2010_INF*104600;//NREL 2010
    AVC.AirReceiver_SF= 1;
    AVC.AirReceiver_IF= 2;
    AVC.AirCompressorquotesize = 25000; //scfm  NREL https://www.nrel.gov/docs/fy19osti/71949.pdf
    AVC.AirCompressorquote = AVC.PI2014_INF*1318600; // $
    AVC.AirCompressor_SF = 0.8;
    AVC.AirCompressor_IF = 1.6;
AVC.AirDryerquotesize = 83333; //
    AVC.AirDryerquote = AVC.PI2009_INF*15000; // $
    AVC.AirDryer_SF = 0.6;
    AVC.AirDryer_IF = 1.8;
AVC.MunicipalWaterTankquotesize =  451555; // Kgperhr
    AVC.MunicipalWaterTankquote =  AVC.PI2009_INF*250000; // L
    AVC.MunicipalWaterTank_SF = 0.6;
    AVC.MunicipalWaterTank_IF = 1.7;
    AVC.MunicipalWaterPumpquotesize =  518924; // Kgperhr
    AVC.MunicipalWaterPumpquote =  AVC.PI2009_INF*(15292+6864); // L
    AVC.MunicipalWaterPump_SF = 0.6;
    AVC.MunicipalWaterPump_IF = 3.1;
    AVC.SoftenerSystemquotesize =  235803; // kgperhr
    AVC.SoftenerSystemquote = AVC.PI2009_INF*78000; //$ NREL 2010
    AVC.SoftenerSystem_SF = 0.6;
    AVC.SoftenerSystem_IF = 1.8;
    AVC.PotableWaterTankquote = 50000// $ Lynch 2020 Estimate
    AVC.PotableWaterTank_IF = 1.7;
    AVC.PotableWaterCoolerquote = 25000; // $ Lynch 2020 Estimate
    AVC.PotableWaterCooler_IF = 1.7; //$ Lynch 2020 Estimate
AVC.WasteWaterTankquotesize  = 4542000; //
    AVC.WasteWaterTankquote  = 1317000; // $ 2020 estimate
    AVC.WasteWaterTank_SF =0.7;
    AVC.WasteWaterTank_IF = 1.8;
    AVC.HeatKillExchangerquotesize = 140;// area m2
    AVC.HeatKillExchangerquote = AVC.PI1998_INF*15000;
    AVC.HeatKillExchanger_SF = 0.5;
    AVC.HeatKillExchanger_IF = 3.1;
    AVC.MediaHeatExchangerquotesize = 140;// area m2
    AVC.MediaHeatExchangerquote = AVC.PI1998_INF*15000;
    AVC.MediaHeatExchanger_SF = 0.5;
    AVC.MediaHeatExchanger_IF = 3.1;


 // Additional Equipment
    AVC.controlSystem_F = 0.10; // Fraction of TIC estimated for process control systems
    AVC.piping_F = 0.045; // Fraction of TIC estimated for piping for each unit operatio

// Other Capital Cost Factors

    AVC.HomeOffice_F = 0.2;  //  HomeOffice = HomeOffice_F*totalDirectCost;  Engineering &  https://www.sciencedirect.com/topics/engineering/minimum-ethanol-selling-price
    AVC.prorateableExpenses_F = 0.1; // prorateableExpenses = prorateableExpenses_F*totalDirectCost;
    AVC.fieldExpenses_F = 0.1; //fieldExpenses  = fieldExpenses_F*totalDirectCost;
    AVC.projectContingency_F = 0.2; // projectContingency = projectContingency_F*totalDirectCost;
    AVC.otherStartupCosts_F = 0.1; // otherStartupCosts = otherStartupCosts_F*totalDirectCost;  permitting etc.
    AVC.workingCapital_F = 0.05; // workingCapital = workingCapital_F*fixedCapitalInvestment;
    AVC.realEstate_F = 0.06; // =realEstate= realEstate_F*fixedCapitalInvestment;
    AVC.siteDevelopment_F = 0.09; // fraction of TIC estimated for site development
    AVC.warehousing_F = 0.04; // fraction of TIC estimated for warehousing
    AVC.administrativeBuildings_F = 0.05; // fraction of TIC estimated for administrative Buildings

    return AVC;

    }