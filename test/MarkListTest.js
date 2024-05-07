const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MarksList Contract", function () {
  let marksList;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const MarksList = await ethers.getContractFactory("MarksList");
    marksList = await MarksList.deploy();
    await marksList.deployed();
  });

  describe("Adding Marks", function () {
    it("Should increment marks count", async function () {
      await marksList.addMarks("STU001", 85);
      expect(await marksList.marksCount()).to.equal(1);
    });

    it("Should emit an addMarksEvent when marks are added", async function () {
      await expect(marksList.addMarks("STU002", 92))
        .to.emit(marksList, "addMarksEvent")
        .withArgs(1, "STU002", 92);
    });
  });

  describe("Fetching Marks", function () {
    it("Should return the correct marks details", async function () {
      await marksList.addMarks("STU003", 78);
      const mark = await marksList.findMarks(1);
      expect(mark.studentId).to.equal("STU003");
      expect(mark.marksObtained).to.equal(78);
    });
  });
});
