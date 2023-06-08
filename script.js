// $(document).ready(function (){
var today = dayjs().format('dddd, MMMM DD, YYYY');

var apiKey = "36ded1ba363e28fda838ee1a00dc51af";



function getCoords() {
    var city = $('#city-input').val();
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
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=36ded1ba363e28fda838ee1a00dc51af";
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var icon = document.createElement('img');
        icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        
        $("#city-name").text(data.name + " | " + today);
        var iconPlacement = document.getElementById("city-name");
        iconPlacement.appendChild(icon);
        $("#description").text(data.weather[0].description);
        $("#temp").text("Tempurature: " + data.main.temp + "°F");
        $("#feels-like").text("Feels like: " + data.main.feels_like + "°F");
        $("#wind").text("Wind speed: " + data.wind.speed + "MPH");
        $("#humidity").text("Humidity: " + data.main.humidity + "%");
    })
}
})
}
$('#submit').on('click', function(e) {
    e.preventDefault();
    getCoords();
})













// })