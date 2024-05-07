const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SubjectList Contract", function () {
  let subjectList;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const SubjectList = await ethers.getContractFactory("SubjectList");
    subjectList = await SubjectList.deploy();
    await subjectList.deployed();
  });

  describe("Creating Subjects", function () {
    it("Should increment subjects count and correctly log the creation event with the correct ID", async function () {
      const tx = await subjectList.createSubject("CS101", "Computer Science");
      const receipt = await tx.wait();
      const subjectCreatedEvent = receipt.events?.filter((x) => {
        return x.event === "SubjectCreated";
      })[0];

      expect(await subjectList.subjectsCount()).to.equal(1);

      const subjectId = subjectCreatedEvent.args._id;
      expect(subjectId.toNumber()).to.equal(1);
    });

    it("Should emit a SubjectCreated event when a subject is created", async function () {
      await expect(subjectList.createSubject("CS102", "Data Structures"))
        .to.emit(subjectList, "SubjectCreated")
        .withArgs(1, "CS102", "Data Structures", false);
    });
  });

  describe("Marking Subjects as Retired", function () {
    it("Should change the retired status of a subject", async function () {
      await subjectList.createSubject("MA101", "Mathematics");
      await subjectList.markRetired("MA101");
      const subject = await subjectList.findSubject("MA101");
      expect(subject.retired).to.be.true;
    });

    it("Should emit a SubjectRetired event when a subject is marked as retired", async function () {
      await subjectList.createSubject("PH101", "Physics");
      await expect(subjectList.markRetired("PH101"))
        .to.emit(subjectList, "SubjectRetired")
        .withArgs(1);
    });
  });

  describe("Fetching Subjects", function () {
    it("Should return the correct subject details", async function () {
      await subjectList.createSubject("CH101", "Chemistry");
      const subject = await subjectList.findSubject("CH101");
      expect(subject.name).to.equal("Chemistry");
      expect(subject.code).to.equal("CH101");
    });
  });
});
