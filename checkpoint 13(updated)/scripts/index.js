// Toggle View More button functionality
let viewButton = document.querySelector('.btn-secondary');
let secondRowImages = document.querySelectorAll('.images')[1];
secondRowImages.style.display = 'none';

function toggleViewMore(){
  let buttonText = viewButton.innerText
  if (buttonText === 'View More'){
    secondRowImages.style.display = 'flex';
    viewButton.innerText = 'View Less';
  }
  else{
    secondRowImages.style.display = 'none';
    viewButton.innerText = 'View More';
  }
}

viewButton.addEventListener('click', toggleViewMore);

// Modify link query string on the basis of hotels
function modifyCardLinks(){
  let cityLinks = document.querySelectorAll('.image a');
  let cityNames = document.querySelectorAll('.city');
  for (let i=0; i<cityLinks.length; i++){
    let attribute = cityLinks[i].href;
    cityLinks[i].setAttribute('href', `${attribute}?city=${cityNames[i].textContent}`)
  }
}

modifyCardLinks();

// Autocomplete functionality in search bar

async function getLocations(query) {
  let url = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${query}`;
  try {
    let res = await fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "4d124c4d81msh7fa98382e05e4c7p17c58ejsn28d0e88a3b06",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
      }
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

let locationName;
async function renderResults() {
  let formInput = document.querySelector('input[name="city"]');
  if (formInput.value.length > 2){
    let searchResult = document.querySelector("#searchResult");
    searchResult.innerText = 'Loading Results...';
    searchResult.style.visibility = 'visible';
    let response = await getLocations(formInput.value);
    locationName = response.data[0].result_object.name;
    searchResult.innerText = locationName;
    document.querySelector('#resultLink').setAttribute('href', `list.html?city=${locationName}`);
  }
  else{
    document.querySelector("#searchResult").style.visibility = 'hidden';
  }
}

document.querySelector('input[name="city"]').addEventListener('input', renderResults);

// Remove spinner after the page has loaded fully
document.onreadystatechange = function() {
  if (document.readyState === "complete"){
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};
