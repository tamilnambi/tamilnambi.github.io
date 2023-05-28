var number = "";
var operator = null;
var calc = [];
function add() {
  var x = Number(document.getElementById("first").value);
  var y = Number(document.getElementById("second").value);

  document.getElementById("result").value = x + y;
}

function sub() {
  var x = Number(document.getElementById("first").value);
  var y = Number(document.getElementById("second").value);

  document.getElementById("result").value = x - y;
}

function multi() {
  var x = Number(document.getElementById("first").value);
  var y = Number(document.getElementById("second").value);

  document.getElementById("result").value = x * y;
}

function divide() {
  var x = Number(document.getElementById("first").value);
  var y = Number(document.getElementById("second").value);

  document.getElementById("result").value = x / y;
}
function ac() {
    number="";
    document.getElementById("display").value = number;
}
function addOne() {
  number = number + document.getElementById("one").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addTwo() {
  number = number + document.getElementById("two").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addThree() {
  number = number + document.getElementById("three").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addFour() {
  number = number + document.getElementById("four").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addFive() {
  number = number + document.getElementById("five").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addSix() {
  number = number + document.getElementById("six").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addSeven() {
  number = number + document.getElementById("seven").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addEight() {
  number = number + document.getElementById("eight").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addNine() {
  number = number + document.getElementById("nine").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addZero() {
  if (number != "0") number = number + document.getElementById("zero").value;
  console.log(number);
  document.getElementById("display").value = number;
}
function addDot() { 
  document.getElementById("display").value = number + ".";
  number = number + document.getElementById("dot").value;
  console.log(number);
}
function negate() {
    if(number.slice(0,1) === "-")
        number = number.substring(1);
    else
        number = "-" + number;
    document.getElementById("display").value = number;
}
function addition() {
  operator = "+";
  arrayAdd(operator);
}
function subtract() {
  operator = "-";
  arrayAdd(operator);
}
function multiply() {
  operator = "*";
  arrayAdd(operator);
}
function division() {
  operator = "/";
  arrayAdd(operator);
}
function percentage() {
  operator = "%";
  arrayAdd(operator);
}
function arrayAdd() {
  calc.push(number);
  calc.push(operator);
  number = "";
  document.getElementById("display").value = number;
}
function equalTo() {
  for(let i = 0; i < calc.length; i++)
  {
    operator = calc.pop();
  var tempNumber = parseFloat(calc.pop());
  console.log(tempNumber);
  if (operator == "+") {
    number = tempNumber + parseInt(number);
  } else if (operator == "-") {
    number = tempNumber - parseInt(number);
  } else if (operator == "*") {
    number = tempNumber * parseInt(number);
  } else if (operator == "/") {
    number = tempNumber / parseInt(number);
  } else if (operator == "%") {
    number = tempNumber / 100;
  }
  }
  document.getElementById("display").value = number;
}
function cryptoINR() {
  var inr = parseFloat(document.getElementById("inr").value);
  var usd = inr * 0.012;
  document.getElementById("usd").value = usd;
  document.getElementById("btc").value = usd * 0.000037;
  document.getElementById("eth").value = usd * 0.00054;
  document.getElementById("doge").value = usd * 13.69;
  document.getElementById("sol").value = usd * 0.0513;
}
function cryptoUSD() {
  var usd = parseFloat(document.getElementById("usd").value);
  var inr = usd / 0.012;
  document.getElementById("inr").value = inr;
  document.getElementById("btc").value = usd * 0.000037;
  document.getElementById("eth").value = usd * 0.00054;
  document.getElementById("doge").value = usd * 13.69;
  document.getElementById("sol").value = usd * 0.0513;
}
function cryptoBTC() {
  var btc = parseFloat(document.getElementById("btc").value);
  var usd = btc / 0.000037;
  var inr = usd / 0.012;
  document.getElementById("inr").value = inr;
  document.getElementById("usd").value = usd;
  document.getElementById("eth").value = usd * 0.00054;
  document.getElementById("doge").value = usd * 13.69;
  document.getElementById("sol").value = usd * 0.0513;
}
function cryptoETH() {
  var eth = parseFloat(document.getElementById("eth").value);
  var usd = eth / 0.00054;
  var inr = usd / 0.012;
  document.getElementById("inr").value = inr;
  document.getElementById("usd").value = usd;
  document.getElementById("btc").value = usd * 0.000037;
  document.getElementById("doge").value = usd * 13.69;
  document.getElementById("sol").value = usd * 0.0513;
}
function cryptoDOGE() {
  var doge = parseFloat(document.getElementById("doge").value);
  var usd = doge / 13.69;
  var inr = usd / 0.012;
  document.getElementById("inr").value = inr;
  document.getElementById("usd").value = usd;
  document.getElementById("btc").value = usd * 0.000037;
  document.getElementById("eth").value = usd * 0.00054;
  document.getElementById("sol").value = usd * 0.0513;
}
function cryptoSOL() {
  var sol = parseFloat(document.getElementById("sol").value);
  var usd = sol / 0.0513;
  var inr = usd / 0.012;
  document.getElementById("inr").value = inr;
  document.getElementById("usd").value = usd;
  document.getElementById("btc").value = usd * 0.000037;
  document.getElementById("eth").value = usd * 0.00054;
  document.getElementById("doge").value = usd * 13.69;
}