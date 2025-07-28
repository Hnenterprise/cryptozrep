const fromDropDown = document.querySelector(".from-currency-select");
const toDropDown = document.querySelector(".to-currency-select");
const amountInput = document.querySelector(".amount");
const result = document.querySelector(".result");

const apiKey = "8b4c1ab32c1011ba51f29d73";
const countryList = {
  AED: "ae",
  AFN: "af",
  ALL: "al",
  AMD: "am",
  ANG: "an",
  AOA: "ao",
  ARS: "ar",
  AUD: "au",
  AWG: "aw",
  AZN: "az",
  BBD: "bb",
  BDT: "bd",
  BGN: "bg",
  BHD: "bh",
  BMD: "bm",
  BND: "bn",
  BOB: "bo",
  BRL: "br",
  BSD: "bs",
  BTN: "bt",
  BWP: "bw",
  BYN: "by",
  BZD: "bz",
  CAD: "ca",
  CHF: "ch",
  CLP: "cl",
  CNY: "cn",
  COP: "co",
  CRC: "cr",
  CUP: "cu",
  CZK: "cz",
  DKK: "dk",
  DOP: "do",
  DZD: "dz",
  EGP: "eg",
  ETB: "et",
  EUR: "eu",
  FJD: "fj",
  GBP: "gb",
  GEL: "ge",
  GHS: "gh",
  GMD: "gm",
  GTQ: "gt",
  GYD: "gy",
  HKD: "hk",
  HNL: "hn",
  HRK: "hr",
  HTG: "ht",
  HUF: "hu",
  IDR: "id",
  ILS: "il",
  INR: "in",
  IQD: "iq",
  IRR: "ir",
  ISK: "is",
  JMD: "jm",
  JOD: "jo",
  JPY: "jp",
  KES: "ke",
  KGS: "kg",
  KHR: "kh",
  KMF: "km",
  KRW: "kr",
  KWD: "kw",
  KYD: "ky",
  KZT: "kz",
  LAK: "la",
  LBP: "lb",
  LKR: "lk",
  LSL: "ls",
  MAD: "ma",
  MDL: "md",
  MGA: "mg",
  MKD: "mk",
  MMK: "mm",
  MNT: "mn",
  MOP: "mo",
  MRU: "mr",
  MUR: "mu",
  MVR: "mv",
  MWK: "mw",
  MXN: "mx",
  MYR: "my",
  MZN: "mz",
  NAD: "na",
  NGN: "ng",
  NIO: "ni",
  NOK: "no",
  NPR: "np",
  NZD: "nz",
  OMR: "om",
  PAB: "pa",
  PEN: "pe",
  PGK: "pg",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  PYG: "py",
  QAR: "qa",
  RON: "ro",
  RSD: "rs",
  RUB: "ru",
  RWF: "rw",
  SAR: "sa",
  SBD: "sb",
  SCR: "sc",
  SDG: "sd",
  SEK: "se",
  SGD: "sg",
  SHP: "sh",
  SLL: "sl",
  SOS: "so",
  SRD: "sr",
  STN: "st",
  SYP: "sy",
  SZL: "sz",
  THB: "th",
  TJS: "tj",
  TMT: "tm",
  TND: "tn",
  TOP: "to",
  TRY: "tr",
  TTD: "tt",
  TWD: "tw",
  TZS: "tz",
  UAH: "ua",
  UGX: "ug",
  USD: "us",
  UYU: "uy",
  UZS: "uz",
  VND: "vn",
  VUV: "vu",
  WST: "ws",
  XAF: "cm",
  XCD: "ag",
  XOF: "sn",
  YER: "ye",
  ZAR: "za",
  ZMW: "zm",
  ZWL: "zw",
};

function loadFlag(flag) {
  let flagCode = flag.value;
  let imgTag = flag.parentElement.querySelector("img");
  if (imgTag && countryList[flagCode]) {
    imgTag.src = `https://flagcdn.com/48x36/${countryList[flagCode]}.png`; /*wrap with template string*/
  }
}

[fromDropDown, toDropDown].forEach((dropdown, index) => {
  for (let currencyCode in countryList) {
    let option = document.createElement("option");
    option.value = currencyCode;
    option.text = currencyCode;
    if (index === 0 && currencyCode === "GBP") {
      option.selected = true;
    }
    if (index === 1 && currencyCode === "AUD") {
      option.selected = true;
    }
    dropdown.appendChild(option);
  }
  dropdown.addEventListener("change", () => {
    loadFlag(dropdown);
    convertCurrency();
  });
});

[amountInput, fromDropDown, toDropDown].forEach((element) => {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      convertCurrency();
    }
  });
});

// creating the convert currency function
function convertCurrency() {
  // creating references
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  // if amount field is not empbty
  let amount = amountInput.value;
  if (amount === "" || amount === "0") {
    return;
  }
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`; /* wrap with template string*/

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(amount);
      console.log(data);
      let Rate = data.conversion_rates[toCurrency];
      if (!Rate) {
        result.innerHTML = "Please select a valid currency or api error";
        return;
      }
      let convertedAmount = (amount * Rate).toFixed(2);
      result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`; /* wrap with template string*/

      loadFlag(fromDropDown);
      loadFlag(toDropDown);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      result.innerHTML = "Error fetching data. Please try again.";
    });
}
window.addEventListener("load", convertCurrency);

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }
});
