
const fahrenheitToCelsius = (temp) =>{
    return (temp-32) * (5/9);
}

const fetchWeather = async(inputElement,callback) =>{
    let query = ''
    if(typeof(inputElement) == "object") {
        query = inputElement.value;
    }
    else{
        query = localStorage.getItem('location')
    }
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}%7D?unitGroup=us&key=HEG4F8F8KWRVJJMYWBWT267MR&contentType=json`;
    try{
        console.log("here")
        let response = await fetch(url);
        let data = await response.json();
        callback(data)
    }
    catch(error){
        console.log(error)
        alert(`${query} location not found`)
    }
}



//Function to get display (on divElement) weather whenever the buttonElement is clicked 
const queryLocation =(buttonElement,inputElement,callback) =>{
    buttonElement.addEventListener('click',function(){
        fetchWeather(inputElement,callback)   
    });
}


let obj = {
    queryLocation :queryLocation,
    fahrenheitToCelsius:fahrenheitToCelsius,
}

export default obj;