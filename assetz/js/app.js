$(function(){

    $("#forecast-submit").on("click", function(e) {
        e.preventDefault();
        $("#forecast-notifications").css("color", "#777");
        if ($("#city-input").val() == "") {
            $("#forecast-notifications").html("Please insert a city name.");
        } else {
            $("#forecast-notifications").html("Just a sec. <i class=\"fa fa-circle-o-notch fa-spin\" aria-hidden=\"true\"></i>");
            var city = $("#city-input").val();
            
            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: 'http://localhost:4000/forecast?city=' + city,                      
                success: function(data) {
                    data = JSON.parse(data);
                    console.log(data);

                    if (data["status"] == "error" || !data["data"]["query"]["results"]) {
                        $("#forecast-notifications").css("color", "red").html("There was an error :(   I swear it worked on my pc.<br>Either that or you just made up a city name");
                    } else {
                        var location = data["data"]["query"]["results"]["channel"]["location"];
                        var conditions = data["data"]["query"]["results"]["channel"]["item"];
                        var forecast = conditions["forecast"];

                        $("#forecast-notifications").html("");

                        $("#country").text(location.country);
                        $("#region").text(location.region);
                        $("#city").text(location.city);

                        $("#temperature-now").text(convertFahrenheitToDegrees(conditions["condition"]["temp"]));
                        $("#weather-now-img").attr("src","http://l.yimg.com/a/i/us/we/52/" + conditions["condition"]["code"] + ".gif");

                        var index = 0;
                        $(".forecast").each(function(){
                            $(this).find(".forecast-day").text(forecast[index]["day"] + " - " + forecast[index]["date"]);
                            $(this).find(".forecast-temp-high").text(convertFahrenheitToDegrees(forecast[index]["high"]));
                            $(this).find(".forecast-temp-low").text(convertFahrenheitToDegrees(forecast[index]["low"]));
                            $(this).find(".forecast-condition").text(forecast[index]["text"]);
                            $(this).find(".forecast-img").attr("src", "http://l.yimg.com/a/i/us/we/52/" + forecast[index]["code"] + ".gif");

                            index++;
                        });

                        $("#results-container").css("display", "inherit");
                    }
                }
            });
        }
    });

    $("#city-input").keypress(function (e) {
        if (e.which == 13) {
            $("#forecast-submit").click();
        }
    });

});

function convertFahrenheitToDegrees(val) {
    return parseInt((val-32)*5/9);
}