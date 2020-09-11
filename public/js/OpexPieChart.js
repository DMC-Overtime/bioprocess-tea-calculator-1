  function OpexPieChart(bioprocessOutputs) {

    costOfGlucoseperkg =(bioprocessOutputs.costOfGlucoseperkg).toFixed(4) ;
    costOfAmmoniaperkg =(bioprocessOutputs.costOfAmmoniaperkg).toFixed(4) ;
    costOfMediaperkg = (bioprocessOutputs.costOfMediaperkg).toFixed(4) ;
    costOfAerationperkg = (bioprocessOutputs.costOfAerationperkg).toFixed(4)  ;
    costOfCoolingperkg = (bioprocessOutputs.costOfCoolingperkg).toFixed(4) ;
    costOfBiomassDisposalperkg = (bioprocessOutputs.costOfBiomassDisposalperkg).toFixed(4) ;
    costOfSterilizationperkg = (bioprocessOutputs.costOfSterilizationperkg).toFixed(4) ;
    costOfLaborperkg = (bioprocessOutputs.costOfLaborperkg).toFixed(4)  ;
    otherFixedCostsperkg = (bioprocessOutputs.otherFixedCostsperkg).toFixed(4) ;
    dspOPEXperkg = (bioprocessOutputs.dspOPEXperkg).toFixed(4) ;
    data1 = [costOfGlucoseperkg,costOfAmmoniaperkg,costOfMediaperkg,costOfAerationperkg,costOfCoolingperkg ,costOfBiomassDisposalperkg ,costOfSterilizationperkg, costOfLaborperkg, dspOPEXperkg, otherFixedCostsperkg];


     let myOpexPieChart= document.getElementById("myOpexPieChart").getContext('2d');
     let myOpexPieChart1 = new Chart(myOpexPieChart, {
        type:'doughnut',
        data:{
            labels:["Glucose","Ammonia","Media","Aeration","Cooling","Biomass Disposal","Sterilization","Labor","DSP","Other Fixed Costs" ],
            datasets:[{
            data:data1,
            backgroundColor:['rgba(50, 255, 0, 0.4)',
            'rgba(255, 0, 0, 0.4)',
            'rgba(128, 128, 0, 0.4)',
            'rgba(255, 0, 255, 0.4)',
            'rgba(255, 255, 0, 0.2)',
            'rgba(0, 0, 255, 0.4)',
            'rgba(0, 128, 128, 0.4)',
            'rgba(0, 0, 0, 0.4)'],
            borderWidth:2,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
            }]
        },
        options:{
              legend:{
                display:true,
                position:'right',
                fillStyle: Color,
            }
        }
     });
  }
