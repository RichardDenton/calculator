// Set button event listeners
const buttons = document.querySelectorAll('button');
for (let x=0; x < buttons.length; x ++) {
    buttons[x].addEventListener('click', buttonClick);
}
let decimalEnabled = true;

const runningDisplay = document.getElementById('runningdisplay');
let runningDisplayString = '0';
const result = document.getElementById('result');
let resultString = '0';

function buttonClick(e) {
    if (this.value) {
        // Update the display if a number was pressed
        updateResult(this.value);
    } else {
        switch (this.id) {
            case 'clear':
                clear();
                break;
            case 'delete':
                del();
                break;
            case 'divide':
                console.log('divide');
                break;
            case 'multiply':
                console.log('multiply');
                break;
            case 'minus':
                console.log('minus');
                break;
            case 'plus':
                console.log('plus');
                break;
            case 'decimalpoint':
                updateResult('.');
                this.removeEventListener('click', buttonClick);
                decimalEnabled = false;
                break;
            case 'equals':
                console.log('equals');
                break;
        }
    }
}

function enableDecimal() {
    if (decimalEnabled === false) {
        const decimalButton = document.getElementById('decimalpoint');
        decimalButton.addEventListener('click', buttonClick);
        decimalEnabled = true;
    }
}

function updateResult(num) {
    if (resultString === '0') {
        resultString = num;
        result.textContent = num;
    } else {
        resultString += num;
        result.textContent = resultString;
    }
}

function clear() {
    runningDisplayString = '0';
    resultString = '0';
    runningDisplay.textContent = '0';
    result.textContent = '0';
    enableDecimal();
}

function del() {
    if (resultString !== '0') {
        if (resultString[resultString.length -1] === '.') enableDecimal();
        let newResultString = (resultString.slice(0, resultString.length - 1));
        if(newResultString.length === 0) newResultString = '0';
        resultString = '0';
        updateResult(newResultString);
    }
}