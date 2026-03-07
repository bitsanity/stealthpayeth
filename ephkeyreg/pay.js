// USAGE:
//   $ node pay.js <from index> <toaddress> <eth>

const {Web3} = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const MYGASPRICE = '' + 1 * 1e9;

var fromix = parseInt( process.argv[2] )
var toaddr = process.argv[3]
var weiamt = process.argv[4] * 1 * 1e18

web3.eth.getAccounts().then( (res) => {
  let fromacct = res[fromix]

  web3.eth.sendTransaction( {
          from: fromacct,
            to: toaddr,
         value: weiamt,
           gas: 30000,
      gasPrice: MYGASPRICE } )
    .catch( (err) => {console.log(err);} );
} );
