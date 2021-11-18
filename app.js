/* Load NodeJS Modules */
console.log('Loading node modules')
const express = require('express');
const path = require('path');

/* Load Local Modules */
const masterData = require('./modules/masterdata');
const db = require('./modules/db');

console.log('Configuring Express App')
//Configure express app
const app = express();
app.use(express.json());
app.use(express.static('public'));

//Connect to the DB
db.Connect().catch((err) => {
    console.log("DB not connected")
    console.error(err)
})

//API
//EndPoint to Retrieve Environment Variables
app.get('/Environment', function (req, res) {
    var data = {
        MASTERDATA: process.env.MASTERDATA,
        CF_INSTANCE_INDEX: (process.env.CF_INSTANCE_INDEX * 1) + 1,
        HOME: process.env.HOME
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
})

//EndPoint to Retrieve Random Master Data from Dummy APIs Service
app.get('/RandomMasterData', function (req, res) {
    masterData.GetMasterData().then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
    .catch((error) => {
        console.error("Error getting master data")
        res.send({msg: error});
    })
})

//Retrieve Master Data from this app DB
app.get('/MasterDataCollection', function (req, res) {
    db.Select().then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
    .catch((error) => {
        console.error("Error getting master data collection")
        res.send({msg: error});
    })
})

//Endpoint to Insert Master Data on the Apps DB (Postgres)
app.post('/MasterData', function (req, res) {
    db.Insert(req.body)
        .then(() => {
            res.statusCode = 204
            res.send();
        })
        .catch((error) => {
            console.error("Error getting master data collection")
            res.send({msg: error});
        })
});

//EndPoint to Main page 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

// VII. Port binding
// Export services via port binding
var port = process.env.PORT || 8080
const server = app.listen(port, function () {
  console.log('12 factor app listening on port ' + port);
});

// IX. Disposability
// Maximize robustness with fast startup and graceful shutdown
const startGracefulShutdown = () => {
    console.log('Starting shutdown...');
    db.Disconnect().then(server.close(function(){
        console.log("express server shutdown")
    }))
  }
  
process.on('SIGTERM', startGracefulShutdown);
process.on('SIGINT', startGracefulShutdown);
