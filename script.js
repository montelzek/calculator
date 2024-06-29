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
        const buttonText = button.textContent;

        if (buttonText === 'AC') {
            history = '';
            result = '0';
        } else if (buttonText === 'DEL') {
            result = result.slice(0, -1) || '0';
        } else if (buttonText === '=') {
            try {
                result = eval(history + result);
                history = '';
            } catch {
                result = 'Error';
            }
        } else if (['+', '-', '*', '÷'].includes(buttonText)) {
            if (result && !['+', '-', '*', '/'].includes(history.slice(-1))) {
                history += result + (buttonText === '÷' ? '/' : buttonText);
                result = '';
            }
        } else {
            if (result === '0') {
                result = buttonText;
            } else {
                result += buttonText;
            }
        }

        updateDisplay();
    });
});

updateDisplay();
