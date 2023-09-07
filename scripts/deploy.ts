const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128);
import fs from 'fs'

async function main() {

  const initialMint = ethers.parseEther("10000")
  const Basic = await ethers.getContractFactory("Basic");
  const basic = await Basic.deploy(initialMint);

  const recordAddress = {
    "contractAddress": await basic.getAddress()
  }
  
  const content = JSON.stringify(recordAddress, null, 2);
  fs.writeFileSync('store.json', content);

  console.log('Basic ERC-20 token contract deployed:', msg(await basic.getAddress()));
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});