pragma solidity 0.6.0;

contract TestContract {
  uint256 public totalSupply;
  string public name;
  uint256 public decimals;
  string public symbol;

  
  mapping(address => uint256) public balances;
  mapping(address => uint256) public allowances;

  // Events
  event Transfer(address recipient, address sender, uint256 amount);

  constructor(
    uint256 _totalSupply, 
    string memory _name, 
    uint256 _decimals, 
    string memory _symbol
    ) public {
    totalSupply = _totalSupply;
    name = _name;
    decimals = _decimals;
    symbol = _symbol;
  }

  function balanceOf(address _address) public view returns(uint256) {
    uint256 balance = balances[_address];
    return balance;
  }

  function transfer(address _recipient, uint256 _amount) public returns(bool) {
    require(balances[msg.sender] >= _amount, 'not enough token balance');
    // TODO: Add in safeMath lib 
    balances[msg.sender] -= _amount;
    balances[_recipient] += _amount;

    // Transfer Event
    emit Transfer(_recipient, msg.sender, _amount);

    return(true);
  }
}