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
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const getBooks = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`).then(response => response.json())
    .then(data => {
      setBooks(data.items || [])
      setLoading(false)
    })
    .catch(err => {
      console.error("Loading books was unsuccessful:", err)
      setLoading(false)
    })
  }

  useEffect(() => getBooks(), [])
  
  return (
    <main>
      <h1>useEffect Challenge</h1>

      <input type="text" value={query} placeholder="Book Title" onChange={(e) => setQuery(e.target.value)}></input>
      <button onClick={getBooks}>search</button>

      {loading ? ("Loading...") : (
        books.map(book => (
            <div key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
              <p class="author">Author(s): {book.volumeInfo.authors?.join(", ") || "unknown"}</p>
              <p class="sex">Date Published: {book.volumeInfo.publishedDate || "unknown"}</p>
              <p class="position">Description: {book.volumeInfo.description || "unknown"}</p>
            </div>
        ))
      )
      }

    </main>
  );
}
