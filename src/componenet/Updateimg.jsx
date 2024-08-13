import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './navbar';

function Edite() {
    const { id } = useParams(); // Get the document ID from URL
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [add, setAdd] = useState('');
    const [file, setFile] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const navigate = useNavigate();

    const docRef = doc(db, 'tblperson2', id);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name);
            setAge(data.age);
            setAdd(data.add);
            setImgUrl(data.imgUrl); // Assuming the existing image URL is stored in the document
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const deleteOldImage = async (url) => {
        if (url) {
            const fileRef = ref(storage, url);
            await deleteObject(fileRef).catch((error) => {
                console.error('Error deleting old image: ', error);
            });
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let newImgUrl = imgUrl;

            // Upload the new image if a file is selected
            if (file) {
                // Delete the old image if it exists
                await deleteOldImage(imgUrl);

                // Upload the new image
                const storageRef = ref(storage, `images/${uuidv4()}`);
                await uploadBytes(storageRef, file);
                newImgUrl = await getDownloadURL(storageRef);
            }
            await updateDoc(docRef, { name, age, add, imgUrl: newImgUrl });
            navigate('/showing');
            alert('Document updated successfully');
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
                <div className='form-group'>
                    <label htmlFor="file">Upload Image</label>
                    <input className='form-control' type="file" onChange={handleFileChange} />
                    {imgUrl ? (
                        <img src={imgUrl} alt={`Image for ${name}`} style={{ width: '100px', height: 'auto' }} />
                    ) : (
                        'No image'
                    )}
                </div>
                <button type="submit" className='btn btn-info m-4'>Update</button>
            </form>
        </div>
    );
}

export default Edite;
