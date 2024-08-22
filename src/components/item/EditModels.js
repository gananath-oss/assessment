import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditModels = ({ isOpen, onClose, item, setEditModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    unitPrice: "",
    itemCategory: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        unitPrice: item.unitPrice || "",
        itemCategory: item.itemCategory || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        "http://localhost:8080/api/edit_items/" + item.id,
        formData
      );
      setFormData({ name: "", unitPrice: "", itemCategory: "" });
      setEditModalOpen(false);
    } catch (error) {
      console.error(error.message || "An error occurred");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="unitPrice" className="form-label">
            Unit Price
          </label>
          <input
            type="number"
            className="form-control"
            id="unitPrice"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="itemCategory" className="form-label">
            Item Category
          </label>
          <input
            type="text"
            className="form-control"
            id="itemCategory"
            name="itemCategory"
            value={formData.itemCategory}
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
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModels;
