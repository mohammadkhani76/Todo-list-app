# To-Do List Web App

A simple web application for managing tasks with features like adding, deleting, completing, searching, filtering, sorting, and dark mode.

---

## Features

- Add tasks with title, due date, priority, and optional notes.
- Display tasks with their completion status.
- Mark tasks as completed or delete them.
- Search tasks by title.
- Filter tasks by priority (`low`, `medium`, `high`).
- Sort tasks by due date (ascending or descending).
- Toggle dark mode for the user interface.

---

## Project Structure

- **HTML**: Task input form, filters, and task list container.
- **CSS**: Styles including dark mode classes.
- **JavaScript**: Task management, filtering, sorting, and dark mode handling.

---

## Usage

1. Enter a task title and fill optional fields.
2. Click `Add Task` to add it to the list.
3. Use `Complete` or `Delete` buttons to manage each task.
4. Search or filter tasks using the corresponding input fields.
5. Change sorting by selecting ascending (`asc`) or descending (`desc`) based on due date.
6. Toggle dark mode using the `Toggle Dark Mode` button.

---

## Implementation Notes

- The main array `tasks` always stores all tasks.
- Task rendering is handled by `displayTasks(array)` which can receive either the full array or a filtered array.
- Complete status changes and deletions are applied directly to the given array.
- Filtering and sorting are applied before rendering the list.
- Dark mode is activated by toggling the `dark-mode` class on the `body`.

---


## Contact

Feel free to reach out:

- GitHub: https://github.com/mohammadkhani76/
- Email: nazanin.khani2@gmail.com

---

**Thank you for visiting my project!**