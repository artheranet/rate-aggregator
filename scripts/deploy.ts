const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128);
import fs from 'fs'

async function main() {

  const DEX = await ethers.getContractFactory("DEX");
  const dex1 = await DEX.deploy(1);

  const DEX2 = await ethers.getContractFactory("DEX");
  const dex2 = await DEX2.deploy(2);

  const RateAggregator = await ethers.getContractFactory("RateAggregator");
  const rateAggregator = await RateAggregator.deploy(await dex1.getAddress(), await dex2.getAddress());

  const recordAddresses = {
    "rateAggregator": await rateAggregator.getAddress(),
    "dex1": await dex1.getAddress(),
    "dex2": await dex1.getAddress(),

  }
  
  const content = JSON.stringify(recordAddresses, null, 2);
  fs.writeFileSync('addresses.json', content);

  console.log('Rate Aggregator contract deployed:', msg(await rateAggregator.getAddress()));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});