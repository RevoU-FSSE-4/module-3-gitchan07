// Fungsi untuk mengambil data dari API
async function fetchData(): Promise<any> {
    const request = new Request(
        "https://module3-api-is2m.onrender.com/random-todos"
    );
    const response = await fetch(request);
    return await response.json();
}

// Fungsi untuk membuat elemen tugas baru
function createTaskElement(task: string): HTMLElement {
    const taskElement: HTMLElement = document.createElement("li");

    // Text untuk tugas
    const taskText: HTMLSpanElement = document.createElement("span");
    taskText.textContent = task;

    // Tombol untuk menandai tugas sebagai selesai
    const completeButton: HTMLButtonElement = document.createElement("button");
    completeButton.textContent = "Selesai";
    completeButton.addEventListener("click", () => {
        taskText.style.textDecoration = "line-through";
    });

    // Tombol untuk menghapus tugas
    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => {
        taskElement.remove();
    });

    const buttonDiv: HTMLDivElement = document.createElement("div");
    buttonDiv.className = "buttonDiv"; // Menambahkan class

    buttonDiv.appendChild(completeButton);
    buttonDiv.appendChild(deleteButton);

    // Menyisipkan elemen-elemen ke dalam elemen tugas
    taskElement.appendChild(taskText);
    taskElement.appendChild(buttonDiv);

    return taskElement;
}


// Fungsi untuk menambahkan tugas baru ke dalam daftar
async function addTask(): Promise<void> {
    const newTaskInput: HTMLInputElement = document.getElementById("newTask") as HTMLInputElement;
    const newTaskText: string = newTaskInput.value.trim();

    if (newTaskText !== "") {
        const taskListElement: HTMLElement | null = document.getElementById("taskList");
        if (taskListElement) {
            const taskElement: HTMLElement = createTaskElement(newTaskText);
            taskListElement.appendChild(taskElement);
            newTaskInput.value = ""; // Mengosongkan input field setelah menambahkan tugas
        } else {
            console.error("Element with id 'taskList' not found!");
        }
    } else {
        alert("Tugas tidak boleh kosong!"); // Menampilkan alert jika input kosong
    }
}


// Fungsi utama untuk mengambil data, membuat tugas, dan menambahkan event listener
async function main(): Promise<void> {
    const json: string[] = await fetchData();
    const taskListElement: HTMLElement | null = document.getElementById("taskList");

    if (taskListElement) {
        // Looping untuk setiap tugas dan menambahkannya ke dalam daftar
        json.forEach((task: string) => {
            const taskElement: HTMLElement = createTaskElement(task);
            taskListElement.appendChild(taskElement);
        });

        // Event listener untuk tombol "Tambah Tugas"
        const addTaskButton: HTMLElement | null = document.getElementById("addTaskBtn");
        if (addTaskButton) {
            addTaskButton.addEventListener("click", addTask);
        } else {
            console.error("Element with id 'addTaskBtn' not found!");
        }
    } else {
        console.error("Element with id 'taskList' not found!");
    }
}


// Memanggil fungsi main
main();
