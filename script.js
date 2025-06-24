// Display today's date
const dateElem = document.getElementById('date');
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElem.textContent = today.toLocaleDateString('de-DE', options);

// Example events for the day (in real scenario fetch from server)
const eventsElem = document.getElementById('events');
const sampleEvents = [
    '08:30 Meeting',
    '12:00 Lunch',
    '15:00 Projektbesprechung'
];
function renderEvents() {
    eventsElem.innerHTML = sampleEvents.map(e => `<div>${e}</div>`).join('');
}
renderEvents();

// Setup map with predefined route (modify src with your own route)
const mapFrame = document.getElementById('map-frame');
mapFrame.src = 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d2624.9998!2d2.292292!3d48.858844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMxLjgiTiAywrAxNyc0MC41IkU!5e0!3m2!1sde!2sde!4v00000000000';

// Todo list with localStorage
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;
        const btn = document.createElement('button');
        btn.textContent = 'X';
        btn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
        li.appendChild(btn);
        todoList.appendChild(li);
    });
}
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    todos.push(todoInput.value);
    todoInput.value = '';
    saveTodos();
    renderTodos();
});
renderTodos();

// Simple authentication (for demo only)
const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
let currentUser = localStorage.getItem('currentUser');
function checkLogin() {
    if (!currentUser) {
        loginContainer.style.display = 'flex';
    } else {
        loginContainer.style.display = 'none';
    }
}
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // In real application, verify credentials server-side
    if (username && password) {
        localStorage.setItem('currentUser', username);
        currentUser = username;
        loginContainer.style.display = 'none';
    }
});
checkLogin();

// Placeholder for future Google Sign-In integration
// TODO: integrate OAuth flow
