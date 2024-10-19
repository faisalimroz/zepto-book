import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import './GenreFilter.css';
import Loading from '../Loading/Loading';

const GenreFilter = () => {
  const { topic } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const actualTopic = topic.split('=')[1]; 

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://gutendex.com/books/?topic=${encodeURIComponent(actualTopic)}`);
        setBooks(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    if (actualTopic) { 
      fetchBooks();
    }
  }, [actualTopic]);

  return (
    <div className="container">
      {/* <h1 className='text-center font-mono font-bold text-2xl'>Books in {actualTopic}</h1> */}
      {
        loading?(<Loading></Loading>):( <div className='book-grids'>
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="book-cards shadow-lg p-2">
                <Link to={`/book/${book.id}`} className="book-cards-content">
                  {book.formats['image/jpeg'] ? (
                    <img
                      src={book.formats['image/jpeg']}
                      alt={book.title}
                      className="book-image text-black font-bold font-mono"
                    />
                  ) : (
                    <div className="no-image">
                      <span>No Image Available</span>
                    </div>
                  )}
                  <h2 className="book-title">{book.title}</h2>
                  <p className="book-author font-mono text-black"><strong>Author:</strong> {book.authors.map((author) => author.name).join(', ')}</p>
                  <p className="book-genre font-mono text-black"><strong>Genre:</strong> {book.subjects ? book.subjects[0] : 'Unknown'}</p>
                </Link>
                <div className="hover-content">
                  <button className="hover-btn w-full" onClick={() => addToCart(book)}>Add to Cart</button>
                  <Link to={`/book/${book.id}`} className="hover-btn w-full">View Details</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No books found for the search term.</p>
          )}

        </div>)
      }
    </div>
  );
};

export default GenreFilter;
