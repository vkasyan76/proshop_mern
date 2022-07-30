import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
// import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // console.log('hello')
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')

      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} ms={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
