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
let items = JSON.parse(localStorage.getItem('items')) || [];


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
  const array = {
    li,
    min,
    stocked
  };
  items.push(array);
  productList(items, listItem);
  save();
}

function toggle(e) {
  if (!e.target.matches('li')) return;
  const el = e.target;
  index = el.dataset.index;
  let topOfItem = el.offsetTop;
  let heightOfItem = el.offsetHeight;
  addOrDelete.style.top = topOfItem + heightOfItem + 'px';
  showSaveAndTrashBar();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function inputItems() {
  minimumStockDiv.classList.remove('hidden');
}

function addItemBtn(e) {
  e.preventDefault();
  let item = capitalizeFirstLetter(inputItem.value);
  let minimumStock = minimumAmount.innerHTML;
  stock = 0;
  minimumStockDiv.classList.add('hidden');
  list = new Lists(item, minimumStock, stock);
  inputItem.value = '';
  minimumAmount.innerHTML = 1;
}

function minStockIncrease(e) {
  e.preventDefault();
  minimumAmount.innerHTML++;
}

function minStockDecrease(e) {
  e.preventDefault();
  if (minimumAmount.innerHTML > 1) {
    minimumAmount.innerHTML--;
  }
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
  items.splice(index, 1);
  hideSaveAndTrashBar();
  save();
  productList(items, listItem);
}

function showSaveAndTrashBar() {
  saveItemAmount.classList.remove('hidden');
  addOrDelete.style.display = 'flex';
}

function hideSaveAndTrashBar() {
  addOrDelete.style.display = 'none';
  saveItemAmount.classList.add('hidden');
}

function backToLastState(e) {
	e.preventDefault();
  hideSaveAndTrashBar();
  items = JSON.parse(localStorage.getItem('items'));
  productList(items, listItem);
}

function saveAmount(e) {
  e.preventDefault();
  hideSaveAndTrashBar();
  save();
}

function save() {
  localStorage.setItem('items', JSON.stringify(items));
}

btnSave.addEventListener('click', saveAmount);
btnTrash.addEventListener('click', removeItem);
btnStockDecrease.addEventListener('click', stockDecrease);
btnStockIncrease.addEventListener('click', stockIncrease);
btnMinDecrease.addEventListener('click', minStockDecrease);
btnMinIncrease.addEventListener('click', minStockIncrease);
btnArrowBack.addEventListener('click', backToLastState);
btnAddItem.addEventListener('click', addItemBtn);
inputItem.addEventListener('click', inputItems);
listItem.addEventListener('click', toggle);

productList(items, listItem);
