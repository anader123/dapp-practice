const TestContract = artifacts.require("TestContract");

module.exports = async function(deployer) {
  await deployer.deploy(TestContract(20000, 'Bleep', 10, 'BLP'));
};