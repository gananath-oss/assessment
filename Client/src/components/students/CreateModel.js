import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
// import Toast from "../toast/Toast";

const CreateModel = ({ isOpen, onClose, setCreateModalOpen }) => {
  const [formData, setFormData] = useState({
    studentKey: "",
    studentName: "",
    subjectKey: "",
    grade: "",
  });

  const [subjects, setSubjects] = useState([]);
  // const [toastMessage, setToastMessage] = useState("");
  // const [toastType, setToastType] = useState("");
  // const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/subjects`
        );
        setSubjects(response.data || []);
      } catch (error) {
        console.error(error.message || "An error occurred");
      }
    };

    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/students`,
        formData
      );
      setFormData({
        studentKey: "",
        studentName: "",
        subjectKey: "",
        grade: "",
      });
      setCreateModalOpen(false);
      // setToastMessage("Student created successfully!");
      // setToastType("success");
      // setShowToast(true);
    } catch (error) {
      console.error(error.message || "An error occurred");
      // setToastMessage(
      //   "Error creating student: " + (error.message || "An error occurred")
      // );
      // setToastType("danger");
      // setShowToast(true);
    }
  };

  // const handleToastClose = () => {
  //   setShowToast(false);
  // };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="studentKey" className="form-label">
            Student Key
          </label>
          <input
            type="text"
            className="form-control"
            id="studentKey"
            name="studentKey"
            value={formData.studentKey}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subjectKey" className="form-label">
            Subject Name
          </label>
          <select
            className="form-control"
            id="subjectKey"
            name="subjectKey"
            value={formData.subjectKey}
            onChange={handleChange}
            required
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.subjectKey} value={subject.subjectKey}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="grade" className="form-label">
            Grade
          </label>
          <input
            type="text"
            className="form-control"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />
        </div>
        {/* <Toast
          message={toastMessage}
          type={toastType}
          showToast={showToast}
          onClose={handleToastClose}
        /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModel;
