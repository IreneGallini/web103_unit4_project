import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'
// import the router from your routes file
import customItemsRoutes from './routes/customItems.js'


dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())

// CORS setup - allow your frontend
app.use(cors({
    origin: 'http://localhost:5173',  // your Vite dev server
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true
}))

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use
app.use('/api/custom-items', customItemsRoutes)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})