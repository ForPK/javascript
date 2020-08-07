/*
1. form 2. form submit 함수 3. 매개변수 e.페이지 전환하지 않는 4. e값들을 가져옴
5. result에 a ppend 6. input 지워주기
*/

const createSpan = document.createElement("span"),
  userSetBtn = document.createElement("button"),
  formName = document.querySelector("#name-wrap .form"),
  userTxt = document.querySelector("user-txt-wrap"),
  nameSubTit = document.querySelector("#name-wrap .sub-tit"),
  formTodo = document.querySelector("#todo-wrap .form"),
  resultSec = document.getElementById("get-todo"),
  inputTodo = document.querySelector("#todo-wrap .input"),
  dateNow = document.getElementById("today-now"),
  nameInput = document.querySelector("#name-wrap .input"),
  localUser = "USER",
  localTodo = "TODO-LIST";

let todos = [];

function getTime() {
  const today = new Date();
  function nowHour() {
    const nowTime = today.getHours();

    if (nowTime == 24) {
      return "AM 00";
    } else if (nowTime < 10) {
      return `AM 0${nowTime}`;
    } else if (nowTime >= 10 && nowTime < 12) {
      return `AM ${nowTime}`;
    } else if (nowTime == 12) {
      return `PM ${nowTime}`;
    } else if (nowTime >= 12 && nowTime < 22) {
      return `PM 0${nowTime - 12}`;
    } else if (nowTime >= 22) {
      return `PM ${nowTime - 12}`;
    }
  }

  dateNow.innerText = `
  ${today.getFullYear()}년 ${
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : `${today.getMonth() + 1}`
  }월 ${
    today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`
  }일 ${nowHour()}:${
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : `${today.getMinutes()}`
  }:${
    today.getSeconds() < 10 ? `0${today.getSeconds()}` : `${today.getSeconds()}`
  }`;
}

function userGreetingNull(text = "Stranger") {
  nameSubTit.appendChild(createSpan);
  createSpan.innerText = `Hello. ${text}`;
}

function userEdit() {
  formName.classList.remove("disnone");
  localStorage.removeItem(localUser);
  nameSubTit.removeChild(userSetBtn);
  userGreetingNull();
}

function userGreeting(text) {
  nameSubTit.appendChild(createSpan);
  nameSubTit.appendChild(userSetBtn);
  createSpan.innerText = `Hello. ${text}`;
  userSetBtn.innerText = "⚙️";
  userSetBtn.addEventListener("click", userEdit);
}

function settingUser() {
  const localUserGet = localStorage.getItem(localUser);
  if (localUserGet === null) {
    formName.classList.remove("disnone");
    userGreetingNull();
    formName.addEventListener("submit", userSubmit);
  } else {
    userGreeting(localUserGet);
    formName.classList.add("disnone");
  }
}

function saveUser(value) {
  localStorage.setItem(localUser, value);
}

function userSubmit(e) {
  e.preventDefault();
  const userValue = nameInput.value;
  userGreeting(userValue);
  saveUser(userValue);
  nameInput.value = "";
  formName.classList.add("disnone");
}

function saveTodo() {
  localStorage.setItem(localTodo, JSON.stringify(todos));
}

function deleteList(e) {
  const delBtnTarget = e.target,
    deleteListNode = delBtnTarget.parentNode;

  resultSec.removeChild(deleteListNode);
  const delTodoLocal = todos.filter(function (todo) {
    return todo.id !== parseInt(deleteListNode.id.replace("todo", ""));
  });

  todos = delTodoLocal;
  saveTodo();
  // const delTodoLocal = todos.filter(function (todo) {
  //   return todo.id !== parseInt(delBtnTarget.parentNode.id.replace("todo", ""));
  // });
}

function creatTodo(value) {
  const todoLi = document.createElement("li"),
    todoTxt = document.createElement("span"),
    delBtn = document.createElement("button"),
    addId = todos.length + 1;

  resultSec.appendChild(todoLi);
  todoLi.appendChild(todoTxt);
  todoLi.appendChild(delBtn);
  todoLi.id = "todo" + addId;
  delBtn.innerText = "✖️";
  delBtn.addEventListener("click", deleteList);
  todoTxt.innerText = value;

  const todoObj = {
    text: value,
    id: addId,
  };

  todos.push(todoObj);
  saveTodo();
}

function todoSubmit(e) {
  e.preventDefault();
  const inputValue = inputTodo.value;
  creatTodo(inputValue);
  inputTodo.value = "";
  inputTodo.focus;
}

function loadTodo() {
  const localTodoGet = localStorage.getItem(localTodo);
  if (localTodoGet !== null) {
    const parseTodo = JSON.parse(localTodoGet);
    parseTodo.forEach((todo) => {
      creatTodo(todo.text);
    });
  }
}

function init() {
  getTime();
  setInterval(getTime, 1000);
  settingUser();
  loadTodo();
  formTodo.addEventListener("submit", todoSubmit);
}

init();
