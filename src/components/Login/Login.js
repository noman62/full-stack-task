import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loggin} from '../../features/userSlice/userSlice';
import { useHistory } from 'react-router-dom';
import { SyncOutlined } from '@ant-design/icons'


const Login = () => {
    const [user, setUser] = useState({
        name: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()

    //Handle form state
    const handleChange = e => {
        const newUserInfo = { ...user }
        newUserInfo[e.target.name] = e.target.value
        setUser(newUserInfo)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        axios
            .post('https://full-stack-backend1.onrender.com/api/login', {
                ...user
            })
            .then(response => {
                const { token, user } = response.data
                dispatch(
                    loggin({
                        user: user
                    })
                )
                setTimeout(() => {
                    setLoading(false)
                }, 1000)

                window.alert("login successfully")
                history.push("/")

            })
    }
    
    return (
        <div className="signup-page">
            <div className="signup-page__container">
                <h1 className="signup-page__title">Sign In</h1>
                <form className="signup-page__form" onSubmit={handleSubmit}>
                    <div className="signup-page__form-group">
                        <label className="signup-page__label" htmlFor="name">
                            Name
                        </label>
                        <input className="signup-page__input" type="text" id="name" placeholder="Enter your name" onChange={handleChange} name='name' />
                    </div>

                    <div className="signup-page__form-group">
                        <label className="signup-page__label" htmlFor="password">
                            Password
                        </label>
                        <input className="signup-page__input" type="password" id="password" placeholder="Enter your password" onChange={handleChange} name='password' />
                    </div>

                    <button className="signup-page__button" type="submit">
                    {loading ? <SyncOutlined spin /> : 'SUBMIT'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
