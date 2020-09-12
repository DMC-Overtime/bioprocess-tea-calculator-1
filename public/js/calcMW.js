function calcMW(chemical){
     MW = (12.0107*(chemical.carbon)+1.00784*(chemical.hydrogen)+15.999*(chemical.oxygen)+14.0067*(chemical.nitrogen)).toFixed(2);
     return MW;
}