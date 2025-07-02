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

// **create a Blog API
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

// **Get all blogs API
app.get("/blogs", async(req, res)=>{
      // fetsch all blogs from Blog Model
      const blogs = await Blog.find()

      // checks if blogs contains data or not
      if(blogs.length === 0){
            return res.json({
                  status: 404,
                  message: "No blogs found"
            })
      }else{
            return res.json({
                  status: 200,
                  message: "Blogs fetched successfully",
                  data: blogs
            })
      }
})

// **Get single blog API
app.get("/blogs/:id", async(req, res)=>{
      const { id } = req.params;
      // **Or
      // const id = req.params.id;
      
      // **First way to fetch single blog
      // // fetch single blog from Blog Model
      // const blog = await Blog.find({ _id: id })  // find() returns an array
      
      // // checks if blog exists or not
      // if(blog.length === 0){ // if blog is not found
      //       return res.json({
      //             status: 404,
      //             message: "Blog not found"
      //       })
      // }else{
      //       return res.json({
      //             status: 200,
      //             message: "Blog fetched successfully",
      //             data: blog
      //       })
      // }

      // **Alternative way to fetch single blog
      const blog = await Blog.findById(id) // findById() returns a single object
      if(blog){
            return res.json({
                  status: 200,
                  message: "Blog fetched successfully",
                  data: blog
            })
      }else{
            return res.json({
                  status: 404,
                  message: "Blog not found"
            })
      }
})

const port = process.env.PORT || 2000
app.listen(port,()=>{
      console.log(`Server is running on port ${port}`)
})

