$(document).ready(function (){
var today = dayjs().format('dddd, MMMM DD, YYYY');
var city = $('#city-input').val();
function getWeather() {
    var url = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=36ded1ba363e28fda838ee1a00dc51af';
    fetch(url)
    .then(function (response) {
        return response.jason();
    })
}















})