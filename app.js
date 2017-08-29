var express = require('express');
var Web3=require('web3');
var net=require('net');
var app=express();

var web3=new Web3();
web3.setProvider(new web3.providers.HttpProvider('localhost:'));
var web3_ipc=new Web3();
var client=new net.Socket();
web3_ipc.setProvider(new web3.providers.IpcProvider('geth.ipc',client));
app.get('/getBalanceOf',function (req,res) {
   var address=req.query.address;
   res.send(web3.eth.getBalance(address));
});

app.post('/newAccount',function (req,res) {
    var pk=req.body.pk;
    var hashcode=web3_ipc.personal.newAccount(
pk,
        function (error,result) {
    if(!error){
        res.send(result);
    }

        }
    );
});

var myContract=web3.eth.contract(contractABI);
var newContract=myContract.new(
    {
        from:web3.eth.accounts[0],
        data:contractData,
        gas:4700000
    },function (e,contract) {
        console.log(e,result);
        if(typeof result.address!=='undifined'){
            console.log('contract mined!address:'+result.address+'transactionHash:'+result.transactionHash);
        }

    }
);

app.post('/multiply',function (req,res) {
    var factor=req.body.factor;
    var hashcode=newContract.multiply.sendTransaction(
        factor,
        {from:web3.eth.accounts[0],gas:900000}
    );

});

var server=app.listen(9090,function () {
    var host=server.address().address;
    var port=server.address().port;
    console,log('example app listening at http://%s:%s',host,port);

});
