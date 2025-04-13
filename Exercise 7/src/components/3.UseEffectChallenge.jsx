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
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      setUserData(data),
      setIsLoading(false)
    })
  }, [])
  return (
    <main>
      <h1>useEffect Challenge</h1>
      <h2>User Data:</h2>
 
        {isLoading ? (
          <h2>Loading...</h2>
          ) : (
              <ul>
          {userData.map((user) => (
            <li key={user.id}>
              <strong>Name:</strong>{user.name} <br />
              <strong>Email:</strong>{user.email} <br />
              <strong>Phone:</strong>{user.phone} <br />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
