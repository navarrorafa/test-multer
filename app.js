const express = require('express');
const app = express();
const path = require('path');
const indexRoutes = require('./routes/routesMulter');
const {dbConnect} = require('./utils/connection')
require('dotenv').config();


dbConnect() 

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ON ${PORT}`);
});
