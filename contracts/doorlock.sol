pragma solidity ^0.4.0;


contract doorlock {
    mapping (address => bool)door;
    function setlock(address recevier,bool onoff) returns(bool state){
         door[recevier]=onoff;
    return true;
        }
    function getlock(address addr)returns(bool state){
         return door[addr];
}

}
