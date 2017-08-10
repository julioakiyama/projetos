document.querySelector('#result').classList.add('hidden');
//var height, weight, calculate, result, msg;

document.querySelector('button').addEventListener('click', checkInput);


//calculate BMI and show the results
var calcBMI = function() {
  var height = document.querySelector('#height').value.replace(/,/g, ".");
  var weight = document.querySelector('#weight').value.replace(/,/g, ".");
  var calculate = weight / (height * height);
  var result = calculate.toFixed(2);
  var msg = document.querySelector('h1');
  var p = document.querySelector('p');
  document.querySelector('button').classList.add('hidden');
  document.querySelector('#result').classList.remove('hidden');
  msg.textContent = result ; 
  
  if (result <= 16) {
    p.textContent = 'Magresa Grave';
  } else if (result > 16 && result <= 17) {
    p.textContent = 'Magresa Moderada';
  } else if (result > 17 && result <= 18.5) {
    p.textContent = 'Magresa Leve';
  } else if (result > 18.5 && result <= 25) {
    p.textContent = 'Saudavél'; 
  } else if (result > 25 && result <= 30) {
    p.textContent = 'Sobre Peso'; 
  } else if (result > 30 && result <= 35) {
    p.textContent = 'Obeso'; 
  } else if (result > 35 && result <= 40) {
    p.textContent = 'Obesidade Severa'; 
  } else if (result > 40) {
    p.textContent = 'Obesidade Mórbida'; 
  }
};


//checking the inputs for undefined, '',NaN, null
function checkInput() {
  var inputText = document.getElementsByTagName('input');
  var letters = /^[a-zA-Z]+$/;
  //var letters = /^[a-zA-Z!@#$%\^&*)(+=_-]*$/;
  
  for (var i = 0; i < inputText.length; i++) {
    if ((inputText[i].value === '') || (inputText[i].value <= 0) || (inputText[i].value.match(letters))) {
      inputText[i].focus();
      
      document.querySelector('button').classList.remove('hidden');
      document.querySelector('#result').classList.add('hidden');
      return false;
    }  else {
        calcBMI();
    }
  }
}


//Just saying bye-bye
document.querySelector('#result').addEventListener('click', function(){
  var inputHeight = document.querySelector('#height');
  var inputWeight = document.querySelector('#weight');
  
  if  (inputHeight.value !== ''){
    inputHeight.value = 'Playcode';
  } 
  
  if (inputWeight.value !== ''){
    inputWeight.value = 'Makers';
  }
  document.querySelector('button').classList.remove('hidden');
  document.querySelector('#result').classList.add('hidden');
});










