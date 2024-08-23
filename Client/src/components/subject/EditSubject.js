import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditSubject = ({ isOpen, onClose, subject, setEditModalOpen }) => {
  const [formData, setFormData] = useState({
    subjectName: "",
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        subjectName: subject.subjectName || "",
      });
    }
  }, [subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      await axios.patch(
        `http://localhost:5002/subjects/${subject._id}`,
        formData
      );
      setFormData({
        subjectName: "",
      });
      setEditModalOpen(false);
    } catch (error) {
      console.error(error.message || "An error occurred");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Update Subject</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Subject Name
          </label>
          <input
            type="text"
            className="form-control"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSubject;
