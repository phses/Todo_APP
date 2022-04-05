'use strict'
const app = document.querySelector('.app');
const newTask = document.querySelector('.app__input-task');
const taskList = document.querySelector('.task-list');
const toggleTheme = document.querySelector('.app__toggle-theme');
const backgroundTheme = document.querySelector('.app__background');
const interactionSection = document.querySelector('.interaction-section');
let taskCount = 0;


function addTask(e) {
  if (e.key === 'Enter') {
    if (newTask.value != ''){
      taskCount++;
      if (taskCount === 1) {
        interactionSection.classList.remove('hidden')
      }
      const li = document.createElement('li');
      li.className = 'task-list__task-card light';
      li.innerHTML = '<input type="checkbox" class="task-list__checkbox" name="task"> <span class="checkmark"></span>';
      const task = document.createElement('button');
      task.className = 'task-list__task';
      saveTaskLocalStorage(newTask.value);
      task.appendChild(document.createTextNode(newTask.value));
      li.appendChild(task);
      const btnClearTask = document.createElement('button');
      btnClearTask.className = 'task-list__clear-task';
      li.appendChild(btnClearTask);
      taskList.appendChild(li);
      
      console.log(li);
      newTask.value = '';
      console.log(taskCount);
      if (newTask.classList.contains('error')) {
        newTask.classList.remove('error');
      }
    } else {
      newTask.classList.add('error');
      console.log(newTask);
    }

  }
}

function saveTaskLocalStorage(task) {
  let tasks = [];
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  console.log(tasks);
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
    removeTaskLocalStorage(task.innerText);
    if (taskCount === 0) {
      interactionSection.classList.add('hidden');
    }
  }
}

function addTaskByLocalStorage(task) {
        const li = document.createElement('li');
        li.className = 'task-list__task-card light';
        li.innerHTML = '<input type="checkbox" class="task-list__checkbox" name="task"> <span class="checkmark"></span>';
        const taskBtn = document.createElement('button');
        taskBtn.className = 'task-list__task';
        taskBtn.appendChild(document.createTextNode(task));
        li.appendChild(taskBtn);
        const btnClearTask = document.createElement('button');
        btnClearTask.className = 'task-list__clear-task';
        li.appendChild(btnClearTask);
        taskList.appendChild(li);
        console.log(li);
}

function renderTasks() {
      
  if (localStorage.getItem('tasks') !== null) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    taskCount = tasks.length;  
    console.log(taskCount);    
    interactionSection.classList.remove('hidden')
    tasks.forEach(addTaskByLocalStorage);
  }
}

function changeTaskState(e) {
    if (e.target.classList.contains('task-list__task')) {
      const inputCheckbox = e.target.parentElement.querySelector('.task-list__checkbox');
      console.log(inputCheckbox.checked);
      if (inputCheckbox.checked) {
        inputCheckbox.checked = false;
        e.target.classList.remove('checked')
      } else {
        inputCheckbox.checked = true;
        e.target.classList.add('checked');
      }
    } 
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
    if (taskCount > 0) {
      const taskCard = taskList.querySelectorAll('.task-list__task-card');
      for(let i = 0; i < taskCard.length; i++) {
        taskCard[i].classList.remove('light');
        taskCard[i].classList.add('dark');
      }
    }
   } else {
    toggleTheme.classList.remove('dark');
    toggleTheme.classList.add('light');
    backgroundTheme.classList.remove('dark');
    backgroundTheme.classList.add('light');
    interactionSection.classList.remove('dark');
    interactionSection.classList.add('light');
    newTask.classList.remove('dark');
    newTask.classList.add('light');
    if (taskCount > 0) {
      const taskCard = taskList.querySelectorAll('.task-list__task-card');
      for(let i = 0; i < taskCard.length; i++) {
        taskCard[i].classList.remove('dark');
        taskCard[i].classList.add('light');
      }
    }
   }
   console.log(e.target);
 }

document.addEventListener('keydown', addTask);
taskList.addEventListener('click', clearTask);
taskList.addEventListener('click', changeTaskState);
toggleTheme.addEventListener('click', changeTheme);
document.addEventListener('DOMContentLoaded', renderTasks);