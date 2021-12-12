function UpdateVesselSize(){
         var ele = document.getElementsByName('reactorsize');

         for(var i = 0; i < ele.length; i++) {
             if(ele[i].checked){
             var vesselSize = parseFloat(ele[i].value);
             }
         }
         return vesselSize;
       }