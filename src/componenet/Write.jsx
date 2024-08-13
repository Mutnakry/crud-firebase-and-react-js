import React, { useEffect, useState } from 'react';
import  db  from '../firebase'; // Assuming you export `db` from your firebaseConfig.js
import { addDoc, collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Write() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [add, setAdd] = useState('');
  const [person, setPerson] = useState([]);

  const valuesCollection = collection(db, 'person');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await addDoc(valuesCollection, { name, age, add });
      setName('');
      setAge('');
      setAdd('');
      getdataperson();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    getdataperson();
  }, []);

  const getdataperson = async () => {
    const showdata = await getDocs(valuesCollection);
    const dataList = showdata.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //const dataList = showdata.docs.map(doc=>doc.data());
    setPerson(dataList);
  };

  const deleteperson = async (id) => {
    try {
      const docRef = doc(db, 'person', id);
      await deleteDoc(docRef);
      getdataperson();
      alert('Error deleting document');
    } catch (err) {
      console.error('Error deleting document: ', err);
      alert('Error deleting document');
    }
  };

  return (
    <div className='container'>
      <h1>Insert Person</h1>
      <form onSubmit={handleCreate}>
        <div className='form-group'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
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
            required
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
            required
            onChange={(e) => setAdd(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-info m-4'>Create</button>
      </form>

      <table className='table table-border'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
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
              <td className='ml-2'>
                <Link className='btn btn-info' to={`/edite/${item.id}`}>Edit</Link>
                <button className='btn btn-danger' onClick={() => deleteperson(item.id)}>Delete1</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Write;
