
// Auto calculate price

let todayDate = new Date().toISOString().substr(0, 10);
document.querySelector('input[name="fromDate"]').setAttribute('min', todayDate)
document.querySelector('input[name="toDate"]').setAttribute('min', todayDate)

function autoCalculate(){
  let noOfAdultsInput = details[0];
  let bookingNameInput = details[1];
  let fromDateInput = details[2];
  let toDateInput = details[3];
  let totalPriceInput = details[4];
  if (fromDateInput.value){
    toDateInput.setAttribute('min',fromDateInput.value)
  }
  // calculate no of days
  let totalDays=0;
  if (fromDateInput.value && toDateInput.value){
    let fromDateEpoch = fromDateInput.value + 'T00:00:00';
    let toDateEpoch = toDateInput.value + 'T00:00:00';
    totalDays = (new Date(toDateEpoch).getTime() - new Date(fromDateEpoch).getTime())/24/3600/1000;
  }
  // calculate total price
  if (noOfAdultsInput.value){
    let calculatedTotalPrice = Math.floor(noOfAdultsInput.value) * totalDays * 1000;
    totalPriceInput.value = calculatedTotalPrice;
  }
}

let details = document.querySelectorAll('.formDiv div input');
details[0].addEventListener('input', autoCalculate);
details[2].addEventListener('change', autoCalculate);
details[3].addEventListener('change', autoCalculate);


// Find hotel from url
function getHotelFromURL() {
  let url = location.href;
  let params = (new URL(url)).searchParams;
  return params.get('id');
}

let hotelID = getHotelFromURL();
document.querySelector('input[name="id"]').value = hotelID;

// API call
async function getDescription(url) {
  // let url = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelID}`;
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
// Render Description HTML
let descriptionObj;
let imagesObj;
async function renderDescription() {
  let hotelImages = await getDescription(`https://travel-advisor.p.rapidapi.com/photos/list?location_id=${hotelID}`);
  let hotelDescription = await getDescription(`https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelID}`);
  displayLoader(false);
  descriptionObj = hotelDescription.data[0];
  imagesObj = hotelImages.data;

  // Adding carousel images
  let carouselImages = document.querySelectorAll(".d-block");
  for (let i=0; i<5; i++){
    carouselImages[i].src = imagesObj[i].images.large.url;
  }
  // Adding description HTML
  let descriptionDiv = document.querySelector('.description');
  let descriptionDetails = `
    <h2>${descriptionObj.name}</h2>
    <p class="cursive"><b>RATING</b></p>
    <p id="rating">
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
    </p>
    <p class="cursive"><b>AMENITIES</b></p>
    <ul id="amenities">

    </ul>
    <h5 class="cursive">DESCRIPTION</h5>
    <p>${descriptionObj.description}</p>`

  descriptionDiv.innerHTML = descriptionDetails;
  // appending amenities list
  let amenitiesArr = descriptionObj.amenities;
  let ulObj = document.querySelector('#amenities')
  let numOfAmenitiesDisplayed = Math.min(10, amenitiesArr.length)
  for (let i=0; i<numOfAmenitiesDisplayed; i++){
    let liObj = document.createElement('li');
    liObj.innerText = amenitiesArr[i].name;
    ulObj.appendChild(liObj)
  }
  // Updating the star rating
  let ratingObj = document.querySelectorAll('.fa-star');
  let hotelRating = Math.min(5, Math.round(Number(descriptionObj.rating)));
  for (let i=0; i<hotelRating; i++){
    ratingObj[i].classList.add("checked");
  }
}

renderDescription();
