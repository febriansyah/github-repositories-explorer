import axios from 'axios';
import { User, Repository } from '../types';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.github.com';

export const searchUsers = async (query: string): Promise<User[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: query,
        per_page: 5
      }
    });
    return response.data.items;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}/repos`, {
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: 100
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};
