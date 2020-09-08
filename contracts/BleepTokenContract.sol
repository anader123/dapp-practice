pragma solidity 0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract BleepTokenContract is ERC20, ERC20Detailed {
  // using OZ lib for recoving address from sigs 
  using ECDSA for bytes32;
  mapping(address=>uint256) nonces;

  /* ============ EIP712 Signature Information  ============ */
  uint256 constant chainId = 1; //Mainnet
  bytes32 constant salt = 0xcb9b171ee7f2e421f4a3ed39626c97e86a558;
  string private constant EIP712_DOMAIN = "EIP712Domain(string name,string version,uint256 chainId,bytes32 salt)";
  string private constant ALLOW_TYPE = "Allow(address owner,address spender,uint256 value,uint256 deadline,uint8 nonce)";
  bytes32 private constant EIP712_DOMAIN_TYPEHASH = keccak256(abi.encodePacked(EIP712_DOMAIN));
  bytes32 private constant ALLOW_TYPEHASH = keccak256(abi.encodePacked(ALLOW_TYPE));

  struct Allow {
    address owner
    address spender,
    uint256 value,
    uint256 deadline, 
    uint8 nonce;
  }

  constructor(uint256 initialSupply) ERC20Detailed("Bleep", "BLP", 18) public {
    _mint(msg.sender, initialSupply);
  }

  function hashAllowance(
    Allow memory allow,
  ) private pure returns(bytes32) {
    bytes32 DOMAIN_SEPARATOR = keccak256(abi.encode(
    EIP712_DOMAIN_TYPEHASH,
    keccak256("Bleep Token"),
    keccak256("1"),
    chainId,
    salt
    ));
  }

  return keccak256(abi.encodePacked(
    "\x19\x01",
    DOMAIN_SEPARATOR,
    keccak256(abi.encode(
      ALLOW_TYPEHASH,
      allow.owner,
      allow.spender,
      allow.value,
      allow.deadline
      allow.nonce
    ))
  ));

  function permit(
    address _owner, 
    address _spender, 
    uint256 _value, 
    uint256 _deadline,
    bytes memory _signature 
    ) external returns(bool) {
      Allow memory allow = Allow({
        owner: _owner,
        spender: _spender,
        value: _value,
        deadline: _deadline,
        nonce: nonces[_owner]
      })

      bytes32 hash = hashAllowance(allow, _channelAddress);
      require(_owner == hash.recover(_signature);
      require(_owner != 0x0 && _spender != 0x0);
      _approve(_owner, _spender, _value);
      nonces[_owner] += 1;

      return bool
    }
}