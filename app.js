window.addEventListener('load', () => {
const form = document.querySelector('.form') 
const input = document.querySelector('input')
const toDo = document.querySelector('.todo')
const numberOfToDo = document.querySelector('.number')
const clearCompleted = document.querySelector('.clear')
const btnAll = document.querySelector('#all')
const btnActive = document.querySelector('#active')
const btnCompleted = document.querySelector('#completed')

form.addEventListener('submit', (e) => {
    if (input.value === '') {
        e.preventDefault()
        return;
    }
    const usersInput = input.value;

    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')

    const image = document.createElement('img')
    image.classList.add('check')
    image.src = 'img/icon-check.svg'

    image.addEventListener('click', () => {
        radioItem.classList.toggle('radio_checked')
        todoText.classList.toggle('strike-through')
        storeToLocalStorage()
    }) 

    const radioItem = document.createElement('span')
    radioItem.classList.add('radio')

    const todoText = document.createElement('p')
    todoText.classList.add('todo-text')
    todoText.innerText = usersInput

    const image2 = document.createElement('img')
    image2.classList.add('cross')
    image2.src = 'img/icon-cross.svg'

    image2.addEventListener('click', () => {
        todoItem.remove()
        storeToLocalStorage()
        
    })

    todoItem.appendChild(image)
    todoItem.appendChild(radioItem)
    todoItem.appendChild(todoText)
    todoItem.appendChild(image2)
    toDo.appendChild(todoItem)
    input.value = ''
    storeToLocalStorage()

    function clear() {
        if (todoText.classList.contains('strike-through') === true) {
            todoItem.remove()
            storeToLocalStorage()
        }
    }
    
    clearCompleted.addEventListener('click', clear)
    btnActive.addEventListener('click', clear)

    
})

function storeToLocalStorage() {
    localStorage.setItem('task', toDo.innerHTML)
}

function display() {
    toDo.innerHTML = localStorage.getItem('task')
}
display() 


})








