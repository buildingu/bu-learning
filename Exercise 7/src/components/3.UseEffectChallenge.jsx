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

//  1. Create your state: You need a box to hold your users list (starting as an empty array []) and a box to hold your loading status (starting as true).
//  2. Setup useEffect: Inside the effect, use standard JavaScript fetch() to grab the data from the URL.
//  3. Update state: Once the data arrives, update your users state with the data, and set your loading state to false.

import { useEffect, useState } from 'react';

export default function UseEffectChallenge() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(setUserList, setIsLoading);
  }, []);

  return (
    <main>
      <h1>useEffect Challenge</h1>
      <ul>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          userList.map((user) => <li key={user.id}>{user.name}</li>)
        )}
      </ul>
    </main>
  );
}

async function fetchData(setUserList, setIsLoading) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error('Could not fetch data.');
    }

    const data = await response.json();
    const userList = [];
    data.forEach((user) => {
      userList.push({ id: user.id, name: user.name });
    });
    setUserList(userList);
    setIsLoading(false);
    console.log(userList);
  } catch (error) {
    console.log(error);
  }
}
