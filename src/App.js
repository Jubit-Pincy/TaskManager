import React, { useState } from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Build React App', done: true },
    { id: 2, text: 'Configure SonarCloud', done: false },
    { id: 3, text: 'Deploy to Azure', done: false },
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks(prev => [...prev, { id: Date.now(), text: trimmed, done: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const completed = tasks.filter(t => t.done).length;

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">TASKS</h1>
        <p className="subtitle">{completed}/{tasks.length} complete</p>
      </header>
      <div className="input-row">
        <input
          className="task-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New task..."
          aria-label="New task"
        />
        <button className="add-btn" onClick={addTask}>ADD</button>
      </div>
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
