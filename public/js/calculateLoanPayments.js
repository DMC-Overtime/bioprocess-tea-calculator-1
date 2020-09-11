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