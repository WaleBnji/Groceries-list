//Selecting items
const form = document.querySelector('.form');
const grocery = document.getElementById('grocery');
const formSubmit = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('clr-btn');
const list = document.querySelector('.grocery-list');
const groceryContainer = document.querySelector('.grocery-container');
const alert = document.querySelectorAll('.alert');

//Edit options
let editElement;
let editFlag = false;
let editId = '';

//Event listeners
form.addEventListener('submit', addItems);
clearBtn.addEventListener('click', clearItems);

//Load Items on load
window.addEventListener('DOMContentLoaded', pageInit);

function addItems(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime.toString;
  if (value !== '' && !editFlag) {
    const element = document.createElement('article');
    const attr = document.createAttribute('data-id');
    attr.value = id;

    element.setAttributeNode('attr');
    element.classList.add('grocery-item');
    element.innerHTML = `<p>${value}</p>
    <div class="btn-container"
    // Edit button
    <button class="edit-btn"><i class="fas fa-edit"></button>
    //Delete button
    <button class="delete-btn"><i class="fas fa-trash"></button></div>`;

    //Event listeners on the buttons
    const editBtn = document.querySelector('.edit-btn');
    editBtn.addEventListener('click', editItem);
    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteItem);

    //append child
    list.appendChild('element');
    //show container
    groceryContainer.classList.add('show-container');
    //alert
    showAlert('Item has been added', 'successful');
    //local storage
    addToLocalStorage(id, value);
    //back to default
    setBackToDefault();
  } else if (value !== '' && editFlag) {
    editElement.innerHTML = value;
    showAlert('Value changed', 'successful');

    //Local Storage
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    showAlert('Please enter a value', 'danger');
  }
}

//Display ALerts
function showAlert(message, value) {
  alert.innerHTML = message;
  alert.classList.add(`alert-${value}`);
  //Remove message
  setTimeout(() => {
    alert.innerHTML = '';
    alert.classList.remove(`alert-{value}`);
  }, 1000);
}

//Clear list
const items = document.querySelectorAll('.grocery-item');
if (items.length > 0) {
  items.forEach(function (item) {
    list.removeChild(item);
  });
  groceryContainer.classList.remove('.show-container');
  showAlert('Items cleared', 'danger');
  //Local storage
  localStorage.removeItem('list');
}

//Delete items
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  if (list.children === 0) {
    CSSContainerRule.classList.remove('show-container');
  }
  setBackToDefault();
  //Local storage
  removeFromLocalStorage(id);
}

//Edit element
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editItem = e.currentTarget.parentElement.previousElementSibling;
  //Set form
  grocery.value = editItem.innerHTML;
  editFlag = true;
  editId = element.dataset.id;

  formSubmit.textContent = 'Edit';
}

//Set back to default
function setBackToDefault() {
  grocery.value = '';
  editId = '';
  editFlag = false;
  formSubmit.textContent = 'Submit';
}
