import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../main'; // Ensure this path is correct

const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [myBooks, setMyBooks] = useState([]);

  async function fetchBooks() {
    try {
      const { data } = await axios.get(`${server}/api/book/all`);
      setBooks(data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  async function fetchBook(id) {
    try {
      const { data } = await axios.get(`${server}/api/book/${id}`);
      setBook(data.book);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  }

  async function fetchMyBooks() {
    try {
      const { data } = await axios.get(`${server}/api/mybook`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMyBooks(data.books);
    } catch (error) {
      console.error('Error fetching my books:', error);
    }
  }

  useEffect(() => {
    fetchBooks();
    fetchMyBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, fetchBooks, fetchBook, book, myBooks, fetchMyBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export const BookData = () => useContext(BookContext);
