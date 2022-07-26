import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import { CartScreen } from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import { ShippingScreen } from './screens/ShippingScreen'
import { PaymentScreen } from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductList.Screen'
import ProductEditScreen from './screens/ProductEditScreen'
import axios from 'axios'

const App = () => {
  const [clientID, setClientID] = useState('')

  // const initialOptions = {'client-id': clientID, currency:'EUR', intent:'capture'}

  useEffect(() => {
    const getClientId = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      setClientID(clientId)
    }
    if (!window.paypal) {
      getClientId()
    }
  }, [])

  return (
    <>
      {' '}
      {clientID && (
        <PayPalScriptProvider
          options={{ 'client-id': clientID, currency: 'USD' }}
        >
          <Router>
            <Header />
            <main className="py-3">
              <Container>
                <Routes>
                  <Route path="/order/:id" element={<OrderScreen />} />
                  <Route path="/shipping" element={<ShippingScreen />} />
                  <Route path="/payment" element={<PaymentScreen />} />
                  <Route path="/placeorder" element={<PlaceOrderScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route
                    path="/admin/orderlist"
                    element={<OrderListScreen />}
                  />
                  <Route path="/admin/userlist" element={<UserListScreen />} />
                  <Route
                    path="/admin/productlist"
                    element={<ProductListScreen />}
                    exact
                  />
                  <Route
                    path="/admin/productlist/:pageNumber"
                    element={<ProductListScreen />}
                    exact
                  />
                  <Route
                    path="/admin/product/:id/edit"
                    element={<ProductEditScreen />}
                  />
                  <Route
                    path="/admin/user/:id/edit"
                    element={<UserEditScreen />}
                  />
                  <Route
                    path="/product/:id"
                    element={<ProductScreen />}
                    exact
                  />
                  {/* <Route path="/cart/:id?" element={<CartScreen />} /> */}
                  <Route path="/cart">
                    <Route path=":id" element={<CartScreen />} />
                    <Route path="" element={<CartScreen />} /> <Route />
                  </Route>
                  <Route path="/" element={<HomeScreen />} exact />
                  <Route
                    path="/page/:pageNumber"
                    element={<HomeScreen />}
                    exact
                  />
                  <Route
                    path="/search/:keyword/page/:pageNumber"
                    element={<HomeScreen />}
                    exact
                  />
                  <Route
                    path="/search/:keyword"
                    element={<HomeScreen />}
                    exact
                  />
                </Routes>
              </Container>
            </main>
            <Footer />
          </Router>
        </PayPalScriptProvider>
      )}
    </>
  )
}
export default App
