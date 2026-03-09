// PROD:
// https://etherscan.io/address/0xadd556918186b073eb51fea466e742f53f3defe5

const fs = require('fs')
const { Web3 } = require('web3')
const web3 = new Web3('ws://10.0.0.113:8546')
//const web3 = new Web3('ws://localhost:8545')

const MYGASPRICE = '' + 1 * 1e9; // should be fetched

function getABI() {
  return JSON.parse( fs.readFileSync(
    './EphPubkeyRegistry_sol_EphPubkeyRegistry.abi').toString() )
}

function getBinary() {
  var binary = fs.readFileSync(
    './EphPubkeyRegistry_sol_EphPubkeyRegistry.bin').toString()

  if (!binary.startsWith('0x')) binary = '0x' + binary;
  return binary;
}

function getContract(sca) {
  return new web3.eth.Contract( getABI(), sca );
}

function printEvent(evt) {
  console.log( evt.event + ': ' + JSON.stringify(evt.returnValues) + '\n' );
}

const cmds = [
  'deploy',
  'events',
  'register',
  'chown',
  'sweep'
]

function usage() {
  console.log(
    '\nUsage:\n$ node cli.js <acctindex> <cmd> [arg]*\n',
     'commands and args:\n',
     '\tdeploy |\n',
     '\tevents <sca> |\n',
     '\tregister <sca> <pubkeyhex> |\n',
     '\tchown <sca> <newowneraddress> |\n',
     '\tsweep <sca>\n\n'
  );
}

var ebi = process.argv[2];
var cmd = process.argv[3];

let found = false;
for (let ii = 0; ii < cmds.length; ii++)
  if (cmds[ii] == cmd) found = true;

if (!found) {
  process.argv.forEach( arg => console.log(arg) );
  console.log( "" );
  usage();
  process.exit(1);
}

var eb;
web3.eth.getAccounts().then( async (res) => {
  eb = res[ebi];

  if (cmd == 'deploy')
  {
    let con = new web3.eth.Contract( getABI() );
    con.deploy( {data:getBinary()} )
      .send({from: eb, gas: 500000, gasPrice: MYGASPRICE}, (err, hash) => {
        if (err) console.log( err.toString() );
      } )
      .on('error', (err) => { console.log("err: ", err.toString()); })
      .on('transactionHash', (h) => { console.log( "hash: ", h ); } )
      .on('receipt', (r) => { console.log( 'rcpt: ' + r.contractAddress); } )
      .on('confirmation', (cn, rcpt) => { console.log( 'cn: ', cn ); } )
      .then( (nin) => {
        console.log( "SCA: ", nin.options.address );
        process.exit(0);
      } );
  }
  else
  {
    let sca = process.argv[4]
    let con = new web3.eth.Contract( getABI(), sca );

    if (cmd == 'events') {
      con.getPastEvents( 'allEvents', {fromBlock:19208957, toBlock:'latest'} )
      .then( (events) => {
        events.forEach( evt => { printEvent( evt ) } )
        process.exit ( 0 )
      } )
      .catch( err => {
        console.log( err )
        process.exit( 1 )
      } )
    }

    if (cmd == 'register') {
      let keybytes = web3.utils.hexToBytes( process.argv[5] )

      con.methods.register( keybytes )
      .send( { from: eb, gas: 100000, gasPrice: MYGASPRICE } )
      .then( () => { process.exit( 0 ) } )
      .catch( err => {
        console.log( err )
        process.exit( 1 )
      } )
    }

    if (cmd == 'chown') {
      con.methods.chown( process.argv[5] )
      .send( { from: eb, gas: 50000, gasPrice: MYGASPRICE } )
      .then( () => { process.exit( 0 ) } )
      .catch( err => {
        console.log( err )
        process.exit( 1 )
      } )
    }

    if (cmd == 'sweep') {
      con.methods.sweep()
      .send( { from: eb, gas: 50000, gasPrice: MYGASPRICE } )
      .then( () => { process.exit( 0 ) } )
      .catch( err => {
        console.log( err )
        process.exit( 1 )
      } )
    }
  }
} );

