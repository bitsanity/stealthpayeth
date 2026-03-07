const { Web3 } = require( 'web3' )
const web3 = new Web3('ws://10.0.0.113:8546')

function getABI() {
  return [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"}],"name":"Registered","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address payable","name":"newown","type":"address"}],"name":"chown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"pubkey","type":"bytes"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
}

let sca="0xaDd556918186B073eb51Fea466e742F53F3DEFE5"

let con = new web3.eth.Contract( getABI(), sca );

con.getPastEvents( 'Registered', {
  fromBlock: 19315030,
  toBlock: 'latest'
} )
.then( evts => {
  console.log( 'got: ' + evts.length + ' events' )
  for( var ii = 0; ii < evts.length; ii++ ) {
    console.log( '[' + ii + '] ' + evts[ii].returnValues.pubkey )
  }
  process.exit( 0 )
} )
.catch( e => {
  console.log
} )
