function calcFormula(chemical){
    formula = 'C';
    formula += chemical.carbon;
    formula +='H'
    formula += chemical.hydrogen;
    formula +='O'
    formula += chemical.oxygen;
    formula +='N'
    formula += chemical.nitrogen;  
    return formula;
}