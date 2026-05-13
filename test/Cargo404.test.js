const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Cargo404", function () {
  async function deployFixture() {
    const [owner, treasury, buyback, alice, bob] = await ethers.getSigners();
    const Cargo404 = await ethers.getContractFactory("Cargo404");
    const token = await Cargo404.deploy(treasury.address, buyback.address);
    await token.waitForDeployment();
    return { token, owner, treasury, buyback, alice, bob };
  }

  it("deploys fixed supply and allocations", async function () {
    const { token, owner } = await deployFixture();
    expect(await token.name()).to.equal("Cargo404");
    expect(await token.symbol()).to.equal("C404");
    expect(await token.totalSupply()).to.equal(ethers.parseEther("1000000000"));
    expect(await token.balanceOf(await token.getAddress())).to.equal(ethers.parseEther("700000000"));
    expect(await token.balanceOf(owner.address)).to.equal(ethers.parseEther("300000000"));
  });

  it("blocks mint when inactive", async function () {
    const { token, alice } = await deployFixture();
    await expect(
      token.connect(alice).mintCargo(1, { value: ethers.parseEther("0.0025") })
    ).to.be.revertedWithCustomError(token, "MintClosed");
  });

  it("mints C404 with exact BNB price", async function () {
    const { token, owner, alice } = await deployFixture();
    await token.connect(owner).setMintActive(true);

    await expect(
      token.connect(alice).mintCargo(2, { value: ethers.parseEther("0.005") })
    ).to.emit(token, "CargoLoaded");

    expect(await token.balanceOf(alice.address)).to.equal(ethers.parseEther("200000"));
    expect(await token.mintedUnitsByWallet(alice.address)).to.equal(2);
    expect(await token.totalMintUnits()).to.equal(2);
  });

  it("enforces max 10 mint per wallet", async function () {
    const { token, owner, alice } = await deployFixture();
    await token.connect(owner).setMintActive(true);
    await token.connect(alice).mintCargo(10, { value: ethers.parseEther("0.025") });

    await expect(
      token.connect(alice).mintCargo(1, { value: ethers.parseEther("0.0025") })
    ).to.be.revertedWithCustomError(token, "MaxWalletExceeded");
  });

  it("enforces exact payment", async function () {
    const { token, owner, alice } = await deployFixture();
    await token.connect(owner).setMintActive(true);

    await expect(
      token.connect(alice).mintCargo(1, { value: ethers.parseEther("0.001") })
    ).to.be.revertedWithCustomError(token, "IncorrectPayment");
  });

  it("distributes raised BNB by hardcoded split once", async function () {
    const { token, owner, treasury, buyback, alice, bob } = await deployFixture();
    await token.connect(owner).setMintActive(true);
    await token.connect(alice).mintCargo(10, { value: ethers.parseEther("0.025") });
    await token.connect(bob).mintCargo(10, { value: ethers.parseEther("0.025") });

    const treasuryBefore = await ethers.provider.getBalance(treasury.address);
    const buybackBefore = await ethers.provider.getBalance(buyback.address);

    await token.connect(owner).distributeRaisedBnb();

    expect(await ethers.provider.getBalance(treasury.address)).to.equal(treasuryBefore + ethers.parseEther("0.01"));
    expect(await ethers.provider.getBalance(buyback.address)).to.equal(buybackBefore + ethers.parseEther("0.005"));
    expect(await ethers.provider.getBalance(await token.getAddress())).to.equal(0);

    await expect(token.connect(owner).distributeRaisedBnb()).to.be.revertedWithCustomError(token, "AlreadyDistributed");
  });
});
