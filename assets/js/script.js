$(document).ready(function () {

    // API key
    var apiKey = "17d8a2c1551299169e5ab5c406cb1540"

    // DOM elements
    var cityEl = $("#city-input");
    var searchFieldEl = $("#search-field");
    var submitEl = $("#sbmt-btn");
    var delButton = $("#clear");

    delButton.click(function () {
        localStorage.clear();
    })



    // Local storage
    var saveCity = JSON.parse(localStorage.getItem("cityName")) || [];
    var getLocalStorage = localStorage.getItem("cityName");
    var getCity = JSON.parse(getLocalStorage);

    
    function loadData() {
        for (i = 0; i < getCity.length; i++) {
            var create = $("<button>")
            create.attr("class", "button is-light is-fullwidth")
            create.attr("type", "button")
            create.text(getCity[i])
            $(".search-history").prepend(create)
        }
    }


    // Resource fromm https://www.youtube.com/watch?v=f3Auvf9pN6s
    searchFieldEl.submit(function (event) {
        event.preventDefault();

        // get value from input
        var cityVal = cityEl.val();
        // console.log(cityVal);

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

                        // Local storage
                        if (saveCity.indexOf(data.name) == -1) {
                            saveCity.push(data.name)
                            localStorage.setItem("cityName", JSON.stringify(saveCity))
                        }

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

        //current weather UV index
        $(".current-uv").text(newData.current.uvi);
        $(".current-date").text()

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

        // Timezone plugin
        var timeZone = newData.timezone;
        console.log(timeZone)

        // moment().tz(newData.timezone).format('YYYY/MM/DD HH:mm')
        $(".current-date").text(moment().tz(timeZone).format('(DD/MM/YYYY)'))
        $(".day-one").text(moment().tz(timeZone).add(1, "days").format('DD/MM/YY'))
        $(".day-two").text(moment().tz(timeZone).add(2, "days").format('DD/MM/YY'))
        $(".day-three").text(moment().tz(timeZone).add(3, "days").format('DD/MM/YY'))
        $(".day-four").text(moment().tz(timeZone).add(4, "days").format('DD/MM/YY'))
        $(".day-five").text(moment().tz(timeZone).add(5, "days").format('DD/MM/YY'))


        $(".search-history").empty();

        loadData();
    }

    console.log(getCity)
    loadData()



});























