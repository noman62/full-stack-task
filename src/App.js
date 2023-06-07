import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Homepage from './components/Homepage/Homepage'
import { selectUser } from './features/userSlice/userSlice'
import { useSelector } from 'react-redux'
import Product from './components/Product/Product'
import Navbar from './components/Navbar/Navbar'
import AddProduct from './components/AddProduct/AddProduct'
import UpdateProduct from './components/UpdateProduct/UpdateProduct'


function App () {
  const user = useSelector(selectUser)
  console.log(user)
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/updateData/:id'>
            <UpdateProduct/>
          </Route>
          <Route path='/addProduct'>
            <AddProduct/>
          </Route>
          <Route path='/product'>
          {user ?   <Product/> : <Login/>}
          </Route>
          <Route path='/'>
          {user ?   <Homepage />: <Login/>}
            
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
