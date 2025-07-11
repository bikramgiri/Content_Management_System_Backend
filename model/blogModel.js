const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {      
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true
      },
      category: {
            type: String,
            required: true
      }
},{
      timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog


// Or
// module.exports = mongoose.model('Blog', blogSchema)
