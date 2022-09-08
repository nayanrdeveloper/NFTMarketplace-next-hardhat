const hre = require("hardhat");


async function main() {

    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    myNFT.deployed();
    console.log(`Marketplace address are ${myNFT.address}`);

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(myNFT.address);
    myToken.deployed();
    console.log(`Token address are ${myToken.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });