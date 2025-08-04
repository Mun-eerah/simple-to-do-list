const toDoContainer = document.querySelector('.to-do-container');
const defaultDesign = document.getElementById('default-design');
const newTaskInputArea = document.getElementById('new-task-input-area');
const textInput = document.getElementById('text-input');
const doneButton = document.getElementById('done-btn');
const addButton = document.getElementById('add-btn');
const totalListItems = document.getElementById('list-items');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

function createNewTaskItem(taskContent) {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    clearCompletedBtn.style.display = 'none';

    const hiddenCheckbox = document.createElement('input');
    hiddenCheckbox.type = 'checkbox';
    hiddenCheckbox.classList.add('hidden-checkbox-input');
    const uniqueId = `task-checkbox-${Date.now()}`;
    hiddenCheckbox.id = uniqueId;
    
    const checkboxIcon = document.createElement('i');
    checkboxIcon.classList.add('fa-regular', 'fa-square', 'task-complete-icon');
    checkboxIcon.style.cursor = 'pointer';
    const iconLabel = document.createElement('label');
    iconLabel.setAttribute('for', hiddenCheckbox.id);
    iconLabel.appendChild(checkboxIcon);
    iconLabel.classList.add('task-checkbox-label');

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskContent;
    taskTextSpan.classList.add('task-text');

    const taskEditInput = document.createElement('input');
    taskEditInput.type = 'text';
    taskEditInput.value = taskContent;
    taskEditInput.classList.add('task-edit-input');
    taskEditInput.style.display = 'none';

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('task-actions');
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete-task-btn');

    //Append all elements to the list item 
    listItem.appendChild(hiddenCheckbox);
    listItem.appendChild(iconLabel);
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(taskEditInput);
    actionsDiv.appendChild(deleteButton);
    listItem.appendChild(actionsDiv);

    hiddenCheckbox.addEventListener('change', () => {
        if (hiddenCheckbox.checked) {
            checkboxIcon.classList.remove('fa-regular', 'fa-square');
            checkboxIcon.classList.add('fa-solid', 'fa-square-check');
            checkboxIcon.style.color = 'var(--gold)';
            taskTextSpan.style.textDecoration = 'line-through solid #FFBF00';
            taskTextSpan.style.opacity = '0.7';
        } else {
            checkboxIcon.classList.remove('fa-solid', 'fa-square-check');
            checkboxIcon.classList.add('fa-regular', 'fa-square');
            checkboxIcon.style.color = ''; 
            taskTextSpan.style.textDecoration = 'none';
            taskTextSpan.style.opacity = '1';
        }
    });


    taskTextSpan.addEventListener('click', () => {
        taskTextSpan.style.display = 'none';
        taskEditInput.style.display = 'block'; 
        taskEditInput.focus();
        taskEditInput.select();
    });

    taskEditInput.addEventListener('blur', () => {
        const updatedText = taskEditInput.value.trim();
        if (updatedText === '') {
            taskEditInput.value = taskTextSpan.textContent;
        } else {
            taskTextSpan.textContent = updatedText;
        }
        taskTextSpan.style.display = 'block';
        taskEditInput.style.display = 'none';
    });

    deleteButton.addEventListener('click', () => {
        totalListItems.removeChild(listItem);
        if (totalListItems.children.length === 0) {
            if (defaultDesign) {
                defaultDesign.style.display = 'flex';
            }
        }
    });

    return listItem; 
}
addButton.addEventListener('click', () => {
    newTaskInputArea.style.display = 'flex';
    addButton.style.display = 'none';
    if (defaultDesign) {
        defaultDesign.style.display = 'none';
    }
    textInput.value = '';
    doneButton.style.color = '#E0E0E0';
    textInput.focus();
});

textInput.addEventListener('input', () => {
    const textInputted = textInput.value.trim();
    if (textInputted.length >= 1) {
        doneButton.style.color = '#FFBF00';
        doneButton.style.opacity = '1';
    } else {
        doneButton.style.color = '#E0E0E0';
        doneButton.style.opacity = '0.6';
    }
});

doneButton.addEventListener('click', () => {
    const taskContent = textInput.value.trim();
    if (taskContent.length >= 1) {
        const newTaskItem = createNewTaskItem(taskContent); // Calling the function
        totalListItems.appendChild(newTaskItem); 
        clearCompletedBtn.style.display = 'block';

        textInput.value = '';
        newTaskInputArea.style.display = 'none';
        addButton.style.display = 'block';
        if (defaultDesign) {
            defaultDesign.style.display = 'none';
        }
        doneButton.style.color = '#E0E0E0';
        doneButton.style.opacity = '0.6';
    }
});

textInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        doneButton.click();
    }
});

clearCompletedBtn.addEventListener('click', () => {
    const completedTasks = document.querySelectorAll('.task-item:has(input[type="checkbox"]:checked)');
    completedTasks.forEach(task => {
        task.remove();
    });
    if (totalListItems.children.length === 0) {
        if (defaultDesign) {
            defaultDesign.style.display = 'flex';
        }
    }
});

// Initial load logic: ensure UI is in the correct state
window.addEventListener('load', () => {
    if (totalListItems.children.length > 0 && defaultDesign) {
        defaultDesign.style.display = 'none';
    } else if (defaultDesign) {
        defaultDesign.style.display = 'flex';
        clearCompletedBtn.style.display = 'none';
    }
    newTaskInputArea.style.display = 'none';
    addButton.style.display = 'block';
});
