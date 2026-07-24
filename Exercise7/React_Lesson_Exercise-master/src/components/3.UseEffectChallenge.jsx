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
  fetch("https://jsonplaceholder.typicode.com/user")
    .then((response) => response.json())
    .then((data) => {
      setUsers(data)
      setLoading(false)
    });
  }, []);
  if (loading) {
    return <p>Loading user data...</p>
  }
  return (
    <main>
      <h1>useEffect Challenge</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
/*useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(err => {
        console.error("Failed to fetch users:, err");
      })
      .finally(() => setLoading(false));
  }, []);*/