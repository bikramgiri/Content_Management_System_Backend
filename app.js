require('dotenv').config()
const app = require('express')()
const mongoose = require('mongoose')

// Database connection
const { connectDatabase } = require('./database/database')
connectDatabase();

app.get('/',(req, res)=>{
      res.json({
            message : "Welcome to the Content Management System Home Page",
            status : "200"
      })
})

const port = process.env.PORT || 2000
app.listen(port,()=>{
      console.log(`Server is running on port ${port}`)
})

