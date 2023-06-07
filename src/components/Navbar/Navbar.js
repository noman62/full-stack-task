import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/userSlice/userSlice'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {
  const user = useSelector(selectUser)

  const dispatch = useDispatch();
  const history = useHistory()
  const handleLogout = async (e) => {

    e.preventDefault();
    // make state null
    const { data } = await axios.get('https://full-stack-backend1.onrender.com/api/logout');
    dispatch(logout());
    window.alert("logout Successfully")
    history.push("/");

  };

  return (
    <div>
      <nav class='navbar navbar-expand-lg fixed-top navbar-light bg-info '>
        <a class='navbar-brand' href='/home'>
          My App
        </a>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>

        <div class='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul class='navbar-nav m-auto d-flex '>
            <li class='nav-item px-3 active'>
              <a class='nav-link' href='/home'>
                Home <span class='sr-only'>(current)</span>
              </a>
            </li>
            <li class='nav-item px-3'>
              <a class='nav-link' href='/product'>
                All Product
              </a>
            </li>
          </ul>

          {user === null && (
            <div class=' my-2 my-lg-0'>
              <a class='btn  px-2 button' href='/login'>
                Login
              </a>

              <a class='btn  px-2 button' href='/register'>
                Sign Up
              </a>
            </div>
          )}
          {user !== null && user.user && (
            <>
              <a href='admindeshboard'>{user?.user?.name}</a>
              <button
                onClick={e => handleLogout(e)}
                type='button'
                class='btn btn-primary ml-2'
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar