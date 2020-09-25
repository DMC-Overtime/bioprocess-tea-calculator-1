  function CapexPieChart1(bioprocessOutputs) {
//Total Installed Equipment
    fermTIC = (bioprocessOutputs.MainFermAreaTIC).toFixed(4);
    seedEquipmentTIC = (bioprocessOutputs.seedEquipmentTIC).toFixed(4);
    primaryCellRemovalTIC = (bioprocessOutputs.PrimaryCellRemovalTIC).toFixed(4);;
    processUtilitiesTIC = (bioprocessOutputs.processUtilitiesTIC).toFixed(4);
    controlSystems = (bioprocessOutputs.controlSystems).toFixed(4);
    dspTIC = (bioprocessOutputs.dspTIC).toFixed(4);



    data1 = [fermTIC,seedEquipmentTIC,primaryCellRemovalTIC,processUtilitiesTIC,controlSystems,dspTIC];

     let myCapexPieChart= document.getElementById("myCapexPieChart1").getContext('2d');
     let myCapexPieChart1 = new Chart(myCapexPieChart, {
        type:'doughnut',
        data:{
            labels:["Main Fermentation ","Seed Fermentation","Primary Cell Removal","Process Utilities","Control Systems","DSP"],
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
