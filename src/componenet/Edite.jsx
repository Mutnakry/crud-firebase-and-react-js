import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import db from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Navbar from './navbar';

function Edite() {
  const { id } = useParams(); // Get the document ID from URL

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [add, setAdd] = useState('');
  const navigate = useNavigate();

  
  const docRef = doc(db, 'person', id);
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    setName(data.name);
    setAge(data.age);
    setAdd(data.add);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(docRef, { name, age, add });
      alert('Document updated successfully');
      navigate('/')
    } catch (error) {
      console.error('Error updating document: ', error);
      alert('Failed to update document');
    }
  };
  return (
    <div className='container'>
      <Navbar/>
      <h1>Edit Person</h1>
      <form onSubmit={handleUpdate}>
        <div className='form-group'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            className='form-control'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="add">Address</label>
          <input
            type="text"
            id="add"
            className='form-control'
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-info m-4'>Update</button>
      </form>
    </div>
  );
}

export default Edite;
