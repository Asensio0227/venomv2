require('dotenv').config();
require('express-async-errors')
// express
const express=require('express')
const app = express();
const path = require('path');
// db
const connectDB = require('./db/connect');
// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandleMiddleware = require('./middleware/error-handler');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require('morgan');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoSanitize = require("express-mongo-sanitize");
const cloudinary = require('cloudinary').v2
// routes
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const streamRoutes = require('./routes/streamRoute')
const commentRoutes = require('./routes/commentRoute')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

if (process.env.NODE_ENV !== "production") {
  app.use(morgan('dev'))
}
app.set('trust-proxy', 1);
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize())

app.use(express.static(path.join(__dirname,'/public/build')))
app.use(express.json());
app.use("/streams",express.static(path.join(__dirname, './public/streams')))
app.use("/uploads",express.static(path.join(__dirname, './public/uploads')))
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/streams', streamRoutes);
app.use('/api/v1/comments', commentRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/build', "index.html"));
})

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 5000;

const start = async () => { 
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening on port :${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()
