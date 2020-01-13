// Set button event listeners
const buttons = document.querySelectorAll('button');
for (let x=0; x < buttons.length; x ++) {
    buttons[x].addEventListener('click', buttonClick);
}
let decimalEnabled = true;
let lastButtonWasOperator = false;

const runningDisplay = document.getElementById('runningdisplay');
let runningDisplayString = '0';
const result = document.getElementById('result');
let resultString = '0';

function buttonClick(e) {
    if (this.value) {
        // Update the display if a number was pressed
        updateResult(this.value);
        lastButtonWasOperator = false;
    } else {
        switch (this.id) {
            case 'clear':
                clear('all');
                lastButtonWasOperator = false;
                break;
            case 'delete':
                del();
                lastButtonWasOperator = false;
                break;
            case 'decimalpoint':
                updateResult('.');
                this.removeEventListener('click', buttonClick);
                decimalEnabled = false;
                lastButtonWasOperator = false;
                break;
            case 'equals':
                updateRunningDisplay(this.id);
                lastButtonWasOperator = false;
                break;
            case 'divide':
            case 'multiply':
            case 'minus':
            case 'plus':    
                updateRunningDisplay(this.id);
                lastButtonWasOperator = true;
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

function updateResult(chars) {
    if (resultString === '0') {
        if (chars === '.') {
            resultString = '0' + chars;
        } else {
            resultString = chars;
        }
    } else {
        resultString += chars;
    }
    result.textContent = resultString;
}

function updateRunningDisplay(operation) {
    operators = {'plus': '+', 'minus': '-', 'equals':'='};
    operators['divide'] = String.fromCharCode(247);
    operators['multiply'] = String.fromCharCode(215);
    if(lastButtonWasOperator) {
        runningDisplayString = runningDisplayString.slice(0,-1) + operators[operation];
        runningDisplay.textContent = runningDisplayString;
        return;
    }
    if (resultString.slice(-1) === '.') resultString = resultString.slice(0, -1);
    if (runningDisplayString === '0') {
        runningDisplayString = resultString + operators[operation];
    } else {
        runningDisplayString += resultString + operators[operation];
    }
    runningDisplay.textContent = runningDisplayString;
    clear('result');

}

function clear(scope) {
    if (scope === 'all') {
        runningDisplayString = '0';
        resultString = '0';
        runningDisplay.textContent = runningDisplayString;
        result.textContent = resultString;
        enableDecimal();
    } else if (scope === "result") {
        resultString = '0';
        result.textContent = resultString
        enableDecimal();
    }
}

function del() {
    if (resultString !== '0') {
        if (resultString[resultString.length -1] === '.') enableDecimal();
        let newResultString = (resultString.slice(0, -1));
        if(newResultString.length === 0) newResultString = '0';
        resultString = '0';
        updateResult(newResultString);
    }
}