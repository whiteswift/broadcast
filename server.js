const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const config = require('./config/config')
const beaconConfig = require('./config/beaconConfig')
const eddystoneBeacon = require('eddystone-beacon');

app.use(express.static('assets'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  // Get url from req object?
  // console.log(req);
  // let urlToTiny = req.query.url;


  const tiniedURL = 'https://tinyurl.com/zaetwsk';

  eddystoneBeacon.advertiseUrl(tiniedURL, [beaconConfig]);
  console.log('Broadcasting:', tiniedURL);
  console.log('NB: Make sure your bluetooth adapter is switched on 😚');

  res.sendFile(__dirname + '/index.html')
})

http.listen(config.PORT, () => {
  console.log('server listening on port : ' + config.PORT)
})
