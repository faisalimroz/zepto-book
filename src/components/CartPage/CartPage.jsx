import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaRegHeart } from "react-icons/fa";
import './CartPage.css';  // Assuming this contains your modal CSS

const CartPage = () => {
    const [books, setBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    // Load cart data from localStorage in initial render
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setBooks(storedCart);
    }, []);

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent("");
    };

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

    const total = books.length;

    return (
        <div className="bg-gray-200 ">
            <div className="p-4 flex items-center justify-center ">
                <div className="container mx-auto max-w-4xl p-4 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Cart Items Section */}
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

                        {/* Additional Card Section */}
                        <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-lg">
                            <OrderSummary openModal={openModal} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Component */}
            {isModalOpen && <Modal closeModal={closeModal} content={modalContent} />}
        </div>
    );
};

// Cart Item Component
const CartItem = ({ book, increaseQuantity, decreaseQuantity, removeItem }) => {
    const addToWishlist = (book) => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const existingWishlist = wishlist.find(items => items.id === book.id);
        if (existingWishlist) {
            alert(`${book.title} already added to wishlist`);
        } else {
            wishlist.push({ ...book });
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${book.title} added to wishlist`);
        }
    };

    return (
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
                </div>
            </div>
            <div className="flex flex-col items-end mt-12">
                <div className="flex space-x-2 text-gray-500">
                    <button className="hover:text-red-500" onClick={() => removeItem(book.id)}>
                        <FaTrashAlt />
                    </button>
                    <button className="hover:text-red-500" onClick={() => addToWishlist(book)}>
                        <FaRegHeart />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Order Summary Component
const OrderSummary = ({ openModal }) => {
    return (
        <div className="order-summary flex flex-col items-center">
            <button
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg mb-2"
                onClick={() => openModal('Order as a Gift')}
            >
                Order as a Gift
            </button>
            <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={() => openModal('Proceed to Check Out')}
            >
                Proceed to Check Out
            </button>
            <p className="text-sm text-gray-600 mt-2">
                Apply <span className="font-semibold">Promo Code</span> on the Shipping Page
            </p>
        </div>
    );
};

// Modal Component
const Modal = ({ closeModal, content }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{content}</h2>
                <p>Your Order/Gift for {content} has been placed.</p>
                <button className="close-button" onClick={closeModal}>Ok</button>
            </div>
        </div>
    );
};

export default CartPage;
