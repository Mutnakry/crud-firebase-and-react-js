import React, { useEffect, useState } from 'react';
import db from '../firebase'; // Assuming you export `db` from your firebaseConfig.js
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Navbar from '../componenet/navbar';

function Showimg() {
  const [person, setPerson] = useState([]);

  const valuesCollection = collection(db, 'tblperson1');

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
      const docRef = doc(db, 'tblperson1', id);
      await deleteDoc(docRef);
      getdataperson();
      alert('Document deleted successfully');
    } catch (err) {
      console.error('Error deleting document: ', err);
      alert('Error deleting document');
    }
  };

  return (
    <div className='container'>
      <Navbar/>
      <h1>Person List</h1>
      <Link  className='btn btn-info' to='/upload'>Add</Link>

      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
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
              <td>{item.add}</td>
              <td>
                {item.imgUrl ? (
                  <img src={item.imgUrl} alt={`Image for ${item.name}`} style={{ width: '100px', height: 'auto' }} />
                ) : (
                  'No image'
                )}
              </td>
              <td>
                {item.imgUrl ? (
                  <img src={item.imgUrl} alt={`Image for ${item.name}`} style={{ width: '100px', height: 'auto' }} />
                ) : (
                  'No image'
                )}
              </td>
              <td className='ml-2'>
                <Link className='btn btn-info' to={`/edit/${item.id}`}>Edit1</Link>
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
