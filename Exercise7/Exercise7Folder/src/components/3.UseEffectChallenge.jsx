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
  // store the fetched data in a list
  const [userData, setUserData] = useState([]);

  // handle state of loading
  const [loading, setLoadingState] = useState(true);

  // runs when component mounts
  useEffect(() => {
    // fetch data
    fetch("https://jsonplaceholder.typicode.com/users")
      // convert to json
      // response: what fetch returns
      .then((response) => response.json())

      // update the state with fetched users and stop the loading indicator
      // data: JSON parsed from response
      .then((data) => {
        setUserData(data);
        setLoadingState(false);
      })
      // if there are errors
      .catch((error) => {
        console.log(`Error fetching users: ${error}`);
        setLoadingState(false);
      });
    // only run the effect after the initial mount
  }, []);

  // loading message
  if (loading === true) {
    return <p>Loading Users</p>;
  }

  return (
    <main>
      <h1>useEffect Challenge</h1>
      {/* list of all users */}
      <ul>
        {/* loop through array of users and create <li> for each user */}
        {userData.map((user) => (
          // create a unique key for each user
          <li key={user.id}>
            {/* show user's name in bold */}
            <h3>{user.name}</h3>
            {user.email}
            <br />
            {user.phone}
          </li>
        ))}
      </ul>
    </main>
  );
}
