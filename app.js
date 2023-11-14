const form = document.querySelector('.form')
const input = document.querySelector('.create-todo')
const todoContainer = document.querySelector('.todo')
const itemsLeft = document.querySelector('.number')

const todoArray = JSON.parse(localStorage.getItem('task')) || []

if (localStorage.getItem('task')){
    todoArray.map((task) => {
        createTask(task)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = input.value;
    
    if (inputValue === '') {
        return;
    }
    
    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false
    }

    todoArray.push(task)
    localStorage.setItem('task', JSON.stringify(todoArray))

    createTask(task)
    form.reset()
    input.focus()
    countItemsLeft()

    // countArray()
}) 



    function removeTask(taskId) {
        const newTodoArray = todoArray.filter(() => {
            task.id !== taskId
        })
        localStorage.setItem('task', JSON.stringify(newTodoArray))
        document.getElementById(taskId).remove()
        countItemsLeft()
    }
    
    function createTask(task) {
        const taskEl = document.createElement('li')
        taskEl.classList.add('todo-item')
        taskEl.setAttribute('id', task.id)
        
        const checkImg = document.createElement('img')
        checkImg.classList.add('check')
        checkImg.src = 'img/icon-check.svg'
        
        const radio = document.createElement('span')
        radio.classList.add('radio')
        
        const todoText = document.createElement('p')
        todoText.classList.add('todo-text')
        todoText.innerText = task.name
        
        const crossImg = document.createElement('img')
        crossImg.classList.add('cross')
        crossImg.src = 'img/icon-cross.svg'
        

        
        crossImg.addEventListener('click', (e) => {
            // if (e.target.classList.contains('cross')) {
            //     const taskId = e.target.closest('li').id
            //     removeTask(taskId)
            // }
        
            console.log('clicked')
        })
        
        if (task.isCompleted) {
            taskEl.classList.add('complete')
            radio.classList.add('radio_checked')
            todoText.classList.add('strike-through')
    }
    
    taskEl.append(checkImg, radio, todoText, crossImg)
    todoContainer.append(taskEl)
}

function countItemsLeft() {
    const itemsLeftAarray = todoArray.filter((task) => {
        task.isCompleted === false;
    })
    
    itemsLeft.textContent = todoArray.length  
    localStorage.setItem('task', JSON.stringify(todoArray))
    
}




// ABANDONED FOR NOW

// MI O FI E LE O  


