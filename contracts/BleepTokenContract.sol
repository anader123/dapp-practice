pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract BleepTokenContract is ERC20 {
  // using OZ lib for recoving address from sigs 
  using ECDSA for bytes32;
  mapping(address=>uint8) public nonces;

  /* ============ EIP712 Signature Info  ============ */
  uint256 constant chainId = 42; //Kovan
  string private constant EIP712_DOMAIN = "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)";
  string private constant ALLOW_TYPE = "Allow(address owner,address spender,uint256 value,uint256 deadline,uint8 nonce)";
  bytes32 private constant EIP712_DOMAIN_TYPEHASH = keccak256(abi.encodePacked(EIP712_DOMAIN));
  bytes32 private constant ALLOW_TYPEHASH = keccak256(abi.encodePacked(ALLOW_TYPE));

  struct Allow {
    address owner;
    address spender;
    uint256 value;
    uint256 deadline; 
    uint8 nonce;
  }

  constructor() ERC20("Bleep Token", "BLP") public {
  }

  function mint(address _recipient, uint256 _amount) external returns(bool) {
    _mint(_recipient, _amount);
    return true;
  }

  function hashAllow(
    Allow memory permit,
    address _verifyingContract
  ) private pure returns(bytes32) {
    bytes32 DOMAIN_SEPARATOR = keccak256(abi.encode(
    EIP712_DOMAIN_TYPEHASH,
    keccak256("Bleep Token"),
    keccak256("1"),
    chainId,
    _verifyingContract // verifyingContract
  ));

  return keccak256(abi.encodePacked(
    "\x19\x01",
    DOMAIN_SEPARATOR,
    keccak256(abi.encode(
      ALLOW_TYPEHASH,
      permit.owner,
      permit.spender,
      permit.value,
      permit.deadline,
      permit.nonce
    ))
  ));
  }

  function permit(
    address _owner, 
    address _spender,
    uint256 _value, 
    uint256 _deadline,
    bytes calldata _signature 
    ) external returns(bool) {
      
    Allow memory allow = Allow({
      owner: _owner,
      spender: _spender,
      value: _value,
      deadline: _deadline,
      nonce: nonces[_owner]
    });

    bytes32 hash = hashAllow(allow, address(this));
    require(_owner == hash.recover(_signature), 'incorect owner address');
    require(balanceOf(_owner) >= _value, 'invalid balance');
    require(block.timestamp <= _deadline, 'invalid deadline');
    require(_owner != address(0) && _spender != address(0), 'zero address');
    _approve(_owner, _spender, _value);
    nonces[_owner] += 1;

    return true;
  }
  
}