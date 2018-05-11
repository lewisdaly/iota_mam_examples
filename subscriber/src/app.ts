declare var require: any

declare var process: {
  env: {
    ROOT: string
  }
}

var Mam = require('../lib/mam.node.js')
var IOTA = require('iota.lib.js')
var iota = new IOTA({ provider: `https://testnet140.tangle.works` })

// Init State
let root = process.env.ROOT;
console.log('Listening to root:', root);

// Initialise MAM State
var mamState = Mam.init(iota)

const execute = async () => {
  const resp = await Mam.fetch(root, 'public');
  console.log(resp);

  if (resp.nextRoot) {
    root = resp.nextRoot;
    execute();
  } 

}

execute();