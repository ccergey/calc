let btns = document.querySelectorAll('.btn');
let screen = document.querySelector('.screen');

let num = 0;
let operand = '';
let operandFlag = false;
let result = false;
let dotFlag = false;
let res = 0;
let txt = '';
let memory = 0;

const maxLenghtScreen = 13;

btns.forEach(item => {
    item.addEventListener('click', (e) => {
        let type = item.dataset.type;
        // console.log(type);
        switch (type) {
            case 'number':
                let valBtn = item.innerHTML;
                let screenText = getDataScreen();

                if (screenText === 'ERROR')
                    return;

                if (result == true) {
                    screenText = '';
                    result = false;
                }

                let screenInt = +screenText;

                if (screenInt === 0) {
                    screenText = '';
                }

                if (operandFlag) {
                    num = screenInt;
                    operandFlag = false;
                    txt = valBtn;
                } else {
                    txt = screenText + valBtn;
                }

                setDataScreen(txt);

                break;

            case 'reset':
                setDataScreen(0);
                operandFlag = false;
                result = false;
                dotFlag = false;
                num = 0;
                break;

            case 'back':
                if (result === true || operandFlag === true)
                    return;
                let stringScreen = getDataScreen().slice(0, -1);
                if (stringScreen.length === 0) {
                    stringScreen = 0;
                }
                setDataScreen(stringScreen);
                break;

            case 'operand':
                operand = item.innerHTML;

                operandFlag = true;
                dotFlag = false;
                break;

            case 'result':
                let num1 = +num;
                let num2 = +getDataScreen();

                if (result === true)
                    return;

                result = true;

                switch (operand) {
                    case '+':
                        res = num1 + num2;
                        break;
                    case '-':
                        res = num1 - num2;
                        break;
                    case '×':
                        res = num1 * num2;
                        break;
                    case '/':
                        if (num2 === 0) {
                            res = 'ERROR!!';
                        } else {
                            res = num1 / num2;
                        }
                        break;
                }
                res = +res.toFixed(10);

                if ((String(res).length > maxLenghtScreen) && (operand != '/')) {
                    res = 'ERROR!!!';
                }

                setDataScreen(res);
                operandFlag = false;
                num = 0;
                dotFlag = false;
                break;

            case 'change':
                if (result === true)
                    return;

                setDataScreen(-1 * getDataScreen());

                break;

            case 'dot':
                if (dotFlag === true) {
                    return;
                }

                dotFlag = true;
                let screenTxt = getDataScreen();

                txt = screenTxt + '.';
                setDataScreen(txt);

                break;
                /*            
                            case 'memory':

                                break;
                */
            default:
                txt = 'ERROR!';
                setDataScreen(txt);
        }

    })
});

function getDataScreen() {
    return screen.textContent;
}

function setDataScreen(text) {
    if (text.length > maxLenghtScreen) {
        text = 'ERROR';
    }
    screen.textContent = text;
}