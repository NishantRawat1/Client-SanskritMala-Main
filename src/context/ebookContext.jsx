import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../main'; // Ensure this path is correct

const EbookContext = createContext();

export const EbookContextProvider = ({ children }) => {
  const [ebooks, setEbooks] = useState([]);
  const [ebook, setEbook] = useState(null);
  const [myEbooks, setMyEbooks] = useState([]);

  // Fetch all eBooks
  async function fetchEbooks() {
    try {
      const { data } = await axios.get(`${server}/api/ebook/all`);
      setEbooks(data.ebooks);
    } catch (error) {
      console.error('Error fetching eBooks:', error);
    }
  }

  // Fetch a single eBook by ID
  async function fetchEbook(id) {
    try {
      const { data } = await axios.get(`${server}/api/ebook/${id}`);
      setEbook(data.ebook);
    } catch (error) {
      console.error('Error fetching eBook:', error);
    }
  }

  // Fetch the user's purchased eBooks
  async function fetchMyEbooks() {
    try {
      const { data } = await axios.get(`${server}/api/myebook`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMyEbooks(data.ebooks);
    } catch (error) {
      console.error('Error fetching my eBooks:', error);
    }
  }

  useEffect(() => {
    fetchEbooks();
    fetchMyEbooks();
  }, []);

  return (
    <EbookContext.Provider value={{ ebooks, fetchEbooks, fetchEbook, ebook, myEbooks, fetchMyEbooks }}>
      {children}
    </EbookContext.Provider>
  );
};

// Custom hook to use the eBook context
export const EbookData = () => useContext(EbookContext);
