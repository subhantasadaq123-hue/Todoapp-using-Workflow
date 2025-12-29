// ==========================
// 1️⃣ HTML Element References
// ==========================

// Input field ka reference
let input = document.getElementById('inputValue');     

// Add Todo button ka reference
let add_todo_button = document.querySelector('.btn');            

// Todo list ka container (jaha list show hogi)
let todo_list_elem  = document.querySelector('.todo-list-elem'); 


// ==========================
// 2️⃣ Local Storage Se Data Lena
// ==========================

// Function jo localStorage se "todo" naam ka data le aur JSON array me convert kare
const get_localstorage_data = () => {                     
    return JSON.parse(localStorage.getItem('todo'));
}

// Function jo updated todo list ko localStorage me save kare
const addTodoListLocalstorage = (local_todo_list)=>{
    return localStorage.setItem("todo", JSON.stringify(local_todo_list));
} 

// Agar localStorage me data hai to usko le lo, warna empty array rakho
let local_todo_list = get_localstorage_data() ||[];       



// ==========================
// 3️⃣ DOM me New Todo Add Karna
// ==========================

// Function jo ek new todo ka HTML element banata hai
const AddTodoDynamicElement = (curElem) =>{              

  // ek div create karo
  const divElement = document.createElement("div");

  // div ko CSS class do
  divElement.classList.add("main_todo_div");

  // div ke andar todo ka text + delete button daalo
  divElement.innerHTML = `<li>${curElem}</li><button class="Deletebtn">Delete</button>`;

  // div ko todo list container me append karo
  todo_list_elem.append(divElement);
}



// ==========================
// 4️⃣ Add Todo List Function
// ==========================

const Add_Todolist = (e) => {                            
  e.preventDefault(); // page reload hone se rokta hai (agar button form me hota to)

  // Input ka value trim karke le lo (start/end spaces hata ke)
  const todoValue = input.value.trim();

  // Condition: input empty na ho aur todo pehle se list me na ho
  if( input.value != "" &&  !local_todo_list.includes(todoValue)){

    // todo ko array me add karo
    local_todo_list.push(todoValue);

    // duplicates remove karo (Set se)
    local_todo_list = [... new Set(local_todo_list)];

    // localStorage me save karo
    localStorage.setItem("todo",JSON.stringify(local_todo_list));

    // input ko clear karo
    input.value="";

    // DOM me show karo
    AddTodoDynamicElement(todoValue);
  }
}



// ==========================
// 5️⃣ Local Storage Ka Data Page Load Par Show Karna
// ==========================

const show_local_data = () =>{                           
    // Har todo ko DOM me add karo
    local_todo_list.forEach((curElem) => {
        AddTodoDynamicElement(curElem);
    });
}

show_local_data();   // Call function to show saved todos



// ==========================
// 6️⃣ Remove Todo Element Function
// ==========================

const removeTodoElem = (e) =>{
    const todoToRemove = e.target; // jis delete button pe click hua
    let todoListContent = todoToRemove.previousElementSibling.innerText; // li ka text
    let parentElem = todoToRemove.parentElement; // div element

    // Array me se wo todo hata do
    local_todo_list = local_todo_list.filter((curTodo)=>{
        return curTodo !== todoListContent;
    })

    // LocalStorage update karo
    addTodoListLocalstorage(local_todo_list);

    // DOM se element hatao
    parentElem.remove();
}



// ==========================
// 7️⃣ Event Listeners
// ==========================

// Add button click par todo add karo
add_todo_button.addEventListener('click', (e) => {       
    Add_Todolist(e);
});

// Todo list ke andar agar delete button click ho to remove function call karo
todo_list_elem.addEventListener('click', (e) =>{        
    e.preventDefault();
    if(e.target.classList.contains('Deletebtn')){
      removeTodoElem(e);
    }
});

    
