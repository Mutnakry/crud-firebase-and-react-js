import React, { useState } from 'react';
import { storage, db } from '../firebase'; // Ensure this path is correct
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './navbar';

function UploadImage() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [add, setAdd] = useState('');
    const [date, setDate] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const storageRef = ref(storage, `images/${uuidv4(file.name)}`);
      //  const imgRef = ref(storage, `imgs/${uuidv4()}`); // Create a unique reference
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Save image URL to Firestore
        await addDoc(collection(db, 'tblperson2'), {
            name,
            age,
            add,
            date,
            imgUrl: downloadURL,
        });

        alert('Image uploaded successfully');
    };

    return (
        <div className='container'>
            <Navbar/>
            <Link class='btn btn-info' to='/showing'>Add</Link>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    id='name'
                    className='form-control'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='age'>Age</label>
                <input
                    type='text'
                    id='age'
                    className='form-control'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='age'>DAte</label>
                <input
                    type='date'
                    id='age'
                    className='form-control'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='add'>Address</label>
                <input
                    type='text'
                    id='add'
                    className='form-control'
                    value={add}
                    onChange={(e) => setAdd(e.target.value)}
                />
            </div>
            <input className='form-control' type="file" onChange={handleFileChange} />
            <button className='btn btn-info my-4' onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default UploadImage;
