## JavaScript library to calculate values for sending and receiving "stealth" payments on the Ethereum platform

stealthpayjs helps the caller to receive and send Ethereum payments in a way
that decouples the sender's and receiver's personal addresses.

See: [Ethereum Stealth Payments (YouTube)](https://youtu.be/swJdiYYh5iU)

## Installation

```bash
npm install stealthpayjs
```

## Quick start

```js
const STEALTHPAY = require( 'stealthpayjs' )


// OPTIONAL: set if using functions that interact with Ethereum blockchain
// NOTE: if using Ethereum blockchain then this module can't be used in the
//       browser, because the browser can only talk to the web server
STEALTHPAY.setWeb3( "ws://127.0.0.69:8546" ) // RPC_URL


// =========================================================================
// NOTES:
// - addresses are expressed in hexstring format '0x...'
//
// - public keys produced by this module are expressed in compressed
//   form: 33 bytes and starting with a "02" or "03")
//
// - wherever this module accepts a public key as input, it can be in either
//   compressed ("0x02..." or "0x03...") or uncompressed form ("0x04...")
//
// - some OPTIONAL functions use our own, free Ephemeral Public Key Registry
//   smart contract on Ethereum L1. Tips to this smart contract are welcome.
// =========================================================================


// A payment receiver has a stealth public keypair (M,m) and shares M publicly
//
// WARN: receiver must retain the private key m securely to get the payment(s)
//       Losing m means losing the funds sent to you!

let stealthreceivekey = STEALTHPAY.createKeyPair() // { pub: M, prv: m }


// A payment sender uses the receiver's M and a new, temporary keypair to
// calculate the ephemeral key R to post in the registry and the address A to
// receivine payment
//
// WARN: do not discard r unless payment has been sent

let stealthsend = STEALTHPAY.createStealthSend( M )
// returns { pub: R, prv: r, addr: A }


// =========================================================================
// Remaining functions are OPTIONAL and if used then RPC_URL must be a valid
// Ethereum full node with a websocket connector available.
// =========================================================================

// Creates two unsigned transaction objects:
//  1. the unsigned transaction to register R in our EPKR
//  2. the unsigned transaction that sends some wei to address A
//
// the caller must then get the sending account's nonce, sign, calculate r,s,v
// and attach the values to the objects separately, then broadcast the
// signed transactions somehow else because:
//
// - the ephemeral account at (R,r) has no funds so the sender may fund it
//   separately then send to address A from (R,r), but this is two transactions
// - the sender may send to A from some other account the sender controls
// - we don't want to know private keys for the sender if we can help it
//
// returns array: [ unsignedregistertx, unsignedsendtxn ]

let senderutxns = STEALTHPAY.senderUnsignedTxns( R, A, weitopay )


// sender assigns nonces and current gas price, signs and broadcasts them
// the funds go to address A ... time passes ...


// The payment receiver scans our well-known, public Ephemeral Key Registry
// smart contract to check for balances and calculates receiving private key(s)
//
// Returns an array of objects [{bal: n, a: pvtkeyhex, A: addresshex},...]

let receipts = STEALTHPAY.scanForFunds( m )

```

