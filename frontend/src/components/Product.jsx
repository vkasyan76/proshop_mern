import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import formatMoney from '../utils/MoneyFormatter'

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            {/* {product.rating} from {product.numReviews} reviews */}
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              // color="red"
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">{formatMoney(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
