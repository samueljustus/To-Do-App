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
const show = document.querySelector('.show')
const headerPicture = document.querySelector('.bg-image')
let darkMode = localStorage.getItem('dark-mode');



function enableDarkMode(){
    themeImg.src = 'img/icon-sun.svg'
    body.classList.add('body_dark')
    headerPicture.classList.add('bg-image_dark')
    todoContainer.classList.add('todo-dark')
    container.classList.add('container_dark')
    itemClear.classList.add('item-clear_dark')
    show.classList.add('show-dark')
    localStorage.setItem('dark-mode', 'enabled')
}

function disableDarkMode(){
    themeImg.src = 'img/icon-moon.svg'
    body.classList.remove('body_dark')
    headerPicture.classList.remove('bg-image_dark')
    container.classList.remove('container_dark')
    todoContainer.classList.remove('todo-dark')
    itemClear.classList.remove('item-clear_dark')
    show.classList.remove('show-dark')
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
        taskEl.setAttribute('draggable', true)
        
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
    console.log('click')
    todoArray = todoArray.filter((task) => task.isCompleted === false)
    localStorage.setItem('task', JSON.stringify(todoArray))

   document.querySelectorAll('.todo-item').forEach((task) => {
    if (task.classList.contains('completed')) {
        task.remove()
    }
   })
})

const allTaskEl = Array.from(document.querySelectorAll('.todo-item'))


globalButton.forEach((btn) => {
    if (btn.id === 'all') {
        btn.addEventListener('click', () => {
            allTaskEl.map((task) => {
                task.style.display = 'flex'
            })
        })
    }

    if (btn.id === 'active') {
         btn.addEventListener('click', () => {
            allTaskEl.map((task) => {
                task.classList.contains('completed') ? task.style.display = 'none' : task.style.display = 'flex'
            })
        })
    }

    if (btn.id === 'completed') {
        btn.addEventListener('click', () => {
           allTaskEl.map((task) => {
               task.classList.contains('completed') === false ? task.style.display = 'none' : task.style.display = 'flex'
           })
       })
   }

})

// let drag = loacalStorage.getItem('drag')

   let sorted =  new Sortable(todoContainer, {
        animation: 300,
        sort: true
    })







    // allTaskEl.forEach((item) => {
    //     item.addEventListener('dragstart', () => {
    //         setTimeout(() => item.classList.add('dragging'), 0)
    //     })

    //     item.addEventListener('dragend', () => item.classList.remove('dragging'))
    // })



    // function initSortableList(e) {
    //     e.preventDefault()
    //     const draggingItem = document.querySelector('.dragging')
    //     console.log(draggingItem)
    //     let siblings = [...todoContainer.querySelectorAll('.todo-item:not(.draggging)')]
    //     let nextSibling = siblings.find((sibling) => {
    //         return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2
    //     })
    //     todoContainer.insertBefore(draggingItem, nextSibling)
    // }

    // todoContainer.addEventListener('dragover', initSortableList)
    // todoContainer.addEventListener('dragenter', e => e.preventDefault())
    
     

// /*
// first set dragable to true in the li element
// get the ul of the element youwant to sort with querySelector
// then query the lis you want to sort
//add eventlistner called dragstart to ach item
// then when you listen for dragstart then settimeout of 0 sec and add a class of dragging to item
// then listen for dragend and remove the class









