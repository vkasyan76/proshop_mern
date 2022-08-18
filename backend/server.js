import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()

connectDB()
const app = express()
    // Middleware example:
    // app.use((req, res, next) => {
    //     // console.log('HELLO')
    //     console.log(req.originalUrl)
    //     next()
    // })

app.use(express.json())

app.get('/', (req, res) => {
        res.send('API is running...')
    })
    // These are copied to productRoutes and modified:
    // app.get('/api/products', (req, res) => {
    //     res.json(products)
    // })

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product)
// })
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal/', (req, res) =>
        res.send(process.env.PAYPAL_CLIENT_ID),
    )
    // Middleware when not found:
app.use(notFound)

// Middleware to overwrite the error:
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const environment = process.env.NODE_ENV

app.listen(
    PORT,
    console.log(
        `Server running in ${environment} mode on port ${PORT}`.yellow.bold,
    ),
)