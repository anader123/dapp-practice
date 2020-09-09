pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoanPractice {
  address private owner;

  constructor() public {
    owner = msg.sender;
  }

  function executeOperation (
    address _tokenAddress,
    address _reserve,
    uint256 _amount,
    uint256 _fee
    /*bytes calldata _params*/) external {

    IERC20 LoanedToken = IERC20(_tokenAddress);

    // Run contract logic

    LoanedToken.transfer(_reserve, (_amount+ _fee));
  }

  function withdrawTokens(
    address _tokenAddress,
    address _recipient, 
    uint256 _amount) external returns(bool) {
      require(msg.sender == owner);
      IERC20 WithdrawToken = IERC20(_tokenAddress);
      WithdrawToken.transfer(_recipient, _amount);
      return true;
  } 
}