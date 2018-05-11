declare var require: any

const Mam = require('../lib/mam.node.js');
const IOTA = require('iota.lib.js');
const express = require('express');

var iota = new IOTA({ provider: `https://testnet140.tangle.works` })
const app = express();

// Initialise MAM State - PUBLIC
var mamState = Mam.init(iota)

// Publish to tangle
const publish = async (packet: any) => {
  // Create MAM Payload - STRING OF TRYTES
  var message = Mam.create(mamState, packet)
  // Save new mamState
  mamState = message.state
  // Attach the payload.
  console.log('Root: ', message.root)
  console.log('Address: ', message.address)
  await Mam.attach(message.payload, message.address)
  
  return message.root;
}


app.get('/', async (req: any, res: any) => {
  const { message } = req.query;

  console.log("publishing message:", message);

  const root = await publish(message);

  res.json({message, root});
});

app.listen(3000, () => console.log('Publisher listening on port 3000!'));