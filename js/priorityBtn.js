const priorityPicker = document.querySelector(".priority-picker")
let selectedPriority = 1

priorityPicker.addEventListener("click", (e) => {
    const btn = e.target.closest(".priority-option")
    if (!btn) return

    selectedPriority = Number(btn.dataset.priority)

    document.querySelectorAll(".priority-option").forEach((b) => {
        b.classList.remove("active")
    })
    btn.classList.add("active")
})