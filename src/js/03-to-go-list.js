import shortid from "shortid";
const formEl = document.querySelector(".form");
const listEl = document.querySelector(".list");
const textareaEl = document.querySelector("#textarea");
const KEY = "toDoKey";
let toDoItem = JSON.parse(localStorage.getItem(KEY)) || [];


formEl.addEventListener("submit", onAddToDoItem);
listEl.addEventListener("click", onDeleteItem);
onLoadMarkup();


function onAddToDoItem(e) {
    e.preventDefault();
    
    if (textareaEl.value.trim() === "") {
        return alert("Enter your to do");
    }
    const element = {
        id: shortid(),
        value: textareaEl.value.trim(),
    };
    
    toDoItem.push(element);
    localStorage.setItem(KEY, JSON.stringify(toDoItem));
   
    listEl.innerHTML = creartMarkup(toDoItem);
    
    formEl.reset();
};


function creartMarkup(data) {
    return data.map(({id, value}) => {
          return  `
           <li class="list__item">
           <p>${value}</p> 
           <button id=${id}>Delete</button>
           </li>
    `}).join("");
};


function onLoadMarkup() {
    const storageToDo = JSON.parse(localStorage.getItem(KEY));
    
    if (storageToDo) {
      toDoItem = storageToDo;
      listEl.innerHTML = creartMarkup(storageToDo)
    }
};


function onDeleteItem(e) {

    if (e.target.tagName !== "BUTTON") {
        return;
    }
    const id = e.target.id;
    toDoItem = toDoItem.filter((el) => el.id !== id);
    localStorage.setItem(KEY, JSON.stringify(toDoItem));

    listEl.innerHTML = creartMarkup(toDoItem);
};

