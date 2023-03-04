
const fahrenheitToCelsius = (temp) => {
    return (temp - 32) * (5 / 9);
}

const fetchWeather = async (inputElement, callback) => {
    let query = '';

    if (typeof (inputElement) === "object") {
        query = inputElement.value;
    }
    else {
        query = localStorage.getItem('location')
    }
    let url = '';
    if(query === '') {
        alert('Please enter the city name');
        return false;
    } else {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}%7D?unitGroup=us&key=HEG4F8F8KWRVJJMYWBWT267MR&contentType=json`;
    }

    try {
        let response = await fetch(url);
        let data = await response.json();
        callback(data);
    }
    catch (error) {
        console.log(error);
        alert(`${query} location not found`);
    }
    query = "";
}



//Function to get display (on divElement) weather whenever the buttonElement is clicked 
const queryLocation = (buttonElement, inputElement, callback) => {
    buttonElement.addEventListener('click', function () {
        fetchWeather(inputElement, callback)
    });
}

const checkForSearch = (weatherCard,weatherSection) => {
    if (weatherCard.innerText !== '') {
        let arr = weatherSection.children
        Array.from(arr).forEach(x => {
            if ((x.tagName === 'DIV' && x.id !== 'todays-weather'))
                weatherSection.removeChild(x);
            if (x.id === 'todays-weather')
                x.innerText = "";
            if (x.id === 'more-weather-btn') {
                x.style.display = "none";
            }
            if (x.id === 'show-less-btn') {
                x.style.display = "none";
            }
        })
    }
}

const weatherCardElement = (data,address) =>{
    let date = data.datetime.slice(-2);
    let d = new Date();
    let datetime = new Date(data.datetime).toDateString()
    if(date == d.getDate())
    datetime = "Today";
    else if(date-1 == d.getDate())
    datetime= "Tomorrow";
    let a =  `
    <div id="date">
        <span class="material-icons md-60   ">calendar_today</span> :<span> ${datetime} </span>
    </div>
    <div id="location">
        <span class="material-icons md-60" >location_on  </span> : <span>${address}</span> 
    </div> 
    <div id="temp"> 
        <span class="material-icons md-60">device_thermostat</span>:${fahrenheitToCelsius(data.tempmax).toFixed(2)}  Degree Celcius 
    </div>
    <div id="desc">
        <span class="material-icons md-60">description</span> ${data.description}
    </div>
    ` ;

    return a;
}
let obj = {
    queryLocation: queryLocation,
    fahrenheitToCelsius: fahrenheitToCelsius,
    checkForSearch:checkForSearch,
    weatherCardElement:weatherCardElement,
};

export default obj;