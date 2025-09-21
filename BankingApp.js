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
    console.log(`{currency} + ' ' + ${computedDeposit.toFixed(2)} has been deposited to your account!`);
    console.log(`Current Account Balance: ${account.balance.toFixed(2)}\n`);
}

function withdraw(value, currency) {
    let computedWithdrawal = value * exchangeRates[currency];
    account.balance -= computedWithdrawal;
    console.log(`{currency} + ' ' + {computedWithdrawal.toFixed(2)} has been withdrawn from your account!`);
    console.log(`Current Account Balance: ${account.balance.toFixed(2)}\n`);
}

function recordExchangeRates() {
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

function currencyExchange() {
    console.log("Currency Exchange...");
    // logic here
}

function showInterest() {
    console.log("Show Interest...");
    // logic here
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
                    withdraw();
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
