var tempDecrease = 2;
var tempIncrease = 1;
let temperature = 40;

function decreaseTemp(value) {
    var change = value;
    if (change == "decrease") {
        temperature -= tempDecrease;
        if (temperature <= -21) {
            sessionStorage.setItem("Temperature", temperature);
            window.location.href = "EndStatistics.html";
        }
    }
    else if (change == "increase") {
        temperature += tempIncrease;
        if (temperature >= 80) {
            sessionStorage.setItem("Temperature", temperature);
            window.location.href = "EndStatistics.html";
        }
    }
    
}

function returnTemp () {
    document.getElementById("TheTemperature").innerHTML = sessionStorage.getItem("Temperature");
}