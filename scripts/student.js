const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const StudentList = await hre.ethers.getContractFactory("StudentList");
  const studentlist = await StudentList.deploy();

  await studentlist.deployed();

  console.log("StudentList deployed to:", studentlist.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
