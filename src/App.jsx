
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './styles.css';

const API_URL = 'https://reactnd-books-api.udacity.com/books';
const API_KEY = 'whatever-you-want'; 

function BookList({ books, searchTerm }) {
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <img
              src={book.imageLinks.thumbnail}
              alt={book.title}
              style={{ width: '200px', height: '300px', borderRadius: '8px', marginBottom: '10px' }}
            />
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { 'Authorization': API_KEY }
        });

        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="header-content">
            <h2> Kalvium Books</h2>
            {/* <h1>Kalvium Books</h1> */}
            <button className="register-button">Register</button>
          </div>
          <input
            type="text"
            placeholder="Search by title"
            className="search-bar"
            onChange={handleSearchChange}
          />
        </nav>
      </header>
      <BookList books={books} searchTerm={searchTerm} />
    </div>
  );
}

export default App;
