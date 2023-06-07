import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SyncOutlined } from '@ant-design/icons'

const AddProduct = () => {
    const history = useHistory()
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://full-stack-backend1.onrender.com/api/addProduct', {
                productName,
                category: {
                    id: categoryId,
                    name: categoryName
                },
                unitPrice,
                status,
                date
            });

            setTimeout(() => {
                setLoading(false)
            }, 1000)

            window.alert("Data Inserted Successfully")
            history.push('/')

        } catch (error) {
            console.error(error.response.data);
            window.alert("wrong")

        }
    };

    return (
        <div className='container'>
            <div style={{ margin: '100px' }}>
                <form onSubmit={handleSubmit} class='m-4'>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Product Name</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            placeholder="Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Category ID</label>
                        <input
                            type='number'
                            required
                            class='form-control'
                            id='inputAddress'
                            placeholder="Category ID"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Category Name</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Unit Price</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            placeholder="Unit Price"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Status</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            placeholder="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Date</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            placeholder="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <div className='form-group col-md-12 text-center'>
                            <button type='submit' className=' btn btn-info w-50'>
                                {loading ? <SyncOutlined spin /> : 'SUBMIT'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct