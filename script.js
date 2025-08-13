const display = document.getElementById("display");
var prev_calculated = false
function appendToDisplay(input){
    if (!prev_calculated){
        display.value += input;
    }else{
        display.value = input;
        prev_calculated = false;
    }
}
function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = "ERROR";
    }
    prev_calculated = true
}
function clearDisplay(){
    display.value = "";
}