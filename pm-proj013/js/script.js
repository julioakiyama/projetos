const items = JSON.parse(localStorage.getItem('items')) || [];

function $(element) {
  return document.querySelector(element);
}

function productList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
		<li class="minimum" data-index=${i}>${plate.li}<sup>Min ${plate.min}</sup> <span id=${i}>${plate.stocked}</span></li>
		`;
  }).join('');
}

function Lists(li, min, stocked) {
  this.item = li;
  this.minimum = min;
  this.stocked = stocked;
  stocked = 0;
  const array = {
    li,
    min,
    stocked
  };
  items.push(array);
  productList(items, $('#list-item'));
  localStorage.setItem('items', JSON.stringify(items));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function inputItems() {
  $('#minimum-stock').classList.remove('hidden');
}

function addItemBtn(e) {
  e.preventDefault();
  let item = capitalizeFirstLetter($('input#input-products').value);
  let minimumStock = $('#minimum-amount').innerHTML;
  $('#minimum-stock').classList.add('hidden');
  console.log(item, minimumStock);
  list = new Lists(item, minimumStock);
  $('input#input-products').value = '';
  $('#minimum-amount').innerHTML = 1;
  productList(items, $('#list-item'));
}

function minStockIncrease(e) {
  e.preventDefault();
  $('#minimum-amount').innerHTML++;
  console.log('hi');
}

function minStockDecrease(e) {
  e.preventDefault();
  if ($('#minimum-amount').innerHTML > 1) {
    $('#minimum-amount').innerHTML--;
  }
}

function back(e) {
	e.preventDefault();
	$('#trash-plus-minus').classList.add('hidden');
	$('#arrow-save-item').classList.add('hidden');
}

function toggle(e) {
	console.log(e.target);
  const el = e.target;
  const index = el.dataset.index;
  let topOfItem = el.offsetTop;
  let heightOfItem = el.offsetHeight;
  if ($('#trash-plus-minus').classList.contains('hidden') && (el.style.marginBottom = '0px')) {
    $('#trash-plus-minus').classList.remove('hidden');
    el.style.marginBottom = '70px';
    $('#arrow-save-item').classList.remove('hidden');
  } else {
    $('#trash-plus-minus').classList.add('hidden');
    el.style.marginBottom = '0px';
    $('#arrow-save-item').classList.add('hidden');
  };
  $('#trash-plus-minus').style.top = topOfItem + heightOfItem + 'px';
  localStorage.setItem('items', JSON.stringify(items));
  productList(items, $('#list-item'));
}
// $('#trash-plus-minus').addEventListener('click', (e) => {
// 	if (e.target.classList.contains('plus')) {
// 		console.log('hi');
// 		items[i].stocked++;
// 		productList(items, $('#list-item'));
// 	}
// });
// }

$('button.minus').addEventListener('click', minStockDecrease);
$('button.plus').addEventListener('click', minStockIncrease);
$('#arrow').addEventListener('click', back);
$('button#add-item').addEventListener('click', addItemBtn);
$('input#input-products').addEventListener('click', inputItems);
$('#list-item').addEventListener('click', toggle);

productList(items, $('#list-item'));
