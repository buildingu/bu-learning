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

export default function UseEffectChallenge() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // no dependencies; will only run once when the component mounts (only 1 api call)

  if (loading) return <div id="loadingSpinner"></div>;

  return (
    <div>
      <h1 className="high-title">useEffect Challenge</h1>
      <h2>Users</h2>
      {/* Fetched Users Grid using data from useState variable set with useEffect hook */}
      <div className="users-grid">
        {
          /* map for looping through each user */
          users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
