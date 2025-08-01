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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <div id="loadingspinner"></div>;

  return (
    <main>
      <h1>useEffect Challenge</h1>
      <div className="user-info">
        <ul>
          {data.map(user => (
            <li key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.website}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
