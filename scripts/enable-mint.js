const { ethers, network } = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("Set CONTRACT_ADDRESS=0x... before running this script");
  }

  const active = (process.env.MINT_ACTIVE || "true").toLowerCase() !== "false";
  const [signer] = await ethers.getSigners();
  const cargo404 = await ethers.getContractAt("Cargo404", contractAddress);

  console.log("Network:", network.name);
  console.log("Signer:", signer.address);
  console.log("Contract:", contractAddress);
  console.log("Setting mintActive:", active);

  const tx = await cargo404.setMintActive(active);
  console.log("TX:", tx.hash);
  await tx.wait();
  console.log("Mint active:", await cargo404.mintActive());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
