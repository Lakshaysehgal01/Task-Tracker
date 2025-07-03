export const AUTH_KEY = 'taskTracker_user';
export const TASKS_KEY = 'taskTracker_tasks';

export const getStoredUser = (): string | null => {
  return localStorage.getItem(AUTH_KEY);
};

export const setStoredUser = (username: string): void => {
  localStorage.setItem(AUTH_KEY, username);
};

export const removeStoredUser = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const getStoredTasks = (): any[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const setStoredTasks = (tasks: any[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};