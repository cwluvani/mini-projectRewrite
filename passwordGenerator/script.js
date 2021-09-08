const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generateBtn');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//copy password
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) { return; }

    textarea.value = password;

    document.body.appendChild(textarea);
    textarea.select();
    // operate editable element
    document.execCommand('copy');  //Warning: This feature is obsolete. Although it may still work in some browsers, its use is discouraged since it could be removed at any time. Try to avoid using it.
    textarea.remove();
    alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    // data type convert
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Based on checkbox, we could have a finalPassword
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

//how to generate password from checkbox...
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]); //Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i+=typesCount) {
        typesArr.forEach(type => {
            //Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
            // 数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    return  generatedPassword.slice(0, length);
}

//fromCharCode返回由指定的 UTF-16 代码单元序列创建的 字符串。
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 20) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
