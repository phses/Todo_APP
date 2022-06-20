'use strict'
const app = document.querySelector('.app');
const newTask = document.querySelector('.app__input-task');
const taskList = document.querySelector('.task-list');
const toggleTheme = document.querySelector('.app__toggle-theme');
const backgroundTheme = document.querySelector('.app__background');
const interactionSection = document.querySelector('.interaction-section');
const btnFiltersMobile = document.querySelector('.button-filters__mobile');
const message = interactionSection.querySelector('.interaction-section__message');


class Task {
  constructor(taskName, state, id) {
    this.taskName = taskName;
    this.state = state;
    this.id = id;
  }
}

let taskCount = 0;
let maxTasks = 5

//Altera a quantidades de itens restantes
function setTaskRemaining(count) {
  let tasksRemaining = maxTasks - count;  
  message.textContent = `${tasksRemaining} items left`;
}
setTaskRemaining(taskCount);

function addTask(e) {
  if (e.key === 'Enter' && taskCount <= maxTasks-1) {
    if (newTask.value != ''){
      const task = new Task(newTask.value, 'unchecked', taskCount);
      taskCount++;
      setTaskRemaining(taskCount);
      interactionSection.classList.remove('hidden')
      saveTaskLocalStorage(task);
      createTaskUI(task);
      newTask.value = '';
      console.log(taskCount);
      if (newTask.classList.contains('error')) {
        newTask.classList.remove('error');
      }
    } else {
      newTask.classList.add('error');
    }

  }
}

function saveTaskLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskLocalStorage(task) {
  let tasks = [];
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  let index = tasks.indexOf(task);
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(e) {
  if (e.target.classList.contains('task-list__clear-task')){
    const taskCard = e.target.parentElement;
    const task = taskCard.querySelector(".task-list__task");
    taskCard.remove();
    taskCount--;
    setTaskRemaining(taskCount);
    removeTaskLocalStorage(task.innerText);
    if (taskCount === 0) {
      interactionSection.classList.add('hidden');
    }
  }
}

function createTaskUI(task) {
  const li = document.createElement('li');
  li.className = 'task-list__task-card';
  //Permite que o elemento seja arrastado
  li.setAttribute('draggable', true);
  li.innerHTML = `<input type="checkbox" class="task-list__checkbox" name="task" ${task.state}> <span class="checkmark"></span>`;
  const taskBtn = document.createElement('button');
  taskBtn.className = `task-list__task ${task.state}`;
  taskBtn.appendChild(document.createTextNode(task.taskName));
  li.appendChild(taskBtn);
  const btnClearTask = document.createElement('button');
  btnClearTask.className = 'task-list__clear-task';
  li.appendChild(btnClearTask);
  taskList.appendChild(li);
}

function renderTasks() {
  if (localStorage.getItem('tasks') !== null) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    taskCount = tasks.length; 
    setTaskRemaining(taskCount);
    console.log(taskCount);    
    interactionSection.classList.remove('hidden')
    tasks.forEach(createTaskUI);
  } else {
    interactionSection.classList.add('hidden');
  }
}

function changeTaskState(e) {
    if (e.target.classList.contains('task-list__task')) {
      const task = e.target;
      const inputCheckbox = task.parentElement.querySelector('.task-list__checkbox');
      console.log(inputCheckbox.checked);
      if (inputCheckbox.checked) {
        inputCheckbox.checked = false;
        task.classList.remove('checked')
        changeStateLocalStorage(task.textContent, 'unchecked');
      } else {
        inputCheckbox.checked = true;
        e.target.classList.add('checked');
        changeStateLocalStorage(task.textContent, 'checked');
      }
    } else if (e.target.classList.contains('task-list__checkbox')) {
      const inputCheckbox = e.target.parentElement.querySelector('.task-list__checkbox');
      const task = e.target.parentElement.querySelector('.task-list__task');
      if (inputCheckbox.checked) {
        task.classList.add('checked');
        changeStateLocalStorage(task.textContent, 'checked');
      } else {
        task.classList.remove('checked');
        changeStateLocalStorage(task.textContent, 'unchecked');
      }
    }
}

function changeStateLocalStorage(task, state) {
   let tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach(function (taskObj) {
    if (taskObj.taskName === task) {
      taskObj.state = state;
    }
   })
   localStorage.setItem('tasks', JSON.stringify(tasks));
  }

function setTheme() {
  let theme = ''
  if (localStorage.getItem('theme') === null) {
    //Theme default
    theme = 'light';
  } else {
    theme = localStorage.getItem('theme')
  }
  toggleTheme.classList.add(theme);
  backgroundTheme.classList.add(theme);
  interactionSection.classList.add(theme);
  newTask.classList.add(theme);
  taskList.classList.add(theme);
  btnFiltersMobile.classList.add(theme);
  localStorage.setItem('theme', theme);
}

