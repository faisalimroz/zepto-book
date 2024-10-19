import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaRegHeart } from "react-icons/fa";
import './CartPage.css';


const CartPage = () => {
    const [books, setBooks] = useState([]);

    // Load cart data from localStorage in initial render
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setBooks(storedCart);
    }, []);

    const increaseQuantity = (id) => {
        const updatedBooks = books.map((book) =>
            book.id === id ? { ...book, quantity: book.quantity + 1 } : book
        );
        setBooks(updatedBooks);
        localStorage.setItem('cart', JSON.stringify(updatedBooks)); 
    };

    const decreaseQuantity = (id) => {
        const updatedBooks = books.map((book) =>
            book.id === id && book.quantity > 1
                ? { ...book, quantity: book.quantity - 1 }
                : book
        );
        setBooks(updatedBooks);
        localStorage.setItem('cart', JSON.stringify(updatedBooks)); 
    };

    const removeItem = (id) => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
        localStorage.setItem('cart', JSON.stringify(updatedBooks)); 
    };
   
     const total=books.length
     
    return (
        <div className="bg-gray-200 ">
            <div className="p-4 flex items-center justify-center ">
                <div className="container mx-auto max-w-4xl p-4 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-3/4 bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">
                                Your total selected Books: {total}
                            </h2>
                            <div className="space-y-4">
                                {books.map((book) => (
                                    <CartItem
                                        key={book.id}
                                        book={book}
                                        increaseQuantity={increaseQuantity}
                                        decreaseQuantity={decreaseQuantity}
                                        removeItem={removeItem}
                                       
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Cart Item Component
const CartItem = ({ book, increaseQuantity, decreaseQuantity, removeItem }) => {
    const addToWishlist=(book)=>{
        console.log(book);
        let wishlist=JSON.parse(localStorage.getItem('wishlist')) || [];
        console.log(book.id)
        const existingWishlist=wishlist.find(items=>items.id==book.id);
        if(existingWishlist){
            alert(`${book.title} already added to wishlist`)
        }
        else{
            wishlist.push({...book})
        }
        localStorage.setItem('wishlist',JSON.stringify(wishlist));
        alert(`${book.title}  added to wishlist`)
   }
    return (
       <>
         <div className="cart-item flex items-start justify-between bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-start space-x-4">
                <img src={book.formats['image/jpeg']} alt={book.title} className="rounded-lg w-20 h-28 object-cover" />
                <div>
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-gray-600">{book.author}</p>
                    <div className="flex items-center space-x-2 mt-2">
                        <button
                            className="px-2 py-1 border rounded-lg bg-amber-200"
                            onClick={() => decreaseQuantity(book.id)}
                        >
                            -
                        </button>
                        <span>{book.quantity}</span>
                        <button
                            className="px-2 py-1 border rounded-lg bg-amber-200"
                            onClick={() => increaseQuantity(book.id)}
                        >
                            +
                        </button>
                    </div>
                    <button>Add to Cart</button>
                </div>
            </div>
            <div className="flex flex-col items-end mt-12 ">
                <div className="flex space-x-2 text-gray-500 ">
                    <button className="hover:text-red-500 " onClick={() => removeItem(book.id)}>
                        <FaTrashAlt />
                    </button>
                    <button className="hover:text-red-500" onClick={() => addToWishlist(book)}>
                        <FaRegHeart />
                    </button>
                </div>
            </div>
        </div>
      
       
        
    </>
    
    );
};

export default CartPage;