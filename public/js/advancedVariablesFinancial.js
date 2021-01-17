function advancedVariablesFinancial(){

const AVF = { };
//Advanced Variables
    AVF.yearsInConstruction = 2;
    AVF.fractionCapitalSpentYearOne = 0.7;
    AVF.fractionCapitalSpentYearTwo = 0.3;
    AVF.bookDepreciationPeriod = 10; // years
    AVF.ongoingCapitalReinvestmentRate = 0.01;// fraction of TCI
    AVF.yearsToRampToFullProduction = 3;// years
    AVF.accountsReceivableDelay = 45; // days
    AVF.inventoryHoldingPeriod = 60; //days
    AVF.accountsPayableDelay = 30; // days (currently groups paychecks and raw materials)
    
     return AVF;

    }