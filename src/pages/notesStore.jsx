import React, { useEffect, useState } from 'react';
import { NotesData } from '../context/notesContext'; // Adjust the path as necessary
import NotesCard from '../components/notesCard'; // Adjust the path as necessary
import { FaRupeeSign, FaBook } from "react-icons/fa";

const NotesStore = () => {
  const { notes, fetchNotes } = NotesData();
  const [activeTab, setActiveTab] = useState('rs1'); // State to manage active tab

  useEffect(() => {
    fetchNotes(); // Fetch notes when component mounts
  }, [fetchNotes]);

  const notesAtOneRupee = notes.filter(note => note.price === 1);
  const otherNotes = notes.filter(note => note.price !== 1);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-blue1">
      {/* Sidebar */}
      <aside className="lg:w-64 py-24 bg-gray-300 p-4 shadow-md lg:sticky lg:top-0">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaBook className="mr-2" /> Notes Store
        </h2>
        <nav>
          <button
            onClick={() => setActiveTab('rs1')}
            className={`w-full py-2 px-4 mb-2 flex items-center rounded-md transition-colors duration-300 ${
              activeTab === 'rs1' ? 'bg-blue1 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <FaRupeeSign className="mr-2" /> Notes at ₹1
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`w-full py-2 px-4 flex items-center rounded-md transition-colors duration-300 ${
              activeTab === 'paid' ? 'bg-blue1 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <FaBook className="mr-2" /> Other Notes
          </button>
        </nav>
      </aside>

      <main className="flex-1 py-28 px-4 lg:px-28">
        <div className="container mx-auto">
          {/* Conditionally render content based on active tab */}
          {activeTab === 'rs1' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">नोट्स स्टोर</h1>
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800">
                  Discover our collection of notes and explore a wealth of information at your fingertips. Purchase and read your favorite notes instantly.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">Notes at Just ₹1</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {notesAtOneRupee.length === 0 ? (
                    <p className="col-span-full text-center text-gray-700">No ₹1 notes available</p>
                  ) : (
                    notesAtOneRupee.map(note => (
                      <NotesCard key={note._id} note={note} />
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'paid' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">नोट्स स्टोर</h1>
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800">
                  Discover our collection of notes and explore a wealth of information at your fingertips. Purchase and read your favorite notes instantly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">Other Notes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {otherNotes.length === 0 ? (
                    <p className="col-span-full text-center text-gray-700">No other notes available</p>
                  ) : (
                    otherNotes.map(note => (
                      <NotesCard key={note._id} note={note} />
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotesStore;
