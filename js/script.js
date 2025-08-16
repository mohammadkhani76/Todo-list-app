// انتخاب المان‌های HTML
const darkMode = document.querySelector("#darkModeToggle"); // دکمه حالت تاریک
const heading1 = document.querySelector("header h1"); // عنوان اصلی صفحه
const taskTitle = document.querySelector("#taskTitle"); // فیلد عنوان تسک
const taskDueDate = document.querySelector("#taskDueDate"); // فیلد تاریخ سررسید
const taskPriority = document.querySelector("#taskPriority"); // فیلد اولویت
const taskNotes = document.querySelector("#taskNotes"); // فیلد یادداشت
const addTaskBtn = document.querySelector("#addTaskBtn"); // دکمه افزودن تسک
const taskCategories = document.querySelector("#taskCategories"); // کانتینر لیست تسک‌ها
const exportTasksBtn = document.querySelector("#exportTasksBtn");
// آرایه اصلی برای نگهداری تسک‌ها
let tasks = [];

// اضافه کردن تسک جدید
addTaskBtn.addEventListener("click", () => {
  if (taskTitle.value.trim() === "") {
    // بررسی اینکه عنوان تسک خالی نباشد
    alert("لطفا تسک خود را وارد کنید");
    return;
  }

  // ساخت شیء تسک جدید
  const task = {
    title: taskTitle.value,
    date: taskDueDate.value,
    priority: taskPriority.value,
    notes: taskNotes.value,
    completed: false, // وضعیت اولیه: انجام نشده
  };

  tasks.push(task); // اضافه کردن تسک به آرایه اصلی
  console.log(tasks);
  renderTasks(); // رندر مجدد لیست تسک‌ها
  clearData(); // پاک کردن فیلدهای فرم
});

// تابع نمایش تسک‌ها
function displayTasks(array) {
  taskCategories.innerHTML = ""; // خالی کردن کانتینر قبل از رندر

  array.forEach((task, index) => {
    // ساخت HTML برای هر تسک
    const taskItem = `
      <div class="task ${task.priority} ${
      task.completed ? "completed" : ""
    }" draggable="true" data-index="${index}">
        <p>${task.title} - Due: ${task.date}</p>
        <div class="task-btn">
          <button class="complete-btn">${
            task.completed ? "Completed" : "Complete"
          }</button>
          <button class="delete-btn">Delete</button>
          <button class="edit-btn">Edit</button>

        </div>
      </div>
    `;
    taskCategories.innerHTML += taskItem;
  });

  // اضافه کردن رویداد به دکمه Complete
  const completeButtons = document.querySelectorAll(".complete-btn");
  completeButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const task = array[i]; // دریافت تسک مرتبط با دکمه
      task.completed = !task.completed; // تغییر وضعیت تکمیل
      renderTasks(); // رندر مجدد
    });
  });

  // اضافه کردن رویداد به دکمه Delete
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      array.splice(i, 1); // حذف تسک از آرایه
      renderTasks(); // رندر مجدد
    });
  });
  //
  // Edit
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const task = array[i]; // گرفتن تسک مربوط به این دکمه
      const newText = prompt("ویرایش عنوان تسک", task.title);
      if (newText !== null && newText.trim() !== "") {
        task.title = newText; // تغییر عنوان تسک
        renderTasks(); // رندر مجدد لیست
      }
    });
  });
}

// تابع رندر کل تسک‌ها (استفاده از آرایه اصلی)
function renderTasks() {
  displayTasks(tasks);
}

// تابع پاک کردن فیلدهای فرم
function clearData() {
  taskTitle.value = "";
  taskDueDate.value = "";
  taskPriority.value = "low";
  taskNotes.value = "";
}

// انتخاب المان‌های فیلتر و مرتب‌سازی
const searchTasks = document.querySelector("#searchTasks"); // فیلد جستجو
const filterPriority = document.querySelector("#filterPriority"); // فیلتر بر اساس اولویت
const sortByDate = document.querySelector("#sortByDate"); // مرتب‌سازی بر اساس تاریخ

// افزودن رویداد به فیلترها و جستجو
searchTasks.addEventListener("input", () => applyFilters());
filterPriority.addEventListener("change", () => applyFilters());
sortByDate.addEventListener("change", () => applyFilters());

// تابع فیلتر و مرتب‌سازی تسک‌ها
function applyFilters() {
  const searchTerms = searchTasks.value.toLowerCase(); // متن جستجو
  const filterPriorityTerms = filterPriority.value; // اولویت انتخاب شده
  const selectedSort = sortByDate.value; // حالت مرتب‌سازی انتخاب شده

  // فیلتر کردن بر اساس جستجو و اولویت
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(searchTerms); // جستجو در عنوان
    const matchPriority =
      task.priority === filterPriorityTerms || filterPriorityTerms === ""; // بررسی اولویت
    return matchSearch && matchPriority;
  });

  // مرتب‌سازی صعودی یا نزولی بر اساس تاریخ
  if (selectedSort === "asc") {
    filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (selectedSort === "desc") {
    filteredTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // نمایش تسک‌های فیلتر و مرتب‌شده
  displayTasks(filteredTasks);
}

// خروجی گرفتن از لیست تسک‌ها به صورت فایل PDF با jsPDF
exportTasksBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let yoffset = 10;
  tasks.forEach((task) => {
    const taskcontent = `${task.title} - Due: ${task.date} - Priority: ${task.priority} - Description:${task.notes}`;
    doc.text(taskcontent, 10, yoffset);
    yoffset = yoffset + 10;
  });
  doc.save("tasks.pdf");
});
// حالت تاریک
darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode"); // فعال/غیرفعال کردن کلاس تاریک

  if (document.body.classList.contains("dark-mode")) {
    darkMode.textContent = "Toggle Light Mode"; // تغییر متن دکمه
    heading1.style.color = "white"; // تغییر رنگ عنوان
  } else {
    darkMode.textContent = "Toggle Dark Mode";
    heading1.style.color = "black";
  }
});
flatpickr("#taskDueDate", {
  dateFormat: "Y/m/d", // فرمت تاریخ
  allowInput: true, // اجازه تایپ دستی هم بده
});
