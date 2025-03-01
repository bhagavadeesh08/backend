const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./routes/User');
const task1Routes = require('./routes/task1');  
const Task1 = require('./schema/task1'); 
const env = require('dotenv');
env.config(); 

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world");
});


app.use('/task1', task1Routes);
app.use('/user', user);

// mongoose.connect('mongodb://localhost:27017/backend')
//     .then(() => console.log("DB Connected"))
//     .catch(err => console.error("DB Connection Error:", err));

mongoose.connect(process.env.MANGO_URI)
.then(() => console.log("Connected TO DB"))
.catch(err => console.error("DB Connection Error:", err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const corsOption = {
    origin: function(origin, callback) {
        const allowedOrigins = [
            'https://backend-len.vercel.app'
        ];
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};