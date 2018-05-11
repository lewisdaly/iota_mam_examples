var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Mam = require('../lib/mam.node.js');
const IOTA = require('iota.lib.js');
const express = require('express');
var iota = new IOTA({ provider: `https://testnet140.tangle.works` });
const app = express();
// Initialise MAM State - PUBLIC
var mamState = Mam.init(iota);
// Publish to tangle
const publish = (packet) => __awaiter(this, void 0, void 0, function* () {
    // Create MAM Payload - STRING OF TRYTES
    var message = Mam.create(mamState, packet);
    // Save new mamState
    mamState = message.state;
    // Attach the payload.
    console.log('Root: ', message.root);
    console.log('Address: ', message.address);
    yield Mam.attach(message.payload, message.address);
    return message.root;
});
app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { message } = req.query;
    console.log("publishing message:", message);
    const root = yield publish(message);
    res.json({ message, root });
}));
app.listen(3000, () => console.log('Publisher listening on port 3000!'));
//# sourceMappingURL=app.js.map