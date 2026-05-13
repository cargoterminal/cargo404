const { ethers, network } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const treasury = process.env.TREASURY_ADDRESS || deployer.address;
  const buybackWallet = process.env.BUYBACK_WALLET || deployer.address;

  console.log("Deploying Cargo404...");
  console.log("Network:", network.name);
  console.log("Deployer:", deployer.address);
  console.log("Treasury:", treasury);
  console.log("Buyback:", buybackWallet);

  const Cargo404 = await ethers.getContractFactory("Cargo404");
  const token = await Cargo404.deploy(treasury, buybackWallet);
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("Cargo404 deployed:", address);
  console.log("Mint price:", ethers.formatEther(await token.MINT_PRICE()), "BNB");
  console.log("Max per wallet:", String(await token.MAX_PER_WALLET()), "mint");
  console.log("Set frontend VITE_CARGO404_ADDRESS=", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
