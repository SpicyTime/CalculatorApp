const display = document.getElementById("display");
const RPNTesterLabel = document.getElementById("RPN-tester")
var prevCalculated = false;
var operators = ["+", "-", "*", "/", "(", ")", "^", "sin", "cos", "tan"];

function appendToDisplay(input){
    if (!prevCalculated){
        display.value += input;
    }else{
        display.value = input;
        prevCalculated = false;
    }
}

function tokenizeDisplay(){
    let tokens = new Array();
    let characterBuffer = [];
    for (let character of display.value){
        characterBuffer.push(character);
        if (operators.includes(character)) {
            characterBuffer.pop();
            tokens.push(characterBuffer.join(""));
            characterBuffer = [];
            tokens.push(character);
        }
        
    }
    tokens.push(characterBuffer.join());
    return tokens;
}

function evalRPN(tokens){
    let stack = new Array();
    for (let token of tokens){
        if (!operands.includes(token)){

        }else{

        }
    }
}

function convertToRPN(tokens){
    let RPNConverted = new Array();
    let shuntingYard = new Array();

    for (let token of tokens){
        if (operators.includes(token)){
            shuntingYard.push(token);
            if (shuntingYard.length > 1){
                RPNConverted.push(shuntingYard.pop());
            }
        }else{
            RPNConverted.push(token);
        }
    }
    for (let operator of shuntingYard){
        RPNConverted.push(shuntingYard.pop());
    }
    return RPNConverted;
}

function calculate(){
    let tokens = tokenizeDisplay();
    let rpn = convertToRPN(tokens);
    RPNTesterLabel.textContent = tokens.join();
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = "ERROR";
    }
    prevCalculated = true
}
function clearDisplay(){
    display.value = "";
}