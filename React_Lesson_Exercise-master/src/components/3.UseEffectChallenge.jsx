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

import { use } from "react";
import { useEffect, useState } from "react";


export default function UseStateChallenge() {

  // Initialize the state for users.
  const [users, setUsers] = useState([]);

  // When component mounts, fetch user data from the API.
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Set the fetched user data to the state.
        setUsers(data);
      });
  }, []);

  return (
    <main>
      <h1>useEffect Challenge</h1>
      <ul>
        {/*Renders the list of user here by mapping it out. */}
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
