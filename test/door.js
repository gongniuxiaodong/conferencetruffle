var express=require('express')
var app=express()
// var doorlock = require("../contracts/doorlock.sol");
var itaddr='ce7cf58ec54d6a57ea166614f076454e9df439fd2abce79fe3e8bc9e4a8bc779957ffe33428aeb2d418b15d6a87215928c56727613420ffb155f5d1c675365a8'
App = {
    web3Provider: null,
    contracts: {},
    initWeb3: function() {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();
    },
    initContract: function() {
        $.getJSON('doorlock.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var doorlockArtifact = data;
            App.contracts.doorlock = TruffleContract(doorlockArtifact);

            // Set the provider for our contract.
            App.contracts.doorlock.setProvider(App.web3Provider);
            // Use our contract to retieve and mark the adopted pets.
            return App.readLockFromContract();
        });
    },
    readLockFromContract: function() {
        App.contracts.doorlock.deployed().then(function (instance) {
            var door=instance;
            door.getlock(itaddr).then(function (error,state) {
                if (error){
                    console.log(error+'happen in getlock')}
                else if(state){
                    app.post('localhost:8545/api/devices/action/secure');
                    console.log('the lock was secure'); }
                else {
                    app.post('localhost:8545/api/devices/action/unsecure');
                    console.log('the lock was unsecure');
                }
            })
        })
        return App.setlocktoContract();
    },
    setlocktoContract:function () {
        var instance=eth.contract('../build/contracts/doorlock.info.abiDefinition');
        var door=instance.at(instance.address)
        door.doorlock.deployed().then(function (){
            // var num=$("#id").val();
            var addr=$("#addr").val();
            var onoff=$("#onoff").val();
            door.setlock.sendTransaction(addr,onoff,{from:address}).then(function (error,door) {
                if(error){console.log('setlock fail');}
                else {console.log('the lock is set with'+door[addr]);}
            })
        });
    },

    checkdoor:function () {
        var num=$("#id").val();
        var addr=$("#addr").val();
        app.get('localhost:8545/api/devices/<num>',function (res,req) {
            var dataget=res;
            console.log('the lock state is'+dataget.value);
            App.contracts.doorlock.setlock(addr,dataget.value);
        });
        }
}

// $(function() {
//     $(window).load(function() {
//         App.initWeb3();
//         var server=app.listen(9090,function () {
//             var host=server.address().address;
//             var port=server.address().port;
//             console,log('example app listening at http://%s:%s',host,port);
//
//         });
//
//     });
// });
