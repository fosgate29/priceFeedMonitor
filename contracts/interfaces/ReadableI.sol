pragma solidity 0.4.24;

interface ReadableI {

    // We only care about these functions
    function peek() external view returns(bytes32, bool);
    function read() external view returns(bytes32);

    // function owner() external view returns(address);
    // function zzz() external view returns(uint256);
}
