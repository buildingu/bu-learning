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
    const timer = setTimeout(function() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setUsers(data);
        })
        .catch((error) =>{
          console.error("There was a problem with the fetch operation:", error);
          setLoading(false);
        }
        );
    }, 2000); 
    return ()=> clearTimeout(timer)
  }, []);
  return (
    <main>
      <h1>useEffect Challenge</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ol>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}:
              <ul>
                <li>username: {user.username}</li>
                <li>phone: {user.phone}</li>
                <li>email: {user.email}</li>
              </ul>
            <br />
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
