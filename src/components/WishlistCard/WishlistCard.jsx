import React, { useState } from 'react';
import './WishlistCard.css';  
import { FaTrashAlt } from "react-icons/fa";  
const WishlistCard = ({ product }) => {
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingBook = cart.find(item => item.id === product.id);
        if (existingBook) {
     
          existingBook.quantity += 1;
        } else {
        
          cart.push({ ...product, quantity: 1 });
        }
      
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} added to cart!`);
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      };
      const onDelete=(product)=>{
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.title} removed from wishlist!`);
      }
      
    return (
        <div className="wishlist-card">
            <div className="card-contents">
                <div className="card-images">
                    <img src={product.formats['image/jpeg']} alt={product.title} />
                </div>
                <div className="card-details">
                    <h3>{product.title}</h3>
                    <p className="authors">{product.authors.map((author) => author.name).join(', ')}</p>

                    <button
                        id="add-to-cart-btn"
                        className="px-4 py-2 text-white rounded-md transition-all duration-300"
                        style={{
                            background: 'linear-gradient(90deg, #4A90E2, #9013FE)',
                        }}
                        onMouseEnter={(e) => (e.target.style.background = 'linear-gradient(90deg, #00C9FF, #92FE9D)')}
                        onMouseLeave={(e) => (e.target.style.background = 'linear-gradient(90deg, #4A90E2, #9013FE)')}
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
                <div className="delete-icon">
                    <FaTrashAlt onClick={() => onDelete(product)} />
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;
