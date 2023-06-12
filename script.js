var today = dayjs().format('dddd, MMMM DD, YYYY');
var apiKey = "36ded1ba363e28fda838ee1a00dc51af";
var buttonList = document.getElementById('button-list');

    var buttons = [];

// function to run after init, which renders the prev. searched buttons
function renderButtons() {
    buttonList.innerHTML= "";
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var buttonLi = document.createElement('button');
        buttonLi.textContent = button;
        buttonLi.setAttribute("data-index", i);
        buttonLi.setAttribute('class', 'btn btn-outline-secondary saved-button');
        buttonList.appendChild(buttonLi);    
    }
}

// called to run upon page loading
function init() {
    var storedButtons = JSON.parse(localStorage.getItem("buttons"));
    if (storedButtons !== null) {
            buttons = storedButtons;
    }
    renderButtons();
}

// function stores buttons that are rendered into local storage
function storeButtons() {
    localStorage.setItem("buttons", JSON.stringify(buttons));
}

// event listener to add user input to buttons, store those buttons and render it to the page
$('#submit').on('click', function(e) {
    e.preventDefault();
    var city = $('#city-input').val();
    var buttonText = city;

    // if the user clicks submit with nothing in the input box, it will kick them out of this function and not create an empty button. if statement in getCoords function will kick the user out of those if input is null
    if (buttonText === "") {
        return;
    }

    buttons.push(buttonText);
    storeButtons();
    renderButtons();
})

// autofill widget for search input; includes 100 US cities and 50 global cities (largest based on population) to search bar autofill
$(function () {
    var cityNames = [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
        "Austin",
        "Jacksonville",
        "Fort Worth",
        "Columbus",
        "Indianapolis",
        "Charlotte",
        "San Francisco",
        "Seattle",
        "Denver",
        "Oklahoma City",
        "Nashville",
        "El Paso",
        "Washington",
        "Boston",
        "Las Vegas",
        "Portland",
        "Detroit",
        "Louisville",
        "Memphis",
        "Baltimore",
        "Milwaukee", 
        "Albuquerque",
        "Fresno",
        "Tucson",
        "Sacramento",
        "Mesa",
        "Kansas City",
        "Atlanta",
        "Omaha",
        "Colorado Springs",
        "Raleigh",
        "Virginia Beach",
        "Long Beach", 
        "Miami",
        "Oakland",
        "Minneapolis",
        "Tulsa",
        "Bakersfield",
        "Wichita",
        "Arlington",
        "Aurora",
        "Tampa",
        "New Orleans",
        "Cleveland",
        "Anaheim",
        "Honolulu",
        "Henderson",
        "Stockton",
        "Lexington",
        "Corpus Christi",
        "Riverside",
        "Santa Ana",
        "Orlando",
        "Irvine",
        "Cincinnati",
        "Newark",
        "St. Paul",
        "Pittsburgh",
        "Greensboro",
        "St. Louis",
        "Lincoln",
        "Plano",
        "Anchorage",
        "Durham",
        "Jersey City",
        "Chandler",
        "Chula Vista",
        "Buffalo", 
        "North Las Vegas",
        "Gilbert",
        "Madison",
        "Reno",
        "Toledo",
        "Fort Wayne",
        "Lubbock",
        "St. Petersburg",
        "Laredo",
        "Irving", 
        "Chesapeake",
        "Winston-Salem",
        "Glendale",
        "Scottsdale",
        "Garland",
        "Boise City",
        "Norfolk",
        "Spokane",
        "Fremont", 
        "Richmond",
        "Santa Clarita",
        "San Bernardino",
        "Tokyo",
        "Delhi",
        "Shanghai",
        "Dhaka",
        "Sao Paulo",
        "Mexico City",
        "Cairo",
        "Beijing",
        "Mumbai",
        "Osaka",
        "Chongqing",
        "Karachi",
        "Kinshasa",
        "Lagos",
        "Istanbul",
        "Buenos Aires",
        "Kolkata",
        "Manila",
        "Guangzhou",
        "Tianjin",
        "Lahore",
        "Rio de Janeiro",
        "Bangalore",
        "Shenzhen",
        "Moscow",
        "Chennai",
        "Bogota",
        "Jakarta",
        "Paris",
        "Lima",
        "Bangkok",
        "Hyderabad",
        "Seoul",
        "Nanjing",
        "Chengdu",
        "London",
        "Nagoya",
        "Tehran",
        "Ho Chi Minh City",
        "Luanda",
        "Xi-an Shaanxi",
        "Wuhan",
        "Ahmedabad",
        "Kuala Lumpur",
        "Hangzhou",
        "Suzhou",
        "Surat",
        "Dar es Salaam",
        "Baghdad",
        "Hong Kong",
    ];
    $('#city-input').autocomplete({
      source: cityNames,
    });
  });

// function to run when the user types in a city and clicks the submit button, or when they click one of the prev. searched buttons; makes api call based on 'city' (defined in event listener functions and passed to this one) to get 'lat' and 'lon' to pass onto the following functions
function getCoords(city) {

    var url="https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    fetch(url)
    .then(function(response) {
        // if the input for city name is null, the geocode api call will throw an error and alert the user to input a city name
        if (response.status !== 200) {
            alert("Please enter a city name");
            return;
        }
        return response.json();
    })
    .then(function (data) {
        // if user inputs a city that returns 0 results (the api is not able to pull in a city by that name; misspelled, etc), the browser will alert the user to input a valid city
        if (data.length === 0) {
            alert("Please enter a valid city")
            return;
        }
        getWeather(data[0].lat, data[0].lon);
        getForecast(data[0].lat, data[0].lon);
    })
}

// function makes api call to get that current day's weather and print to page; uses the lat and lon gotten from the getCoords and getCoordsSaved functions 
function getWeather(lat, lon) {
    var urlMain = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    fetch(urlMain)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
        var icon = document.createElement('img');
        icon.src = "http://openweathermap.org/img/w/" + info.weather[0].icon + ".png";
        
        $("#city-name").text(info.name + " | " + today);
        var iconPlacement = document.getElementById("city-name");
        iconPlacement.appendChild(icon);
        $("#description").text("~ " + info.weather[0].description);
        $("#temp").text("Temp: " + info.main.temp + "°F");
        $("#feels-like").text("Feels like: " + info.main.feels_like + "°F");
        $("#wind").text("Wind speed: " + info.wind.speed + "MPH");
        $("#humidity").text("Humidity: " + info.main.humidity + "%");
        var weatherBox = document.getElementById('city-weather');
        weatherBox.classList.add("bg-success-subtle");
        weatherBox.classList.add("main-design");
    })
}

// function makes api call to get the 5 day forecast (in 3hr increments) and print to page; uses the lat and lon gotten from the getCoords and getCoordsSaved functions 
function getForecast(lat, lon) {
    var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    fetch(urlForecast)
    .then(function (response) {
        return response.json();
    })
    .then(function (fore) {
        $('#day-1-day').text(dayjs(today).add(1, 'day').format('ddd MM/DD/YY'));

        var icon1 = document.createElement('img');
        icon1.src = "http://openweathermap.org/img/w/" + fore.list[7].weather[0].icon + ".png";
        var iconPlacement1 = document.getElementById("day-1-day");
        iconPlacement1.appendChild(icon1);

        $('#day-2-day').text(dayjs(today).add(2, 'day').format('ddd MM/DD/YY'));

        var icon2 = document.createElement('img');
        icon2.src = "http://openweathermap.org/img/w/" + fore.list[15].weather[0].icon + ".png";
        var iconPlacement2 = document.getElementById("day-2-day");
        iconPlacement2.appendChild(icon2);

        $('#day-3-day').text(dayjs(today).add(3, 'day').format('ddd MM/DD/YY'));

        var icon3 = document.createElement('img');
        icon3.src = "http://openweathermap.org/img/w/" + fore.list[23].weather[0].icon + ".png";
        var iconPlacement3 = document.getElementById("day-3-day");
        iconPlacement3.appendChild(icon3);

        $('#day-4-day').text(dayjs(today).add(4, 'day').format('ddd MM/DD/YY'));

        var icon4 = document.createElement('img');
        icon4.src = "http://openweathermap.org/img/w/" + fore.list[31].weather[0].icon + ".png";
        var iconPlacement4 = document.getElementById("day-4-day");
        iconPlacement4.appendChild(icon4);

        $('#day-5-day').text(dayjs(today).add(5, 'day').format('ddd MM/DD/YY'));

        var icon5 = document.createElement('img');
        icon5.src = "http://openweathermap.org/img/w/" + fore.list[39].weather[0].icon + ".png";
        var iconPlacement5 = document.getElementById("day-5-day");
        iconPlacement5.appendChild(icon5);

        $('#day-1-temp').text("Temp: " + fore.list[7].main.temp + "°F");
        $('#day-2-temp').text("Temp: " + fore.list[15].main.temp + "°F");
        $('#day-3-temp').text("Temp: " + fore.list[23].main.temp + "°F");
        $('#day-4-temp').text("Temp: " + fore.list[31].main.temp + "°F");
        $('#day-5-temp').text("Temp: " + fore.list[39].main.temp + "°F");

        $('#day-1-feels-like').text("Feels like: " + fore.list[7].main.feels_like + "°F");
        $('#day-2-feels-like').text("Feels like: " + fore.list[15].main.feels_like + "°F");
        $('#day-3-feels-like').text("Feels like: " + fore.list[23].main.feels_like + "°F");
        $('#day-4-feels-like').text("Feels like: " + fore.list[31].main.feels_like + "°F");
        $('#day-5-feels-like').text("Feels like: " + fore.list[39].main.feels_like + "°F");

        $('#day-1-wind').text("Wind speed: " + fore.list[7].wind.speed + "MPH");
        $('#day-2-wind').text("Wind speed: " + fore.list[15].wind.speed + "MPH");
        $('#day-3-wind').text("Wind speed: " + fore.list[23].wind.speed + "MPH");
        $('#day-4-wind').text("Wind speed: " + fore.list[31].wind.speed + "MPH");
        $('#day-5-wind').text("Wind speed: " + fore.list[39].wind.speed + "MPH");

        $('#day-1-humidity').text("Humidity: " + fore.list[7].main.humidity + "%");
        $('#day-2-humidity').text("Humidity: " + fore.list[15].main.humidity + "%");
        $('#day-3-humidity').text("Humidity: " + fore.list[23].main.humidity + "%");
        $('#day-4-humidity').text("Humidity: " + fore.list[31].main.humidity + "%");
        $('#day-5-humidity').text("Humidity: " + fore.list[39].main.humidity + "%");

        var cardBox = document.getElementById('card-body');
        var cardBox2 = document.getElementById('card-body2');
        var cardBox3 = document.getElementById('card-body3');
        var cardBox4 = document.getElementById('card-body4');
        var cardBox5 = document.getElementById('card-body5');
        cardBox.classList.add("card-design");
        cardBox2.classList.add("card-design");
        cardBox3.classList.add("card-design");
        cardBox4.classList.add("card-design");
        cardBox5.classList.add("card-design");
    })
}

// event listener for when the user types in a city and clicks the submit button
$('#submit').on('click', function(e) {
    e.preventDefault();
    var city = $('#city-input').val();
    getCoords(city);
})

// event listener for when the user clicks on one of the prev. searched buttons
$('#button-list').on('click', '.saved-button', function(e) {
    e.preventDefault();
    var city = $(e.target).text();
    getCoords(city);
})
    
init();
