
//Petro Inputs
//0.5784132841	-0.06841328413	$665,883,280.76	750000000
sellingPrice = 0.51;
opexperkg = 0.5784132841	;
TCI = 665883280;
capacity = 750000000;

    DCFOutput = PetroDCF(sellingPrice,opexperkg,TCI,capacity);
    IRR = ((DCFOutput.IRR)*100).toFixed(2);
    console.log('IRR: ' + IRR);


function PetroDCF(sellingPrice,opexperkg,TCI,capacity){

//Inputs from User Input
// Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];



    //Inputs from User Input
       margin = 0.20;
       paybackPeriod = 20;
       discountRate  = 0.20;
       taxRate = 0.21;
       fractionDebtFinance  = 0.60;
       debtInterest  = 0.08;
       debtTerm = 15;

    //Inputs calculated from user inputs using BioprocessOpexCapex.js
    annualOpex = opexperkg*capacity;// $
    opexperkg = opexperkg; // $/kg
    totalInitialCapitalInvestment = TCI;  // $
    capexperkg = totalInitialCapitalInvestment/capacity;  // $
    plantCapacity= capacity;

    // Advanced Financial Variables
    fractionEquityFinance = 1-fractionDebtFinance;
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


    totalFinanced = fractionDebtFinance*totalInitialCapitalInvestment;

    // Expenses
    // Capital spending
    InitialCapitalInvestment=[];
    for (let projectYear=0; projectYear < paybackPeriod; projectYear ++){
        if (projectYear  == 0){
            InitialCapitalInvestment[projectYear] = fractionCapitalSpentYearOne*totalInitialCapitalInvestment;
        }else if (projectYear  == 1){
            InitialCapitalInvestment[projectYear] = fractionCapitalSpentYearTwo*totalInitialCapitalInvestment;
        }else {
            InitialCapitalInvestment[projectYear] = 0;
        }
    }

    // Ongoing Capital & Total Capital
    ongoingCapitalInvestment=[]
    totalCapitalInvestment =[];
    for (let projectYear=0; projectYear < paybackPeriod; projectYear++){
        if (projectYear== 0){
            ongoingCapitalInvestment[projectYear] = 0;
            totalCapitalInvestment[projectYear] = InitialCapitalInvestment[projectYear];
        }else if (projectYear == 1){
            ongoingCapitalInvestment[projectYear] = 0;
            totalCapitalInvestment[projectYear] = InitialCapitalInvestment[projectYear];
        }else {
            ongoingCapitalInvestment[projectYear] = ongoingCapitalReinvestmentRate*totalInitialCapitalInvestment;
            totalCapitalInvestment[projectYear] = ongoingCapitalInvestment[projectYear]+InitialCapitalInvestment[projectYear];
        }

    }
//Depreciation
    depreciationYear = yearsInConstruction +bookDepreciationPeriod;

// Depreciation of Initial Investment
   initialTCIDepreciation =[];
   for (let projectYear=0; projectYear < paybackPeriod; projectYear++){
        if (projectYear <  yearsInConstruction){
            initialTCIDepreciation[projectYear] =0;
        }else if(projectYear >= yearsInConstruction && projectYear < depreciationYear){
            initialTCIDepreciation[projectYear] =totalInitialCapitalInvestment/bookDepreciationPeriod;
        }else{
            initialTCIDepreciation[projectYear] = 0;
        }
    }

// Depreciation of Ongoing Investment
    ongoingCapitalDepreciation =[];
    for (let projectYear =0; projectYear  < paybackPeriod; projectYear ++){
         if (projectYear <  yearsInConstruction){
              ongoingCapitalDepreciation[projectYear ] =0;
         }else{
              ongoingCapitalDepreciation[projectYear] = ongoingCapitalReinvestmentRate*totalInitialCapitalInvestment;
         }
    }

// Total Depreciation
    totalDepreciation=[];
    for (let projectYear =0; projectYear  < paybackPeriod; projectYear ++){
    totalDepreciation[projectYear] = initialTCIDepreciation[projectYear] +ongoingCapitalDepreciation[projectYear];
    }

// Operating Costs
      Opex=[];
       for(let projectYear=0; projectYear < paybackPeriod; projectYear++){
         if (projectYear < yearsInConstruction){
               Opex[projectYear] =0;
         }else{
               Opex[projectYear] =annualOpex;
         }

        }

// Loan Payments
    interestPayment =[];
    principalPayment =[];
    annualLoanPayments =[];
    annualLoanPayments =[];

    TotalLoanPrinc = fractionDebtFinance*totalInitialCapitalInvestment;
    interestPayment[0] = fractionCapitalSpentYearOne*TotalLoanPrinc*debtInterest;
    principalPayment[0] = 0;
    interestPayment[1] = TotalLoanPrinc*debtInterest;
    principalPayment[1] = 0;
    annualLoanPayments[0] = interestPayment[0];
    annualLoanPayments[1] = interestPayment[1];
    loanTerm = debtTerm-2;
    LoanOutput =calculateLoanPayments(TotalLoanPrinc,debtInterest,loanTerm);
    annualInterest = LoanOutput.annualInterest;
    annualPrincipal = LoanOutput.annualPrincipal;
    annualPrincipal2 =[];

    for (let projectYear =2; projectYear<paybackPeriod; projectYear++){
        if(projectYear < debtTerm){
            annualLoanPayments[projectYear]=annualPrincipal[projectYear-2]+annualInterest[projectYear-2];
            interestPayment[projectYear]= annualInterest[projectYear-2];
            annualPrincipal2[projectYear] = annualLoanPayments[projectYear]-interestPayment[projectYear];
        }else if(projectYear > debtTerm-1){
            annualLoanPayments[projectYear]=0;
            interestPayment[projectYear] =0;
            annualPrincipal2[projectYear] =0;
        }
    }

//  Production & Sales, assumes 3 year Ramp up (.5,.75,1)
    annualProduction =[];
    annualRevenue =[];
    for (let projectYear=0; projectYear<paybackPeriod; projectYear++){
        if (projectYear == 0){
            annualProduction[projectYear]= 0;
        }else if (projectYear == 1){
            annualProduction[projectYear]= 0;
        }else if (projectYear == 2){
            annualProduction[projectYear] = 0.5*plantCapacity;
        }else if (projectYear== 3){
            annualProduction[projectYear] = 0.75*plantCapacity;
        }else {
            annualProduction[projectYear] = plantCapacity;
        }
        annualRevenue[projectYear] =  sellingPrice*annualProduction[projectYear] + 0.05*annualProduction[projectYear]; //include coproduct credit

    }

   // Income
   EBITDA =[];
   EBIT =[];
   EBT =[];
       for (let projectYear=0; projectYear<paybackPeriod; projectYear++){
        if (annualRevenue[projectYear] >0){
            EBITDA[projectYear] = annualRevenue[projectYear] - Opex[projectYear]-ongoingCapitalInvestment[projectYear];
            EBIT[projectYear] = EBITDA[projectYear] - totalDepreciation[projectYear];
            EBT[projectYear] = EBIT[projectYear] - interestPayment[projectYear];

        }else {
            EBITDA[projectYear] = 0;
            EBIT[projectYear]= 0;
            EBT[projectYear] = 0;
        }

    }

   // Taxes & Net Income
   taxes =[];
   netIncome =[];
    for (let projectYear=0; projectYear<paybackPeriod; projectYear++){
        if (EBT[projectYear] > 0){
            taxes[projectYear]= EBT[projectYear]*taxRate;
            netIncome[projectYear] = EBT[projectYear]-taxes[projectYear];
        }else {
            taxes[projectYear] = 0;
            netIncome[projectYear] = 0;
        }
    }


   // Working Capital
   accountsReceivable =[];
   valueOfInventory =[];
   accountsPayable =[];
   netWorkingCapital =[];
   changeInNetWorkingCapital =[];

    for (let projectYear=0; projectYear<paybackPeriod;  projectYear++){
        accountsReceivable[projectYear] = annualRevenue[projectYear]*(accountsReceivableDelay/365);
        valueOfInventory[projectYear] = Opex[projectYear]*(inventoryHoldingPeriod/365);
        accountsPayable[projectYear]= Opex[projectYear]*(accountsPayableDelay/365);
        netWorkingCapital[projectYear] =accountsReceivable[projectYear]+valueOfInventory[projectYear]-accountsPayable[projectYear];
        if (projectYear == 0){
            changeInNetWorkingCapital[projectYear] = netWorkingCapital[projectYear]-0;
        }else{
            changeInNetWorkingCapital[projectYear] = netWorkingCapital[projectYear]-netWorkingCapital[projectYear-1];
        }
    }

    // Cash Flow Calculations

    netCashFlow=[];
    for (let projectYear=0; projectYear<paybackPeriod;  projectYear++){
       netCashFlow[projectYear] = annualRevenue[projectYear] - totalCapitalInvestment[projectYear] - Opex[projectYear]-annualLoanPayments[projectYear]-taxes[projectYear] ;
    }

    cumCashFlow=[];
    cumCashFlow[0] =netCashFlow[0];
    for (let projectYear=1; projectYear<paybackPeriod;  projectYear++){
        cumCashFlow[projectYear] = netCashFlow[projectYear] + cumCashFlow[projectYear-1];
    }


   //ROI
    SumNetCashFlow =0;
    SumcapitalInvestment =0;
    for(let projectYear=0; projectYear<paybackPeriod;  projectYear++){
        SumNetCashFlow = SumNetCashFlow+netCashFlow[projectYear];
        SumcapitalInvestment = SumcapitalInvestment+totalCapitalInvestment[projectYear];
    }
    ROI = SumNetCashFlow/SumcapitalInvestment;



  //  NPV
   npv=0;
   for(let projectYear=0; projectYear<paybackPeriod; projectYear++){
       npv = npv + (netCashFlow[projectYear]/ Math.pow(discountRate/100 + 1, projectYear + 1));
    }

    // IRR
    IRR = calcIRR(netCashFlow,-1.00);

    // MSP assumes you want to hit the target margin in year 4 at full ramp
    initialCostofProductionOnRampUp =  totalCapitalInvestment[4]+Opex[4]+annualLoanPayments[4];
    // Margin = (netsales -COGS)/netsales, netsales = MSP*annualProduction
    // netsales*margin = netsales-COGS
    // netsales -netsales*margin = COGS
    // netsales(1-margin) = COGS
    // nesales = COGS/(1-margin)
    //  MSP*annualProduction = COGS/(1-margin)
    //MSP = COGS/((1-margin)*annualProduction)
    MSP = initialCostofProductionOnRampUp/(annualProduction[4]*(1- margin));




      // Define Time to account for 0 index
    time = [];
    for (let projectYear=0; projectYear < paybackPeriod; projectYear++){
        time[projectYear]=projectYear;
    }


    var DCFOutput = new Object();
        DCFOutput.ROI = ROI;
        DCFOutput.MSP = MSP;
        DCFOutput.NPV = npv;
        DCFOutput.IRR = IRR;
        DCFOutput.time = time;
        DCFOutput.revenue = annualRevenue;
        DCFOutput.COGS = Opex;
        DCFOutput.totalDepreciation = totalDepreciation;
        DCFOutput.EBITDA= EBITDA;
        DCFOutput.EBIT= EBIT;
        DCFOutput.PrincipalPaid = annualPrincipal2;
        DCFOutput.InterestPaid = interestPayment;
        DCFOutput.TaxesPaid = taxes;
        DCFOutput.netIncome = netIncome;
        DCFOutput.netCashFlow = netCashFlow;
        DCFOutput.cumCashFlow = cumCashFlow;

    return DCFOutput;

    }
    function calculateLoanPayments(Principal,rate,years){
// Inputs

//Principal = 100000;// Principal: size of the loan
//rate = 0.1; // rate: annual rate
//years = 15; // years: length of loan in years

N=years*12; // number of payments
r=rate/12; // montlhy rate
P= Principal*(1+r)/((1-(1/(1+r))**N)/(1-1/(1+r))); //defines monthly payment
//Initiate variables
Princs = [];
In = [];
Ps = [];
time =[];
annualPayments =[];
annualInterest =[];
annualPrincipal =[];
LoanOutput = new Object();

Princs[0]=Principal; //  in year 1 principle is total amount
In[0]=0;
Ps[0]=0; //Principal payments
time[0]=1;

for (let i=1;i<N;i++){
    time[i] = i+1;
    In[i]=Princs[i-1]*r;
    Ps[i]=P-In[i];
    Princs[i]=Princs[i-1]-Ps[i];
}

// Total of annual payments

interestSum = 0;
principalSum = 0;


x = 0;
for (let i=0; i<years; i++){
    for (j=0;j<12;j++){
         interestSum = In[x]+interestSum ;
         x=x+1;
    }
    annualInterest[i] =interestSum;
    annualPayments[i] = 12*P;
    annualPrincipal[i] = annualPayments[i]-annualInterest[i];
    interestSum = 0;

}

LoanOutput.annualPrincipal = annualPrincipal;
LoanOutput.annualInterest = annualInterest;

return LoanOutput;
}
function calcIRR(cashFlow, irr) {

     inc =0.0001;

do{
      irr += inc;
      NPV_test = 0;
      for (var i=0; i< cashFlow.length; i++)      {
            NPV_test += cashFlow[i]/Math.pow((1+irr),i);
            }
}while(NPV_test > 0);
return irr;
}