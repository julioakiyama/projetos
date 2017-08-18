document.querySelector('#result').classList.add('hidden');


//calculate BMI and show the results
var calcBMI = function () {
  'use strict';
  var height, weight, calculate, result, msg, p;
  height = document.querySelector('#height').value.replace(/,/g, ".");
  weight = document.querySelector('#weight').value.replace(/,/g, ".");
  calculate = weight / (height * height);
  result = calculate.toFixed(2);
  msg = document.querySelector('h1');
  p = document.querySelector('p');
  document.querySelector('button').classList.add('hidden');
  document.querySelector('#result').classList.remove('hidden');
  msg.textContent = result;
  
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


//checking the inputs for undefined, '', null
function checkInput() {
  'use strict';
  var inputText, letters, i;
  inputText = document.getElementsByTagName('input');
  //var letters = /^[a-zA-Z]+$/;
  letters = /^[azAZ!@#$%\^&*)(+=_]*$/;
  
  for (i = 0; i < inputText.length; i += 1) {
    if ((inputText[i].value === '') || (inputText[i].value <= 0) || (inputText[i].value.match(letters)) || (isNaN(inputText[i].value.replace(/,/g, ".")))) {
      inputText[i].focus();
      
      document.querySelector('button').classList.remove('hidden');
      document.querySelector('#result').classList.add('hidden');
      return false;
    } else {
      calcBMI();
    }
  }
}


//Just saying bye-bye
document.querySelector('#result').addEventListener('click', function () {
  'use strict';
  var inputHeight, inputWeight;
  inputHeight = document.querySelector('#height');
  inputWeight = document.querySelector('#weight');
  
  if (inputHeight.value !== '') {
    inputHeight.value = 'Playcode';
  }
  
  if (inputWeight.value !== '') {
    inputWeight.value = 'Makers';
  }
  document.querySelector('button').classList.remove('hidden');
  document.querySelector('#result').classList.add('hidden');
});


document.querySelector('button').addEventListener('click', checkInput);







