  function UpdatePrice() {
   var Input2 = document.getElementById("sellingPrice");
   Input2.oninput = function() {
         sellingPrice = parseFloat(Input2.value);
   }
   return sellingPrice;
   }