const openModal = document.getElementById("modal");
const noteForm = document.getElementById("form");
const titleInput = document.getElementById("input-title");
const textInput = document.getElementById("input-text");
const addBtn = document.getElementById("add-btn");
const finalList = document.getElementById("final-list");
const overlay = document.querySelector(".overlay");
let todosEl;
let id = 0;

let todos = [];
let lsData = JSON.parse(localStorage.getItem("todos"));
console.log(todos);
if (lsData === null) todos = [];
if (lsData !== null) todos.push(...lsData);

function addNote() {
  const listElem = document.createElement("li");

  listElem.innerHTML = `

  <div class="title result">${titleInput.value}</div> 
  <div class="text result">${textInput.value}</div>
     <button class="note-btn delete-btn">Delete</button>
     <button class="note-btn edit-btn">Edit</button>`;

  finalList.insertAdjacentElement("afterbegin", listElem);

  todos.push({ title: titleInput.value, text: textInput.value });

  localStorage.setItem("todos", JSON.stringify(todos));

  titleInput.value = "";
  textInput.value = "";
  overlay.classList.add("hidden");
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  return false;
  addNote();
});

openModal.addEventListener("click", () => {
  noteForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

addBtn.addEventListener("click", () => {
  if (titleInput.value === "" || textInput.value === "") {
    alert("Your note need to have a title and some content!");
    return false;
  } else noteForm.classList.add("hidden");
  addNote();
});

overlay.addEventListener("click", () => {
  noteForm.classList.add("hidden");
  overlay.classList.add("hidden");
  titleInput.value = "";
  textInput.value = "";
});

finalList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    deleteLS();

    event.target.parentNode.remove();
  } else if (event.target.classList.contains("edit-btn")) {
    editLS();
    event.target.parentNode.remove();
    noteForm.classList.remove("hidden");
  }
});

const updateUI = () => {
  todos.forEach((todo) => {
    const listElem = document.createElement("li");

    listElem.innerHTML = `
    <div class="title result" id="title" >${todo.title}</div> 
    <div class="text result">${todo.text}</div>
       <button class="note-btn delete-btn">Delete</button>
       <button class="note-btn edit-btn">Edit</button>`;

    finalList.insertAdjacentElement("afterbegin", listElem);
  });
};
updateUI();

const deleteLS = () => {
  let curText = document.querySelector(".delete-btn").previousElementSibling;
  todos.forEach((todo) => {
    if (todo.text === curText.textContent) {
      const deletedElem = todos.indexOf(todo);
      todos.splice(deletedElem, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
};

const editLS = () => {
  let curText =
    document.querySelector(".edit-btn").previousElementSibling
      .previousElementSibling;
  console.log(curText.textContent);
  todos.forEach((todo) => {
    if (todo.text === curText.textContent) {
      const deletedElem = todos.indexOf(todo);
      todos.splice(deletedElem, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
};
