const fs = require('fs');
const json  = require('stream/consumers');
const todofiles = 'todo.json';

function LoadTodos(){
    try{
        const data = fs.readFileSync(todofiles, 'utf-8');
        return JSON.parse(data);
    }
    catch (error){
        return [];
    }
}
function SaveTodo(todos){
    fs.writeFileSync(todofiles, JSON.stringify(todos, null, 2))
}

function addTodo(title){
    const todos = LoadTodos();
    const newTodo = {
        id: todos.length + 1,
        title: title,
        completed: false
    }
    todos.push(newTodo)
    SaveTodo(todos)
    console.log(`quest has been append: ${title}`)
}

function listTodos(){
    const todos = LoadTodos();

    if(todos.length == 0){
        console.log("you have complete all quests 🥳")
        return;
    }

    console.log("\nyour tasks:")
    todos.forEach(todo => {
        const status = todo.completed ? "✔️" : "◯";
        console.log(`${status} [${todo.id}] ${todo.title}`)
    });
}

function completeTodo(id) {
  const todos = LoadTodos();
  const todo = todos.find(t => t.id === Number(id));
  
  if (!todo) {
    console.log('task not found');
    return;
  }
  
  todo.completed = true;
  SaveTodo(todos);
  console.log(`✓ task is now complete: "${todo.title}"`);
}

function clearTodosAll(){
  const todos = [];
  SaveTodo(todos);
  console.log("all tasks are cleared now")
}

function clearTodos(id){
  const todos = LoadTodos();
  const index = todos.findIndex(t => t.id === Number(id));

  if (index === -1) {
    console.log(`task ${id} not found`);
    return;
  }

  const removed = todos.splice(index, 1)[0];
  SaveTodo(todos);
  console.log(`task ${removed.id} has been deleted`);
}


const command = process.argv[2];
const arg = process.argv[3];

if (command === 'add' && arg) {
  addTodo(arg);
} else if (command === 'list') {
  listTodos();
} else if (command === 'done' && arg) {
  completeTodo(arg);
} else if (command === 'clear' && arg) {
  clearTodos(arg);
} else if (command === 'delete'){
  clearTodosAll();
}
else {
  console.log(`
Použití:
  npm start add "Nový úkol"     - Přidat úkol
  npm start list                - Zobrazit všechny úkoly
  npm start done 1              - Označit úkol 1 jako hotový
  npm start clear 1             - Smazat úkol 1
  npm start delete              - Vymazat všechny úkoly
  `);
}
