const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const input = document.querySelector('.new-input');
const equation = document.querySelector('.equation');

let firstInput = '';
let secondInput = '';
let operatorSign = null;

numbers.forEach(number => {
    number.addEventListener('click', event => {
        if (!operatorSign) {
            firstInput += event.target.value;
            input.innerHTML = firstInput;
        } else if (operatorSign) {
            secondInput += event.target.value;
            input.innerHTML = secondInput;
        }
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', event => {
        operatorSign = event.target.value;
    })
});

equals.addEventListener('click', () => {
    operate(Number(firstInput), Number(secondInput), operatorSign);
});


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

function operate(num1, num2, operator) {
    input.innerHTML = window[operator](num1, num2);

    firstInput = '';
    secondInput = '';
    operatorSign = null;
};

