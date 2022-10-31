const paragraphPass = document.querySelector("#password");
const buttonCopy = document.querySelector("#button-copy");
const form = document.querySelector("#form");
const inputLength = document.querySelector("#input-length");
const passLength = document.querySelector("#password-length");
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];
let words = [];
const API = "https://goquotes-api.herokuapp.com/api/v1/random?count=5";

function generatePassword(passwordLength, botoncitos) {
  let arrOfArr = [];
  if(botoncitos.letters) {
    arrOfArr.push(letters)
  }
  if(botoncitos.numbers) {
    arrOfArr.push(numbers)
  }
  if(botoncitos.symbols) {
    arrOfArr.push(symbols)
  }
  if(botoncitos.words) {
    arrOfArr =  [];
    arrOfArr.push(words)
  }

  let strongPass = [];  
  
  for (let i = 0; i < passwordLength; i++){
    const myArr = arrOfArr[getRandomNumber(0, arrOfArr.length - 1)];
    const randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)]
    strongPass.push(randomCharacter)
  }
  if(botoncitos.words) {
    strongPass = strongPass.join("-");
  }
  else {
    strongPass = strongPass.join("");
  }
  
  paragraphPass.value = strongPass;
  console.log(strongPass)
}

function fetchData(API) {
  fetch(API)
    .then((response) => response.json())
    .then((data)=>{
      words = data.quotes.map((quote) => quote.text);
      words = words.join("").split("").sort();
      console.log(words)
    })
}
fetchData(API)

function getRandomNumber(min, max) {
  return Math.floor(Math.random()*(max -min + 1));
}
function copyToClipboard(target) {
  const element = document.querySelector(target);
  const value = element.value;
  if(value.length === 0) {
    alert("Tienes que generar una contraseña")
  }
  else {
    window.navigator.clipboard.writeText(value);
  }
}
buttonCopy.addEventListener("click", ()=>{
  copyToClipboard("#password")
})
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formElement = event.target;
  const passwordLength = formElement.length.value;

  const checks = {
    letters: formElement.letters.checked,
    words: formElement.words.checked,
    numbers: formElement.numbers.checked,
    symbols: formElement.symbols.checked,
  }
  if(checks.words) {
    formElement.letters.checked = false;
    formElement.numbers.checked = false;
    formElement.symbols.checked = false; 
  }
  generatePassword(passwordLength, checks);
  buttonCopy.disabled = false;
})
inputLength.addEventListener("input", (e) => {
  passLength.innerText = e.target.value;
})