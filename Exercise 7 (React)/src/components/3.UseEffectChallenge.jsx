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
import axios from "axios";

export default function UseStateChallenge() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log("API was called");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  });

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <main>
      <h1>useEffect Challenge</h1>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {data.map((user) => (
          <li key={user.id} style={{ border: "1px solid black", marginBottom: "1rem" }}>
            <strong>{user.name}</strong> ({user.username}) - {user.email}
            <br />
            Address: {user.address.street}, {user.address.city}
            <br />
            Phone: {user.phone}
            <br />
            Company: {user.company.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
