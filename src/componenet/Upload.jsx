// import React, { useState } from 'react';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { v4 as uuidv4 } from 'uuid';
// import db from '../firebase'; // Import your Firestore configuration
// import { addDoc, collection } from 'firebase/firestore';

// function Upload() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [add, setAdd] = useState('');
//   const [img, setImg] = useState(null);

//   const uploadimg = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imgRef = ref(getStorage, `imgs/${uuidv4()}`);
//       try {
//         const snapshot = await uploadBytes(imgRef, file);
//         const url = await getDownloadURL(snapshot.ref);
//         setImg(url);
//         console.log('Uploaded a blob or file!', snapshot);
//       } catch (error) {
//         console.error('Upload failed', error);
//       }
//     }
//   };
//   const valuesCollection = collection(db, "tblperson3");
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
     
//       await addDoc(valuesCollection, { name, age, add, imgUrl: img });
//       alert("Data added successfully");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <div className='container'>
//       <form onSubmit={handleCreate}>
//         <h1>Insert Image</h1>
//         <div className='form-group'>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             className='form-control'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor="age">Age</label>
//           <input
//             type="text"
//             id="age"
//             className='form-control'
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor="add">Address</label>
//           <input
//             type="text"
//             id="add"
//             className='form-control'
//             value={add}
//             onChange={(e) => setAdd(e.target.value)}
//           />
//         </div>
//         <div className='form-group'>
//           <label htmlFor="img">Image</label>
//           <input
//             type="file"
//             id="img"
//             className='form-control'
//             onChange={uploadimg}
//           />
//         </div>
//         <button type="submit" className='btn btn-info'>Save</button>
//       </form>
//     </div>
//   );
// }

// export default Upload;

import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import db from '../firebase'; // Import your Firestore configuration
import { addDoc, collection } from 'firebase/firestore';
import Navbar from './navbar';


function Upload() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [add, setAdd] = useState('');
  const [img, setImg] = useState(null);

  // Function to handle image upload
  const uploadimg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage(); // Initialize Firebase Storage
      const imgRef = ref(storage, `imgs/${uuidv4()}`); // Create a unique reference
      try {
        const snapshot = await uploadBytes(imgRef, file); // Upload the file
        const url = await getDownloadURL(snapshot.ref); // Retrieve the file's URL
        setImg(url); // Set the URL to state
        console.log('Uploaded a blob or file!', snapshot);
      } catch (error) {
        console.error('Upload failed', error);
      }
    }
  };

  // Function to handle form submission
  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const valuesCollection = collection(db,'tblperson1'); // Reference to Firestore collection
      await addDoc(valuesCollection, { name, age, add, imgUrl: getDownloadURL }); // Add document with text and image URL
      alert('Data added successfully'); // Notify user
    } catch (error) {
      console.error('Error adding document: ', error); // Log any errors
    }
  };

  return (

    <div className='container'>
          <Navbar/>
      <form onSubmit={handleCreate}>
        <h1>Insert Image</h1>
        <Link  className='btn btn-info' to='/img'>back</Link>
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
          <label htmlFor='add'>Address</label>
          <input
            type='text'
            id='add'
            className='form-control'
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='img'>Image</label>
          <input
            type='file'
            id='img'
            className='form-control'
            onChange={uploadimg}
          />
        </div>
        <button type='submit' className='btn btn-info'>Save</button>
      </form>
    </div>
  );
}

export default Upload;
