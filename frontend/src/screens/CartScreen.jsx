import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { addToCart } from '../actions/cartActions'

export const CartScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const productId = params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  // console.log(qty)
  // console.log(productId)

  console.log(cartItems)
}
