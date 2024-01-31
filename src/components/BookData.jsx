import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookData() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reactnd-books-api.udacity.com/books', {
          headers: {
            'Authorization': 'whatever-you-want'
          }
        });
        const result = await response.json();
        setData(result.books);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="App">
        <h1 id="title">Kalvium Books</h1>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search books"
            id="searchBar"
            onChange={handleSearch}
          />
        </div>
        <div className="registerBtn">
          <Link to="/register">
            <button id="registerBtn" placeholder="Register">
              Register
            </button>
          </Link>
        </div>
      </div>
      <div className="bookData">
        {data
          .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
          .map((item, index) => (
            <div key={index}>
              <img src={item.imageLinks.smallThumbnail} alt="" id="bookImg" />
              <p id="bookTitle">{item.title}</p>
              <div id="bookInfo">
                <span id="bookRating">{item.averageRating}</span>
                <p id="star">⭐</p>
                <p id="bookPrice">free</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default BookData;
