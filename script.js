const historyElement = document.getElementById('history');
const resultElement = document.getElementById('result');
let history = '';
let result = '0';

function updateDisplay() {
    historyElement.textContent = history;
    resultElement.textContent = result;
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.textContent);
    });
});

document.addEventListener('keydown', (event) => {
    handleKeyboardInput(event.key);
});

function handleInput(input) {
    if (input === 'AC') {
        history = '';
        result = '0';
    } else if (input === 'DEL') {
        result = result.slice(0, -1) || '0';
    } else if (input === '=') {
        try {
            result = eval(history + result.replace('÷', '/').replace('x', '*'));
            history = '';
        } catch {
            result = 'Error';
        }
    } else if (['+', '-', '*', '÷'].includes(input)) {
        if (result && !['+', '-', '*', '/'].includes(history.slice(-1))) {
            history += result + (input === '÷' ? '/' : input);
            result = '';
        }
    } else {
        if (result === '0') {
            result = input;
        } else {
            result += input;
        }
    }

    updateDisplay();
}

function handleKeyboardInput(key) {
    if (key >= '0' && key <= '9') {
        handleInput(key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('DEL');
    } else if (key === 'Escape') {
        handleInput('AC');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput(key);
    } else if (key === '.') {
        handleInput('.');
    }
}

updateDisplay();

