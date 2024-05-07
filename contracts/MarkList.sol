// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MarksList {
    uint256 public marksCount = 0;

    struct Marks {
        uint _id;
        string studentId;
        uint marksObtained;
    }

    mapping(uint => Marks) public marks;

    event addMarksEvent(uint _id, string studentId, uint marksObtained);

    constructor() {}

    function addMarks(
        string memory _studentId,
        uint _marksObtained
    ) public returns (Marks memory) {
        marksCount++;
        marks[marksCount] = Marks(marksCount, _studentId, _marksObtained);

        emit addMarksEvent(marksCount, _studentId, _marksObtained);

        return marks[marksCount];
    }

    function findMarks(uint _id) public view returns (Marks memory) {
        return marks[_id];
    }
}
