

document.querySelector('#result').style.display = 'none';
//var height, weight, calculate, result, msg;


//calculate BMI and show the results
var calcBMI = function() {
  var height = document.querySelector('#height').value.replace(/,/g, ".");
  var weight = document.querySelector('#weight').value.replace(/,/g, ".");
  var calculate = weight / (height * height);
  var result = calculate.toFixed(2);
  var msg = document.querySelector('#result');
  
 
  if (result <= 16) {
    msg.innerHTML = "<img src= 'img/shape.png'>";
    msg.innerHTML += '<h1>' + result + '</h1>';
    msg.innerHTML += '<p>Magresa Grave</p>';
    document.querySelector('button').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
  } else if (result > 16 && result <= 17) {
    msg.innerHTML = "<img src= 'img/shape.png'>";
    msg.innerHTML += '<h1>' + result + '</h1>';
    msg.innerHTML += '<p>Magresa Moderada</p>';
    document.querySelector('button').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
  } else if (result > 17 && result <= 18.5) {
    msg.innerHTML = "<img src= 'img/shape.png'>";
    msg.innerHTML += '<h1>' + result + '</h1>';
    msg.innerHTML += '<p>Magresa Leve</p>';
    document.querySelector('button').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
  } else if (result > 18.5 && result <= 25) {
    msg.innerHTML = "<img src= 'img/shape.png'>";
    msg.innerHTML += '<h1>' + result + '</h1>';
    msg.innerHTML += '<p>Saudavél</p>'; 
    document.querySelector('button').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
  } else if (result > 25 && result <= 30) {
    msg.innerHTML = "<img src= 'img/shape.png'>";
    msg.innerHTML += '<h1>' + result + '</h1>';
    msg.innerHTML += '<p>Sobre Peso</p>'; 
    document.querySelector('button').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
  } else if (result > 30 && result <= 35) {
    msg.innerHTML = "<img src= 'img/shape.png'>";
    msg.innerHTML += '<h1>' + result + '</h1>';
    msg.innerHTML += '<p>Obeso</p>'; 
    document.querySelector('button').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
  } else if (result > 35 && result <= 40) {
    msg.innerHTML = "<img src= 'img/shape.png'>";
    msg.innerHTML += '<h1>' + result + '</h1>';
    msg.innerHTML += '<p>Obesidade Severa</p>'; 
    document.querySelector('button').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
  } else if (result > 40) {
    msg.innerHTML = "<img src= 'img/shape.png'>";
    msg.innerHTML += '<h1>' + result + '</h1>';
    msg.innerHTML += '<p>Obesidade Mórbida</p>'; 
    document.querySelector('button').style.display = 'none';
    document.querySelector('#result').style.display = 'block';
  }
};


//checking the inputs for undefined, '',NaN, null
function checkInput() {
  var inputText = document.getElementsByTagName('input');
  var letters = /^[a-zA-Z]+$/;
  
  for (var i = 0; i < inputText.length; i++) {
    if ((inputText[i].value === '') || (inputText[i].value <= 0) || (inputText[i].value.match(letters))) {
      inputText[i].focus();
      
      document.querySelector('button').style.display = 'block';
      document.querySelector('#result').style.display = 'none';
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
  document.querySelector('button').style.display = 'block';
  document.querySelector('#result').style.display = 'none';
});



document.querySelector('button').addEventListener('click', checkInput);













