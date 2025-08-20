const display = document.getElementById("display");
const RPNTesterLabel = document.getElementById("RPN-tester")
var prevCalculated = false;
var operators = ["+", "-", "*", "/", "(", ")", "^", "sin", "cos", "tan"];
var errored = false;
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
    let characterBuffer = new Array();
    for (let character of display.value){
        characterBuffer.push(character);
        if (operators.includes(character)) {
            characterBuffer.pop();
            tokens.push(characterBuffer.join(""));
            tokens.push(character);
            characterBuffer = [];
        }
        
    }
    tokens.push(characterBuffer.join(""));
    return tokens;
}

function evalExpression(string_num1, string_num2, operator){
    let num1 = parseFloat(string_num1);
    let num2 = parseFloat(string_num2);

    switch(operator){
        case"+":
            return num1 + num2;
        case"-":
            return num2 - num1;
        case"*":
            return num1 * num2;
        case"/":
            try{
                return num2 / num1;
            }
            catch{
                errored = true;
            }
        default:
            errored = true;
        
    }
}

function evalRPN(tokens){
    let stack = new Array();
    for (let token of tokens){
        if (operators.includes(token)){
            const num1 = stack.pop();
            const num2 = stack.pop();
            
            stack.push(evalExpression( num1, num2, token).toString())
        }else{
            stack.push(token);
        }
    }

    return stack[0];
}

function getPrecedence(op) {
    switch (op) {
        case '+':
        case '-': return 1;
        case '*':
        case '/': return 2;
        case '^': return 3;
        default: return 0;
    }
}

function convertToRPN(tokens) {
    const output = [];
    const stack = [];
    
    for (let token of tokens) {
        if (!operators.includes(token)) {
            output.push(token);
        } else {
            while (
                stack.length && getPrecedence(token) <= getPrecedence(stack[stack.length - 1])
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }

    while (stack.length) {
        output.push(stack.pop());
    }

    return output;
}

function calculate(){
    let tokens = tokenizeDisplay();
    let rpnTokens = convertToRPN(tokens);
    try{
        display.value = evalRPN(rpnTokens);
    }
    catch{
        display.value = "ERROR";
    }
    if (errored){
        display.value = "ERROR";
    }
    prevCalculated = true
}

function clearDisplay(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0, -1);
}