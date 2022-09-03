import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import * as cloudinary from 'cloudinary'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

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

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal/', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID),
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

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