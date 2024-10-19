import React, { useState } from 'react';
import './Footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    
    const handleSubscribe = (e) => {
        e.preventDefault();
        setIsModalOpen(true); 
        setEmail('');
    };


    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };
    return (
        <div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Thank You!</h2>
                        <p>You have successfully subscribed to our newsletter.</p>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
            <footer className="footer">
                <div className="container">
                    <div className="footer-row">

                       
                        <div className="footer-col ">
                            <h4 className='ml-4'>Home</h4>
                            <ul className=''>
                                <li><a href="#">Contact </a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Support</a></li>

                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Terms & COnditons</h4>
                            <ul>
                                <li><a href="#">Refund</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Policy</a></li>

                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Stay connected with us</h4>
                            <ul className='flex'>

                                <li><a id='facebook' href="#"><FaFacebook /></a></li>
                                <li><a id='instagram' href="#"><FaInstagram /></a></li>
                                <li><a id='twitter' href="#"><FaTwitter /></a></li>

                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Newsletter</h4>
                            <p>Subscribe to our newsletter to get the latest updates on new arrivals and special offers.</p>
                            <form action="#" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="footer-bottom">
                    <p>&copy; 2024 Zepto Book. All Rights Reserved.</p>
                </div>
            </footer>
         
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Thank You!</h2>
                        <p>You have successfully subscribed to our newsletter.</p>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Footer;
