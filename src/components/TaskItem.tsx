import React, { useState } from 'react';
import { Task } from '../types/Task';
import { Edit3, Trash2, Check, X, Calendar } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (deleteConfirmText === task.title) {
      onDelete(task.id);
      setShowDeleteConfirm(false);
      setDeleteConfirmText('');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteConfirmText('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const isDeleteConfirmValid = deleteConfirmText === task.title;

  return (
    <div className={`bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
      task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Task title"
              autoFocus
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Task description"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors duration-200"
              >
                <Check className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start space-x-3">
              <button
                onClick={() => onToggle(task.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {task.completed && <Check className="w-3 h-3" />}
              </button>

              <div className="flex-1 min-w-0">
                <h3 className={`font-medium transition-all duration-200 ${
                  task.completed ? 'text-green-700 line-through' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 transition-all duration-200 ${
                    task.completed ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}
                <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>Created {formatDate(task.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  title="Edit task"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="border-t border-red-200 bg-red-50 p-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-red-700 font-medium mb-2">
                This action cannot be undone. This will permanently delete the task.
              </p>
              <p className="text-sm text-red-600 mb-3">
                Please type <span className="font-mono bg-red-100 px-1 py-0.5 rounded text-red-800">{task.title}</span> to confirm.
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type task title here"
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleDelete}
                disabled={!isDeleteConfirmValid}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isDeleteConfirmValid
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                I understand the consequences, delete this task
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};