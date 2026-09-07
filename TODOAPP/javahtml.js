(function () {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    const todocontainer = document.getElementById("todo");

    todocontainer.style.width = "500px";
    todocontainer.style.margin = "50px auto";
    todocontainer.style.fontFamily = "Arial";
    todocontainer.style.padding = "20px";
    todocontainer.style.borderRadius = "10px";
    todocontainer.style.backgroundColor = "#f5f5f5";
    todocontainer.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";

    const title = document.createElement("h2");
    title.textContent = "My Todo List";
    title.style.textAlign = "center";
    title.style.marginBottom = "20px";

    const todoinput = document.createElement("input");
    todoinput.type = "text";
    todoinput.placeholder = "Enter task...";

    todoinput.style.width = "70%";
    todoinput.style.padding = "10px";
    todoinput.style.border = "1px solid #ccc";
    todoinput.style.borderRadius = "5px";
    todoinput.style.boxSizing = "border-box";

    const addbtn = document.createElement("button");
    addbtn.textContent = "ADD";

    addbtn.style.padding = "10px 15px";
    addbtn.style.marginLeft = "10px";
    addbtn.style.border = "none";
    addbtn.style.borderRadius = "5px";
    addbtn.style.backgroundColor = "#333";
    addbtn.style.color = "white";
    addbtn.style.cursor = "pointer";

    const searchinput = document.createElement("input");
    searchinput.type = "text";
    searchinput.placeholder = "Search task...";

    searchinput.style.width = "100%";
    searchinput.style.padding = "10px";
    searchinput.style.marginTop = "15px";
    searchinput.style.border = "1px solid #ccc";
    searchinput.style.borderRadius = "5px";
    searchinput.style.boxSizing = "border-box";

    const todolist = document.createElement("div");

    todolist.style.marginTop = "20px";

    todocontainer.append(title, todoinput, addbtn, searchinput, todolist);

    function savetodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function rendertask(task) {

        let currentTask = task;

        const todoitem = document.createElement("div");

        todoitem.style.marginBottom = "10px";
        todoitem.style.padding = "15px";
        todoitem.style.borderRadius = "8px";
        todoitem.style.backgroundColor = "white";
        todoitem.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

        const p = document.createElement("p");
        p.textContent = currentTask.text;

        p.style.margin = "0 0 10px 0";
        p.style.fontSize = "16px";
        p.style.wordBreak = "break-word";

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";

        deletebtn.style.padding = "7px 12px";
        deletebtn.style.marginRight = "5px";
        deletebtn.style.border = "none";
        deletebtn.style.borderRadius = "5px";
        deletebtn.style.backgroundColor = "#e74c3c";
        deletebtn.style.color = "white";
        deletebtn.style.cursor = "pointer";

        const editbtn = document.createElement("button");
        editbtn.textContent = "Edit";

        editbtn.style.padding = "7px 12px";
        editbtn.style.marginRight = "5px";
        editbtn.style.border = "none";
        editbtn.style.borderRadius = "5px";
        editbtn.style.backgroundColor = "#3498db";
        editbtn.style.color = "white";
        editbtn.style.cursor = "pointer";

        const completebtn = document.createElement("button");
        completebtn.textContent = "Complete";

        completebtn.style.padding = "7px 12px";
        completebtn.style.border = "none";
        completebtn.style.borderRadius = "5px";
        completebtn.style.backgroundColor = "#2ecc71";
        completebtn.style.color = "white";
        completebtn.style.cursor = "pointer";

        if (currentTask.completed) {

            todoitem.style.backgroundColor = "#dff5e1";

            p.style.textDecoration = "line-through";
            p.style.color = "#666";

            todoitem.append(p, deletebtn);

        } else {

            todoitem.append(
                p,
                deletebtn,
                editbtn,
                completebtn
            );

        }

        editbtn.addEventListener("click", function () {

            if (todoitem.querySelector("input")) return;

            const editinput = document.createElement("input");
            editinput.value = currentTask.text;

            editinput.style.padding = "7px";
            editinput.style.marginRight = "5px";
            editinput.style.border = "1px solid #ccc";
            editinput.style.borderRadius = "5px";

            const savebtn = document.createElement("button");
            savebtn.textContent = "Save";

            savebtn.style.padding = "7px 12px";
            savebtn.style.border = "none";
            savebtn.style.borderRadius = "5px";
            savebtn.style.backgroundColor = "#333";
            savebtn.style.color = "white";
            savebtn.style.cursor = "pointer";

            p.style.display = "none";

            todoitem.prepend(editinput, savebtn);

            editinput.focus();

            savebtn.addEventListener("click", function () {

                const updatedtask = editinput.value.trim();

                if (!updatedtask) return;

                p.textContent = updatedtask;

                currentTask.text = updatedtask;

                savetodos();

                editinput.remove();
                savebtn.remove();

                p.style.display = "block";

                console.log(todos);

            });

        });

        deletebtn.addEventListener("click", function () {

            const index = todos.indexOf(currentTask);

            if (index !== -1) {
                todos.splice(index, 1);
            }

            savetodos();

            todoitem.remove();

            console.log(todos);

        });

        completebtn.addEventListener("click", function () {

            currentTask.completed = true;

            savetodos();

            todoitem.style.backgroundColor = "#dff5e1";

            p.style.textDecoration = "line-through";
            p.style.color = "#666";

            completebtn.remove();
            editbtn.remove();

            console.log(todos);

        });

        todolist.prepend(todoitem);
    }

    function showtodos() {

        todolist.innerHTML = "";

        for (let i = 0; i < todos.length; i++) {
            rendertask(todos[i]);
        }

    }

    function addtodo() {

        const task = todoinput.value.trim();

        if (!task) return;

        const newtask = {
            text: task,
            completed: false
        };

        todos.unshift(newtask);

        savetodos();

        rendertask(newtask);

        todoinput.value = "";

        todoinput.focus();

        console.log(todos);
    }

    addbtn.addEventListener("click", addtodo);

    todoinput.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {
            addtodo();
        }

    });

    searchinput.addEventListener("input", function () {

        const searchtext = searchinput.value.toLowerCase();

        todolist.innerHTML = "";

        for (let i = 0; i < todos.length; i++) {

            if (todos[i].text.toLowerCase().includes(searchtext)) {
                rendertask(todos[i]);
            }

        }

    });

    showtodos();

})();

