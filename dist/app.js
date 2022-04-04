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
      const li = document.createElement('li');
      li.className = 'task-list__task-card light';
      li.innerHTML = '<input type="checkbox" class="task-list__checkbox" name="task"> <span class="checkmark"></span>';
      const task = document.createElement('button');
      task.className = 'task-list__task';
      task.appendChild(document.createTextNode(newTask.value));
      li.appendChild(task);
      const btnClearTask = document.createElement('button');
      btnClearTask.className = 'task-list__clear-task';
      li.appendChild(btnClearTask);
      taskList.appendChild(li);
      console.log(li);
      newTask.value = '';
      taskCount++;
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

function clearTask(e) {
  if (e.target.classList.contains('task-list__clear-task')){
    const task = e.target.parentElement;
    task.remove();
    taskCount--;
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
    if (taskCount > 0) {
      const taskCard = taskList.querySelectorAll('.task-list__task-card');
      for(let i = 0; i < taskCard.length; i++) {
        taskCard[i].classList.remove('light');
        taskCard[i].classList.add('dark');
      }
    }

   }
   console.log(e.target);
 }

document.addEventListener('keydown', addTask);
taskList.addEventListener('click', clearTask);
toggleTheme.addEventListener('click', changeTheme);