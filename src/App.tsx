import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import ErrorMessage from "./components/ErrorMessage";
import { searchUsers, getUserRepositories } from "./services/api";
import { User, Repository } from "./types";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSelectedUser(null);
    setRepositories([]);
    setError(null);
    setIsSearching(true);

    try {
      const results = await searchUsers(query);
      setUsers(results);
      if (results.length === 0) {
        setError(`No users found matching "${query}"`);
      }
    } catch (err) {
      setError("Failed to search users. Please try again.");
      setUsers([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectUser = async (username: string) => {
    if (selectedUser === username) {
      // Toggle selection if clicking the same user
      setSelectedUser(null);
      setRepositories([]);
      return;
    }

    setSelectedUser(username);
    setRepositories([]);
    setError(null);
    setIsLoadingRepos(true);

    try {
      const repos = await getUserRepositories(username);
      setRepositories(repos);
      if (repos.length === 0) {
        setError(`${username} has no public repositories`);
      }
    } catch (err) {
      setError(`Failed to fetch repositories for ${username}`);
      setRepositories([]);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white py-4 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          GitHub Repositories Explorer
        </h1>
        {error && <ErrorMessage message={error} onDismiss={dismissError} />}

        <SearchBar onSearch={handleSearch} isLoading={isSearching} />

        <UserList
          users={users}
          searchQuery={searchQuery}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
          repositories={repositories}
          isLoadingRepos={isLoadingRepos}
        />
      </div>
    </div>
  );
}

export default App;
