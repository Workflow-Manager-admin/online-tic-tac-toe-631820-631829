import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders game title', () => {
  render(<App />);
  const titleElement = screen.getByText(/tic tac toe/i);
  expect(titleElement).toBeInTheDocument();
});

test('shows next player status', () => {
  render(<App />);
  const statusElement = screen.getByText(/next player: x/i);
  expect(statusElement).toBeInTheDocument();
});

test('renders empty board initially', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');
  // Excluding the restart button
  const gameSquares = squares.slice(0, 9);
  gameSquares.forEach(square => {
    expect(square.textContent).toBe('');
  });
});

test('allows players to make moves', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');
  // Click first square
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe('X');
  // Click second square
  fireEvent.click(squares[1]);
  expect(squares[1].textContent).toBe('O');
});

test('restart button clears the board', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');
  // Make some moves
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  // Click restart
  const restartButton = screen.getByText(/restart game/i);
  fireEvent.click(restartButton);
  // Check if board is cleared
  const gameSquares = squares.slice(0, 9);
  gameSquares.forEach(square => {
    expect(square.textContent).toBe('');
  });
});
