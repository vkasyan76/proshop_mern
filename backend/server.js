import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()
const app = express()
    // Middleware example:
    // app.use((req, res, next) => {
    //     // console.log('HELLO')
    //     console.log(req.originalUrl)
    //     next()
    // })

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