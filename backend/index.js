const express = require("express") 
const bodyParser = require('body-parser')
const mongoose = require("mongoose") 
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require('./routes/user')
const notesRoutes = require('./routes/notes')





dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(userRoutes)
app.use(notesRoutes)




const PORT = process.env.PORT || 8080
// const uri = 'mongodb+srv://Manikanta:Manikanta@mern-app.kcsrx1t.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGO_URL)
// {
//   useNewParser : true,
//   useUnifiedTopology : true
// }
.then(()=>{
  app.listen(PORT,()=>{`server is up and running at ${PORT}`})
})
.catch((error)=>{console.log(error)})