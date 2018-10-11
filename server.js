//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/registro-eventos'));
app.use("/", express.static(__dirname+'/dist'));
app.use("/callcenter_token_7D5H3N9Y4F", express.static(__dirname+'/dist'));
app.use("/registro", express.static(__dirname+'/dist'));

//app.get('/*', function(req,res) {
    
//res.sendFile(path.join(__dirname+'/dist/index.html'));
//});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);