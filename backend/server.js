const express = require('express');
const mongooseDB = require('./db/db');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();


const app = express();
//server started and api setup
app.use(express.json({limit : "10mb"}));

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));
  
app.get('/', (req, res)=>{
    res.json({status : 'success'}) 
})

mongooseDB();

app.use('/api', require('./router/CreateProduct'))
app.use('/api', require('./router/auth'))
app.use('/api', require('./router/allProduct'))
app.use('/api', require('./router/cart'))
app.use('/api', require('./router/userInfoRoute'))


const PORT =  process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log('server started');
})