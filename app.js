        // Load tasks from local storage on page load
        window.onload = function () {
            const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const taskList = document.getElementById("task-list");

            for (const taskText of savedTasks) {
                addTaskToList(taskText);
            }
        };

        function addTask() {
            const taskInput = document.getElementById("task");
            const taskText = taskInput.value.trim();

            if (taskText !== "") {
                addTaskToList(taskText);
                taskInput.value = "";
            }
        }

        function addTaskToList(taskText) {
            const taskList = document.getElementById("task-list");
            const listItem = document.createElement("li");

            listItem.innerHTML = `
                <label>
                    <input type="checkbox" onchange="taskDone(this)">
                    <span>${taskText}</span>
                </label>
                <button class="delete-button" onclick="removeTask(this)">Delete</button>
            `;

            taskList.appendChild(listItem);

            // Save tasks to local storage
            saveTasksToLocalStorage();
        }

        function removeTask(buttonElement) {
            const listItem = buttonElement.parentElement;
            const taskList = document.getElementById("task-list");
            taskList.removeChild(listItem);

            // Save tasks to local storage after removal
            saveTasksToLocalStorage();
        }

        function taskDone(checkboxElement) {
            const taskText = checkboxElement.nextElementSibling;
            if (checkboxElement.checked) {
                taskText.style.textDecoration = "line-through";
            } else {
                taskText.style.textDecoration = "none";
            }

            // Save tasks to local storage after updating
            saveTasksToLocalStorage();
        }

        function saveTasksToLocalStorage() {
            const taskItems = document.querySelectorAll("#task-list label span");
            const tasks = Array.from(taskItems).map((task) => task.textContent);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        