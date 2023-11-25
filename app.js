const form = document.querySelector('.form')
const input = document.querySelector('.create-todo')
const todoContainer = document.querySelector('.todo')
const itemsLeft = document.querySelector('.number')
const clearCompleted = document.querySelector('.clear')
const btnAll = document.querySelector('#all')
const btnActive = document.querySelector('#active')
const btnCompleted = document.querySelector('#completed')
const globalButton = document.querySelectorAll('.btn')
const themeSwitcher = document.querySelector('.theme-switcher')
const themeImg = document.querySelector('.moon-img')
const body = document.querySelector('body')
const container = document.querySelector('.container')
const itemClear = document.querySelector('.item-clear')
const modifier = document.querySelector('.modifier')
const headerPicture = document.querySelector('.bg-image')
let darkMode = localStorage.getItem('dark-mode');



function enableDarkMode(){
    themeImg.src = 'img/icon-sun.svg'
    body.classList.add('body_dark')
    headerPicture.classList.add('bg-image_dark')
    todoContainer.classList.add('todo-dark')
    container.classList.add('container_dark')
    itemClear.classList.add('item-clear_dark')
    modifier.classList.add('modifier_dark')
    localStorage.setItem('dark-mode', 'enabled')
}

function disableDarkMode(){
    themeImg.src = 'img/icon-moon.svg'
    body.classList.remove('body_dark')
    headerPicture.classList.remove('bg-image_dark')
    container.classList.remove('container_dark')
    todoContainer.classList.remove('todo-dark')
    itemClear.classList.remove('item-clear_dark')
    modifier.classList.remove('modifier_dark')
    localStorage.setItem('dark-mode','disabled')
}



if(darkMode === 'enabled'){
    enableDarkMode()
}

themeSwitcher.addEventListener('click', () => {
    darkMode = localStorage.getItem('dark-mode')
    if (darkMode === 'disabled') {
        enableDarkMode()

    } else {
        disableDarkMode()
    }
})


let todoArray = JSON.parse(localStorage.getItem('task')) || []

if (localStorage.getItem('task')){
    todoArray.map((task) => {
        displayTask(task)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = input.value;
    
    if (inputValue === '') {
        return;
    }
    
    const task = {
        id: Date.now(),
        name: inputValue,
        isCompleted: false,
        delete: false
    }

    todoArray.push(task)
    localStorage.setItem('task', JSON.stringify(todoArray))

    displayTask(task)
    form.reset()
    input.focus()
})
    


    function displayTask(task) {
        const taskEl = document.createElement('li')
        taskEl.classList.add('todo-item')
        taskEl.setAttribute('id', task.id)
        
            const checkContainer = document.createElement('div')
            checkContainer.classList.add('check-container')
        
            const checkBox = document.createElement('input')
            checkBox.classList.add('check-box')
            checkBox.setAttribute('type', 'checkbox')
            
            const check = document.createElement('span')
            check.classList.add('check')

            const todoText = document.createElement('p')
            todoText.classList.add('todo-text')
            todoText.innerText = task.name
            
            const crossImg = document.createElement('img')
            crossImg.classList.add('cross')
            crossImg.src = 'img/icon-cross.svg'
            
            
            checkContainer.append(checkBox, check)
            taskEl.append(checkContainer, todoText, crossImg)
            todoContainer.appendChild(taskEl)
            
            CheckitemsLeft(todoArray)
            
            
            checkBox.addEventListener('click', () => {
                const parent = checkBox.parentElement.parentElement
                const checked = checkBox.checked
                stateTodo([...document.querySelectorAll('.todo-item')].indexOf(parent), checked)
                if (checked) {
                    todoText.classList.add('strike-through')
                    parent.classList.add('completed')
                } else {
                    todoText.classList.remove('strike-through')
                    parent.classList.remove('completed')

                }
                // checked 
                // ? todoText.classList.add('strike-through')
                // : todoText.classList.remove('strike-through')

            })

            function stateTodo(index, completed) {
                todoArray = JSON.parse(localStorage.getItem('task'))
                todoArray[index].isCompleted = completed;
                localStorage.setItem('task', JSON.stringify(todoArray))
                CheckitemsLeft(todoArray)
            }
            
            if (task.isCompleted) {
                todoText.classList.add('strike-through')
                checkBox.checked = true;
                taskEl.classList.add('completed')
            }
        }
        
 
        

todoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('cross')) {
        const taskId = parseInt(e.target.closest('li').id)
        removeFromArray(taskId)
    }  
})

function removeFromArray(taskId) {
    todoArray = todoArray.filter((task) => task.id !== taskId)
    localStorage.setItem('task', JSON.stringify(todoArray))
    document.getElementById(taskId).remove()
    CheckitemsLeft(todoArray)
}

function CheckitemsLeft(todoArray) {
    let notCompleted = todoArray.filter((task) => task.isCompleted === false)
    itemsLeft.innerText = notCompleted.length
}


clearCompleted.addEventListener('click', () => {
    todoArray = todoArray.filter((task) => task.isCompleted === false)
    localStorage.setItem('task', JSON.stringify(todoArray))

   document.querySelectorAll('.todo-item').forEach((task) => {
    if (task.classList.contains('completed')) {
        task.remove()
    }
   })
})

const allTaskEl = document.querySelectorAll('.todo-item')


globalButton.forEach((btn) => {
    if (btn.id === 'all') {
        btn.addEventListener('click',() => {
           Array.from(allTaskEl).map((task) => {
            task.style.display = 'flex';
           })
        })
    }

    if (btn.id === 'active') {
        btn.addEventListener('click', () => {
            Array.from(allTaskEl).map((task) => {
                task.classList.contains('completed') ? task.style.display = 'none' 
                : task.style.display = 'flex'
            })
        })

        if (btn.id === 'completed') {
            
        }
    }
})






// function taskCompleted(taskId, element) {
//     const task = todoArray.find((task) => task.id === parseInt(taskId))
//     task.isCompleted = true;
//     const parent = element.parentElement
//     parent.classList.add('completed')
//     const radio = element.nextElementSibling
//     radio.classList.add('radio_checked')
//     const todoText = radio.nextElementSibling
//     todoText.classList.add('strike-through')
   
//     localStorage.setItem('task', JSON.stringify(todoArray))
//     CheckitemsLeft(todoArray)
// }


// clearCompleted.addEventListener('click', filterCompleted)

// btnActive.addEventListener('click', filterCompleted)

// btnCompleted.addEventListener('click', showCompleted)

// function filterCompleted() {
//     console.log(todoArray)
//     todoArray = todoArray.filter((task) => task.isCompleted === false)
//     localStorage.setItem('task', JSON.stringify(todoArray))
//     console.log(todoArray)
//     document.querySelector('.completed').remove()
// }


// function showCompleted() {
//     console.log(todoArray)
//     todoArray = todoArray.filter((task) => task.isCompleted === true)
//     localStorage.setItem('task', JSON.stringify(todoArray))
//     console.log(todoArray)
//     document.querySelector('li').remove()
// }
// loop thrpugh array 
// remove the one that has task.is complted set to true
// update local storage
// remove from page

// addEvent listener to the button 
// then loop through and filter out the once that has their property task.isCompleted set to true
// remove it from local storage
// then remove it from the page




// tp switch to dark mode do this
// give the body a class of body_dark
// add class of bg-image_dark to  header
// add clas of container_dark to div class of container
