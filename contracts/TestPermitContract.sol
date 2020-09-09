pragma solidity 0.6.6;

interface BleepToken {
    function permit(
        address _owner, 
        address _spender,
        uint256 _value, 
        uint256 _deadline,
        bytes calldata _signature) external returns(bool);
}

contract TestDepositContract {
    address private tokenAddress;
    mapping (address=>uint256) public balances;
    
    constructor(address _tokenAddress) public {
        tokenAddress = _tokenAddress;
    }
    
    function testDepositTokens(
        address _owner, 
        address _spender,
        uint256 _value, 
        uint256 _deadline,
        bytes calldata _signature
          ) external returns(bool) {
        BleepToken bleepToken = BleepToken(tokenAddress);
        require(bleepToken.permit(_owner, _spender, _value, _deadline, _signature));
        balances[_owner] += _value;
    }
}