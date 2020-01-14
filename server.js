const express = require('express');
const dotEnv = require('dotenv');
const routes = require('./routes/route');
const connectDb = require('./config/db');
const cors = require('cors');

// ENV config
dotEnv.config({ path: './config/config.env' });

const app = express();

//enable cors 
app.use(cors());

// read json body
app.use(express.json());

// connect to mongo
connectDb();

//routing middleware
app.use('/api/chess', routes);

// get port
const PORT = process.env.PORT || 5000;

// up server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});