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
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>useEffect Challenge</h1>
      
      {loading ? (<p>Loading...</p>) : (
        <ul style={{ textAlign: 'left', padding: 0 }}>
          {users.map(user => (
            <li key={user.id} style={{marginBottom: '20px', padding: '20px', backgroundColor: '#c0440b', listStyle: 'none'}}>
              <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid white' }}>
                {user.name} (@{user.username})
              </h3>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Contact:</strong>
                <p style={{ margin: '5px 0' }}>Email: {user.email}</p>
                <p style={{ margin: '5px 0' }}>Phone: {user.phone}</p>
                <p style={{ margin: '5px 0' }}>Website: {user.website}</p>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong>Address:</strong>
                <p style={{ margin: '5px 0' }}>
                  {user.address.street}, {user.address.suite}
                </p>
                <p style={{ margin: '5px 0' }}>
                  {user.address.city}, {user.address.zipcode}
                </p>
                <p style={{ margin: '5px 0' }}>
                  Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                </p>
              </div>

              <div>
                <strong>Company:</strong>
                <p style={{ margin: '5px 0' }}>{user.company.name}</p>
                <p style={{ margin: '5px 0', fontStyle: 'italic' }}>
                  "{user.company.catchPhrase}"
                </p>
                <p style={{ margin: '5px 0', fontSize: '12px' }}>
                  {user.company.bs}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}