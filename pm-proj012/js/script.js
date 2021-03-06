const $visor = document.querySelector('input[type="text"]');
const $buttonsNumber = document.querySelectorAll('.digit');
const $buttonClear = document.querySelector('.clearMem');
const $buttonEqual = document.querySelector('.equal');
let $value = 0;
let $displayValue = '';

Array.prototype.forEach.call($buttonsNumber, function(button) {
  button.addEventListener('click', handleClickNumber, false);
});

$buttonClear.addEventListener('click', handleClickC, false);

$buttonEqual.addEventListener('click', handleClickEqual, false);

function handleClickNumber() {
  $value += this.value;
  $displayValue = digitsToNumber($value);
  if ($buttonEqual.classList.contains('br-us')) {
    $visor.value = $displayValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  } else if ($buttonEqual.classList.contains('us-br')) {
    $visor.value = $displayValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
  $buttonEqual.classList.add('convert');
  $buttonEqual.classList.remove('select');
}

function handleClickC() {
  if ($buttonEqual.classList.contains('converted')) {
    $buttonEqual.classList.remove('converted', 'us-br');
    $buttonEqual.classList.add('select', 'br-us');
    if ($visor.classList.contains('result')) {
      $visor.classList.remove('result');
    }
  } else if ($buttonEqual.classList.contains('convert')) {
    $buttonEqual.classList.remove('convert');
    $buttonEqual.classList.add('select')
  }
  $value = $visor.value = 0;
}

function handleClickEqual() {
  if ($buttonEqual.classList.contains('select')) {
    if ($buttonEqual.classList.contains('br-us')) {
      $buttonEqual.classList.remove('br-us');
      $buttonEqual.classList.add('us-br');
    } else {
      $buttonEqual.classList.remove('us-br');
      $buttonEqual.classList.add('br-us');
    }
  } else if ($buttonEqual.classList.contains('convert')) {
    $buttonEqual.classList.remove('convert')
    $buttonEqual.classList.add('converted')
    if ($buttonEqual.classList.contains('converted')) {
      if ($buttonEqual.classList.contains('br-us')) {
        $buttonEqual.classList.remove('br-us');
        $buttonEqual.classList.add('us-br');
      } else if ($buttonEqual.classList.contains('us-br')) {
        $buttonEqual.classList.remove('us-br');
        $buttonEqual.classList.add('br-us');
      }
        gotData($displayValue);
    }
  }
}

function gotData($displayValue) {
  const request = new XMLHttpRequest();
  const requestURL = 'https://api.fixer.io/latest?base=USD';
  request.open('GET', requestURL);
  request.send();
  request.onload = function () {
  const data = JSON.parse(request.responseText);
  let usd$ = data.rates.BRL;
    if ($buttonEqual.classList.contains('us-br')) {
      const result = $displayValue / usd$;
      $visor.value = result.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
      $visor.classList.add('result');
    } else if ($buttonEqual.classList.contains('br-us')) {
        const result = $displayValue * usd$;
        $visor.value = result.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        $visor.classList.add('result');
    }
  }
}

function digitsToNumber(digits) {
  const sizeFirstDigits = (digits.length -2);
  const firstDigits = digits.substr(0, sizeFirstDigits);
  const  lastDigits = digits.substr(-2);
  return parseFloat(firstDigits + '.' + lastDigits);
}
