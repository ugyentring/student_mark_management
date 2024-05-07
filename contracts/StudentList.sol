//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract StudentList{
    uint public studentsCount = 0;
    
    //model a student
    struct Student{
        uint _id;
        uint cid;
        string name;
        bool graduated;
    }
    mapping(uint => Student) public students;
    
    //Events
    event createStudentEvent(
        uint _id,
        uint indexed cid,
        string name,
        bool graduated
    );

    //event for graduation status
    event markGraduatedEvent(
        uint indexed cid
    );

    //constructor for students
    constructor(){
        //createStudent(100001,"Tshewang Paljor Wangchuck");
        createStudent(100001,"Karma");
    }

    //Create and add student to storage
    function createStudent(uint _studentCid, string memory _name) public returns(Student memory){
        studentsCount++;
        students[studentsCount] = Student(studentsCount,_studentCid,_name,false);
        //trigger create event
        emit createStudentEvent(studentsCount, _studentCid, _name, false);
        return students[studentsCount];
    }

    

    //change graduation status of student
    function markGraduated(uint _id) public returns(Student memory){
        students[_id].graduated = true;
        //trigger create event
        emit markGraduatedEvent(_id);
        return students[_id];
    }

    //Fetch student info from storage
    function findStudent(uint _id) public view returns (Student memory){
        return students[_id];
    }

}