/********************
Last names: Paingan
Language: Javascript
Paradigm(s): Object-Oriented and Procedural Programming
********************/

//Library for easier user input
const prompt = require('prompt-sync')();

// --- Global Data ---

//Account Object
let account = {
    name: null,
    balance: 0,
    currency: "PHP"
};

//ExchangeRate Object
let exchangeRates = {
    PHP: 1,    // base currency
    USD: 52,
    JPY: 0.46,
    GBP: 65,
    EUR: 56,
    CNY: 7.8
};

// --- Functions ---
function optionMenu(){
    let response = prompt('Back to Main Menu [Y/N]')
    return response === 'N';
}

function registerAccount(name) {
    account.name = name;
    console.log('Account Registration Successful!\n')
}

function deposit(value, currency) {
    let computedDeposit = value * exchangeRates[currency];
    account.balance += computedDeposit;
    console.log(`${currency}`+ ' ' + `${computedDeposit.toFixed(2)} has been deposited to your account!`);
    console.log(`Current Account Balance: ${account.balance.toFixed(2)}\n`);
}

function withdraw(value, currency) {
    let computedWithdrawal = value * exchangeRates[currency];
    account.balance -= computedWithdrawal;
    console.log(`${currency} ${computedWithdrawal.toFixed(2)} has been withdrawn from your account!`);
    console.log(`Current Account Balance: ${account.balance.toFixed(2)}\n`);
}


function currencyExchange() {
    console.log('Foreign Currency Exchange\n');

    console.log('Source Currency Options:');
    console.log('[1] Philippine Peso (PHP)');
    console.log('[2] United States Dollar (USD)');
    console.log('[3] Japanese Yen (JPY)');
    console.log('[4] British Pound Sterling (GBP)');
    console.log('[5] Euro (EUR)');
    console.log('[6] Chinese Yuan Renminni (CNY)\n');

    const prompt = require('prompt-sync')();
    let sourceChoice = Number(prompt('Source Currency: '));

    let sourceCurrency;
    switch(sourceChoice) {
        case 1: sourceCurrency = 'PHP'; break;
        case 2: sourceCurrency = 'USD'; break;
        case 3: sourceCurrency = 'JPY'; break;
        case 4: sourceCurrency = 'GBP'; break;
        case 5: sourceCurrency = 'EUR'; break;
        case 6: sourceCurrency = 'CNY'; break;
        default:
            console.log("Invalid source currency!");
            return;
    }

    let amount = Number(prompt('Amount: '));
    if(isNaN(amount) || amount <= 0) { //checks if its a number and more than 0
        console.log("Invalid amount!");
        return;
    }

    console.log('\nTarget Currency Options:');
    console.log('[1] Philippine Peso (PHP)');
    console.log('[2] United States Dollar (USD)');
    console.log('[3] Japanese Yen (JPY)');
    console.log('[4] British Pound Sterling (GBP)');
    console.log('[5] Euro (EUR)');
    console.log('[6] Chinese Yuan Renminni (CNY)\n');

    let targetChoice = Number(prompt('Target Currency: '));

    let targetCurrency;
    switch(targetChoice) {
        case 1: targetCurrency = 'PHP'; break;
        case 2: targetCurrency = 'USD'; break;
        case 3: targetCurrency = 'JPY'; break;
        case 4: targetCurrency = 'GBP'; break;
        case 5: targetCurrency = 'EUR'; break;
        case 6: targetCurrency = 'CNY'; break;
        default:
            console.log("Invalid target currency!");
            return;
    }

    // Conversion: first convert to PHP, then to target currency
    let amountInPHP = amount * exchangeRates[sourceCurrency];
    let exchangedAmount = amountInPHP / exchangeRates[targetCurrency];

    console.log(`\n${amount.toFixed(2)} ${sourceCurrency} = ${exchangedAmount.toFixed(2)} ${targetCurrency}\n`);
}

function recordExchangeRates() {
    console.log('Record Exchange Rate')
    console.log('[1] Philippine Peso (PHP)');
    console.log('[2] United States Dollar (USD)');
    console.log('[3] Japanese Yen (JPY)');
    console.log('[4] British Pound Sterling (GBP)');
    console.log('[5] Euro (EUR)');
    console.log('[6] Chinese Yuan Renminni (CNY)');

    const prompt = require('prompt-sync')();
    let choice = Number(prompt('Select Foreign Currency: '));

    let currencyKey;
    switch(choice) {
        case 1: currencyKey = 'PHP'; break;
        case 2: currencyKey = 'USD'; break;
        case 3: currencyKey = 'JPY'; break;
        case 4: currencyKey = 'GBP'; break;
        case 5: currencyKey = 'EUR'; break;
        case 6: currencyKey = 'CNY'; break;
        default:
            console.log("Invalid choice!");
            return;
    }

    console.log(`Current exchange rate for ${currencyKey}: ${exchangeRates[currencyKey].toFixed(2)} PHP\n`);
}

function showInterest() {
    const days = Number(prompt("Enter number of days: "));
    const annualRate = Number(prompt("Enter Interest Rate per year: "))/100;
    const currency = prompt("Enter currency: ").toUpperCase();
    let balance = account.balance; // internal balance in PHP

    console.log("Day   |     Interest    |     Balance     |");

    for (let day = 1; day <= days; day++) {
        let dailyInterest = balance * (annualRate / 365); // interest in PHP
        balance += dailyInterest; // update internal balance
        let displayBalance = balance * exchangeRates[currency]; // convert to chosen currency

        let dayStr = String(day).padEnd(5, ' ');
        let interestStr = dailyInterest.toFixed(2).padStart(15, ' ');
        let balanceStr = displayBalance.toFixed(2).padStart(15, ' ');

        console.log(`${dayStr} | ${interestStr} | ${balanceStr} |`);
    }
}

// --- Main Flow ---
function mainMenu() {
    let choice = 7;

    while (choice !== 0) {
        console.log("\nWelcome to Banking and Currency App!");
        console.log("[1] Register Account Name");
        console.log("[2] Deposit");
        console.log("[3] Withdraw");
        console.log("[4] Currency Exchange");
        console.log("[5] Record Exchange Rates");
        console.log("[6] Show Interest Computation");
        console.log("[0] Exit");

        choice = Number(prompt('Enter Choice: '));

        switch (choice) {
            case 0:
                console.log('Exiting Application...');
                break;

            case 1:
                do {
                    let name = prompt('Enter Name: ');
                    registerAccount(name);
                } while (optionMenu()); // loop until user says N
                break;

            case 2:
                do {
                    let depositAmount = Number(prompt('Enter amount to deposit: '));
                    let currency = prompt('Enter currency [PHP, USD, JPY, GBP, EUR, CNY]: ').toUpperCase();
                    deposit(depositAmount, currency);
                } while (optionMenu());
                break;

            case 3:
                do {
                    let withdrawalAmount = Number(prompt('Enter amount to withdraw: '));
                    let currency = prompt('Enter currency [PHP, USD, JPY, GBP, EUR, CNY]: ').toUpperCase();
                    withdraw(withdrawalAmount, currency);
                } while (optionMenu());
                break;

            case 4:
                do {
                    currencyExchange();
                } while (optionMenu());
                break;

            case 5:
                do {
                    recordExchangeRates();
                } while (optionMenu());
                break;

            case 6:
                do {
                    showInterest();
                } while (optionMenu());
                break;

            default:
                console.log("Invalid choice. Try again.");
        }
    }
}

// Call main (like calling main() in C)
mainMenu();
