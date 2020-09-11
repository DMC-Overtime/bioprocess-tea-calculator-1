  function CapexTornadoChart(LowCapexValues,HighCapexValues) {

     let myCapexTornadoChart = document.getElementById("myCapexTornadoChart").getContext('2d');
     let myCapexTornadoChart1 = new Chart(myCapexTornadoChart, {
        type:'horizontalBar',
        data:{
            labels:['Rate','Titer','Theoretical Yield','Glucose','Other','Other','Other','Other','Other','Other'],
            datasets:[{
            label:"+50%",
            data:LowCapexValues,
            fill: true,
            borderWidth:2,
            borderColor:'#4ca64c',
            backgroundColor: 'rgba(0, 255, 0, 0.4)',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
            },
            {
            label:"-50%",
            data:HighCapexValues,
            borderWidth:2,
            borderColor:'#777',
            backgroundColor:'rgba(0, 0, 0, 0.2)',
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
              legend:{
                display:true,
                position:'bottom',
                fillStyle: Color,
            }
        }
     });
  }
