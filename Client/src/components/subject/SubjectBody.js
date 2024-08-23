import React, { useEffect, useState } from "react";
import axios from "axios";
import Delete from "../../img/delete.svg";
import Edit from "../../img/edit.svg";
import CreateSubject from "./CreateSubject";
import EditSubject from "./EditSubject";
// import DeleteSubject from "./DeleteSubject";

const SubjectBody = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState({});

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = (subject) => {
    setEditModalOpen(true);
    setSubject(subject);
  };

  // const handleDeleteClick = (subject) => {
  //   setDeleteModalOpen(true);
  //   setSubject(subject);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/subjects`
        );
        setSubjects(response.data);
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
          SUBJECTS
        </h1>
        <button
          type="button"
          className="btn btn-success"
          style={{ margin: "2em" }}
          onClick={handleCreateClick}
        >
          + Create
        </button>
      </div>

      <table className="table" style={{ marginTop: "4rem" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Subject Key</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Edit</th>
            {/* <th scope="col">Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(subjects) ? (
            subjects.map((subject, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{subject.subjectKey}</td>
                <td>{subject.subjectName}</td>
                <td>
                  <img
                    src={Edit}
                    alt="Edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditClick(subject)}
                  />
                </td>
                {/* <td>
                  <img
                    src={Delete}
                    alt="Delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(subject)}
                  />
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No subjects not available</td>
            </tr>
          )}
        </tbody>
      </table>

      <CreateSubject
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        setCreateModalOpen={setCreateModalOpen}
      />

      {/* <DeleteSubject
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        subjectID={subject._id}
      /> */}

      <EditSubject
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        subject={subject}
        setSubject={setSubject}
        setEditModalOpen={setEditModalOpen}
      />
    </div>
  );
};

export default SubjectBody;
