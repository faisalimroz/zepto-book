import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import '../BookDetail/BookDetail.css';
import './Searchlist.css';
import Loading from '../Loading/Loading';
const Searchlist = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);  


  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('term');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        setLoading(true); 
        try {
          const response = await axios.get(`https://gutendex.com/books/?search=${encodeURIComponent(searchTerm)}`);
          setBooks(response.data.results);
          console.log(response.data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
        setLoading(false);  
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{searchTerm}"</h2>

      {loading ? (
       <Loading></Loading>
      ) : (
        <div className='book-grids'>
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

        </div>
      )}

    </div>
  );
};

export default Searchlist;
