import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditModels = ({ isOpen, onClose, student, setEditModalOpen }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    subjectKey: "",
    grade: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/subjects`
        );
        setSubjects(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
        setLoading(false);
      }
    };

    fetchSubjects();

    if (student) {
      setFormData({
        studentName: student.studentName || "",
        subjectKey: student.subjectKey || "",
        grade: student.grade || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/students/${student._id}`,
        formData
      );
      setFormData({
        studentName: "",
        subjectKey: "",
        grade: "",
      });
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating student:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subjectKey" className="form-label">
            Subject
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
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <option key={subject.subjectKey} value={subject.subjectKey}>
                  {subject.subjectName}
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModels;
