import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { searchUsers, getUserRepositories } from './services/api';

// Mock the API service
jest.mock('./services/api');
const mockSearchUsers = searchUsers as jest.MockedFunction<typeof searchUsers>;
const mockGetUserRepositories = getUserRepositories as jest.MockedFunction<typeof getUserRepositories>;

describe('GitHub Repositories Explorer', () => {
  beforeEach(() => {
    mockSearchUsers.mockClear();
    mockGetUserRepositories.mockClear();
  });

  test('renders the search bar component', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Exampleuser/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders the search bar', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Exampleuser/i);
    const searchButton = screen.getByText(/Search/i);
    
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('handles user search', async () => {
    const mockUsers = [
      { id: 1, login: 'testuser1', avatar_url: 'https://example.com/avatar1.png', html_url: 'https://github.com/testuser1' },
      { id: 2, login: 'testuser2', avatar_url: 'https://example.com/avatar2.png', html_url: 'https://github.com/testuser2' }
    ];
    
    mockSearchUsers.mockResolvedValueOnce(mockUsers);
    
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Exampleuser/i);
    const searchButton = screen.getByText(/Search/i);
    
    fireEvent.change(searchInput, { target: { value: 'testuser' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(mockSearchUsers).toHaveBeenCalledWith('testuser');
      expect(screen.getByText('testuser1')).toBeInTheDocument();
      expect(screen.getByText('testuser2')).toBeInTheDocument();
    });
  });

  test('handles empty search results', async () => {
    mockSearchUsers.mockResolvedValueOnce([]);
    
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Exampleuser/i);
    const searchButton = screen.getByText(/Search/i);
    
    fireEvent.change(searchInput, { target: { value: 'nonexistentuser' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(mockSearchUsers).toHaveBeenCalledWith('nonexistentuser');
      expect(screen.getByText(/No users found matching "nonexistentuser"/i)).toBeInTheDocument();
    });
  });
});
