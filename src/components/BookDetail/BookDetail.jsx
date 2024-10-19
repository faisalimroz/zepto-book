import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import Loading from '../Loading/Loading';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book detail:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  if (!book) {
    return <div>No book found.</div>;
  }
  const addToCart = (book) => {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

  
    const existingBook = cart.find(item => item.id === book.id);
    if (existingBook) {
      
      existingBook.quantity += 1;
    } else {
 
      cart.push({ ...book, quantity: 1 });
    }

   
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${book.title} added to cart!`);
  };
  const addToWishlist = (book) => {
    console.log(book);
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    console.log(book.id)
    const existingWishlist = wishlist.find(items => items.id == book.id);
    if (existingWishlist) {
      alert(`${book.title} already added to wishlist`)
    }
    else {
      wishlist.push({ ...book })
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(`${book.title}  added to wishlist`)
  }

  return (
    <div>
      <div className="container containers mx-auto p-4 flex flex-col lg:flex-row items-center justify-center">
        <div className="shadow-lg w-full main-container lg:w-auto flex flex-col lg:flex-row gap-12 border p-4 rounded-md shadow-lg items-center justify-center">
          <div className="book-images flex-shrink-0 ">
            {book.formats['image/jpeg'] ? (
              <img
                src={book.formats['image/jpeg']}
                alt={book.title}
                className="mx-auto"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                <span>No Image Available</span>
              </div>
            )}
          </div>

          <div className="book-details flex-grow">
            <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
            <p className="text-lg font-semibold">Author: {book.authors.map((author) => author.name).join(', ')}</p>
            <p className="font-serif">Genre: {book.subjects ? book.subjects[0] : 'Unknown'}</p>
            <div className="actions flex gap-4 mt-4">
    
    <button
        id="add-to-cart-btn"
        className="px-4 py-2 text-white rounded-md transition-all duration-300"
        style={{
            background: 'linear-gradient(90deg, #4A90E2, #9013FE)',
        }}
        onMouseEnter={(e) => (e.target.style.background = 'linear-gradient(90deg, #00C9FF, #92FE9D)')}
        onMouseLeave={(e) => (e.target.style.background = 'linear-gradient(90deg, #4A90E2, #9013FE)')}
        onClick={() => addToCart(book)}
    >
        Add to Cart
    </button>

    
    <button
        id="wishlist-btn"
        className="px-4 py-2 text-white rounded-md transition-all duration-300"
        style={{
            background: 'linear-gradient(90deg, #D4145A, #FBB03B)',
        }}
        onMouseEnter={(e) => (e.target.style.background = 'linear-gradient(90deg, #FF512F, #F09819)')}
        onMouseLeave={(e) => (e.target.style.background = 'linear-gradient(90deg, #D4145A, #FBB03B)')}
        onClick={() => addToWishlist(book)}
    >
        Add to Wishlist
    </button>
</div>


          </div>
        </div>

      </div>
      <ServiceInfo></ServiceInfo>
    </div>
  );
};

export default BookDetail;
