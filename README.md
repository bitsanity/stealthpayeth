## Ethereum Stealth Payments

"Stealth Payments" are payments that enable senders and receivers to pay ether
in a way that protects both parties from snooping on eachother and deters
blockchain analysis from linking them.


This project includes:
- **stealthpayjs:** an npm module to help script sending/receiving stealth payments
- **ephkeyreg:** our free smart contract that publishes ephemeral public keys
- **ui:** a web page and CGI scripts one could include in some website


See: [Ethereum Stealth Payments (YouTube)](https://youtu.be/swJdiYYh5iU)

## Installation

```bash
npm install stealthpayjs
```

## Quick start

```js
const STEALTHPAY = require( 'stealthpayjs' )

// OPTIONAL: set if using functions that interact with Ethereum blockchain
STEALTHPAY.setWeb3( "ws://127.0.0.69:8546" )

// =========================================================================
// NOTES:
// - key values and addresses are expressed in hexstring format '0x...'
//
// - public keys produced by this module are expressed in compressed
//   form: 33 bytes and starting with a "0x02" or "0x03")
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
// calculate the ephemeral key R to post in the registry and address A to send
// payment to
//
// WARN: do not discard r unless payment has been sent

let stealthsend = STEALTHPAY.createStealthSend( M )
// returns { pub: R, prv: r, addr: A }


// =========================================================================
// Remaining functions are OPTIONAL and if used then RPC_URL must be a valid
// Ethereum full node. WARN: Some functions require the caller to spend gas.
// =========================================================================


// Payment sender posts the Ephemeral Key R to our Ephemeral Key Registry and
// sends payment from some personal account with private key p to address A,
// from which receiver will retrieve the stealth payment
//
// WARN:
// - if the function fails to post to the key registry then it will NOT even
//   attempt to send funds to A, as a safety measure.
// - needs gas to post the key and gas to do the send so P must be funded
// - please read the source and verify this function respects the private key

let sendresult = STEALTHPAY.postAndSend( p, R, A ) // returns two txn hashes


// Payment receiver scans a well-known, public Ephemeral Key Registry
// smart contract to check for balances and calculate receiving private key(s)

let receipts = STEALTHPAY.scanEphemeralKeyRegistry( m )
// returns an array of objects [{balance: B, prvkey: a},...]


// Payment receiver sweeps (sends all value leaving a zero balance) the
// receipt(s) to some other address Z
//
// WARN: each receipt will create a send transaction that will cost 21000 gas

let result = STEALTHPAY.sweepReceipts( receipts, toaddress )
// result is array [ "0x...", ...] transaction hashes, one for each receipt
```

## TODO

- Batch receipt collection for better gas efficiency

