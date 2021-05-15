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
        var weatherAPI = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey)
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
        $(".current-humidity").text(data.main.humidity + "%");
    }

    function generateFutureWeath(newData) {

        // Timezone plugin
        var timeZone = newData.timezone;
        console.log(timeZone)




        //current weather UV index
        $(".current-uv").text(newData.current.uvi);

        // First Card
        $(".day-one-temp").text(newData.daily[1].feels_like.day + "°F")
        $(".day-one-wind").text(newData.daily[1].wind_speed + " MPH")
        $(".day-one-humidity").text(newData.daily[1].humidity + "%")

        // Second Card
        $(".day-two-temp").text(newData.daily[2].feels_like.day + "°F")
        $(".day-two-wind").text(newData.daily[2].wind_speed + " MPH")
        $(".day-two-humidity").text(newData.daily[2].humidity + "%")

        // Third Card
        $(".day-three-temp").text(newData.daily[3].feels_like.day + "°F")
        $(".day-three-wind").text(newData.daily[3].wind_speed + " MPH")
        $(".day-three-humidity").text(newData.daily[3].humidity + "%")

        // Fourth Card
        $(".day-four-temp").text(newData.daily[4].feels_like.day + "°F")
        $(".day-four-wind").text(newData.daily[4].wind_speed + " MPH")
        $(".day-four-humidity").text(newData.daily[4].humidity + "%")

        // Fifth Card

        $(".day-five-temp").text(newData.daily[5].feels_like.day + "°F")
        $(".day-five-wind").text(newData.daily[5].wind_speed + " MPH")
        $(".day-five-humidity").text(newData.daily[5].humidity + "%")






    }
});























