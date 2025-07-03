import React from 'react';
import { LogOut, User } from 'lucide-react';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { useTasks } from '../hooks/useTasks';

interface DashboardProps {
  user: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const {
    tasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    taskCounts,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
                <p className="text-sm text-gray-600">Welcome back, {user}!</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>


      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">

          <div>
            <TaskForm onAddTask={addTask} />
          </div>

          <div>
            <TaskList
              tasks={tasks}
              filter={filter}
              onFilterChange={setFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              taskCounts={taskCounts}
              onToggleTask={toggleTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};