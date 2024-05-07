// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SubjectList {
    uint256 public subjectsCount = 0;
    mapping(string => uint) private codeToId;

    struct Subject {
        uint _id;
        string code;
        string name;
        bool retired;
    }

    mapping(uint => Subject) public subjects;

    event SubjectCreated(uint _id, string code, string name, bool retired);
    event SubjectRetired(uint _id);

    function createSubject(
        string memory _code,
        string memory _name
    ) public returns (uint) {
        subjectsCount++;
        subjects[subjectsCount] = Subject(subjectsCount, _code, _name, false);
        codeToId[_code] = subjectsCount;
        emit SubjectCreated(subjectsCount, _code, _name, false);
        return subjectsCount; // Returns the ID of the new subject
    }

    function markRetired(string memory _code) public {
        uint _id = codeToId[_code];
        subjects[_id].retired = true;
        emit SubjectRetired(_id);
    }

    function findSubject(
        string memory _code
    ) public view returns (Subject memory) {
        return subjects[codeToId[_code]];
    }
}
