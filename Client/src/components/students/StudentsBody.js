import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Delete from "../../img/delete.svg";
import Edit from "../../img/edit.svg";
import Search from "../../img/search.webp";
import Dropdown from "../../img/dropdown.png";
import CreateModel from "./CreateModel";
import DeleteModal from "../models/DeleteModels";
import EditModels from "./EditModels";

const StudentsTable = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [fullStudents, setFullStudents] = useState([]);
  const [student, setStudent] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [remarksFilter, setRemarksFilter] = useState("");

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = (student) => {
    setEditModalOpen(true);
    setStudent(student);
  };

  const handleDeleteClick = (student) => {
    setDeleteModalOpen(true);
    setStudent(student);
  };

  const handleSearch = useCallback(() => {
    const filteredByRemarks = fullStudents.filter(
      (student) => remarksFilter === "" || student.remarks === remarksFilter
    );

    const filteredStudents = filteredByRemarks.filter((student) =>
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setStudents(filteredStudents);
  }, [fullStudents, searchQuery, remarksFilter]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, remarksFilter, handleSearch]);

  const handleRemarksFilterChange = (e) => {
    setRemarksFilter(e.target.value);
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_API_BASE_URL);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/students/with-subjects`
        );
        setStudents(response.data.data);
        setFullStudents(response.data.data);
      } catch (error) {
        console.log(error.message || "An error occurred");
      }
    };

    fetchData();
  }, [createModalOpen, deleteModalOpen, editModalOpen]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            color: "#2596be",
            fontWeight: 700,
            margin: "2rem",
          }}
        >
          STUDENTS
        </h1>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            // onClick={handleSearch}
          >
            <img
              src={Search}
              alt="Search"
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
              className="input-group"
            />
          </button>
        </div>
        <div
          className="input-group"
          style={{ width: "200px", marginLeft: "40px" }}
        >
          <select
            className="form-control"
            value={remarksFilter}
            onChange={handleRemarksFilterChange}
          >
            <option value="">All</option>
            <option value="PASS">PASS</option>
            <option value="FAIL">FAIL</option>
          </select>
          <span className="input-group-text">
            <img
              src={Dropdown}
              alt="Search"
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
            />
          </span>
        </div>
        <button
          type="button"
          className="btn btn-success"
          style={{ margin: "2em", width: "150px" }}
          onClick={handleCreateClick}
        >
          Create +
        </button>
      </div>

      <table className="table" style={{ marginTop: "4rem" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Student Name</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Grade</th>
            <th scope="col">Remarks</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) ? (
            students.map((student, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{student.studentName}</td>
                <td>{student.subjectName}</td>
                <td>{student.grade}</td>
                <td>{student.remarks}</td>
                <td>
                  <img
                    src={Edit}
                    alt="Edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditClick(student)}
                  />
                </td>
                <td>
                  <img
                    src={Delete}
                    alt="Delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(student)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Student Record</td>
            </tr>
          )}
        </tbody>
      </table>

      <CreateModel
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        setCreateModalOpen={setCreateModalOpen}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        studentID={student._id}
      />

      <EditModels
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        student={student}
        setEditModalOpen={setEditModalOpen}
      />
    </div>
  );
};

export default StudentsTable;
