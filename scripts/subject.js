const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const SubjectList = await hre.ethers.getContractFactory("SubjectList");
  const subjectlist = await SubjectList.deploy();

  await subjectlist.deployed();

  console.log("SubjectList deployed to:", subjectlist.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
