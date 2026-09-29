const savedTasks = localStorage.getItem("sova-tasks")
const tasks = savedTasks ? JSON.parse(savedTasks) : [
    { title: "Здесь", isCompleted: true, priority: 2 },
    { title: "Вы можете", isCompleted: false, priority: 2 },
    { title: "Управлять", isCompleted: false, priority: 1 },
    { title: "Своими делами", isCompleted: true, priority: 3 },
];

let currentFilter = "all"

const getPriorityLabel = (priority) => {
    if (priority === 3) {
        return "🔥"
    } else if (priority === 2) {
        return "📌"
    } else {
        return "💤"
    };
};

const list = document.querySelector("#task-list")

const renderTasks = () => {
    localStorage.setItem("sova-tasks", JSON.stringify(tasks))

    list.innerHTML = ""

    const filteredTasks = tasks.filter((task) => {
        if (currentFilter === "active") return !task.isCompleted
        if (currentFilter === "done") return task.isCompleted
        return true
    })

    filteredTasks.forEach((task) => {
        const realIndex = tasks.indexOf(task)

        const item = document.createElement("li")
        item.classList.add("task")
        item.dataset.index = realIndex

        if (task.isCompleted) {
            item.classList.add("done")
        }

        const dot = document.createElement("span")
        dot.classList.add("dot")

        const label = document.createElement("span")
        label.classList.add("label")
        label.textContent = `${getPriorityLabel(task.priority)} ${task.title}`

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete-btn")
        deleteBtn.textContent = "✕"

        item.appendChild(dot)
        item.appendChild(label)
        item.appendChild(deleteBtn)

        list.appendChild(item)
    })

    const notCompletedCount = tasks.filter((task) => !task.isCompleted).length;
    const countLabel = document.querySelector("#count")

    const mod100 = notCompletedCount % 100
    const mod10 = notCompletedCount % 10

    if (mod100 >= 11 && mod100 <= 14) {
        countLabel.textContent = `${notCompletedCount} задач осталось`
    } else if (mod10 === 1) {
        countLabel.textContent = `${notCompletedCount} задача осталась`
    } else if (mod10 >= 2 && mod10 <= 4) {
        countLabel.textContent = `${notCompletedCount} задачи осталось`
    } else {
        countLabel.textContent = `${notCompletedCount} задач осталось`
    }
}

list.addEventListener("click", (e) => {
    const item = e.target.closest(".task")
    if (!item) return

    const index = item.dataset.index

    if (e.target.closest(".delete-btn")) {
        tasks.splice(index, 1)
        renderTasks()
        return
    }

    tasks[index].isCompleted = !tasks[index].isCompleted

    renderTasks()
})

renderTasks()

const button = document.querySelector("#add-btn")
const input = document.querySelector("#new-task")


button.addEventListener("click", () => {
    const title = input.value.trim()

    if (title === "") {
        return
    }

    const newTask = {
        title,
        isCompleted: false,
        priority: selectedPriority
    }

    tasks.push(newTask)
    input.value = ""
    renderTasks()
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        button.click()
    }
})

const filters = document.querySelector(".filters")

filters.addEventListener("click", (e) => {
    const filterBtn = e.target.closest("button")
    if (!filterBtn) return

    currentFilter = filterBtn.dataset.filter

    document.querySelectorAll(".filters button").forEach((btn) => {
        btn.classList.remove("active")
    })
    filterBtn.classList.add("active")

    renderTasks()
})










