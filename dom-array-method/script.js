const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// store Person&Wealth data
let data = [];

// getRandomPerson();
// getRandomPerson();
// getRandomPerson();


//fetch random user and add money
async function getRandomPerson() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

//double money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });

    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

//sort by richest
function sortByRichest() {
    console.log(123);
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

//calculate Whole Wealth
function calculateWealth() {
    const wealth = data.reduce((accumulator, user) => accumulator + user.money, 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: 
                            <strong> ${formatMoney(wealth)} </strong>
                          </h3>`;
    main.appendChild(wealthEl);
}

//add user
function addData(obj) {
    data.push(obj);

    updateDOM();
}

function updateDOM(provideData = data) {
    //clear main div
    main.innerHTML = `<h2> 
                      <strong>Person</strong> Wealth
                      </h2>`;

    provideData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatmoney(item.money)}`;

        main.appendChild(element);
    })
}

//format number as money. -> https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listener
addUserBtn.addEventListener('click', getRandomPerson);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);