const express = require('express')
const app = express()
const http = require('http').Server(app)
const PORT = 8080;
const path = require('path')

app.use(express.static(__dirname + '/scripts'))
app.use('/css', express.static(path.join(__dirname, '/css')))
app.use('/js', express.static(path.join(__dirname, '/js')))
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use('/font', express.static(path.join(__dirname, '/font')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  const tiniedURL = 'https://tinyurl.com/zaetwsk';
  const eddystoneBeacon = require('eddystone-beacon');

  let options = {
    name: 'Beacon',    // set device name when advertising (Linux only)
    txPowerLevel: -10, // override TX Power Level, default value is -21,
    tlmCount: 2,       // 2 TLM frames
    tlmPeriod: 10      // every 10 advertisements
  };

  eddystoneBeacon.advertiseUrl(tiniedURL, [options]);
  console.log('Broadcasting: ', tiniedURL);
  console.log('NB: Make sure your bluetooth adapter is switched on 😚');

  res.sendFile(__dirname + '/index.html')
})

http.listen(PORT, () => {
  console.log('server listening on port : ' + PORT)
})
