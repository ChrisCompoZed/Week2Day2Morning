'use strict'

var http = require('http')
var monk = require('monk')
var db = monk('localhost/queryStrings')

var strings = db.get('strings')

//strings.insert({ key: "value" })

function requestHandler(req, res) {

  var urlParts = req.url.split('?')

  if (urlParts.length > 1) {
    var queryParts = urlParts[1].split('&')
    //console.log('queryParts ' +queryParts)

    var document = {}

    queryParts.reduce( function(accumulator, keyValuePair) {
      //console.log('before split', index, keyValuePair, accumulator)
      var pair = keyValuePair.split('=')
      accumulator[pair[0]] =pair[1]
      //console.log('accumulator ' + JSON.stringify(accumulator))
      return accumulator
    }, document)
  }

  console.log('document' + JSON.stringify(document))

  strings.insert(document, function(err, savedDocument) {
     console.log('savedDoc '+ JSON.stringify(document))
    res.end(JSON.stringify(savedDocument))
  })
  //if (err) throw err
}

var server = http.createServer(requestHandler)

server.listen(3000, function () {

  console.log("listening on port 3000")

})