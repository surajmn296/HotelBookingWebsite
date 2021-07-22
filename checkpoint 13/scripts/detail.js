let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "edf5b9cff9mshdcb5ce98d4b103dp11dfecjsn320f1f8a5e9b";



let updatePrice = ()=>{
	let noOfAdults=document.getElementById('adults');
	let fromDates=document.getElementById('fromDate');
	let toDates = document.getElementById('toDate');
	let totalPrice=document.getElementById('total');

	let toDateValue = new Date(toDates.value);
	let fromDateValue = new Date(fromDates.value);

	toDates.min = fromDates.value;

	let noOfDays = (toDateValue - fromDateValue)/(1000 * 3600 * 24);
	if(noOfAdults.value && toDates.value && fromDates.value){
		totalPrice.value = 'Rs. '+parseInt(noOfAdults.value)*noOfDays*1000;
	}
	else{
		totalPrice.value="Rs.0";
	}
}


// Fetch Hotel details 
let fetchHotelDetailAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let result = JSON.parse(this.responseText).data[0];
            document.getElementById("hotel-name").innerText = result.name;
            let amenities = result.amenities;
            let i=0;
            for(;i < Math.min(amenities.length, 10);i++) {
                let liElement = document.createElement("li"); 
                liElement.innerText = amenities[i].name;
                document.getElementById("amenities").appendChild(liElement);
            }
            let descriptionPara = document.createElement("h6"); 
            descriptionPara.innerHTML = result.description;
            document.getElementById("description").appendChild(descriptionPara);
            let rating = parseInt(result.rating);
            for(i=1;i <= rating;i++) {
                document.getElementById(i).classList.add("checked");
            }
        }
    });

    xhr.open("GET", API_URL + "hotels/get-details?lang=en_US&location_id=" + urlParams.get('id'));
    xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
    xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);

    xhr.send();
}

/* Fetch the API data for hotel photos, and add it to the bootstrap carousel */

let fetchHotelPhotosAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let carouselParentElement = document.getElementById("carousel-parent");
            let result = JSON.parse(this.responseText).data;
            let size = Math.min(result.length, 5);
            let i=0;
            for(;i < size;i++) {
                let div = document.createElement("div");
                div.classList.add("carousel-item");
                if(i == 0)
                    div.classList.add("active");
                let image = document.createElement("img");
                image.setAttribute("class", "carousel-image");
                image.classList.add("d-block");
                image.classList.add("w-100");
                image.src = result[i].images.large.url;
                div.appendChild(image);
                carouselParentElement.appendChild(div);
            }      
        }
    });
    xhr.open("GET", API_URL + "photos/list?lang=en_US&location_id=" + urlParams.get('id'));
    hotel_id=urlParams.get('id');

    xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
    xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);

    xhr.send();
}

let idElement = document.getElementById("id");
idElement.value = urlParams.get('id');

fetchHotelDetailAPI();
fetchHotelPhotosAPI();
