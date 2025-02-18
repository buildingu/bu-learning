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
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) =>
        response.json()
      )
      .then((data) =>
        setUsers(data)
      )
      .catch((error) =>
      console.error(error)
      )
  }, [])

  return (
    <main>
      <h1>useEffect Challenge</h1>
      {console.log(users)}
      
      <ul>
        {/* User Data... */}
        {users.map(user =>
          <>
            <li key={user.id}>{user.name}</li>
            <p><strong>Username: </strong>{user.username}</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Address </strong>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.street}</p>
            <p><strong>User's geography: </strong>{user.address.geo.lat}, {user.address.geo.lng}</p>
            <p><strong>Phone number: </strong>{user.phone}</p>
            <p><strong>Website: </strong>{user.website}</p>
            <p><strong>Company: </strong>{user.company.name}</p>
          </>
        )}
        
      </ul>
    </main>
  );
}
