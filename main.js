let btns = document.querySelectorAll('.btn');
let screen = document.querySelector('.screen');

let num = 0;
let operand = '';
let operandFlag = false;
let result = false;
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
                            // if ((res % 1 !== 0) && (String(res).length > maxLenghtScreen)) {
                            //      res = String(res).substring(0, maxLenghtScreen);
                            // }
                        }

                        break;
                }
                res = +res.toFixed(8);
                console.log(res);

                if ((String(res).length > maxLenghtScreen) && (operand != '/')) {
                    console.log(String(res).length, num1, num2, res);
                    res = 'ERROR!!!';
                }
                setDataScreen(res);
                operandFlag = false;
                num = 0;
                //result = false;
                break;

            case 'change':
                if (result === true)
                    return;

                setDataScreen(-1 * getDataScreen());

                break;

            case 'dot':
                let dot = item.innerHTML;
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