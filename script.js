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
        getForecast();
    })

    function getForecast() {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&limit=5&appid=36ded1ba363e28fda838ee1a00dc51af";
        fetch(urlForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (fore) {
            console.log(fore);
            
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