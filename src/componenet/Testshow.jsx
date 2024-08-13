import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { collection, deleteDoc, getDocs, doc, getDoc } from 'firebase/firestore';

import { ref, deleteObject } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { storage } from '../firebase'; // Make sure to import storage
import Navbar from './navbar';
function Showimg() {
  const [person, setPerson] = useState([]);

  const valuesCollection = collection(db, 'tblperson2');

  useEffect(() => {
    getdataperson();
  }, []);

  const getdataperson = async () => {
    try {
      const showdata = await getDocs(valuesCollection);
      const dataList = showdata.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPerson(dataList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const deleteperson = async (id) => {
    try {
      const docRef = doc(db, 'tblperson2', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { imgUrl } = docSnap.data();

        // Delete the image from Firebase Storage if it exists
        if (imgUrl) {
          const imageRef = ref(storage, imgUrl);
          await deleteObject(imageRef);
        }

        // Delete the document from Firestore
        await deleteDoc(docRef);
        getdataperson(); // Refresh the data
        alert('Document and associated image deleted successfully');
      } else {
        console.error('No such document!');
        alert('No such document!');
      }
    } catch (err) {
      console.error('Error deleting document and image: ', err);
      alert('Error deleting document and image');
    }
  };

  return (
    <div className='container'>
      <Navbar/>
      <h1>Person List</h1>
      <Link className='btn btn-info' to='/test'>Add</Link>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>date</th>
            <th>Address</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {person.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.date}</td>
              <td>{item.add}</td>
              <td>
                {item.imgUrl ? (
                  <img className='rounded' src={item.imgUrl} alt={`Image for ${item.name}`} style={{ width: '60px', height: 'auto' }} />
                ) : (
                  'No image'
                )}
              </td>
              <td className='ml-2'>
                <Link className='btn btn-info' to={`/UploadImage/${item.id}`}>Edit</Link>
                <button className='btn btn-danger' onClick={() => deleteperson(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Showimg;
