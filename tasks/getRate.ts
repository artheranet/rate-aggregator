import { task } from "hardhat/config";
var msg = (require("cli-color")).xterm(39).bgXterm(128);
import * as addresses from '../addresses.json'

task("getRate", "Returns the requested amount in AA")
.addParam("usd").setAction(

    async (usd) => {
        const [signer] = await ethers.getSigners()
        const decimals = 2
        const RateAggregator = await ethers.getContractFactory('RateAggregator');
        const addr = addresses.rateAggregator
        const rateAggregator = new ethers.Contract(addr, RateAggregator.interface, signer)
        const rate = Number((await rateAggregator.updateRate())) / 10 ** decimals
        console.log("\n"+usd.usd,"USD =", msg(rate), "AA")
    }
);
