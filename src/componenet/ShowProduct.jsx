import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import db from '../firebase';
import Navbar from './navbar';

function ShowProduct() {
    const [products, setProducts] = useState([]);
    const [persons, setPersons] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchPersons();
    }, []);

    useEffect(() => {
        if (products.length && persons.length) {
            mergeData();
        }
    }, [products, persons]);

    const fetchProducts = async () => {
        try {
            const productsCollection = collection(db, 'tblproduct');
            const productsSnapshot = await getDocs(productsCollection);
            const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    const fetchPersons = async () => {
        try {
            const personsCollection = collection(db, 'tblperson2');
            const personsSnapshot = await getDocs(personsCollection);
            const personsList = personsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPersons(personsList);
        } catch (error) {
            console.error('Error fetching persons: ', error);
        }
    };

    const mergeData = () => {
        const merged = products.map(product => {
            const person = persons.find(person => person.id === product.categoryID);
            return { ...product, person };
        });
        setCombinedData(merged);
    };




    const deleteperson = async (id) => {
        try {
            // Delete the document from Firestore
            const docRef = doc(db, 'tblproduct', id);
            await deleteDoc(docRef);
            fetchProducts();
            fetchPersons();
            alert('Document and image deleted successfully');
        } catch (err) {
            console.error('Error deleting document and image: ', err);
            alert('Error deleting document and image');
        }
    };


    return (
        <div className='container'>
            <Navbar />
            <div>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Original Price</th>
                            <th>Price</th>
                            <th>Profit</th>
                            <th>Person Address</th>
                            <th>Person Name</th>
                            <th>Person Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.names}</td>
                                <td>{item.date}</td>
                                <td>{item.original_price}</td>
                                <td>{item.price}</td>
                                <td>{item.profit}</td>
                                <td>{item.person?.add}</td>
                                <td>{item.person?.name}</td>
                                <td>{item.person?.age}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => deleteperson(item.id)}>Delete2</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowProduct;
