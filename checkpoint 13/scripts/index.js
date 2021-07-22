function myFunction() {
  let images = document.getElementById("cityImages1");
  let btnText = document.getElementsByClassName("viewmore")[0];

  if (images.style.display != "none") {
    btnText.innerHTML = "ViewMore"; 
    images.style.display = "none";
  } else {
    btnText.innerHTML = "ViewLess"; 
    images.style.display = "inline";
  }
}

