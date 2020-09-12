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
