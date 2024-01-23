const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const input = document.querySelector('.new-input');
const equation = document.querySelector('.equation');

let currentOperation = '';
let firstNum = '';
let secondNum = '';
let operatorSign;
let currentOperator;
let decimalPresent = false;
let answer;


numbers.forEach(number => {
    number.addEventListener('click', event => {        
        if (!operatorSign) {
            if (!decimalPresent) {
            firstNum += event.target.value;
            input.innerHTML = firstNum;
            currentOperation += firstNum;
            } else if (decimalPresent && event.target.value !== '.'){
                firstNum += event.target.value;
                input.innerHTML = firstNum;
                currentOperation += firstNum;
            } else {
                return;
            }
        } else if (operatorSign) {
            if (!secondNum) {
                secondNum = event.target.value;
                input.innerHTML = secondNum;
                currentOperation = currentOperation + ' ' + secondNum;
            } else {
                secondNum += event.target.value;
                input.innerHTML = secondNum;
                currentOperation += event.target.value;
            }
        }

        if (event.target.value ==='.') {
            decimalPresent = true;
        }
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', event => {
        
        if (currentOperation.slice(-1) == event.target.value) {
            return;
        } else if (!secondNum) {
            operatorSign = event.target.value;
            currentOperation = firstNum + ' ' + operatorSign;
            equation.innerHTML = currentOperation;
            switchOperator(operatorSign);
        } else {
            
            currentOperation = currentOperation + ' ' + event.target.value;
            equation.innerHTML = currentOperation;
            
            operate(Number(firstNum), Number(secondNum), currentOperator);     
            
            operatorSign = event.target.value;
            switchOperator(operatorSign);
        }
    
    })
});

equals.addEventListener('click', () => {

    if (equation.innerHTML.slice(-1) == '=') {
        return;
    } else {
        equation.innerHTML = firstNum + ' ' + operatorSign + ' ' + secondNum + ' =';
        
        operate(Number(firstNum), Number(secondNum), currentOperator);
    }

});

clear.addEventListener('click', reset);

function switchOperator(op) {
    switch (op) {
        case "/":
            currentOperator = divide;
            break;
        case "x":
            currentOperator = multiply;
            break;
        case "-":
            currentOperator = subtract;
            break;
        case "+":
            currentOperator = add;
            break;        
    }
};

function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1/num2;
};

function handleNumbers() {
    
}

function operate(num1, num2, calculate) {
    answer = calculate(num1, num2);
    input.innerHTML = answer;

    firstNum = answer;
    secondNum = '';
    operatorSign;
    decimalPresent = false;
};

function reset() {
    currentOperation = '';
    firstNum = '';
    secondNum = '';
    operatorSign = null;
    currentOperator = '';
    decimalPresent = false;
    answer;
    
    equation.innerHTML = currentOperation;
    input.innerHTML = 0;
}