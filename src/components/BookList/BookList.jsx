import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination'; // Import the Pagination component
import './BookList.css';
import '../Pagination/Pagination.css'
import Loading from '../Loading/Loading';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
  // Heart icon for wishlist
const BookCard = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track the total number of pages
  const booksPerPage = 32; // Set the number of books per page
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://gutendex.com/books/?page=${currentPage}`);
        setBooks(response.data.results);
        setTotalPages(Math.ceil(response.data.count / booksPerPage)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchBooks();
  }, [currentPage]); // Fetch new data when the page changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const addToCart = (book) => {
    // Retrieve the existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the book is already in the cart
    const existingBook = cart.find(item => item.id === book.id);
    if (existingBook) {
      // If book exists, increase quantity
      existingBook.quantity += 1;
    } else {
      // Add new book with quantity 1
      cart.push({ ...book, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${book.title} added to cart!`);
  };
  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div className="container ">
     
      
      <div className="book-grids ">
        {books.map((book) => (
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
              <p className="book-author font-mono  text-black"><strong>Author:</strong> {book.authors.map((author) => author.name).join(', ')}</p>
              <p className="book-genre font-mono text-black"><strong>Genre:</strong> {book.subjects ? book.subjects[0] : 'Unknown'}</p>
            </Link>

            {/* Hover Content */}
            <div className="hover-content">
            <button className="hover-btn w-full" onClick={() => addToCart(book)}>Add to Cart</button>
              <Link to={`/book/${book.id}`} className="hover-btn w-full">View Details</Link>
            </div>
          </div>
        ))}
      </div>

      <Pagination
    
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ServiceInfo></ServiceInfo>
    </div>
    
  );
};

export default BookCard;
