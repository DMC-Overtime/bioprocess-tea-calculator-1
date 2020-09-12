function UpdateVesselSize(){
         var ele = document.getElementsByName('reactorsize');

         for(i = 0; i < ele.length; i++) {
             if(ele[i].checked){
             vesselSize = parseFloat(ele[i].value);
             }
         }
         return vesselSize;
       }