import { operate } from './calculate.js';
const MAX_DISPLAY_LENGTH = 8;

// Global variables to store the operator and the two numbers being operated on
let num1 = '0';
let num2 = '';
let operator;

// Global boolean to check whether an operator has already been inputed
let hasOperator = false;

// Global boolean to check whether the final answer has been displayed
let resultDisplayed = false;

// Global boolean to check whether a decimal point is already in the number
let hasDot = false;

const btns = document.querySelector('.button-container');
btns.addEventListener('click', (event) => {
    const display = document.querySelector('.display');

    // Update display when numbers or the 4 operations are pressed
    switch (event.target.className) {
        case 'number':
            handleNumber(event, display);
            break;

        case 'operations':
            handleOperation(event, display);
            break;

        case 'special':
            // Handle AC
            if (event.target.id === 'AC') {
                display.textContent = 0;
                clearState();
                break;
            } 

            // Handle +/-
            handleNegative(display);
            break;
        
        case 'dot':
            handleDot(display);

            break;
    }
});

function handleNumber(event, display) {
    // The final result is already displayed
    if (resultDisplayed) {
        num1 = event.target.id;
        num2 = '';
        display.textContent = num1;
        resultDisplayed = false;

    // If operator has already been inputted, the next number should be num2
    } else if (!hasOperator) {
        num1 = appendDigit(num1, event);
        display.textContent = num1;
    } else {
        num2 = appendDigit(num2, event);
        display.textContent = num2;
    }
}

function handleOperation(event, display) {
    // Reset hasDot everytime an operation occurs, since we are now on a 'new' number
    hasDot = false;

    // If equal sign is pressed, perform operation and display the result
    if (event.target.id === 'eql') {
        // Handle cases where equal sign is pressed prematurely
        if (!isValidOperation()) {
            display.textContent = 'Invalid';
            clearState();
            return;
        }

        const result = operate(parseFloat(num1), parseFloat(num2), operator);
        
        // Handle div by 0
        if (result === Infinity || isNaN(result)) {
            display.textContent = 'Billy';
            clearState();
        
        // Display result and reset state
        } else {
            display.textContent = truncateNumber(result);
            num1 = result;
            num2 = '';
            hasOperator = false;
            resultDisplayed = true;
            hasDot = false;
        }
        
    } else {
        // If the operator is already inputed and num2 has a value, evaluate the operation
        if (hasOperator && num2 !== '') {
            const result = operate(parseFloat(num1), parseFloat(num2), operator);
            display.textContent = result;
            num1 = result;
            num2 = '';
        }

        // If the result is displayed but an operation is pressed, use result as the new num1
        if (resultDisplayed) {
            num1 = display.textContent;
            num2 = '';
            resultDisplayed = false;
        }

        operator = event.target.id;
        hasOperator = true;
        display.textContent = event.target.textContent;
    }
}

function handleNegative(display) {
    if (resultDisplayed) {
        num1 = toggleNegative(num1.toString());
        display.textContent = truncateNumber(num1);
        resultDisplayed = false;

    } else if (!hasOperator) {
        num1 = toggleNegative(num1);
        display.textContent = num1;
    } else {
        num2 = toggleNegative(num2);
        display.textContent = num2;
    }
}

function handleDot(display) {
    // When result is displayed, clear the display and follow with 0.
    if (resultDisplayed) {
        num1 = '0.';
        display.textContent = num1;
        resultDisplayed = false;
        hasDot = true;;

    } else if (!hasOperator) {
        if (!hasDot && num1.length < MAX_DISPLAY_LENGTH) { 
            num1 += '.';
            display.textContent = num1;
            hasDot = true;
        }

    } else {
        if (!hasDot && num2.length < MAX_DISPLAY_LENGTH) { 
            num2 += '.';
            display.textContent = num2;
            hasDot = true;
        }
    }
}

function clearState() {
    num1 = '0';
    num2 = '';
    operator = undefined;
    hasOperator = false;
    resultDisplayed = false;
    hasDot = false;
}

function isValidOperation() {
    return num1 !== '' && num2 !== '' && operator;
}

function toggleNegative(num) {
    num = num.toString();

    if (num === '0') return num;

    if (num.startsWith('-')) {
        num = num.slice(1);
    } else if (num.length < MAX_DISPLAY_LENGTH) {
        num = '-' + num;
    }

    return num;
}

function appendDigit(num, event) {
    if (num === '0') {
        num = event.target.id;
    } else if (num.length < MAX_DISPLAY_LENGTH) { 
        num += event.target.id;
    }

    return num;
}

function truncateNumber(num) {
    // If the integer is too big, display 'too big'
    const numStr = num.toString();
    if (numStr.length > MAX_DISPLAY_LENGTH && !numStr.includes('.')) {
       num = 'too big';
       
       // Here, the number is a decimal that can be rounded
    } else {
        const digitsBeforeDP = numStr.indexOf('.');  // Get position of decimal point
        
        // If the total digits exceed MAX_DISPLAY_LENGTH, truncate after the decimal point
        if (numStr.length > MAX_DISPLAY_LENGTH) {
            const maxDigitsAfterDP = MAX_DISPLAY_LENGTH - digitsBeforeDP - 1;

            // Round to variable dp to always fit the display box
            num = Math.ceil(num * Math.pow(10, maxDigitsAfterDP)) / Math.pow(10, maxDigitsAfterDP);
        }

    }
    return num;
}