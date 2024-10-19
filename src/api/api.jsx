import axios from 'axios';

export const fetchBooks = async (page = 1) => {
  try {
    const response = await axios.get(`https://gutendex.com/books/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
};