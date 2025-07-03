# Task Tracker

A simple and modern Todo App built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **User Authentication:** Login functionality to manage your personal tasks securely.
- **Task Management:**
  - Add new tasks with details.
  - Edit existing tasks.
  - Mark tasks as completed or pending.
  - Delete tasks you no longer need.
- **Dashboard:** Overview of your tasks and quick actions.
- **Persistent Storage:** Tasks are saved in local storage for data persistence across sessions.
- **Responsive UI:** Clean and responsive design using Tailwind CSS.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

- `src/components/` – UI components (Dashboard, Login, TaskForm, TaskItem, TaskList)
- `src/hooks/` – Custom React hooks for authentication and task management
- `src/types/` – TypeScript type definitions
- `src/utils/` – Utility functions (e.g., localStorage helpers)

## License

This project is open source and available under the [MIT License](LICENSE).
