// import React, { useEffect, useState } from 'react';
// import db from '../firebase';
// import { collection, deleteDoc, getDocs, doc, getDoc } from 'firebase/firestore';

// import { ref, deleteObject } from 'firebase/storage';
// import { Link } from 'react-router-dom';
// import { storage } from '../firebase'; // Make sure to import storage
// import Navbar from './navbar';
// function Showimg() {
//   const [person, setPerson] = useState([]);

//   const valuesCollection = collection(db, 'tblperson2');

//   useEffect(() => {
//     getdataperson();
//   }, []);

//   const getdataperson = async () => {
//     try {
//       const showdata = await getDocs(valuesCollection);
//       const dataList = showdata.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setPerson(dataList);
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//     }
//   };

//   const deleteperson = async (id) => {
//     try {
//       const docRef = doc(db, 'tblperson2', id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const { imgUrl } = docSnap.data();

//         // Delete the image from Firebase Storage if it exists
//         if (imgUrl) {
//           const imageRef = ref(storage, imgUrl);
//           await deleteObject(imageRef);
//         }

//         // Delete the document from Firestore
//         await deleteDoc(docRef);
//         getdataperson(); // Refresh the data
//         alert('Document and associated image deleted successfully');
//       } else {
//         console.error('No such document!');
//         alert('No such document!');
//       }
//     } catch (err) {
//       console.error('Error deleting document and image: ', err);
//       alert('Error deleting document and image');
//     }
//   };

//   return (
//     <div className='container'>
//       <Navbar/>
//       <h1>Person List</h1>
//       <Link className='btn btn-info' to='/test'>Add</Link>
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>date</th>
//             <th>Address</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {person.map((item, index) => (
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td>{item.name}</td>
//               <td>{item.age}</td>
//               <td>{item.date}</td>
//               <td>{item.add}</td>
//               <td>
//                 {item.imgUrl ? (
//                   <img className='rounded' src={item.imgUrl} alt={`Image for ${item.name}`} style={{ width: '60px', height: 'auto' }} />
//                 ) : (
//                   'No image'
//                 )}
//               </td>
//               <td className='ml-2'>
//                 <Link className='btn btn-info' to={`/UploadImage/${item.id}`}>Edit</Link>
//                 <button className='btn btn-danger' onClick={() => deleteperson(item.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Showimg;









// import React, { useEffect, useState } from 'react';
// import db from '../firebase';
// import { collection, deleteDoc, getDocs, doc, limit, orderBy, query, getDoc, startAfter } from 'firebase/firestore';
// import { ref, deleteObject } from 'firebase/storage';
// import { Link } from 'react-router-dom';
// import { storage } from '../firebase'; // Ensure you import storage
// import Navbar from './navbar';

// function Showimg() {
//   const [person, setPerson] = useState([]);
//   const [lastVisible, setLastVisible] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(6); // Number of items per page
//   const [totalPages, setTotalPages] = useState(1); // Initialize totalPages

//   const valuesCollection = collection(db, 'tblperson2');

//   useEffect(() => {
//     const fetchDataAndCount = async () => {
//       await fetchTotalCount(); // Fetch total document count
//       await fetchData(); // Fetch data for the current page
//     };
//     fetchDataAndCount();
//   }, [page]);

