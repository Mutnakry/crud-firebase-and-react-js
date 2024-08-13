// Home.js
import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { addDoc, collection, deleteDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [val, setVal] = useState([]);
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);

  const valuesCollection = collection(db, 'demo');


  /// show data
  const getData = async () => {
    try {
      const dbValues = await getDocs(valuesCollection);
      setVal(dbValues.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  /// creata data
  const handleCreate = async () => {
    try {
      await addDoc(valuesCollection, { name, age });
      setName('');
      setAge('');
      getData();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  /// delete data
  const handleDelete = async (id) => {
    try {
      const deleteRef = doc(db, 'demo', id);
      await deleteDoc(deleteRef);
      getData();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  // edit data
  const handleEdit = (id, name, age) => {
    setName(name);
    setAge(age);
    setId(id);
    setShow(true);
  };

  const handleUpdate = async () => {
    try {
      const updateRef = doc(db, 'demo', id);
      await updateDoc(updateRef, { name, age });
      setName('');
      setAge('');
      setId('');
      setShow(false);
      getData();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
      {show ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleCreate}>Create</button>
      )}

      {val.length > 0 && (
        <table>
          <tbody>
            {val.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer', color: 'red' }}>
                  Delete
                </td>
                <td onClick={() => handleEdit(item.id, item.name, item.age)} style={{ cursor: 'pointer', color: 'blue' }}>
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;




// import React, { useState, useEffect } from 'react';
// import { db } from './firebase';
// import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

// function App() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [productName, setProductName] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

//   const categoriesCollection = collection(db, 'categories');
//   const productsCollection = collection(db, 'products');

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const categorySnapshot = await getDocs(categoriesCollection);
//       setCategories(categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     };

//     const fetchProducts = async () => {
//       const productSnapshot = await getDocs(productsCollection);
//       setProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     };

//     fetchCategories();
//     fetchProducts();
//   }, []);

//   const handleCreateProduct = async () => {
//     await addDoc(productsCollection, {
//       name: productName,
//       price: parseFloat(productPrice),
//       categoryIds: selectedCategoryIds
//     });
//     setProductName('');
//     setProductPrice('');
//     setSelectedCategoryIds([]);
//   };

//   const handleDeleteProduct = async (id) => {
//     await deleteDoc(doc(db, 'products', id));
//   };

//   const toggleCategorySelection = (categoryId) => {
//     setSelectedCategoryIds(prevSelectedCategoryIds =>
//       prevSelectedCategoryIds.includes(categoryId)
//         ? prevSelectedCategoryIds.filter(id => id !== categoryId)
//         : [...prevSelectedCategoryIds, categoryId]
//     );
//   };

//   return (
//     <div>
//       <h1>Products</h1>
//       <input
//         type="text"
//         value={productName}
//         onChange={e => setProductName(e.target.value)}
//         placeholder="Product Name"
//       />
//       <input
//         type="number"
//         value={productPrice}
//         onChange={e => setProductPrice(e.target.value)}
//         placeholder="Product Price"
//       />
//       <div>
//         <h2>Categories</h2>
//         {categories.map(category => (
//           <div key={category.id}>
//             <input
//               type="checkbox"
//               checked={selectedCategoryIds.includes(category.id)}
//               onChange={() => toggleCategorySelection(category.id)}
//             />
//             {category.name}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleCreateProduct}>Create Product</button>

//       <h2>Product List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Categories</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//               <td>
//                 {product.categoryIds.map(categoryId => {
//                   const category = categories.find(cat => cat.id === categoryId);
//                   return category ? category.name : 'Unknown';
//                 }).join(', ')}
//               </td>
//               <td>
//                 <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;
