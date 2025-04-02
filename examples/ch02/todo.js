//Initial state 
const todos = ["Walk the pup", "Create new clone", "Kill that evil twink", "Cook"]

const addTodoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('button-create-todo');
const todoList = document.getElementById('todo-list');

todos.forEach(todo => {
    todoList.append(renderTodoInReadMode(todo))
});

function renderTodoInReadMode(todo) {
    const listEl = document.createElement('li')

    const spanEl = document.createElement('span')
    spanEl.textContent = todo
    spanEl.addEventListener('dblclick', () => {
        const idx = todos.indexOf(todo);
        todoList.replaceChild(renderTodoInEditMode(todo), todoList.children[idx])
    })
    listEl.append(spanEl)

    const buttonEl = document.createElement('button')
    buttonEl.textContent = 'Done'
    buttonEl.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        removeTodo(idx);
    })
    listEl.appendChild(buttonEl)
    return listEl
}

function renderTodoInEditMode(todo) {
    const idx = todos.indexOf(todo)

    const input = document.createElement('input')
    input.value = todo
    input.addEventListener('keydown', ({ key }) => {
        if (key == 'Enter') {
            if (input.value.length >= 3) {
                todos[idx] = input.value
                todoList.replaceChild(renderTodoInReadMode(input.value), todoList.children[idx])
            }
        }
    })

    const saveButton = document.createElement('button')
    saveButton.textContent = 'Save'
    saveButton.addEventListener('click', () => {
        todos[idx] = input.value
        todoList.replaceChild(renderTodoInReadMode(input.value), todoList.children[idx])
    })

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.addEventListener('click', () => {
        todoList.replaceChild(renderTodoInReadMode(todo), todoList.children[idx])
    })

    const li = document.createElement('li')
    li.append(input)
    li.append(saveButton)
    li.append(cancelButton)
    return li
}

function removeTodo(index) {
    todos.splice(index, 1)
    console.log(todoList.childNodes)
    todoList.childNodes[index + 1].remove()
    console.log(todoList.childNodes)

}

addTodoInput.addEventListener('input', () => {
    addTodoButton.disabled = addTodoInput.value.length < 3;
})

addTodoInput.addEventListener('keydown', ({ key }) => {
    if (key == 'Enter' && addTodoInput.value.length >= 3) {
        addTodo()
    }
})

addTodoButton.addEventListener('click', () => {
    addTodo()
})


function addTodo() {
    const description = addTodoInput.value

    if (todos.includes(description)) {
        alert('TODO already exists!')
        return
    }

    todos.push(description)
    const todo = renderTodoInReadMode(description)
    todoList.append(todo)
    addTodoInput.value = ''
    addTodoButton.disabled = true
}