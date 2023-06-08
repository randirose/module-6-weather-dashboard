$(document).ready(function (){
var today = dayjs().format('dddd, MMMM DD, YYYY');
var city = $('#city-input').val();

$('#submit').on('click', function(e) {
    e.preventDefault();
    getCoords();
})

function getCoords() {
    var url="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=36ded1ba363e28fda838ee1a00dc51af";
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

function getWeather() {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=36ded1ba363e28fda838ee1a00dc51af";
    fetch(url)
    .then(function (response) {
        return response.json();
    })
}















})