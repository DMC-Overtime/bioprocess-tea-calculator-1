function compute_loan_payments(Princ,rate,years){
// Inputs
// Princ: size of the loan
// rate: annual rate
// years: length of loan in years

// Outputs
// P: monthly payment
// In: list of interests paid over the entire loan period
// Princs: Remaining balance over the entire loan period
 
    N=years*12; //total monthly payments
    r=rate/12; //monthly interest
    // monthly rate
    //L*(1+r) = P + P/(1+r) + P/(1+r)^2 + P/(1+r)^3
    //  = P (1-(1/1+r)^N)/(1-(1/(1+r))
    P= Princ*(1+r)/((1-(1/(1+r))^N)/(1-1/(1+r)));
    
    Princs=[];
    In=[];
    Ps =[];
    time =[];
    annualPayments = []; 
    annualInterest =[];
    annualPrincipal =[];
    
    Princs[0]=Princ;
    In[0]=0;
    Ps[0]=0;
    time[0] = 0; 
    
    for (let i=1; i < N+1; i++){
        time[i]=i;
        In[i]=Princs[i-1]*r;
        Ps[i]=P-In[i];
        Princs[i]=Princs[i-1]-Ps[i];
    }

// Total of annual payments

    x=0;
    for (let yr=0; yr < years; yr++){
        annualPayments[yr] = 12*P;
        annualInterest[yr] =0;
        for (let month=x; month < 12+x; month++){
            annualInterest[yr] =annualInterest[yr]+In[month];
            }
        annualPrincipal[yr] =annualPayments[yr]-annualInterest[yr];
        x=x+12;
    }


var Output = new Object();
Output.annualPrincipal = annualPrincipal;
Output.annualInterest = annualInterest;

return Output;
}
