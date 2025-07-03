import React from 'react';
import { Task, TaskFilter } from '../types/Task';
import { TaskItem } from './TaskItem';
import { CheckCircle, Circle, List, Search, X } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
  onToggleTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  taskCounts,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const filterButtons = [
    { key: 'all' as TaskFilter, label: 'All Tasks', icon: List, count: taskCounts.all },
    { key: 'pending' as TaskFilter, label: 'Pending', icon: Circle, count: taskCounts.pending },
    { key: 'completed' as TaskFilter, label: 'Completed', icon: CheckCircle, count: taskCounts.completed },
  ];

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              filter === key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            {tasks.length === 0 ? (
              <>No tasks found for "<span className="font-medium">{searchQuery}</span>"</>
            ) : (
              <>Found {tasks.length} task{tasks.length !== 1 ? 's' : ''} matching "<span className="font-medium">{searchQuery}</span>"</>
            )}
          </p>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {searchQuery ? (
                <Search className="w-8 h-8 text-gray-400" />
              ) : (
                <List className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No matching tasks found' :
               filter === 'all' ? 'No tasks yet' : 
               filter === 'completed' ? 'No completed tasks' : 'No pending tasks'}
            </h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms or clear the search to see all tasks.' :
               filter === 'all' ? 'Add your first task to get started!' : 
               filter === 'completed' ? 'Complete some tasks to see them here.' : 'All tasks are completed!'}
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};