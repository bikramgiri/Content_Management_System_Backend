require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Blog = require('./model/blogModel')

// Node js lai form bta aako data lai handle garna ko lagi
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
const { connectDatabase } = require('./database/database');
connectDatabase();

app.get('/',(req, res)=>{
      res.json({
            status: 200,
            message : "Welcome to the Content Management System",
      })
})

// create a Blog API
app.post('/createBlog', async(req, res)=>{
      const { title, subTitle, description } = req.body;

      // Insert to database logic here
      await Blog.create({
            title : title,
            subTitle : subTitle,
            description : description
      })

      res.json({
            status: 200,
            message: "Blog created successfully"
      })
      // Or
      // res.status(200).json({
      //       message: "Blog created successfully"
      // })
})


const port = process.env.PORT || 2000
app.listen(port,()=>{
      console.log(`Server is running on port ${port}`)
})

