import utils from './utils/utils.js';

const searchButton = document.querySelector('#query-button');
const searchInput = document.querySelector('#query-input');
const weatherCard = document.querySelector('.todays-weather');
const showMoreButton = document.querySelector("#more-weather-btn");
const showLessButton = document.querySelector("#show-less-btn");
const weatherSection = document.querySelector(".weather-section");

const displayTodaysWeather = (data)=>{
    weatherCard.innerText = `City : ${data.resolvedAddress}  Current temperture :${utils.fahrenheitToCelsius(data.days[0].tempmax).toFixed(2)}  Degree Celcius`;
    localStorage.setItem('location',data.address.slice(0,-1));
    showMoreButton.style.display = "block"
}

const displayMoreWeathers =(data) =>{
    let weatherSection = document.querySelector(".weather-section");
    console.log(data);

    for(let i=0;i<5;i++){
        let eachWeather = document.createElement("div");
        eachWeather.innerHTML = `Date :  ${data.days[i].datetime}  City : ${data.resolvedAddress} Excepted temperture : ${utils.fahrenheitToCelsius(data.days[i].tempmax).toFixed(2)} Degree Celcius`;
        weatherSection.append(eachWeather)
    }
    showMoreButton.style.display = "none";
    showLessButton.style.display = "block";
}

showLessButton.addEventListener('click' ,(e)=>{
    let arr = weatherSection.children
    Array.from(arr).forEach(x => {
        if(x.tagName === 'DIV' && x.id !== 'todays-weather')
            weatherSection.removeChild(x)
    })
    showLessButton.style.display = "none";
    showMoreButton.style.display = "block";
})

utils.queryLocation(searchButton,searchInput,displayTodaysWeather);
utils.queryLocation(showMoreButton,"",displayMoreWeathers)


