import React, { useEffect, useState } from 'react';
import WishlistCard from '../WishlistCard/WishlistCard';  
import './Wishlist.css'
import ServiceInfo from '../ServiceInfo/ServiceInfo';
const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

  
    const handleDelete = (productId) => {
        const updatedWishlist = wishlist.filter(product => product.id !== productId);
        setWishlist(updatedWishlist);
    };

    return (
        <div className="wishlist-page">
            <h2>My Wishlist</h2>
            <p>You have {wishlist.length} products in your wishlist</p>

            <div className="wishlist-container bg-amber-200  p-2 rounded-lg">
                {wishlist.map(product => (
                    <WishlistCard
                        key={product.id}
                        product={product}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
         <ServiceInfo></ServiceInfo>
        </div>
    );
};

export default Wishlist;
