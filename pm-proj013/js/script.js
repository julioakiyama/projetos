const btnAddItem = document.querySelector('button#add-item');
const btnMinIncrease = document.querySelector('button.plus');
const btnMinDecrease = document.querySelector('button.minus');
const btnStockIncrease = document.querySelector('div#trash-plus-minus button.plus');
const btnStockDecrease = document.querySelector('div#trash-plus-minus button.minus');
const btnArrowBack = document.querySelector('#arrow');
const btnTrash = document.querySelector('#trash');
const btnSave = document.querySelector('#save-item');
const inputItem = document.querySelector('input#input-products');
const minimumStockDiv = document.querySelector('#minimum-stock');
const minimumAmount = document.querySelector('#minimum-amount');
const listItem = document.querySelector('#list-item');
const addOrDelete = document.querySelector('#trash-plus-minus');
const saveItemAmount = document.querySelector('#arrow-save-item');
let index;
const items = JSON.parse(localStorage.getItem('items')) || [];


function productList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    if (items[i].stocked <= items[i].min) {
      return `
  		<li class="minimum" data-index=${i}>${plate.li}<sup>Min ${plate.min}</sup> <span id=${i}>${plate.stocked}</span></li>
  		`
    } else {
      return `
      <li class="stocked" data-index=${i}>${plate.li}<sup>Min ${plate.min}</sup> <span id=${i}>${plate.stocked}</span></li>
      `
    }
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
  productList(items, listItem);
  save();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function inputItems() {
  minimumStockDiv.classList.remove('hidden');
}

function addItemBtn(e) {
  e.preventDefault();
  let item = capitalizeFirstLetter(inputItem .value);
  let minimumStock = minimumAmount.innerHTML;
  minimumStockDiv.classList.add('hidden');
  list = new Lists(item, minimumStock);
  inputItem.value = '';
  minimumAmount.innerHTML = 1;
  productList(items, listItem);
}

function minStockIncrease(e) {
  e.preventDefault();
  minimumAmount.innerHTML++;
  console.log('hi');
}

function minStockDecrease(e) {
  e.preventDefault();
  if (minimumAmount.innerHTML > 1) {
    minimumAmount.innerHTML--;
  }
}

function hide() {
  saveItemAmount.classList.toggle('hidden');
  addOrDelete.style.display == 'flex' ? addOrDelete.style.display = 'none' : addOrDelete.style.display = 'flex';
}

function toggle(e) {
  if (!e.target.matches('li')) return;
  const el = e.target;
  const index = el.dataset.index;
  console.log(index);
  let topOfItem = el.offsetTop;
  let heightOfItem = el.offsetHeight;
  addOrDelete.style.top = topOfItem + heightOfItem + 'px';
  hide();
  itemsIndex(index);
  save();
  productList(items, listItem);
}

function itemsIndex(i) {
  index = i;
  return index;
}

function stockIncrease() {
  items[index].stocked++;
  productList(items, listItem);
}

function stockDecrease() {
  if (items[index].stocked > 0) {
    items[index].stocked--;
  }
  productList(items, listItem);
}

function removeItem() {
  items.splice(index, 1)
  hide();
  save();
  productList(items, listItem);
}

function back(e) {
	//e.preventDefault();
	addOrDelete.style.display = 'none';
	saveItemAmount.classList.add('hidden');
}

function save() {
  localStorage.setItem('items', JSON.stringify(items));
}

btnSave.addEventListener('click', save);
btnTrash.addEventListener('click', removeItem);
btnStockDecrease.addEventListener('click', stockDecrease);
btnStockIncrease.addEventListener('click', stockIncrease);
btnMinDecrease.addEventListener('click', minStockDecrease);
btnMinIncrease.addEventListener('click', minStockIncrease);
btnArrowBack.addEventListener('click', back);
btnAddItem.addEventListener('click', addItemBtn);
inputItem.addEventListener('click', inputItems);
listItem.addEventListener('click', toggle);

productList(items, listItem);
//const eachItem = document.querySelector('#list-item li');
//let stocked = document.querySelector('#list-item li span');