function changeTheme(e) {
   if (toggleTheme.classList.contains('light')){
    toggleTheme.classList.remove('light');
    toggleTheme.classList.add('dark');
    backgroundTheme.classList.remove('light');
    backgroundTheme.classList.add('dark');
    interactionSection.classList.remove('light');
    interactionSection.classList.add('dark');
    newTask.classList.remove('light');
    newTask.classList.add('dark');
    taskList.classList.remove('light');
    taskList.classList.add('dark');
    btnFiltersMobile.classList.remove('light');
    btnFiltersMobile.classList.add('dark');
   
   } else {
    toggleTheme.classList.remove('dark');
    toggleTheme.classList.add('light');
    backgroundTheme.classList.remove('dark');
    backgroundTheme.classList.add('light');
    interactionSection.classList.remove('dark');
    interactionSection.classList.add('light');
    newTask.classList.remove('dark');
    newTask.classList.add('light');
    taskList.classList.remove('dark');
    taskList.classList.add('light');
    btnFiltersMobile.classList.remove('dark');
    btnFiltersMobile.classList.add('light');
   }
  
  let theme = localStorage.getItem('theme');
  
  if (theme === 'light') {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
 }

function clearAllTasks(e) {
  const taskCard = taskList.querySelectorAll('.task-list__task-card');
  if (e.target.classList.contains('interaction-section__clear')){ 
    for (let i = 0; i < taskCard.length; i++) {
      taskCard[i].remove();
      taskCount--;
      setTaskRemaining(taskCount);
      let task = taskCard[i].querySelector('.task-list__task').textContent;
      removeTaskLocalStorage(task);
      interactionSection.classList.add('hidden');
    }
  }
}

function filterTasks(e) {
  const taskCard = taskList.querySelectorAll('.task-list__task-card');
  if (e.target.classList.contains('filter-active')) {
    console.log(taskCard);
    for (let i = 0; i < taskCard.length; i++) {
      const inputCheckbox = taskCard[i].querySelector('.task-list__checkbox');
      console.log(inputCheckbox);
      if (inputCheckbox.checked) {
        inputCheckbox.parentElement.classList.add('hidden');
      } else if (!inputCheckbox.checked) {
        inputCheckbox.parentElement.classList.remove('hidden');
      }
    }
  }
  if (e.target.classList.contains('filter-completed')) {
    console.log(taskCard);
    for (let i = 0; i < taskCard.length; i++) {
      const inputCheckbox = taskCard[i].querySelector('.task-list__checkbox');
      console.log(inputCheckbox);
      if (inputCheckbox.checked) {
        inputCheckbox.parentElement.classList.remove('hidden');
      } else if (!inputCheckbox.checked) {
        inputCheckbox.parentElement.classList.add('hidden');
      }
    }
  }
  if (e.target.classList.contains('filter-all')) {
    for (let i = 0; i < taskCard.length; i++) {
      const inputCheckbox = taskCard[i].querySelector('.task-list__checkbox');
      inputCheckbox.parentElement.classList.remove('hidden');
      }
    }
}

//CÓDIGO QUE ABILITA A FUNCIONALIDADE DRAG AND DROP

let dragSrcEl = null

//FUNÇÃO QUE EXECUTA A PARTIR DO MOMENTO EM QUE ARRASTE COMEÇA
function handleDragStart(e) {
  if (e.target.className === 'task-list__task-card'){
    e.target.style.opacity = '0.4'; 
    //SALVA O ELEMENTO PARA RECEBER OS DADOS DO ITEM QUE SERÁ SUBSTITUIDO PELO DRAG 
    dragSrcEl = e.target;
    //MOVE OS DADOS JUNTO COM O ITEM DRAG
    e.dataTransfer.effectAllowed = 'move';
    //ESPECIFICA O TIPO DE DADO QUE ESTAMOS MOVENDO
    e.dataTransfer.setData('text/html', e.target.innerHTML);
  }
}
function handleDragEnd(e) {
  e.target.style.opacity = '1';
}
function handleDragEnter(e) {
  //CAUSA UM EFEITO DE QUE AQUELE ESPAÇO PERMITE O DROP
  e.target.classList.add('over');
}
function handleDragLeave(e) {
  e.target.classList.remove('over');
}
function handleDragOver(e) {
  //É NECESSÁRIO O PREVENT DEFAULT NO DRAG OVER PARA QUE A FUNÇÃO DE DROP SEJA EXECUTADA
  e.preventDefault();
}
function handleDrop(e) {

  e.preventDefault();

  if (e.target !== dragSrcEl && e.target.className === 'task-list__task-card over') {
    console.log(e.target.className)
    dragSrcEl.innerHTML = e.target.innerHTML
    let data = e.dataTransfer.getData('text/html')
    console.log(data)  
    e.target.innerHTML = data;
    e.target.classList.remove('over');
  }

}

document.addEventListener('keydown', addTask);
taskList.addEventListener('click', clearTask);
taskList.addEventListener('click', changeTaskState);
toggleTheme.addEventListener('click', changeTheme);
interactionSection.addEventListener('click', filterTasks);
interactionSection.addEventListener('click', clearAllTasks);
//EVENTOS PARA O CARREGAMENTO DA PÁGINA
document.addEventListener('DOMContentLoaded', renderTasks);
document.addEventListener('DOMContentLoaded', setTheme);
//EVENTOS PARA BTN DISPOSITIVO MOBILE
btnFiltersMobile.addEventListener('click', filterTasks);
btnFiltersMobile.addEventListener('click', clearAllTasks);
// EVENTOS REFERENTES A FUNCIONALIDADE DND
taskList.addEventListener('dragstart', handleDragStart);
taskList.addEventListener('dragend', handleDragEnd);
taskList.addEventListener('dragenter', handleDragEnter);
taskList.addEventListener('dragleave', handleDragLeave);
taskList.addEventListener('dragover', handleDragOver);
taskList.addEventListener('drop', handleDrop);
