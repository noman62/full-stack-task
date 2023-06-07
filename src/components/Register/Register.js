import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SyncOutlined } from '@ant-design/icons'


const Register = () => {
  const [user, setUser] = useState({
    name: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useHistory()


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
      .post('https://full-stack-backend1.onrender.com/api/register', {
        ...user
      })
      .then(response => {
        console.log('success', response.data)

        setTimeout(() => {
          setLoading(false)
        }, 1000)

        window.alert("sign up successfully")
        navigate.push("/login")

      })
  }
  return (
    <div className="signup-page">
      <div className="signup-page__container">
        <h1 className="signup-page__title">Sign Up</h1>
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

export default Register;
