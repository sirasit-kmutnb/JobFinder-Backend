const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')
require('dotenv').config()

const app = express()

const url = "/api"


mongoose.connect(process.env.DATABASE, {
                useNewUrlParser:true,
                useUnifiedTopology:false})
        .then(()=>{
                console.log("接続しました")
                console.log(`http://127.0.0.1:${port}${url}/`)
                console.log("======================================")
        })
        .catch((err)=>console.log(err))

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use(url, postRoute)
app.use(url, authRoute)

const port = process.env.PORT || 8080
app.listen(port, ()=>{
        console.log("======================================")
        console.log(`ポート ${port} でサーバーを起動しています`)
})