import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const CreateModel = ({ isOpen, onClose, setCreateModalOpen }) => {
  const [formData, setFormData] = useState({
    subjectKey: "",
    subjectName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/subjects`,
        formData
      );
      setFormData({
        subjectKey: "",
        subjectName: "",
      });
      setCreateModalOpen(false);
    } catch (error) {
      console.error(error.message || "An error occurred");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Add Subject</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Subject Key
          </label>
          <input
            type="text"
            className="form-control"
            id="subjectKey"
            name="subjectKey"
            value={formData.subjectKey}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="unitPrice" className="form-label">
            Subject Name
          </label>
          <input
            type="text"
            className="form-control"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            required
          />
        </div>
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
