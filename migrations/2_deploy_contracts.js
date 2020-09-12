const BleepTokenContract = artifacts.require("BleepTokenContract");
const TestDepositContract = artifacts.require("TestDepositContract");

module.exports = async function(deployer) {
  await deployer.deploy(BleepTokenContract);
  const bleepTokenAddress = await BleepTokenContract.address;
  await deployer.deploy(TestDepositContract, bleepTokenAddress);
};