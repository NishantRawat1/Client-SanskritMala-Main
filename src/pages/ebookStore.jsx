import React, { useEffect } from 'react';
import { EbookData } from '../context/ebookContext'; // Adjust the path as necessary
import EbookCard from '../components/ebookcard'; // Adjust the path as necessary

const EbookStore = () => {
  const { ebooks, fetchEbooks } = EbookData();

  useEffect(() => {
    fetchEbooks(); // Fetch eBooks when component mounts
  }, [fetchEbooks]);

  return (
    <div className="container text-gray-100   mx-auto p-4 py-28">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue1 mb-2 ">ई-बुक्स स्टोर</h1>
        <p className="text-lg font-medium text-gray-800">
          Discover our collection of eBooks and explore a world of knowledge at your fingertips. Purchase and read your favorite books instantly.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ebooks.length === 0 ? (
          <p className="col-span-full text-center text-gray-700">No eBooks available</p>
        ) : (
          ebooks.map((ebook) => (
            <EbookCard key={ebook._id} ebook={ebook} />
          ))
        )}
      </div>
    </div>
  );
};

export default EbookStore;
