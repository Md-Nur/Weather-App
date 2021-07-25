const iconElement = document.querySelector('.weather-icon')
const locationIcon = document.querySelector('.location-icon')
const tempElement = document.querySelector('.temprature-value p')
const descElement = document.querySelector('.temprature-description p')
const locationElement = document.querySelector('.location p')
const notificationElement = document.querySelector('.notification')

var input = document.getElementById('search');
let city = "";
let latitude = 0.0;
let longitude = 0.0;


input.addEventListener("keyup", function (event) {
    // if (event.keyIdentifier === 13) {
    if (event.keyCode === 13) {
        event.preventDefault();

        city = input.value
        getSearchWeather(city);
        console.log(city);
    }
})
const weather = {}

weather.temprature = {
    unit: 'celsius'
}

const KELVIN = 273

const key = '1eeb1a287afda3481903acf46c06f025'

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML - '<p>Browser dosen\'t fsupport</p>'
}

function setPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    getWeather(latitude, longitude)
}
locationIcon.addEventListener('click', function (event) {
    console.log('hey');
    console.log(latitude);
    console.log(longitude);
    console.log(key);
    getWeather(latitude, longitude)
})

function showError(error) {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>${error.message}</p>`
}
function getSearchWeather(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

    fetch(api)
        .then(function (response) {
            let data = response.json()
            return data
        })
        .then(function (data) {
            weather.temprature.value = Math.floor(data.main.temp - KELVIN)
            weather.description = `${data.weather[0].description}<br>
            Feels Like: ${Math.floor(data.main.feels_like-KELVIN)}&#176C<br>
            Minimum: ${Math.floor(data.main.temp_min-KELVIN)}&#176C<br>
            Maximum: ${Math.floor(data.main.temp_max-KELVIN)}&#176C<br>
            Humidity: ${data.main.humidity}%<br>
            Wind: ${data.wind.speed} m/s , ${data.wind.deg}&#176<br>
            Pressure: ${Math.floor(data.main.pressure*100)} pascals`
            weather.iconId = data.weather[0].icon
            weather.city = data.name
            weather.country = data.sys.country
        })
        .then(function () {
            displayWeather()
        })
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    console.log(api);
    fetch(api)
        .then(function (response) {
            let data = response.json()
            console.log(data);
            return data
        })
        .then(function (data) {
            weather.temprature.value = Math.floor(data.main.temp - KELVIN)
            weather.description = `${data.weather[0].description}<br>
            Feels Like: ${Math.floor(data.main.feels_like-KELVIN)}&#176C<br>
            Minimum: ${Math.floor(data.main.temp_min-KELVIN)}&#176C<br>
            Maximum: ${Math.floor(data.main.temp_max-KELVIN)}&#176C<br>
            Humidity: ${data.main.humidity}%<br>
            Wind: ${data.wind.speed} m/s , ${data.wind.deg}&#176<br>
            Pressure: ${Math.floor(data.main.pressure*100)} pascals`
            weather.iconId = data.weather[0].icon
            weather.city = data.name
            weather.country = data.sys.country
            console.log(weather.description);
        })
        .then(function () {
            displayWeather()
        })
}


function displayWeather() {
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`
    tempElement.innerHTML = `${weather.temprature.value}&#176<span>C</span>`
    console.log(tempElement);
    descElement.innerHTML = `${weather.description}`
    console.log(descElement);
    locationElement.innerHTML = `${weather.city},${weather.country}`
}


// function getWeather(latitude,longitude){
//     let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudey}&lon=${longitude}&appid=${key}`
// }
