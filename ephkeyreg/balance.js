const fs = require('fs');
const {Web3} = require('web3');
const web3 =
  new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));

var acct = process.argv[2]

web3.eth.getBalance( acct )
.then( res => {
  console.log( 'balance: ' + res )
  process.exit( 0 )
} )
.catch( e => {
  console.log(e);
  process.exit(1)
} );

