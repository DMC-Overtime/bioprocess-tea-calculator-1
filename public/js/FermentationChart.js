  function FermChart(fermentationOutput) {

     time = fermentationOutput.time;
     biomass = fermentationOutput.biomass;
     productTiter = fermentationOutput.productTiter;
     finalBiomass =  biomass[biomass.length - 1];


     let myFermChart = document.getElementById("myFermChart").getContext('2d');
     let myFermChart1 = new Chart(myFermChart, {
        type:'line',
        data:{
            labels:time,
            datasets:[{
            label:"Biomass",
            id:'y-axis-1',
            data:biomass,
            yAxisID: 'y-axis-1',
            linetension:0.1,
            fill: false,
            borderWidth:2,
            borderColor:'#000',
            pointborderWidth:0,
            pointBackgroundColor:'#000',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
            },
            {
            label:"Titer",
            id:'y-axis-2',
            data:productTiter,
            yAxisID: 'y-axis-2',
            linetension:0.1,
            fill: false,
            borderWidth:2,
            borderColor:'#4ca64c',
            pointborderWidth:0,
            pointBackgroundColor:'#4ca64c',
            hoverBorderWidth:3,
            hoverBorderColor:'#4ca64c'
            }]
        },
        options:{
            //title:{
            //display:true,
            //text:'Title_text',
            //fontsize:25,
            //},
              responsive: true,
              scales:
              {
               xAxes:
               [
               {
                 scaleLabel: {display: true, labelString: 'Time (hrs)'},
                 labelFontSize:30,
                 ticks: {min: 0, beginAtZero: true, max: time, autoSkip: true, maxTicksLimit: 25},
                }
                ],
               yAxes:
               [
                {
                 scaleLabel: { display: true, labelString: 'Biomass (gCDW/L)' },
                 position: 'left', id: 'y-axis-1',type: 'linear',
                 labelFontSize:30,
                 ticks: { min: 0, beginAtZero: true, max: finalBiomass*2 },
                },
                {
                 scaleLabel: { display: true, labelString: 'Product (g/L)' },
                 position: 'right', id: 'y-axis-2',type: 'linear',
                 labelFontSize:30,
                 ticks: { min: 0, beginAtZero: true },
                 gridLines: { display: false }
                }
               ]
              },
              legend:{
                display:true,
                position:'bottom',
                fillStyle: Color,
            }
        }
     });
  }
