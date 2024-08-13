import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';
import Navbar from './navbar';

function Book() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const colRef = collection(db, 'book');
        const snapshot = await getDocs(colRef);
        const booksList = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBooks(booksList);
      } catch (err) {
        console.error('Error fetching books: ', err.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
     <Navbar />
      {books.length > 0 ? (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              {book.name} - {book.from}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
}

export default Book;
