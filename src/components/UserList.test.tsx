import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';
import { User, Repository } from '../types';

describe('UserList Component', () => {
  const mockUsers: User[] = [
    { id: 1, login: 'testuser1', avatar_url: 'https://example.com/avatar1.png', html_url: 'https://github.com/testuser1' },
    { id: 2, login: 'testuser2', avatar_url: 'https://example.com/avatar2.png', html_url: 'https://github.com/testuser2' }
  ];
  
  const mockRepositories: Repository[] = [
    { id: 101, name: 'repo1', description: 'Test repo 1', stargazers_count: 12, language: 'JavaScript', html_url: 'https://github.com/testuser1/repo1' },
    { id: 102, name: 'repo2', description: 'Test repo 2', stargazers_count: 23, language: 'TypeScript', html_url: 'https://github.com/testuser1/repo2' }
  ];
  
  const mockOnSelectUser = jest.fn();
  
  beforeEach(() => {
    mockOnSelectUser.mockClear();
  });

  test('renders correctly with users', () => {
    render(
      <UserList 
        users={mockUsers} 
        searchQuery="test" 
        selectedUser={null} 
        onSelectUser={mockOnSelectUser}
        repositories={[]}
        isLoadingRepos={false}
      />
    );
    
    expect(screen.getByText('testuser1')).toBeInTheDocument();
    expect(screen.getByText('testuser2')).toBeInTheDocument();
  });

  test('renders nothing when searchQuery is empty', () => {
    const { container } = render(
      <UserList 
        users={[]} 
        searchQuery="" 
        selectedUser={null} 
        onSelectUser={mockOnSelectUser}
        repositories={[]}
        isLoadingRepos={false}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('calls onSelectUser when a user is clicked', () => {
    render(
      <UserList 
        users={mockUsers} 
        searchQuery="test" 
        selectedUser={null} 
        onSelectUser={mockOnSelectUser}
        repositories={[]}
        isLoadingRepos={false}
      />
    );
    
    const userItem = screen.getByText('testuser1');
    fireEvent.click(userItem.parentElement as HTMLElement);
    
    expect(mockOnSelectUser).toHaveBeenCalledWith('testuser1');
  });

  test('highlights selected user', () => {
    render(
      <UserList 
        users={mockUsers} 
        searchQuery="test" 
        selectedUser="testuser1" 
        onSelectUser={mockOnSelectUser}
        repositories={mockRepositories}
        isLoadingRepos={false}
      />
    );
    
    const userItems = screen.getAllByRole('listitem');
    
    // Check that the first item has the rotate class for the arrow
    const firstItemArrow = userItems[0].querySelector('svg');
    expect(firstItemArrow).toHaveClass('rotate-180');
    
    // Check that the second item doesn't have the rotate class
    const secondItemArrow = userItems[1].querySelector('svg');
    expect(secondItemArrow).not.toHaveClass('rotate-180');
  });
});
