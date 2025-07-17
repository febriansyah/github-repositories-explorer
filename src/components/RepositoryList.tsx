import React from 'react';
import { Repository } from '../types';

interface RepositoryListProps {
  username: string;
  repositories: Repository[];
  isLoading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ 
  username, 
  repositories, 
  isLoading 
}) => {
  if (!username) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="bg-white rounded-md shadow">
        <div className="p-3 flex items-center justify-between border-b border-gray-200">
          <span className="font-medium">{username}</span>
          <svg 
            className="w-5 h-5 transform rotate-180" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : repositories.length === 0 ? (
          <div className="text-center py-10 bg-gray-50">
            <p className="text-gray-500">No repositories found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {repositories.map((repo) => (
              <div 
                key={repo.id} 
                className="p-4 bg-gray-100"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{repo.name}</h3>
                  <div className="flex items-center">
                    <span className="mr-1 text-xl font-bold">{repo.stargazers_count}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                <p className="text-gray-800 mt-1">
                  {repo.description || 'Repository description'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryList;
