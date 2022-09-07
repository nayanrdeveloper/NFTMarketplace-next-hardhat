const hre = require("hardhat");


async function main() {
    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();

    myNFT.deployed();

    console.log(`Deployed address are ${myNFT.address}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });