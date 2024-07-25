require('dotenv').config()
require('express-async-errors')


// async errors
const errorMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

//middleware
app.use(express.json())


//routes
app.get('/', (req,res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
    res.end()
})

app.use('/api/v1/products', productRouter )

// products route
app.use(errorMiddleware)
app.use(notFoundMiddleware)
const port = process.env.PORT ||3000


const start = async () => {
    try {
        //connect to db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('Connected!');
        })
    } catch (error) {
        console.log(error);
    }
}

start()