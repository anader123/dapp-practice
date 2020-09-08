const BleepTokenContract = artifacts.require("BleepTokenContract");

module.exports = async function(deployer) {
  await deployer.deploy(BleepTokenContract(20000, 'Bleep', 10, 'BLP'));
};