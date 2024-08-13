import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { collection, deleteDoc, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';

import Navbar from '../componenet/navbar';
import { useNavigate } from 'react-router-dom';

function Product() {
    const [person, setPerson] = useState([]);
    const [names, setNames] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [date, setDate] = useState('');
    const [original_price, setOriginal_price] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [profit, setProfit] = useState('');
    const navigate = useNavigate();


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

    const handleUpload = async () => {
        // Save image URL to Firestore
        await addDoc(collection(db, 'tblproduct'), {
            names,
            categoryID,
            date,
            original_price,
            price,
            qty,
            profit

        });

        alert('Image uploaded successfully');
        navigate('/showproduct');
    };

    return (
        <div className='container'>
            <Navbar />
            <p>List</p>
            <div className=' p-5 shadow  rounded'>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        className='form-control'
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category_id">Category</label>
                    <select className="form-control" id="category_id" value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
                        <option value="">select value</option>
                        {person.map((persons) => (
                            <option key={persons.id} value={persons.id}>
                                {persons.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>Originale Price</label>
                    <input
                        type='number'
                        id='name'
                        className='form-control'
                        value={original_price}
                        onChange={(e) => setOriginal_price(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>Price</label>
                    <input
                        type='number'
                        id='name'
                        className='form-control'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>QTY</label>
                    <input
                        type='number'
                        className='form-control'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>date</label>
                    <input
                        type='date'
                        className='form-control'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>Profit</label>
                    <input
                        type='number'
                        id='name'
                        className='form-control'
                        value={profit}
                        onChange={(e) => setProfit(e.target.value)}
                    />
                </div>
                <button className='btn btn-info my-4' onClick={handleUpload}>Save</button>

            </div>
        </div>
    )
}

export default Product