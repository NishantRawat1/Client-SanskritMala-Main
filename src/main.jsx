import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserContextProvider } from './context/userContext.jsx';
import { CourseContextProvider } from './context/courseContext.jsx';
import { BookContextProvider } from './context/bookContext.jsx'; // Import BookContextProvider
import { EbookContextProvider } from './context/ebookContext.jsx';
import { NotesContextProvider } from './context/notesContext.jsx';

export const server = 'https://server-sanskrit-mala.onrender.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <BookContextProvider> {/* Wrap with BookContextProvider */}
          <EbookContextProvider>
          <NotesContextProvider>
            <App />
          </NotesContextProvider>
  
          </EbookContextProvider>
        </BookContextProvider>
      </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
