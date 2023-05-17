const express = require('express');

const mongoose = require('mongoose');
require("dotenv").config();

const cors = require('cors');

const userRoutes = require('./routes/UserRoutes')
const dataRoutes = require('./routes/DataRoutes')

const app = express();

app.use(express.json());
app.use(cors());
``
const corsOptions = {
  origin: ['http://localhost:3000']
};

app.use(cors(corsOptions));

app.use(userRoutes);
app.use(dataRoutes);

app.use('/uploads', express.static('uploads'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
    keepAlive: true,
    socketTimeoutMS: 30000
  })
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log(err));

const port = 5000;
app.listen(port, () => {
  console.log('server started')
})