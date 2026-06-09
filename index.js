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

function AddTodo(title){
    const todos = LoadTodos();
    const newTodo = {
        id: todos.length + 1,
        title = title ,
        complete = false
    }
    todos.push(newTodo)
    SaveTodo(todos)
    console.log(`quest has been append: ${title}`)
}

function ShowTodo(){
    const todos = LoadTodos();

    if(todos.length == 0){
        console.log("you have complete all quests 🥳")
    }

    console.log("\nyour tasks:")
    todos.forEach(todo => {
        const status = todo.complete ? "✔️" : "◯";
        console.log(`${status} [${todo.length}] ${todo.title}`)
    });
}

function completeTodo(id) {
  const todos = LoadTodos();
  const todo = todos.find(t => t.id === Number(id));
  
  if (!todo) {
    console.log('Úkol nenalezen.');
    return;
  }
  
  todo.completed = true;
  saveTodos(todos);
  console.log(`✓ task is now complete: "${todo.title}"`);
}

const command = process.argv[2];
const arg = process.argv[3];

if (command === 'add' && arg) {
  addTodo(arg);
} else if (command === 'list') {
  listTodos();
} else if (command === 'done' && arg) {
  completeTodo(arg);
} else {
  console.log(`
Použití:
  npm start add "Nový úkol"     - Přidat úkol
  npm start list                - Zobrazit všechny úkoly
  npm start done 1              - Označit úkol 1 jako hotový
  `);
}