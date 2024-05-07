const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StudentList Contract", function () {
    let studentList;
    let owner;
    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        const StudentList = await ethers.getContractFactory("StudentList");
        studentList = await StudentList.deploy();
        await studentList.deployed();
    });

    describe("Creating Students", function () {
        it("Should increment students count", async function () {
            await studentList.createStudent(10001, "Tenzin");
            expect(await studentList.studentsCount()).to.equal(2); // Initial count is 1 due to constructor creation
        });

        it("Should emit a createStudentEvent when a student is created", async function () {
            await expect(studentList.createStudent(10002, "Dhendup"))
                .to.emit(studentList, "createStudentEvent")
                .withArgs(2, 10002, "Dhendup", false); // _id starts at 2 because 1 is created in the constructor
        });
    });

    describe("Marking Students as Graduated", function () {
        it("Should change the graduation status of a student", async function () {
            await studentList.createStudent(10003, "Pema"); // This will be student ID 2
            await studentList.markGraduated(2);
            const student = await studentList.findStudent(2);
            expect(student.graduated).to.be.true;
        });

        it("Should emit a markGraduatedEvent when a student is marked as graduated", async function () {
            await studentList.createStudent(10004, "Wangmo"); // This will be student ID 2
            await expect(studentList.markGraduated(2))
                .to.emit(studentList, "markGraduatedEvent")
                .withArgs(2);
        });
    });

    describe("Fetching Students", function () {
        it("Should return the correct student details", async function () {
            await studentList.createStudent(10005, "Sonam"); // This will be student ID 2
            const student = await studentList.findStudent(2);
            expect(student.name).to.equal("Sonam");
            expect(student.cid).to.equal(10005);
        });
    });
});
