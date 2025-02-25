import throttle from "lodash.throttle";
const formEl = document.querySelector(".feedback-form");
const emailInputEl = document.querySelector("input");
const textareaEl = document.querySelector("textarea");
const STORAGE_KEY = "comment";

const formData = {
    email: "",
    message: "",
}



formEl.addEventListener("submit", onSubmitForm);
formEl.addEventListener("input", throttle(onInputForm, 500));
onLoadStorage();

function onInputForm() {
    formData.email = emailInputEl.value;
    formData.message = textareaEl.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onLoadStorage() {
    
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
        const data = JSON.parse(storage);
        emailInputEl.value = data.email;
        textareaEl.value = data.message;
    }

}



function onSubmitForm(e) {
    e.preventDefault();
  
    if (emailInputEl.value === "" || textareaEl.value === "") {
       return alert(`Вы не ввели почту или сообщение`)
    }

    localStorage.removeItem(STORAGE_KEY);
    formEl.reset()
};

 