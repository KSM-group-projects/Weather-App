import utils from './utils/utils.js';

const searchButton = document.querySelector('#query-button');
const searchInput = document.querySelector('#query-input');
const weatherCard = document.querySelector('.todays-weather');
const showMoreButton = document.querySelector("#more-weather-btn");
const showLessButton = document.querySelector("#show-less-btn");
const weatherSection = document.querySelector(".weather-section");


weatherCard.style.display = "none";
const displayTodaysWeather = (data,address) => {
        utils.checkForSearch(weatherCard,weatherSection);
        weatherCard.innerHTML = utils.weatherCardElement(data.days[0],data.resolvedAddress)
       
        localStorage.setItem('location', data.address.slice(0, -1));
        weatherCard.style.display = "block";
        showMoreButton.style.display = "block";
        weatherCard.style.display = "block";
        
}

const displayMoreWeathers = (data) => {

    let weatherSection = document.querySelector(".weather-section");
    console.log(data);

    for (let i = 1; i <= 5; i++) {
        let eachWeather = document.createElement("div");
        eachWeather.setAttribute('class','weather-card');
        eachWeather.innerHTML = utils.weatherCardElement(data.days[i],data.resolvedAddress)
        weatherSection.append(eachWeather)
    }
    
    showMoreButton.style.display = "none";
    showLessButton.style.display = "block";
    
}

showLessButton.addEventListener('click', (e) => {
    let arr = weatherSection.children
    Array.from(arr).forEach(x => {
        if (x.tagName === 'DIV' && x.id !== 'todays-weather')
            weatherSection.removeChild(x)
    })
    showLessButton.style.display = "none";
    showMoreButton.style.display = "block";
})

utils.queryLocation(searchButton, searchInput, displayTodaysWeather);
utils.queryLocation(showMoreButton, "", displayMoreWeathers)


