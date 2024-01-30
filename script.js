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
     handleNumbers(event.target.value);
})
});

operators.forEach(operator => {
    operator.addEventListener('click', event => {
     handleOperators(event.target.value);
    })
});

equals.addEventListener('click', () => {
    handleEquals();
});

del.addEventListener('click', () => {
  handleDelete();
}
);

document.addEventListener('keydown', () => {
    let keyPressed = event.key;

     if (keyPressed == '0' || keyPressed == '1' || keyPressed == '2' || keyPressed == '3' || keyPressed == '4' || keyPressed == '5' || keyPressed == '6' || keyPressed == '7' || keyPressed == '8' || keyPressed == '9' ||keyPressed == '.') {
        handleNumbers(keyPressed);
    };

    if (keyPressed == '+'|| keyPressed == '-' || keyPressed == '*' || keyPressed == '/') {
        handleOperators(keyPressed);
    }

    if (keyPressed == 'Enter') {
        handleEquals();
    };

    if (keyPressed == 'Backspace') {
        handleDelete();
    }

    if (keyPressed == 'Escape') {
        reset();
    }
})

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
    if (num2 == '0') {
        disableButtons();

        return input.innerHTML = "Cannot divide by zero"
    } else {
    return num1/num2;
    }
};

function handleNumbers(num) {
    if (currentOperation.slice(-1) == '=') {
        return;
    }

    if (!operatorSign) {
        if (!decimalPresent) {
            if (!firstNum || firstNum && firstNum.slice(0,1) !== '0' || num === '.' ) {
            firstNum += num;
            currentOperation += num;
            input.innerHTML = firstNum;
            } else {
                return;
            }
        } else if (decimalPresent && num !== '.'){
            firstNum += num;
            currentOperation += num;
            input.innerHTML = firstNum;
        } else {
            return;
        }
    } else if (operatorSign) {
        if (!decimalPresent) {
            if (!secondNum || secondNum && secondNum.slice(0,1) !== '0' || num === '.' ) {
            secondNum += num;
            currentOperation += num;
            input.innerHTML = secondNum;
            } else {
                return;
            }
        } else if (decimalPresent && num !== '.') {
            secondNum += num;
            currentOperation = currentOperation +  num;
            input.innerHTML = secondNum;
        } else {
            return;
        }
    }

    if (num ==='.') {
        decimalPresent = true;
    }
};

function handleOperators(sign) {

    decimalPresent = false;

    if (firstNum === '') {
        return;
    };

    if (currentOperation.slice(-1) == sign) {
        return;
    } else if (!secondNum) {
        operatorSign = sign;
        currentOperation = firstNum + ' ' + operatorSign + ' ';
        equation.innerHTML = currentOperation;
        switchOperator(operatorSign);
    } else {
        
        currentOperation = currentOperation + ' ' + sign + ' ';
        equation.innerHTML = currentOperation;
        
        operate(Number(firstNum), Number(secondNum), currentOperator);     
        
        operatorSign = sign;
        switchOperator(operatorSign);
    }
};

function handleEquals() {

    if (equation.innerHTML.slice(-1) == '=') {
        return;
    } else if (firstNum && secondNum) {
        currentOperation = currentOperation + ' ' + '=';
        equation.innerHTML = currentOperation;
        
        operate(Number(firstNum), Number(secondNum), currentOperator);
    } else {
        return;
    }
};

function handleDelete() {
    if (!operatorSign) {
        firstNum = firstNum.slice(0,-1);
        input.innerHTML = firstNum;
    } else {
        secondNum = secondNum.slice(0,-1);
        input.innerHTML = secondNum;
    }
};

function operate(num1, num2, calculate) {
    answer = calculate(num1, num2);
    input.innerHTML = answer;

    firstNum = answer;
    secondNum = '';
    operatorSign;
    decimalPresent = false;
};

function reset() {
    
    enableButtons();

    currentOperation = '';
    firstNum = '';
    secondNum = '';
    operatorSign = '';
    currentOperator= '';
    decimalPresent = false;
    answer = '';
    
    equation.innerHTML = currentOperation;
    input.innerHTML = 0;
};

function disableButtons () {
    numbers.forEach(number => {
        number.disabled = true;
    })

    operators.forEach(operator => {
        operator.disabled = true;
    })

    del.disabled = true;
    equals.disabled = true;
};

function enableButtons () {
    numbers.forEach(number => {
        number.disabled = false;
    })

    operators.forEach(operator => {
        operator.disabled = false;
    })

    del.disabled = false;
    equals.disabled = false;
};