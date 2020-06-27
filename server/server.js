const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(cookieParser());

// import routes
const routes = require('./routes');

app.use('/', routes);



const port = process.env.port || 4000;
app.listen(port, ()=>{
    console.log('SERVER is running on port '+ port);
})