import { qs, onTouch } from './utilities.js'
import { readFromLS, writeToLS } from './ls.js';

export default class Todos {
    constructor(parentElementId, key) {
        this.parentElement = document.getElementById(parentElementId);
        this.key = key;
        listTodos(getTodos(key), parentElement);
    }
}

var todoList = null;
const key = 'todos';
const parentElement = qs('#todo-list');
var currentFilter = '#filter-all';

onTouch('#addButton', () => {
    addTodo('#todoInput', key);
});

onTouch('#filter-all', () => {
    filterTodos(todoList, '#filter-all');
});

onTouch('#filter-active', () => {
    filterTodos(todoList, '#filter-active');
});

onTouch('#filter-complete', () => {
    filterTodos(todoList, '#filter-complete');
});

/**
 * build a todo object, add it to the todoList, and save the new list to local storage.
 * @param {string} task The text of the task to be saved. 
 * @param  {string} key The key under which the value is stored under in LS
 */
function saveTodo(task, key) {
    var todo = {
        id: Date.now(),
        content: task,
        completed: false
    };
    todoList.push(todo);
    writeToLS(key, todoList);
}

/**
 * check the contents of todoList, a local variable containing a list of ToDos. 
 * If it is null then pull the list of todos from localstorage, update the local variable, and return it
 * @param  {string} key The key under which the value is stored in LS
 * @return {array}     The value as an array of objects
 */
function getTodos(key) {
    if (todoList == null) {
        todoList = readFromLS(key);
        if (todoList == null) {
            todoList = [];
        }
    }
    return todoList;
}

/** Grab the text from the input field, send it with the key to saveTodo(), and update the display with the current list
 * @param {string} selector The selector of the input field which contains the text of the task to be added
 * @param {string} key The key under which the value is stored in LS
 */
function addTodo(selector, key) {
    var task = qs(selector).value;
    saveTodo(task, key);
    listTodos(todoList, parentElement);
    qs(selector).value = null;
}

/**
 * foreach todo in list, build a li element for the todo, and append it to element
 * @param  {array} list The list of tasks to render to HTML
* @param {element} element The DOM element to insert our list elements into.
 
 */
function renderTodoList(list, element) {
    // Clear original list
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }

    // Redraw the list
    list.forEach((todo, i) => {
        var node = document.createElement('li');

        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'todo' + i);
        checkbox.setAttribute('id', 'todo' + i);
        checkbox.addEventListener('change', () => {
            completeOrUncompleteTodo(todo, checkbox);
        })

        var label = document.createElement('label');
        label.setAttribute('for', 'todo' + i);
        label.innerText = todo.content;

        var del = document.createElement('i');
        del.setAttribute('class', 'fas fa-trash');
        del.addEventListener('click', () => {
            removeTodo(todo);
        })

        node.appendChild(checkbox);
        node.appendChild(label);
        node.appendChild(del);
        node.setAttribute('class', 'todo-item');
        
        element.appendChild(node);

        if (todo.completed) {
            checkbox.setAttribute('checked', true);
            completeOrUncompleteTodo(todo, checkbox);
        } 
    });

    updateTaskCounter(list);

}

function listTodos(todoList, element) { // Why do I need this function? Seems like a pointless wrapper for renderTodoList?
    renderTodoList(todoList, element);
}

function completeOrUncompleteTodo(todo, checkbox) {
    if (checkbox.checked) {
        //Mark completed in todoList
        todoList[todoList.indexOf(todo)].completed = true;
        
        //Add completed class
        checkbox.nextSibling.setAttribute('class', 'completed');
    }
    else {
        todoList[todoList.indexOf(todo)].completed = false;
        checkbox.nextSibling.classList.remove('completed');
    }
    writeToLS(key, todoList);
    updateTaskCounter(todoList);
}

function removeTodo(todo) {
    todoList.splice(todoList.indexOf(todo), 1);
    writeToLS(key, todoList);
    listTodos(todoList, parentElement);
}

function updateTaskCounter(list) {
    var incomplete = list.filter(todo => todo.completed == false);
    if (incomplete.length == 1) {
        var tl = ' task left';
    } else {
        var tl = ' tasks left';
    }

    qs('#task-counter').innerText = incomplete.length + '' + tl;
}

function filterTodos(list, element) {
    let children = qs(".filter").children;
    for (let li of children) {
        li.classList.remove('selected-filter');
    }

    currentFilter = element;

    if (currentFilter == '#filter-all') {
        var filteredList = list;
        qs(element).classList.add('selected-filter');
    } else if (currentFilter == '#filter-active') {
        var filteredList = list.filter(todo => todo.completed == false);
        qs(element).classList.add('selected-filter');
    } else if (currentFilter == '#filter-complete') {
        var filteredList = list.filter(todo => todo.completed == true);
        qs(element).classList.add('selected-filter');
    }

    listTodos(filteredList, parentElement);
}

//TODO: Figure out how to update filtered list properly when marking a task as complete
//TODO: Add todo when user hits Enter
//TODO: More styling