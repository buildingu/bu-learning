import { useEffect, useState } from "react";

export default function UseEffectChallenge() {
  // Step 1: Set up state for user data and loading state
  const [users, setUsers] = useState([]);  // State to store user data
  const [loading, setLoading] = useState(true);  // State to handle loading

  // Step 2: Use useEffect to fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);  // Update state with fetched data
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);  // Set loading to false if there's an error
      }
    };

    fetchUserData();  // Call the function to fetch data
  }, []);  // Empty dependency array means this effect runs only once, on mount

  return (
    <main>
      <h1>useEffect Challenge</h1>

      {/* Step 3: Show loading indicator while fetching data */}
      {loading ? (
        <p>Loading...</p>  // Show loading message while fetching
      ) : (
        <ul>
          {/* Step 4: Render the fetched user data in a list */}
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
