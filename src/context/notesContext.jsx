import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../main'; // Ensure this path is correct

const NotesContext = createContext();

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [myNotes, setMyNotes] = useState([]);

  // Fetch all notes
  async function fetchNotes() {
    try {
      const { data } = await axios.get(`${server}/api/notes/all`);
      setNotes(data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  // Fetch a single note by ID
  async function fetchNote(id) {
    try {
      const { data } = await axios.get(`${server}/api/notes/${id}`);
      setNote(data.note);
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  }

  // Fetch the user's purchased notes
  async function fetchMyNotes() {
    try {
      const { data } = await axios.get(`${server}/api/mynotes`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMyNotes(data.notes);
    } catch (error) {
      console.error('Error fetching my notes:', error);
    }
  }

  useEffect(() => {
    fetchNotes();
    fetchMyNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, fetchNotes, fetchNote, note, myNotes, fetchMyNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use the Notes context
export const NotesData = () => useContext(NotesContext);
