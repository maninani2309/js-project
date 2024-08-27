// calculation 

document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");

    window.appendToDisplay = function(value) {
        display.value += value;
    };

    window.cleardisplay = function() {
        display.value = '';
    };

    window.calculate = function() {
        try {
            display.value = eval(display.value);
        } catch (error) {
            display.value = "Error";
        }
    };
});