import React from 'react';

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p style={{ color: '#444', fontSize: '13px', letterSpacing: '1px' }}>NO TASKS</p>;
  }

  return (
    <ul style={{ listStyle: 'none' }}>
      {tasks.map(task => (
        <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
          <button
            className={`task-check ${task.done ? 'checked' : ''}`}
            onClick={() => onToggle(task.id)}
            aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
          />
          <span className="task-text" onClick={() => onToggle(task.id)}>
            {task.text}
          </span>
          <button className="delete-btn" onClick={() => onDelete(task.id)} aria-label="Delete task">
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
