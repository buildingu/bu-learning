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

 
    const[data, setData] = useState(null);
    


  const[load, setLoad] = useState("Loading...")
  useEffect (() => {
    const fetchData = async () =>{
      try{
         const response = await fetch('https://www.swapi.tech/api/people')
         const json = await response.json()

        console.log(json) 
         setData(json.results)
         setLoad(null)
        

      }
      catch(error){
        console.error("There is an error")

      }
   
    };
    fetchData();

    
  }, []);
   
  return (
   
    <main>
      
      <h1>useEffect Challenge</h1>
      <p>{load}</p>
      <ul>
       {data && data.map((item, index) => (
        <li key = {index}>{item.name}</li>

       ))}
      </ul>
    </main>
  );
}
