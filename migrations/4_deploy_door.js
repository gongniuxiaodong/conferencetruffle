var Doorlock = artifacts.require("./doorlock.sol");

module.exports = function(deployer) {
    deployer.deploy(Doorlock);
};