//   const fetchTotalCount = async () => {
//     try {
//       // Counting documents can be inefficient for large datasets
//       const querySnapshot = await getDocs(valuesCollection);
//       const totalCount = querySnapshot.size;
//       setTotalPages(Math.ceil(totalCount / pageSize));
//     } catch (error) {
//       console.error('Error fetching total count: ', error);
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const personQuery = query(
//         valuesCollection,
//         orderBy('name'), // Ensure you have an index for this field
//         limit(pageSize),
//         page > 0 ? startAfter(lastVisible) : undefined
//       );

//       const querySnapshot = await getDocs(personQuery);
//       const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//       setPerson(dataList);
//       setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
//       setHasMore(dataList.length === pageSize); // Check if there are more documents to load
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   const deleteperson = async (id) => {
//     try {
//       const docRef = doc(db, 'tblperson2', id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const { imgUrl } = docSnap.data();

//         if (imgUrl) {
//           const imageRef = ref(storage, imgUrl);
//           await deleteObject(imageRef);
//         }

//         await deleteDoc(docRef);
//         fetchData(); // Refresh the data
//         alert('Document and associated image deleted successfully');
//       } else {
//         console.error('No such document!');
//         alert('No such document!');
//       }
//     } catch (err) {
//       console.error('Error deleting document and image: ', err);
//       alert('Error deleting document and image');
//     }
//   };

//   return (
//     <div className='container'>
//       <Navbar />
//       <h1>Person List</h1>
//       <Link className='btn btn-info' to='/test'>Add</Link>
//       <input type="text" className='form-control' placeholder='search ............' />
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Date</th>
//             <th>Address</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {person.map((item, index) => (
//             <tr key={item.id}>
//               <td>{(page - 1) * pageSize + index + 1}</td>
//               <td>{item.name}</td>
//               <td>{item.age}</td>
//               <td>{item.date}</td>
//               <td>{item.add}</td>
//               <td>
//                 {item.imgUrl ? (
//                   <img className='rounded' src={item.imgUrl} alt={`Image for ${item.name}`} style={{ width: '60px', height: 'auto' }} />
//                 ) : (
//                   'No image'
//                 )}
//               </td>
//               <td className='ml-2'>
//                 <Link className='btn btn-info' to={`/UploadImage/${item.id}`}>Edit</Link>
//                 <button className='btn btn-danger' onClick={() => deleteperson(item.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <nav aria-label="Page navigation example">
//         <ul className="pagination">
//           <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//             <a className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</a>
//           </li>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <li key={index + 1} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
//               <a className="page-link" onClick={() => handlePageChange(index + 1)}>
//                 {index + 1}
//               </a>
//             </li>
//           ))}
//           <li className={`page-item ${!hasMore ? 'disabled' : ''}`}>
//             <a className="page-link" onClick={() => handlePageChange(page + 1)}>Next</a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Showimg;



import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { collection, deleteDoc, getDocs, doc, limit, orderBy, query, getDoc, startAfter, where } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { storage } from '../firebase'; // Ensure you import storage
import Navbar from './navbar';

function Showimg() {
  const [person, setPerson] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); // Number of items per page
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages

  const valuesCollection = collection(db, 'tblperson2');

  useEffect(() => {
    const fetchDataAndCount = async () => {
      await fetchTotalCount(); // Fetch total document count
      await fetchData(); // Fetch data for the current page
    };
    fetchDataAndCount();
  }, [page, searchQuery]);

  const fetchTotalCount = async () => {
    try {
      const personQuery = query(
        valuesCollection,
        where('name', '>=', searchQuery),
        where('name', '<=', searchQuery + '\uf8ff')
      );
      const querySnapshot = await getDocs(personQuery);
      const totalCount = querySnapshot.size;
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error('Error fetching total count: ', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const personQuery = query(
        valuesCollection,
        orderBy('name'), // Ensure you have an index for this field
        where('name', '>=', searchQuery),
        where('name', '<=', searchQuery + '\uf8ff'),
        limit(pageSize),
        page > 0 ? startAfter(lastVisible) : undefined
      );

      const querySnapshot = await getDocs(personQuery);
      const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setPerson(dataList);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(dataList.length === pageSize); // Check if there are more documents to load
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const deleteperson = async (id) => {
    try {
      const docRef = doc(db, 'tblperson2', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { imgUrl } = docSnap.data();

        if (imgUrl) {
          const imageRef = ref(storage, imgUrl);
          await deleteObject(imageRef);
        }

        await deleteDoc(docRef);
        fetchData(); // Refresh the data
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
      <Navbar />
      <h1>Person List</h1>
      <Link className='btn btn-info' to='/test'>Add</Link>
      <input
        type="text"
        className='form-control'
        placeholder='Search by name...'
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Date</th>
            <th>Address</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {person.map((item, index) => (
            <tr key={item.id}>
              <td>{(page - 1) * pageSize + index + 1}</td>
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
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
              <a className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${!hasMore ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => handlePageChange(page + 1)}>Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Showimg;

