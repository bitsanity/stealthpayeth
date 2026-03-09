const crypto = require( 'node:crypto' )
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const blab = require( '@bitcoinerlab/secp256k1' ) // for privateAdd() only
const sha3 = require( 'js-sha3' )
const { Web3, WebSocketProvider } = require( 'web3' )

BigInt.prototype.toJSON = function () {
  return this.toString();
}

// This Ephemeral Public Key Registry is open, public and free. Pay gas only.
// Swap it out for another scheme if you want
const EPKR = "0xadd556918186b073eb51fea466e742f53f3defe5"
const EPKRABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"}],"name":"Registered","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address payable","name":"newown","type":"address"}],"name":"chown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"pubkey","type":"bytes"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

var web3 = new Web3()

// test only
const testpriv =
  "1288070c85c30c59ba9995d6902104f087ba1c28e84c3d8e21336b693e426a10"
// scratch variable to remember R for smoke testing when no EPKR available
var test_R

exports.setWeb3 = function( url ) {
  let provider = new WebSocketProvider( url )
  web3 = new Web3( provider );
}

exports.testWeb3Connection = async function() {
  try {
    if (!web3) throw 'nope'
    let gp = await web3.eth.getGasPrice()
    if (!gp) throw 'nope'
  }
  catch {
    return false
  }

  return true
}

// returns an object { pub: X, prv: x } where X and x are hexstrings
exports.createKeyPair = function() {
  // use current system time as salt and a crypto random together then hash it
  let nowstring = ('' + Date.now()).toString('hex')
  let saltbytes = Buffer.from( nowstring, 'hex' )
  let rand = sha3.keccak256( Buffer.concat([crypto.randomBytes(32),saltbytes]) )
  let randhex = rand.toString('hex')

  let privkeyhex = Buffer.from( randhex, 'hex' ).toString( 'hex' )

  let privkey = ec.keyFromPrivate( randhex, 'hex' )
  let pubkeyhex = privkey.getPublic().encode( 'hex', /* compressed */ true )

  return {
    prv : privkeyhex,
    pub : pubkeyhex
  }
}

// M is receiver's stealth public key in hexstring
exports.createStealthSend = function( M, testmode=false ) {
  let M_pt = ec.keyFromPublic( M, 'hex' )

  let result = {}

  // sender creates ephemeral key (R,r)
  let ephemeral = (testmode) ? ec.keyFromPrivate( testpriv, 'hex' )
                             : ec.genKeyPair()

  result.r = ephemeral.getPrivate('hex')
  result.R = ephemeral.getPublic( true, 'hex' )

  // Shared point, S = r * M
  let rhs = ephemeral.derive( M_pt.getPublic() ) // returns only the X value
  let Sx32 = rhs.toString( 16 )
  let hashS = sha3.keccak256( Sx32 )

  // Point addition   P = M + G * hash(S)   using compressed pubkeys
  let hashpoint = ec.keyFromPrivate( hashS, 'hex' )
  let apub = M_pt.getPublic(true).add( hashpoint.getPublic(true) )

  // Sender sends the payment to this address A
  result.A = '0x' + pubkeyToAddress( apub )

  return result
}

exports.senderUnsignedTxns = function( R, A, weitopay ) {
  const abientry =
    { "inputs":[{"internalType":"bytes","name":"pubkey","type":"bytes"}],
      "name":"register",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"}

  let calldata = web3.eth.abi.encodeFunctionCall( abientry, [hexToBytes(R)] )

  let regtxobj = {
    // caller to assign nonce before signing and broadcasting
    to: EPKR,
    value: 0,
    gas: 30000,
    // caller to assign gasPrice
    data: calldata
    // caller to sign and attach r,s,v
  }

  let sendtxobj = {
    // caller to increment and assign nonce here before sign and send
    to: A,
    value: weitopay,
    gas: 25000, // only 21000 required but remaining gas is returned
    // caller to assign current market gasPrice
    // caller to sign and attach r,s,v
  }

  return [regtxobj, sendtxobj]
}

// result [{bal: numberofwei, a: apvtkeyhex, A: addresswithfunds},...]
exports.scanForFunds = async function( mprvhex, hwm=24609768, testmode=false ) {
  let mkey = ec.keyFromPrivate( mprvhex, 'hex' )

  let con = new web3.eth.Contract( EPKRABI, EPKR )

  let events = (testmode)
    ? [ {returnValues: {pubkey: test_R}} ]
    : await con.getPastEvents( 'allEvents', {fromBlock:hwm,toBlock:'latest'} )

  let result = []

  for( let ii = 0; ii < events.length; ii++ ) {
    let R = events[ii].returnValues.pubkey
    let R_pt = ec.keyFromPublic( R, 'hex' )

    // S = m * R
    let rhs = mkey.derive( R_pt.getPublic() )
    let Sx32 = rhs.toString( 16 )

    // calculate hash(S)
    let hashS = sha3.keccak256( Sx32 )

    // p = m + hash(S)
    let p = blab.privateAdd( Uint8Array.from( hexToBytes(mprvhex) ),
                             Uint8Array.from( hexToBytes(hashS) ) )

    let pkey = ec.keyFromPrivate( p )
    let A = '0x' + pubkeyToAddress( pkey.getPublic() )

    let Abal = (testmode)
      ? BigInt(1000000000000000000n)
      : await web3.eth.getBalance( A )

    if (Abal > 0)
      result.push( {
        bal: Abal,
        a: bytesToHex(p),
        A: A
      } )
  }

  return result
}

function hexToBytes(hex) {
  let bytes = [];
  for (let c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function bytesToHex(bytes) {
  let hex = [];
  for (let i = 0; i < bytes.length; i++) {
    let current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xF).toString(16));
  }
  return hex.join("");
}

function pubkeyToAddress( pubkey ) {
  // omit leading 04 on purpose
  let keyhex = pubkey.getX().toString('hex') +
               pubkey.getY().toString('hex')

  let keybytes = hexToBytes( keyhex )
  let hash = sha3.keccak256( keybytes )
  return hash.substring(24) // last twenty bytes two chars per byte
}

exports.smokeTest = async function() {

  console.log( 'Test create some random new key pair...' )
  let mpair = exports.createKeyPair()
  console.log( 'keypair: ' + JSON.stringify(mpair,null,2) )

  console.log( 'assign (M,m) a known test vector' )
  mpair = {
    prv: "d268e44ba5cbbc2470f11b4273f7b4a12311adb9e0595cba3acd0822c8be964f",
    pub: "03c46237d133e64d54176ab8d5a39faa7491dfda1819dd5e70025fc8c1b18edeca"
  }
  console.log( '(M,m): ' + JSON.stringify(mpair,null,2) )

  let senderobj = exports.createStealthSend( mpair.pub, true )
  test_R = senderobj.R

  console.log( '(R,r,A): ' + JSON.stringify(senderobj, null, 2) )

  let weitopay = BigInt(1000000000000000) // one finney, aka one milli-ether
  let utxns = exports.senderUnsignedTxns( senderobj.R, senderobj.A, weitopay )
  console.log( 'unsigned register and send transactions:\n' +
               JSON.stringify(utxns,null,2) )

  let scanresults = await exports.scanForFunds(
    mpair.prv,
    undefined, // uses default hwm
    true ) // testmode

  console.log( 'scan results: ' + JSON.stringify(scanresults,null,2) )

  if ( scanresults[0].A.toLowerCase() === senderobj.A.toLowerCase() )
    console.log( 'PASS ✅' )
  else
    console.log( 'FAIL ❌' )
}

