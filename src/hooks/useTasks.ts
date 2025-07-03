import { useState, useEffect } from 'react';
import { Task, TaskFilter } from '../types/Task';
import { getStoredTasks, setStoredTasks } from '../utils/localStorage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedTasks = getStoredTasks();
    const parsedTasks = storedTasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
    setTasks(parsedTasks);
  }, []);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, description: string = '') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  const filteredTasks = tasks.filter(task => {
    let statusMatch = true;
    if (filter === 'completed') statusMatch = task.completed;
    if (filter === 'pending') statusMatch = !task.completed;

    let searchMatch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      searchMatch = 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
    }

    return statusMatch && searchMatch;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    taskCounts,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};