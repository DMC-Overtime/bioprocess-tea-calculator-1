  function MWupdate() {
  document.getElementById("C").innerHTML = carbon.value;
  document.getElementById("H").innerHTML = hydrogen.value;
  document.getElementById("O").innerHTML = oxygen.value;
  document.getElementById("N").innerHTML = nitrogen.value;
  MWvalue = 12.0107*(carbon.value)+1.00784*(hydrogen.value)+15.999*(oxygen.value)+14.0067*(nitrogen.value);
  document.getElementById("MW").innerHTML = MWvalue;
  document.getElementById("Cnumber").innerHTML = carbon.value;
  document.getElementById("Hnumber").innerHTML = hydrogen.value;
  document.getElementById("Onumber").innerHTML = oxygen.value;
  document.getElementById("Nnumber").innerHTML = nitrogen.value;
  document.getElementById("Cnumber2").innerHTML = carbon.value;
  document.getElementById("Hnumber2").innerHTML = hydrogen.value;
  document.getElementById("Onumber2").innerHTML = oxygen.value;
  document.getElementById("Nnumber2").innerHTML = nitrogen.value;
}