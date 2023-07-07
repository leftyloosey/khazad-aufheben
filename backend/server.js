import express from 'express'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import cors from 'cors'

const port = process.env.PORT || 5000

connectDB()

const app = express()
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// app.use(cors)
// app.use(cors({ origin: '*', credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(
//     cors({
//         credentials: true,
//         origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
//         optionsSuccessStatus: 200,
//     })
// )

app.get('/', (req, res) => {
    res.send('API running...')
})

app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
