  function ProFormaChart(time,cumCashFlow){

    //Convert to Millions
     for (let i=0;i<cumCashFlow.length; i++){
        cumCashFlow[i] = cumCashFlow[i]/1000000;
        console.dir(cumCashFlow[i]);
     }

     finalCashFlow = cumCashFlow[cumCashFlow.length];

     let myProFormaChart = document.getElementById('myProFormaChart').getContext('2d');
     let myProformaChart1 = new Chart(myProFormaChart, {
        type:'line',
        data:{
            labels:time,
            datasets:[{
            label:"Cumulative Cash Flow",
            id:'y-axis-3',
            data:cumCashFlow ,
            yAxisID: 'y-axis-3',
            linetension:0.1,
            fill: false,
            borderWidth:2,
            borderColor:'#000',
            pointborderWidth:0,
            pointBackgroundColor:'#000',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
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
                 scaleLabel: {display: true, labelString: 'Time (years)'},
                 labelFontSize:30,
                 ticks: {min: 0, beginAtZero: true, max: time, autoSkip: true, maxTicksLimit: 25},
                }
                ],
               yAxes:
               [
                {
                 scaleLabel: { display: true, labelString: 'Cumulative Cash Flow ($M)' },
                 position: 'left', id: 'y-axis-3',type: 'linear',
                 labelFontSize:30,
                 //ticks: { min: 0, beginAtZero: true },
                },
               ]
              },
              legend:{
                display:false,
                position:'bottom',
                fillStyle: Color,
            }
        }
     });
  }
