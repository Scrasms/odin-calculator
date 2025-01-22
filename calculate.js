function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b != 0) return a / b;
}

function operate(a, b, operator) {
    let result;
    switch (operator) {
        case 'add':
            result = add(a, b);
            break;

        case 'sub':
            result = subtract(a, b);
            break;
        
        case 'mul':
            result = multiply(a, b);
            break;

        case 'div':
            result = divide(a, b);
            break;
    }

    // Round answer to 6 d.p.
    result = Math.ceil(result * 1000000) / 1000000;
}