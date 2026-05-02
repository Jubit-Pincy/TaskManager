import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App', () => {
  test('renders title', () => {
    render(<App />);
    expect(screen.getByText('TASKS')).toBeInTheDocument();
  });

  test('shows initial tasks', () => {
    render(<App />);
    expect(screen.getByText('Build React App')).toBeInTheDocument();
    expect(screen.getByText('Configure SonarCloud')).toBeInTheDocument();
    expect(screen.getByText('Deploy to Azure')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('New task...');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('ADD'));
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('clears input after adding', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('New task...');
    fireEvent.change(input, { target: { value: 'Another Task' } });
    fireEvent.click(screen.getByText('ADD'));
    expect(input.value).toBe('');
  });

  test('does not add empty task', () => {
    render(<App />);
    const initialCount = screen.getAllByRole('listitem').length;
    fireEvent.click(screen.getByText('ADD'));
    expect(screen.getAllByRole('listitem').length).toBe(initialCount);
  });

  test('adds task on Enter key', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('New task...');
    fireEvent.change(input, { target: { value: 'Enter Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Enter Task')).toBeInTheDocument();
  });

  test('updates completion count', () => {
    render(<App />);
    expect(screen.getByText('1/3 complete')).toBeInTheDocument();
  });

  test('toggles task completion', () => {
    render(<App />);
    const toggleBtns = screen.getAllByLabelText(/Mark complete/i);
    fireEvent.click(toggleBtns[0]);
    expect(screen.getByText('2/3 complete')).toBeInTheDocument();
  });

  test('deletes a task', () => {
    render(<App />);
    const deleteBtns = screen.getAllByLabelText('Delete task');
    fireEvent.click(deleteBtns[0]);
    expect(screen.queryByText('Build React App')).not.toBeInTheDocument();
  });
});
