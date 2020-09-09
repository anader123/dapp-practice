pragma solidity 0.6.6;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface BleepToken {
  function permit(
    address _owner, 
    address _spender,
    uint256 _value, 
    uint256 _deadline,
    bytes calldata _signature) external returns(bool);
}

contract TestDepositContract is ERC20 {
    address private bleepTokenAddress;
    mapping (address=>uint256) public balances;
    
    constructor(address _tokenAddress) ERC20("aBleep Token", "aBLP") public {
      bleepTokenAddress = _tokenAddress;
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