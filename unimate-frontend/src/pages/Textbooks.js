import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Textbooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      const res = await axios.get("/textbooks");
      setBooks(res.data);
    }
    fetchBooks();
  }, []);

  // Filtered books
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Textbooks for Sale</h2>

      <input
        placeholder="Search by title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75em",
          marginBottom: "1em",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />

      {filtered.map(book => (
        <div key={book._id} className="listing">
          <h4>{book.title} by {book.author}</h4>
          <p>R{book.price}</p>
          <p>Seller: {book.seller?.name || "Unknown"}</p>
          {book.imageUrl && (
            <img src={book.imageUrl} alt={book.title} style={{ width: "100px", marginTop: "0.5em" }} />
          )}
        </div>
      ))}

      {filtered.length === 0 && <p>No textbooks found.</p>}
    </div>
  );
}
