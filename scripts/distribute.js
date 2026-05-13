const { ethers, network } = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("Set CONTRACT_ADDRESS=0x... before running this script");
  }

  const [signer] = await ethers.getSigners();
  const cargo404 = await ethers.getContractAt("Cargo404", contractAddress);

  console.log("Network:", network.name);
  console.log("Signer:", signer.address);
  console.log("Contract:", contractAddress);
  console.log("Contract BNB balance:", ethers.formatEther(await ethers.provider.getBalance(contractAddress)));

  const tx = await cargo404.distributeRaisedBnb();
  console.log("TX:", tx.hash);
  await tx.wait();
  console.log("Distributed. Remaining BNB:", ethers.formatEther(await ethers.provider.getBalance(contractAddress)));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
