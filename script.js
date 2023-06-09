// $(document).ready(function (){
var today = dayjs().format('dddd, MMMM DD, YYYY');

var apiKey = "36ded1ba363e28fda838ee1a00dc51af";



function getCoords() {
    var city = $('#city-input').val();
    // if statement if the user missplells a city
    var url="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=36ded1ba363e28fda838ee1a00dc51af";
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        getWeather();
    

        


function getWeather() {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var urlMain = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=36ded1ba363e28fda838ee1a00dc51af";
    fetch(urlMain)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
        console.log(info);
        var icon = document.createElement('img');
        icon.src = "http://openweathermap.org/img/w/" + info.weather[0].icon + ".png";
        
        $("#city-name").text(info.name + " | " + today);
        var iconPlacement = document.getElementById("city-name");
        iconPlacement.appendChild(icon);
        $("#description").text(info.weather[0].description);
        $("#temp").text("Tempurature: " + info.main.temp + "°F");
        $("#feels-like").text("Feels like: " + info.main.feels_like + "°F");
        $("#wind").text("Wind speed: " + info.wind.speed + "MPH");
        $("#humidity").text("Humidity: " + info.main.humidity + "%");
        var weatherBox = document.getElementById('city-weather');
        weatherBox.classList.add("bg-success-subtle");
        weatherBox.classList.add("main-design");
        getForecast();
    })

    function getForecast() {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=36ded1ba363e28fda838ee1a00dc51af";
        fetch(urlForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (fore) {
            console.log(fore);
            $('#day-1-day').text(dayjs(today).add(1, 'day').format('dddd, MMMM DD, YYYY'));

            var icon1 = document.createElement('img');
            icon1.src = "http://openweathermap.org/img/w/" + fore.list[7].weather[0].icon + ".png";
            var iconPlacement1 = document.getElementById("day-1-day");
            iconPlacement1.appendChild(icon1);

            $('#day-2-day').text(dayjs(today).add(2, 'day').format('dddd, MMMM DD, YYYY'));

            var icon2 = document.createElement('img');
            icon2.src = "http://openweathermap.org/img/w/" + fore.list[15].weather[0].icon + ".png";
            var iconPlacement2 = document.getElementById("day-2-day");
            iconPlacement2.appendChild(icon2);

            $('#day-3-day').text(dayjs(today).add(3, 'day').format('dddd, MMMM DD, YYYY'));

            var icon3 = document.createElement('img');
            icon3.src = "http://openweathermap.org/img/w/" + fore.list[23].weather[0].icon + ".png";
            var iconPlacement3 = document.getElementById("day-3-day");
            iconPlacement3.appendChild(icon3);

            $('#day-4-day').text(dayjs(today).add(4, 'day').format('dddd, MMMM DD, YYYY'));

            var icon4 = document.createElement('img');
            icon4.src = "http://openweathermap.org/img/w/" + fore.list[31].weather[0].icon + ".png";
            var iconPlacement4 = document.getElementById("day-4-day");
            iconPlacement4.appendChild(icon4);

            $('#day-5-day').text(dayjs(today).add(5, 'day').format('dddd, MMMM DD, YYYY'));

            var icon5 = document.createElement('img');
            icon5.src = "http://openweathermap.org/img/w/" + fore.list[39].weather[0].icon + ".png";
            var iconPlacement5 = document.getElementById("day-5-day");
            iconPlacement5.appendChild(icon5);

            $('#day-1-temp').text("Temperature: " + fore.list[7].main.temp + "°F");
            $('#day-2-temp').text("Temperature: " + fore.list[15].main.temp + "°F");
            $('#day-3-temp').text("Temperature: " + fore.list[23].main.temp + "°F");
            $('#day-4-temp').text("Temperature: " + fore.list[31].main.temp + "°F");
            $('#day-5-temp').text("Temperature: " + fore.list[39].main.temp + "°F");

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

}
})
}
$('#submit').on('click', function(e) {
    e.preventDefault();
    getCoords();
})













// })