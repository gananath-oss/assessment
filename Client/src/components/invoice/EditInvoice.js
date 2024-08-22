import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditInvoice = ({ isOpen, onClose, invoice, setEditModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    BillingType: "",
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        name: invoice.name || "",
        mobileNo: invoice.mobileNo || "",
        email: invoice.email || "",
        address: invoice.address || "",
        BillingType: invoice.BillingType || "",
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      await axios.put(
        "http://localhost:8080/api/edit_invoices/" + invoice.id,
        formData
      );
      setFormData({
        name: "",
        mobileNo: "",
        email: "",
        address: "",
        BillingType: "",
      });
      setEditModalOpen(false);
    } catch (error) {
      console.error(error.message || "An error occurred");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Create Invoice</Modal.Title>
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
            Mobile Number
          </label>
          <input
            type="number"
            className="form-control"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="itemCategory" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="itemCategory" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="itemCategory" className="form-label">
            Billing Type
          </label>
          <input
            type="text"
            className="form-control"
            id="BillingType"
            name="BillingType"
            value={formData.BillingType}
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
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditInvoice;
