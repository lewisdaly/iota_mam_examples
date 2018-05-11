var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Mam = require('../lib/mam.node.js');
var IOTA = require('iota.lib.js');
var iota = new IOTA({ provider: `https://testnet140.tangle.works` });
// Init State
let root = process.env.ROOT;
console.log('Listening to root:', root);
// Initialise MAM State
var mamState = Mam.init(iota);
const execute = () => __awaiter(this, void 0, void 0, function* () {
    const resp = yield Mam.fetch(root, 'public');
    console.log(resp);
    if (resp.nextRoot) {
        root = resp.nextRoot;
        execute();
    }
});
execute();
//# sourceMappingURL=app.js.map