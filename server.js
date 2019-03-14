//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/registro-eventos'));
app.use("/", express.static(__dirname+'/dist'));
app.use("/callcenter_token_7D5H3N9Y4F", express.static(__dirname+'/dist'));
app.use("/callcenter_token_4B5O2S8Z0L", express.static(__dirname+'/dist'));
app.use("/callcenter_token_1T9Y7X1M9A", express.static(__dirname+'/dist'));
app.use("/callcenter_token_9B0I4J8R2T", express.static(__dirname+'/dist'));
app.use("/callcenter_token_6J2N4P6Q3K", express.static(__dirname+'/dist'));
app.use("/callcenter_token_3N8P3H6V1L", express.static(__dirname+'/dist'));
app.use("/registro-plus-superior", express.static(__dirname+'/dist'));

//app.get('/*', function(req,res) {
    
//res.sendFile(path.join(__dirname+'/dist/index.html'));
//});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);