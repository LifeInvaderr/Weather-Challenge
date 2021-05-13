$(document).ready(function () {

    // API key
    var apiKey = "17d8a2c1551299169e5ab5c406cb1540"

    // DOM elements
    var cityEl = $("#city-input");
    var searchFieldEl = $("#search-field");
    var submitEl = $("#sbmt-btn")

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









    // var iconcode = a.weather[0].icon;
    // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    // $('#wicon').attr('src', iconurl);

    var getWeather = function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=17d8a2c1551299169e5ab5c406cb1540")
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        console.log(data)
                        generateCurrentWeath(data)
                    })
            });
    };

    // getWeather();


    function generateCurrentWeath(data) {
        // var icon = $('<img src="https://openweathermap.org/img/wn/" +"01d" + ".png"></img>')
        $(".panel-heading").text(data.name)
        // $(".field").append(icon)

        var iconcode = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"
        var icon = $("<img>")
        icon.attr("src", iconurl)

        // $(".field").append(icon)


        console.log(iconcode);
        console.log
    }






























})