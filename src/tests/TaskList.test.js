import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../components/TaskList';

const mockTasks = [
  { id: 1, text: 'Task One', done: false },
  { id: 2, text: 'Task Two', done: true },
];

describe('TaskList', () => {
  test('renders all tasks', () => {
    render(<TaskList tasks={mockTasks} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Task One')).toBeInTheDocument();
    expect(screen.getByText('Task Two')).toBeInTheDocument();
  });

  test('shows empty state', () => {
    render(<TaskList tasks={[]} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('NO TASKS')).toBeInTheDocument();
  });

  test('calls onToggle when check clicked', () => {
    const onToggle = jest.fn();
    render(<TaskList tasks={mockTasks} onToggle={onToggle} onDelete={() => {}} />);
    fireEvent.click(screen.getAllByLabelText(/Mark/i)[0]);
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  test('calls onToggle when text clicked', () => {
    const onToggle = jest.fn();
    render(<TaskList tasks={mockTasks} onToggle={onToggle} onDelete={() => {}} />);
    fireEvent.click(screen.getByText('Task One'));
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete clicked', () => {
    const onDelete = jest.fn();
    render(<TaskList tasks={mockTasks} onToggle={() => {}} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByLabelText('Delete task')[0]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test('applies done class to completed tasks', () => {
    render(<TaskList tasks={mockTasks} onToggle={() => {}} onDelete={() => {}} />);
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveClass('done');
  });

  test('shows checked state for completed tasks', () => {
    render(<TaskList tasks={mockTasks} onToggle={() => {}} onDelete={() => {}} />);
    const checkBtns = screen.getAllByLabelText(/Mark/i);
    expect(checkBtns[1]).toHaveClass('checked');
  });
});
