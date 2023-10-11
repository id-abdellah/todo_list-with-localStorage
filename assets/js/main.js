const userInput = document.querySelector(".inserting_area input");
const addButton = document.querySelector(".inserting_area button");
const todosContainer = document.querySelector(".todos");

let todos_list = [];

if (localStorage.getItem("todos_informations")) {
    todos_list = JSON.parse(localStorage.getItem("todos_informations"));
}

addButton.addEventListener("click", (e) => {
    if (userInput.value == "") return
    let todoObject = {};
    todoObject.id = new Date().getTime();
    todoObject.content = userInput.value;
    todoObject.isCompleted = false;

    todos_list.push(todoObject)
    localStorage.setItem("todos_informations", JSON.stringify(todos_list))
    userInput.value = "";
    todosContainer.innerHTML = "";
    creatTodosFromLocalStorage()
})


creatTodosFromLocalStorage()

function creatTodosFromLocalStorage() {

    if (localStorage.getItem("todos_informations")) {
        let content = JSON.parse(localStorage.getItem("todos_informations"));
        for (let i = 0; i < content.length; i++) {

            todosContainer.innerHTML += `
        <div class="item ${content[i].isCompleted ? "completed" : ""}" data-id="${content[i].id}">
            <p>${content[i].content}</p>
            <div class="actions">
                <div class="done">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="delete">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
        `;
        }
    }

    const doneButtons = document.querySelectorAll(".item .done");
    const deleteButtons = document.querySelectorAll(".item .delete");

    doneButtons.forEach(d_button => {
        d_button.addEventListener("click", (e) => {
            todoId = d_button.closest(".item").dataset.id;
            let storageData = JSON.parse(localStorage.getItem("todos_informations"));
            for (let i = 0; i < storageData.length; i++) {
                if (storageData[i].id == +todoId) {
                    storageData[i].isCompleted = true;
                }
            }
            localStorage.setItem("todos_informations", JSON.stringify(storageData))
            document.querySelector(`[data-id="${todoId}"]`).classList.add("completed")
        })
    })

    deleteButtons.forEach(one => {
        one.addEventListener("click", (e) => {
            let todoId = one.closest(".item").dataset.id;
            let storageData = JSON.parse(localStorage.getItem("todos_informations"));
            let storageData_removed = storageData.filter(element => {
                return element.id != +todoId
            })
            localStorage.setItem("todos_informations", JSON.stringify(storageData_removed))
            document.querySelector(`[data-id="${todoId}"]`).remove()
        })
    })
}