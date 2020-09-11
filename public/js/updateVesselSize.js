function updateVesselSize(){
    var radio1 = document.getElementById("200000L");
    radio1.onclick = function(){
        vesselSize = getVesselSize();
    }
    var radio2 = document.getElementById("500000L");
    radio2.onclick = function(){
        vesselSize = getVesselSize();
    }
    var radio3 = document.getElementById("1000000L");
    radio3.onclick = function(){
        vesselSize = getVesselSize();
    }
    vesselSize = getVesselSize();
    return vesselSize;
}