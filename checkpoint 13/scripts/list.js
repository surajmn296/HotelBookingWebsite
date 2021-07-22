let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "edf5b9cff9mshdcb5ce98d4b103dp11dfecjsn320f1f8a5e9b";

let initList = hotelList => {
    let hotelListElement = document.getElementById('hotel_list');
    hotelList.forEach(hotel => {
        let hotelLinkElement = document.createElement("a");
        hotelLinkElement.setAttribute("href", `detail.html?id=` + hotel.result_object.location_id);
        hotelListElement.appendChild(hotelLinkElement);
        let hotelContainer = document.createElement("div");
        hotelContainer.setAttribute("class", "hotel1");
        hotelLinkElement.appendChild(hotelContainer);
        let hotelImage = "<img src=" + hotel.result_object.photo.images.medium.url + " alt='" + hotel.result_object.name + "' class='hotel-img'/>";
        hotelContainer.innerHTML = hotelImage;
        let hotelDetailsContainer = document.createElement("div");
        hotelDetailsContainer.setAttribute("class", "hotelData");
        hotelContainer.appendChild(hotelDetailsContainer);
        let hotelName = hotel.result_object.name;
        if(hotelName.split(' ').length > 3)
        {
            hotelDetailsContainer.innerHTML = "<h4>"+ hotel.result_object.name +"</h4>";
            hotelDetailsContainer.innerHTML += "<div id='rating'>"+ hotel.result_object.rating +" <span class='fa fa-star checked'></span></div>";
            hotelDetailsContainer.innerHTML += "<p style='font-size: small'>"+ hotel.result_object.address +"</p>";
        }
        else {
            hotelDetailsContainer.innerHTML = "<h3>"+ hotel.result_object.name +"</h3>";
            hotelDetailsContainer.innerHTML += "<div id='rating'>"+ hotel.result_object.rating +" <span class='fa fa-star checked'></span></div>";
            hotelDetailsContainer.innerHTML += "<p>"+ hotel.result_object.address +"</p>";
        } 
    });
}

//Fetch list of hotels in a particular city 
let fetchHotelListAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let result = JSON.parse(this.responseText).data;
            let locations = [];
            hotelList = result.filter(item => item.result_type == "lodging");
            hotelList.forEach(item => {
                locations.push([item.result_object.name + "<br><a href=\"detail.html?id=" + item.result_object.location_id + "\">Book Hotel</a>", item.result_object.latitude, item.result_object.longitude]);
            });
            initList(hotelList);
        }
    });

    xhr.open("GET", API_URL + "locations/search?lang=en_US&limit=100&query=" + urlParams.get('city'));
    xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
    xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);

    xhr.send();
}

fetchHotelListAPI();