require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Blog = require('./model/blogModel')
// const User = require('./model/userModel') // Uncomment if you need user model
const cors = require('cors')

// Node js lai form bta aako data lai handle garna ko lagi
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
      origin: "http://localhost:5173", // React app ko port
}))

// Database connection
const { connectDatabase } = require('./database/database');
connectDatabase();

// Seed a user (for testing)
app.get('/seed-user', async (req, res) => {
  const user = await User.create({ username: 'bikram' });
  res.status(201).json({ message: 'User created', user });
});

app.get('/',(req, res)=>{
      res.status(200).json({
            message : "Welcome to the Content Management System",
      })
})

// **create a Blog API
app.post('/createBlog', async(req, res)=>{
      const { title, category, description} = req.body;

      // Validate userId exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid userId, user not found",
//       });
//     }
      // Or
      // const title = req.body.title;
      // const category = req.body.category;
      // const description = req.body.description;

      // Insert to database logic here
      const blog = await Blog.create({
            title : title,
            category : category,
            description : description
      })

      if(blog){
            res.status(201).json({
                  message: "Blog created successfully"
            })
      } else {
            res.status(404).json({
                  message: "Failed to create blog"
            })
      }
})

// **Get all blogs API
app.get("/blogs", async(req, res)=>{
      // fetsch all blogs from Blog Model
      const blogs = await Blog.find()

      // checks if blogs contains data or not
      if(blogs.length === 0){
            res.status(404).json({
                  message: "No blogs found"
            })
      }else{
            res.status(200).json({
                  message: "Blogs fetched successfully",
                  blogs: blogs
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
      //       res.json({
      //             status: 404,
      //             message: "Blog not found"
      //       })
      // }else{
      //       res.json({
      //             status: 200,
      //             message: "Blog fetched successfully",
      //             data: blog
      //       })
      // }

      // **Alternative way to fetch single blog
      const blog = await Blog.findById(id)
      if(blog){
            res.status(200).json({
                  message: "Blog fetched successfully",
                  data: blog
            })
      }else{
            // res.json({
            //       status: 404,
            //       message: "Blog not found"
            // })
            // **OR
            res.status(404).json({
                  message: "Blog not found"
            })
      }
})

// ** Update a blog API
app.patch("/blogs/:id", async (req, res)=>{
      const { id } = req.params;
      // **Or
      // const id = req.params.id;
      const { title, category, description } = req.body;

      // Update blog logic here
      const blog = await Blog.findByIdAndUpdate(id, {
            title: title,
            category: category,
            description: description
      })

      if(blog){
            res.status(200).json({
                  message: "Blog updated successfully"
            })
      }else{
            res.status(404).json({
                  message: "Blog not found"
            })
      }
})

// **Delete a blog API
app.delete("/blogs/:id", async (req, res)=>{
      const { id } = req.params;
      // **OR
      // const id = req.params.id;

      // Delete blog logic here
      const blog = await Blog.findByIdAndDelete(id)

      if(blog){
            res.status(200).json({
                  message: "Blog deleted successfully"
            })
      }else{
            res.status(404).json({
                  message: "Blog not found"
            })
      }
})

const port = process.env.PORT || 2000
app.listen(port,()=>{
      console.log(`Server is running on port ${port}`)
})

