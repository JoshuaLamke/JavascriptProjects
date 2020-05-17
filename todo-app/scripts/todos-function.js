'use strict'

//Get saved todos from local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try{
        return todosJSON ? JSON.parse(todosJSON) : []
    }catch(e){
        return []
    }
}
// Save todos to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}
// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filterTodosByText = todos.filter(function (todo){
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })
    const filterTodosByCompletion = filterTodosByText.filter((todo) => !todo.completed)
    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(filterTodosByCompletion))
    
    filterTodosByText.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}
//Remove todo
const removeTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id)
    if(index > -1){
        todos.splice(index, 1)
    }
}
//Toggle todo to completed or not
const toggleTodo = (todoId) => {
    const index = todos.findIndex((todo) => todoId === todo.id)
    if(index > -1){
        todos[index].completed = !todos[index].completed
    }
}
// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    }) 

    return todoEl
}
// Get the DOM elements for list summary
const generateSummaryDOM = (filterTodosByCompletion) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    if(filterTodosByCompletion.length > 1){
        summary.textContent = `You have ${filterTodosByCompletion.length} things to do.`
    }
    else if(filterTodosByCompletion.length === 1){
        summary.textContent = `You have ${filterTodosByCompletion.length} thing to do.`
    }
    else{
        summary.textContent = 'You have nothing to do. Add something!'
    }
    return summary
}