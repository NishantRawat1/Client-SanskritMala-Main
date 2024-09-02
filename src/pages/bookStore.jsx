import React, { useEffect } from 'react';
import { BookData } from '../context/bookContext'; // Adjust the path as necessary
import BookCard from '../components/bookcard'; // Adjust the path as necessary

const BookStore = () => {
  const { books, fetchBooks } = BookData();

  useEffect(() => {
    fetchBooks(); // Fetch books when component mounts
  }, [fetchBooks]);

  return (
    <div className="container mx-auto px-4 py-28 sm:py-28 lg:py-28">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-blue1">संस्‍कृत पुस्तकालय</h1>
        <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-900">
          Dive into the world of ancient wisdom with our collection of Sanskrit texts. Explore, learn, and enrich your knowledge with these invaluable resources.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length === 0 ? (
          <p className="col-span-full text-center text-gray-800 text-base sm:text-lg">No books available</p>
        ) : (
          books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))
        )}
      </div>
    </div>
  );
};

export default BookStore;
