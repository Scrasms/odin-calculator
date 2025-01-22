export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    return a / b;
}

export function operate(a, b, operator) {
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

    return result;
}