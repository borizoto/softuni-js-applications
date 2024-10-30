function attachEvents() {
    const submitBtnRef = document.getElementById('submit');
    const locationInputRef = document.getElementById('location');
    const forecastDivRef = document.getElementById('forecast');

    const locationsUrl = 'http://localhost:3030/jsonstore/forecaster/locations';

    const symbolsObj = {
        "Sunny": '&#x2600',
        "Partly sunny": '&#x26C5',
        "Overcast": '&#x2601',
        "Rain": '&#x2614',
        degrees: '&#176'
    }

    submitBtnRef.addEventListener("click", function () {

        if (!locationInputRef.value) return;

        document.getElementById('current').innerHTML = '';
        const divCurrent = document.createElement("div");
        divCurrent.classList.add("label");
        divCurrent.textContent = "Current conditions";
        document.getElementById('current').appendChild(divCurrent);

        document.getElementById('upcoming').innerHTML = '';
        const divUpcoming = document.createElement("div");
        divUpcoming.classList.add("label");
        divUpcoming.textContent = "Three-day forecast";
        document.getElementById('upcoming').appendChild(divUpcoming);

        fetch(locationsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch upcoming forecast');
                }
                return response.json();
            })
            .then(dataObj => {

                if (!dataObj) {
                    throw new Error("Error");
                }

                forecastDivRef.style.display = 'block';

                const cityInfo = dataObj.find(city => city.name === locationInputRef.value);

                if (!cityInfo) {
                    throw new Error('City not found');
                }

                console.log(cityInfo)

                const cityCode = cityInfo.code;
                const currentConditionUrl = `http://localhost:3030/jsonstore/forecaster/today/${cityCode}`;
                const threeDayConditionUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`;

                fetch(currentConditionUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch upcoming forecast');
                        }
                        return response.json();
                    })
                    .then(dataObj => {
                        const divElementCurrent = document.getElementById('current');

                        const divElementForecasts = document.createElement('div');
                        divElementForecasts.classList.add("forecasts");

                        const spanConditionSymbol = document.createElement('span');
                        spanConditionSymbol.classList.add("condition", "symbol");
                        spanConditionSymbol.innerHTML = symbolsObj[dataObj.forecast.condition];

                        const spanElementCondition = document.createElement('span');
                        spanElementCondition.classList.add('condition');

                        const spanElementCity = document.createElement('span');
                        spanElementCity.classList.add('forecast-data');
                        spanElementCity.textContent = `${dataObj.name}`;

                        const spanElementDegrees = document.createElement('span');
                        spanElementDegrees.classList.add('forecast-data');
                        spanElementDegrees.innerHTML = `${dataObj.forecast.low}${symbolsObj.degrees}/${dataObj.forecast.high}${symbolsObj.degrees}`;

                        const spanElementWeather = document.createElement('span');
                        spanElementWeather.classList.add('forecast-data');
                        spanElementWeather.textContent = dataObj.forecast.condition;

                        spanElementCondition.appendChild(spanElementCity);
                        spanElementCondition.appendChild(spanElementDegrees);
                        spanElementCondition.appendChild(spanElementWeather);

                        divElementForecasts.appendChild(spanConditionSymbol);
                        divElementForecasts.appendChild(spanElementCondition);

                        divElementCurrent.appendChild(divElementForecasts);
                    })
                    .catch(error => displayError());

                fetch(threeDayConditionUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch upcoming forecast');
                        }
                        return response.json();
                    })
                    .then(dataObj => {

                        const divElementUpcoming = document.getElementById('upcoming');

                        const divElementForecast = document.createElement('div');
                        divElementForecast.classList.add('forecast-info');

                        for (const obj of dataObj.forecast) {
                            console.log(obj)
                            const spanElementUpcoming = document.createElement('span');
                            spanElementUpcoming.classList.add('upcoming');

                            const spanElementSymbol = document.createElement('span');
                            spanElementSymbol.classList.add('symbol');
                            spanElementSymbol.innerHTML = symbolsObj[obj.condition];

                            const spanElementDegrees = document.createElement('span');
                            spanElementDegrees.classList.add('forecast-data');
                            spanElementDegrees.innerHTML = `${obj.low}${symbolsObj.degrees}/${obj.high}${symbolsObj.degrees}`;

                            const spanElementWeather = document.createElement('span');
                            spanElementWeather.classList.add('forecast-data');
                            spanElementWeather.textContent = obj.condition;

                            spanElementUpcoming.appendChild(spanElementSymbol);
                            spanElementUpcoming.appendChild(spanElementDegrees);
                            spanElementUpcoming.appendChild(spanElementWeather);

                            divElementForecast.appendChild(spanElementUpcoming);
                        }
                        divElementUpcoming.appendChild(divElementForecast);
                    })
                    .catch(error => displayError());
                locationInputRef.value = "";
            })
            .catch(error => displayError());
    })

    function displayError() {
        forecastDivRef.style.display = 'block';
        forecastDivRef.textContent = 'Error';
        locationInputRef.value = "";
    }
}

attachEvents();