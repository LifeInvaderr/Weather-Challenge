$(document).ready(function () {

    // API key
    var apiKey = "17d8a2c1551299169e5ab5c406cb1540"

    // DOM elements
    var cityEl = $("#city-input");
    var searchFieldEl = $("#search-field");
    var submitEl = $("#sbmt-btn")

    // Resource fromm https://www.youtube.com/watch?v=f3Auvf9pN6s
    searchFieldEl.submit(function (event) {
        event.preventDefault();

        // get value from input
        var cityVal = cityEl.val();
        console.log(cityVal);

        if (cityEl) {
            getWeather(cityVal);
        } else {
            alert("Please enter a city")
        }
    });

    // First fetch for current weath to get longitude and latitude
    var getWeather = function (city) {
        var weatherAPI = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey)
        fetch(weatherAPI)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        console.log(data)
                        generateCurrentWeath(data)

                        console.log(data.coord.lat)
                        console.log(data.coord.lon)

                        var latCordinate = (data.coord.lat);
                        var lonCordinate = (data.coord.lon);

                        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latCordinate + "&lon=" + lonCordinate + "&units=imperial&appid=" + apiKey)
                            .then(function (response) {
                                response.json()
                                    .then(function (newData) {
                                        console.log(newData)
                                        generateFutureWeath(newData)
                                    }
                                    )
                            })

                    });
            });
    };
    // function to grab current weather and apply to current weath card
    function generateCurrentWeath(data) {
        $(".city-name").text(data.name);
        $(".current-temp").text(data.main.temp + "°F");
        $(".current-wind").text(data.wind.speed + " MPH");
        $(".current-humidity").text(data.main.humidity);
    }

    function generateFutureWeath(newData) {

        //current weath UV index
        $(".current-uv").text(newData.current.uvi);

        // First Card

        // Second Card

        // Third Card

        // Fourth Card

        // Fifth Card





    }
});























