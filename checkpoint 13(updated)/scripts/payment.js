// Get params from URL

let hotelID;

function getParamsFromURL() {
  let url = location.href;
  let params = (new URL(url)).searchParams;
  let noOfAdults = params.get('adult');
  let bookingName = params.get('name');
  let fromDate = params.get('fromDate');
  let toDate = params.get('toDate');
  let totalPrice = params.get('price');
  hotelID = params.get('id');
  // Change booking details
  let noOfNights = totalPrice/1000/noOfAdults;
  let contentDiv = document.querySelector('.content');
  let bottomDiv = document.createElement('div');
  bottomDiv.classList.add("bottom");
  let bookingDetailsObj = `
  <div class="customer">
    <p><b>Name:</b> ${bookingName}</p>
    <p><b>Number of Adults:</b> ${noOfAdults}</p>
    <p><b>Check-in Date:</b> ${fromDate}</p>
    <p><b>Check-out Date:</b> ${toDate}</p>
  </div>
  <div class="payment">
    <p><b>Tariff Breakdown:</b> Rs. 1000 x ${noOfAdults} Adults x ${noOfNights} nights</p>
    <p><b>Total Amount:</b> Rs. ${totalPrice}</p>
  </div>
  <div class="payNow">
    <button type="button" class="btn btn-success" disabled>Pay Now</button>
  </div>`
  bottomDiv.innerHTML = bookingDetailsObj;
  contentDiv.appendChild(bottomDiv);
}

getParamsFromURL();

if (localStorage.username === "admin"){
  changePayNowButton();
}

// API call
async function getHotel() {
  let url = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelID}`;
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

let descriptionObj;
async function renderPaymentDetails(){
  let hotelDescription = await getHotel();
  descriptionObj = hotelDescription.data[0];
  displayLoader(false);
  // change hotel image and description
  document.querySelector('.image img').src = descriptionObj.photo.images.medium.url;
  let topObj = document.querySelector('.top')
  let detailDiv = document.createElement('div');
  detailDiv.classList.add("details");
  let hotelDetails = `
  <div class="details">
    <h2>${descriptionObj.name}</h2>
    <p>${descriptionObj.ranking}</p>
    <p>${descriptionObj.address}</p>
  </div>`
  detailDiv.innerHTML = hotelDetails;
  topObj.appendChild(detailDiv);
}

renderPaymentDetails();

// Change Pay Now button on Login

function changePayNowButton(){
  let payNowDiv = document.querySelector('.payNow');
  if (localStorage.username === "admin"){
    payNowDiv.innerHTML = `<button type="button" class="btn btn-success">Pay Now</button>`
  }
  // Assigning value and event to pay now button on login
  let payNowButton = document.querySelector('.btn-success');
  payNowButton.addEventListener('click', alertOnBook);
}

if (modalLoginButton){
  modalLoginButton.addEventListener('click', changePayNowButton);
}

// Alert on booking
function alertOnBook(){
  alert('Hi! Your booking is successful');
}
