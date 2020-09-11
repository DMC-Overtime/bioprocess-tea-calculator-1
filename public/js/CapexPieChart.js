  function CapexPieChart(bioprocessOutputs) {

    fermTIC = (bioprocessOutputs.fermTIC).toFixed(4);
    transferPumpsTIC = (bioprocessOutputs.transferPumpsTIC).toFixed(4);
    storageTanksTIC =(bioprocessOutputs.storageTanksTIC).toFixed(4);
    prepTankTIC =  (bioprocessOutputs.prepTankTIC).toFixed(4);
    seedEquipmentTIC = (bioprocessOutputs.seedEquipmentTIC).toFixed(4);
    coolingTowerTIC =  (bioprocessOutputs.coolingTIC).toFixed(4);
    dspTIC = (bioprocessOutputs.dspTIC).toFixed(4);

    data1 = [fermTIC,transferPumpsTIC,storageTanksTIC,prepTankTIC,coolingTowerTIC,seedEquipmentTIC,dspTIC];

     let myCapexPieChart= document.getElementById("myCapexPieChart").getContext('2d');
     let myCapexPieChart1 = new Chart(myCapexPieChart, {
        type:'doughnut',
        data:{
            labels:["Fermenters","Transfer Pumps","Storage Tanks","Prep Tanks","Cooling","Seed Train", "DSP"],
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
