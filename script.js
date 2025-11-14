const modalBox = document.getElementById("modal-box");
const btnNewTask = document.getElementById("btn-addNew");
const btnCloseModal = document.getElementById("close-btn");
const taskForm = document.getElementById("task-form");
const taskList = document.querySelector(".List ul");
const taskCountElement = document.querySelector(".dayANDtask p");

// Função para mostrar e fechar o modal
const showmodal = () => modalBox.classList.add("opened");
const closemodal = () => {
    modalBox.classList.remove("opened");
    taskForm.reset(); // Limpa o formulário ao fechar
};

// Função para atualizar a contagem de tarefas
const updateTaskCount = () => {
    const taskCount = taskList.querySelectorAll("li:not(.empty-message)").length;
    taskCountElement.textContent = `${taskCount} task${taskCount !== 1 ? 's' : ''}`;
};

// Função para criar uma nova tarefa
const createTask = (title, description, time) => {
    const li = document.createElement("li");
    
    // Formata o horário para exibição (ex: 08:00 - 09:00, assumindo 1 hora de duração)
    const [hours, minutes] = time.split(":");
    const endHour = (parseInt(hours) + 1).toString().padStart(2, "0");
    const timeRange = `${time} - ${endHour}:${minutes}`;
    
    li.innerHTML = `
        <div class="task">
            <p class="task-time">${timeRange}</p>
            <div class="task-info">
                <h1 class="task-title">${title}</h1>
                <p class="task-description">${description}</p>
            </div>
            <input type="checkbox">
        </div>
    `;
    
    taskList.appendChild(li);
    updateTaskCount();
    updateEmptyState();
};

// Event listeners
btnNewTask.addEventListener("click", showmodal);
btnCloseModal.addEventListener("click", closemodal);

// Previne o envio padrão do formulário e cria a tarefa
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const time = document.getElementById("task-time").value;
    
    createTask(title, description, time);
    closemodal();
});

// Fechar modal ao clicar fora dele
modalBox.addEventListener("click", (e) => {
    if (e.target === modalBox) {
        closemodal();
    }
});

// Função para mostrar mensagem quando não há tarefas
const updateEmptyState = () => {
    const taskCount = taskList.querySelectorAll("li").length;
    const emptyMessage = taskList.querySelector(".empty-message");
    
    if (taskCount === 0) {
        if (!emptyMessage) {
            const emptyLi = document.createElement("li");
            emptyLi.className = "empty-message";
            emptyLi.innerHTML = `
                <div class="empty-state">
                    <p>You  have no commitments today.</p>
                  
                </div>
            `;
            taskList.appendChild(emptyLi);
        }
    } else {
        if (emptyMessage) {
            emptyMessage.remove();
        }
    }
};

// Remove as tarefas estáticas do HTML
const removeStaticTasks = () => {
    const allTasks = taskList.querySelectorAll("li");
    allTasks.forEach(task => task.remove());
};

// Inicialização
removeStaticTasks();
updateTaskCount();
updateEmptyState();