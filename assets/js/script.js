// create copyright date
document.getElementById("copyrightDate").textContent = new Date().getFullYear();

// create variable for root element
const root = document.getElementById("root");

// create a empty message
let emptyMessage = (root.innerHTML = "<p id='emptyMessage'>Nothing to do!</p>");

// form is submitted
const addTodoFromForm = (event) => {
  // prevent page from refreshing
  event.preventDefault();

  // get form input value and remove whitespace
  const todoData = event.target.todoInput.value.trim();

  // check if value is empty
  if (!todoData) return;

  // if there is a empty message, this removes it
  if (document.getElementById("emptyMessage")) {
    // remove empty message element
    document.getElementById("emptyMessage").remove();
  }
  // sets the id for the todo item
  let randomKey = self.crypto.randomUUID();
  // check to see if there is already a ul on the page with value
  if (document.querySelectorAll("ul").length == 0) {
    // if there is not, create a new ul
    const taskList = document.createElement("ul");
    taskList.classList.add("todoList");
    root.appendChild(taskList);
  }
  // create a new li for each element
  const taskList = document.getElementsByTagName("ul").item(0);
  const checkInputState = document.getElementById("todoInput").dataset.state;
  const checkInputID = document.getElementById("todoInput").dataset.itemid;

  if (checkInputState === "edit") {
    const editLi = document.querySelector(`[key="${checkInputID}"]`);
    editLi.getElementsByTagName("p")[0].textContent = todoData;
    const clearDataInput = document.getElementById("todoInput");
    clearDataInput.dataset.state = "post";
    clearDataInput.dataset.itemid = "";
    clearDataInput.value = "";
    return;
  }
  const taskItem = document.createElement("li");
  taskItem.classList.add("todoItem");

  taskItem.setAttribute("key", randomKey);
  taskItem.innerHTML = `<p class="todoTitle">${todoData}</p>`;
  taskList.appendChild(taskItem);

  const divOptions = document.createElement("div");
  divOptions.classList.add("todoOptions");

  divOptions.innerHTML = `<i id="completedIcon" class="fa-solid fa-check completedIcon"></i>
  <i id="editIcon" class="fa-solid fa-pen-to-square editIcon"></i>
  <i id="deletedIcon" class="fa-solid fa-trash-can deletedIcon"></i>`;
  taskItem.appendChild(divOptions);

  // clear input value
  event.target.reset();
};

// delete todo item
document.addEventListener(
  "click",
  (event) => {
    // delete todo item if deletedIcon is clicked
    if (event.target.matches("#deletedIcon")) {
      event.target.closest("li").remove();
      // add back empty message if all items are gone
      if (document.querySelectorAll("li").length == 0) {
        document.querySelector(".todoList").remove();
        root.innerHTML = "<p id='emptyMessage'>Nothing to do!</p>";
      }
    }
    // complete the todo item
    if (event.target.matches("#completedIcon")) {
      const liElement = event.target.closest("li");
      liElement.classList.toggle("completed");
      liElement.querySelector(".completedIcon").remove();
      liElement.querySelector(".editIcon").remove();
      liElement.removeChild("deletedIcon");
    }
    // edit the todo item
    if (event.target.matches("#editIcon")) {
      const selectItem = event.target.closest("li");
      const selectItemID = selectItem.getAttribute("key");
      const todoItemName = selectItem.getElementsByTagName("p")[0].textContent;
      const fInput = document.getElementById("todoInput");
      fInput.dataset.state = "edit";
      fInput.dataset.itemid = selectItemID;
      fInput.setAttribute("value", todoItemName);
      fInput.value = todoItemName;
    }
  },
  false
);
