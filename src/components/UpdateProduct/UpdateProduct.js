import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { SyncOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

const UpdateProduct = () => {
    const history = useHistory()
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        category: {
            id: "",
            name: ""
        },
        unitPrice: '',
        status: '',
        date: ''
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://full-stack-backend1.onrender.com/api/product/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `https://full-stack-backend1.onrender.com/api/update/${id}`;
        axios
            .put(url, product)
            .then((response) => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)

                window.alert('Data update successfully');
            })
            .catch((error) => {
                console.error('Failed to update data:', error);
            });
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
                            name="productName"
                            value={product.productName}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Category ID</label>
                        <input
                            type='number'
                            required
                            class='form-control'
                            id='inputAddress'
                            name="categoryId"
                            value={product.category.id}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Category Name</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            name="categoryName"
                            value={product.category.name}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Unit Price</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            name="unitPrice"
                            value={product.unitPrice}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Status</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            name="status"
                            value={product.status}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div class='form-group col-md-8'>
                        <label for='inputproductname'>Date</label>
                        <input
                            type='text'
                            required
                            class='form-control'
                            id='inputAddress'
                            name="date"
                            value={product.date}
                            onChange={handleInputChange}

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

export default UpdateProduct