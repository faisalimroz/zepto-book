import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../images/logo.png';
import './Navbar.css';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from 'react-icons/bs';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigate = useNavigate();

  const topics = [
    { label: "All", value: "" },
    { label: "Children", value: "children" },
    { label: "Science", value: "science" },
    { label: "Fiction", value: "fiction" },
    { label: "History", value: "history" },
    { label: "Philosophy", value: "philosophy" },
    { label: "Adventure", value: "adventure" },
    { label: "Bildungsromans", value: "bildungsromans" },
  ];

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      // let query = `https://gutendex.com/books/?search=${searchTerm}`;
      // const response = await axios.get(query);
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-white p-2 nav border-b-2 border-sky-400">
      <div className="flex flex-col sm:flex-col lg:flex-row items-center justify-between w-full">

        {/* First row: Logo and Search Bar in one row */}
        <div className="flex items-center w-full  justify-evenly mb-4 lg:mb-0">
          <Link to='/'>
            <h2 className='italic font-serif logo whitespace-nowrap mr-3 font-bold'>Zepto Book</h2>
          </Link>

          <div id='search-bar' className="mr-5 flex items-center w-full max-w-md rounded-full border border-sky-400 focus-within:ring-2 focus-within:ring-indigo-500">
            <input
              type="text"
              placeholder="Search books by title..."
              className="p-2 w-full rounded-full focus:outline-none focus:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <button onClick={handleSearch} className="px-3 py-2">
              <FaSearch className="text-sky-400" />
            </button>
          </div>
        </div>

        {/* Second row: Cart, Wishlist, and Dropdown */}
        <div className="flex w-full sm:w-auto justify-center sm:justify-end last-nav">
          <div className='flex p-3'>
            <Link to='/cart'>
              <BsCart3 className='mr-4 mt-1 cart-icon hover:text-green-500 h-5 w-5' />
            </Link>
            <Link to='/wishlist'>
              <FaRegHeart className='mr-2 mt-1 wishlist-icon hover:text-red-500 h-5 w-5' />
            </Link>
          </div>

          <select
            className="p-2 border border-sky-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            value={selectedTopic}
            onChange={(e) => {
              const topic = e.target.value;
              setSelectedTopic(topic);
              navigate(`/category/topic=${encodeURIComponent(topic)}`);
            }}
          >
            {topics.map((topic) => (
              <option id='option' key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>

        </div>
      </div>
    </div>


  );
};

export default Navbar;