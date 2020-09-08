pragma solidity 0.6.6;

contract IERC20Token {
    function name() public view returns (string memory) {this;}
    function symbol() public view returns (string memory) {this;}
    function decimals() public view returns (uint8) {this;}
    function totalSupply() public view returns (uint256) {this;}
    function balanceOf(address _owner) public view returns (uint256) {_owner; this;}
    function allowance(address _owner, address _spender) public view returns (uint256) {_owner; _spender; this;}

    function transfer(address _to, uint256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
    function approve(address _spender, uint256 _value) public returns (bool success);
}

contract FlashLoanPractice {
  address private owner;

  constructor() public {
    owner = msg.sender;
  }

  function executeOperation (
    address _tokenAddress,
    address _reserve,
    uint256 _amount,
    uint256 _fee,
    bytes _params) external {

    IERC20Token LoanedToken = IERC20Token(_tokenAddress);

    // Run contract logic

    LoanedToken.transfer(_reserve);
  }

  function withdrawTokens(
    address _tokenAddress,
    address _recipient, 
    uint256 _amount) external returns(bool) {
      require(msg.sender == owner);
      IERC20Token WithdrawToken = IERC20Token(_tokenAddress);
      WithdrawToken.transfer(_recipient, (_amount+ _fee));
      return true
    } 
}