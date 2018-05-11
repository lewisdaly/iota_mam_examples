
## Demo 1.

In this example, we run a simple Express server which listens for a message. When it recieves this message, it publishes a message to MAM, and returns the root of the channel.

We then have a subscriber, which takes the root given to us from the output of the first message. We set it using a simple environment variable.
The subscriber looks for a message, and when it finds the message, it recursively calls `Mam.fetch` on the next root. Since the next root doesn't change when there are no new messages, we can just keep calling this recursively until we get a new message.

This is some simply and kinda nasty programming, but it demonstrates a simple pub/sub with MAM.

Next up, I think we're going to look at applying some security to this, to make sure nobody looks in on our precious messages.

`publisher.js`
```js
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
```

then, we curl
curl  "localhost:3000?message=hello"