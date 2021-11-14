const rates = {};

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementBYN = document.querySelector('[data-value="BYN"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

async function getCurrencies() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await response.json();
  const result = await data;
  console.log(result);

  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;
  rates.BYN = result.Valute.BYN;

  console.log(rates);

  elementUSD.textContent = rates.USD.Value.toFixed(2)
  elementEUR.textContent = rates.EUR.Value.toFixed(2)
  elementBYN.textContent = rates.BYN.Value.toFixed(2)
  
  if (rates.USD.Value > rates.USD.Previous) {
    elementUSD.classList.add('top')
  } else {
    elementUSD.classList.add('bottom')
  }

  if (rates.EUR.Value > rates.EUR.Previous) {
    elementEUR.classList.add('top')
  } else {
    elementEUR.classList.add('bottom')
  }

  if (rates.BYN.Value > rates.BYN.Previous) {
    elementBYN.classList.add('top')
  } else {
    elementBYN.classList.add('bottom')
  }

}

getCurrencies() 

input.oninput = function () {
  result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}

select.oninput = function () {
  result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}
