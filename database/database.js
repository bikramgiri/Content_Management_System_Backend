require('dotenv').config()
const mongoose = require('mongoose')

exports.connectDatabase = async()=>{
      await mongoose.connect(process.env.MongoDB_URL, {
            // useNewUrlParser: true, // to avoid deprecation warnings
            // useUnifiedTopology: true // to avoid deprecation warnings
      }).then(() => {
            console.log("Database connected successfully");
      }).catch((error) => {
            console.error("Database connection error:", error);
      });
}

