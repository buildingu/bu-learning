/**
 * Challenge 3: useEffect
 *
 * Description:
 * Fetch and display user data from a public API (e.g. https://jsonplaceholder.typicode.com/users) when the component mounts.
 * Display a loading indicator while the data is being fetched by using useState (optional).
 *
 * - Use the `useEffect` hook to fetch data when the component mounts.
 * - Use `useState` to manage the fetched user data and the loading state.
 * - Render the data in a list once it's successfully fetched.
 */

import { useEffect, useState } from "react";

export default function UseStateChallenge() {
  const [users, setUsers] = useState([]); // State for user data
  const [loading, setLoading] = useState(true); // State for loading indicator
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data); // Update state with fetched data
      setLoading(false); // Stop loading once data is fetched
    };

    fetchUsers();
  }, []);
  
  return (
    <main>
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p> // Display loading indicator while fetching data
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
