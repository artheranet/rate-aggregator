const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Rate Aggregator", function () {

  async function deployContracts() {
    const [alice, bob] = await ethers.getSigners();

    const decimals = 2

    const placeholderRate1 = 1
    const DEX = await ethers.getContractFactory("DEX");
    const dex1 = await DEX.deploy(placeholderRate1);

    const placeholderRate2 = 2
    const DEX2 = await ethers.getContractFactory("DEX");
    const dex2 = await DEX2.deploy(placeholderRate2);

    const RateAggregator = await ethers.getContractFactory("RateAggregator");
    const rateAggregator = await RateAggregator.deploy(await dex1.getAddress(), await dex2.getAddress())

    return { rateAggregator, decimals, dex1, dex2, placeholderRate1, placeholderRate2, alice, bob }
  }

  describe("Deployment", function () {
    it("Should return the address of DEX #1", async function () {
      const { rateAggregator, dex1 } = await loadFixture(deployContracts);
      expect(await rateAggregator.dex1()).to.equal(await dex1.getAddress())
    });
  });

  describe("Interactions", function () {
    it("Should get the current AA/USD rate", async function () {
      const { rateAggregator, bob, dexConfig1, dexConfig2, decimals } = await loadFixture(deployContracts);
      await rateAggregator.connect(bob).updateRate()
      expect(Number(await rateAggregator.connect(bob).updateRate())).to.be.equal((dexConfig1+dexConfig2) / 2 * 10 ** decimals)
    });
  });
});