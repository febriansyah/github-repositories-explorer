import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();
  
  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    
    const inputElement = screen.getByPlaceholderText(/Exampleuser/i);
    const buttonElement = screen.getByText(/Search/i);
    
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    
    const inputElement = screen.getByPlaceholderText(/Exampleuser/i);
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    
    expect(inputElement).toHaveValue('testuser');
  });

  test('calls onSearch when button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    
    const inputElement = screen.getByPlaceholderText(/Exampleuser/i);
    const buttonElement = screen.getByText(/Search/i);
    
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    fireEvent.click(buttonElement);
    
    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  test('calls onSearch when Enter key is pressed', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    
    const inputElement = screen.getByPlaceholderText(/Exampleuser/i);
    
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  test('disables input and button when loading', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);
    
    const inputElement = screen.getByPlaceholderText(/Exampleuser/i);
    const buttonElement = screen.getByRole('button');
    
    expect(inputElement).toBeDisabled();
    expect(buttonElement).toBeDisabled();
  });

  test('does not call onSearch when input is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={false} />);
    
    const buttonElement = screen.getByText(/Search/i);
    fireEvent.click(buttonElement);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
