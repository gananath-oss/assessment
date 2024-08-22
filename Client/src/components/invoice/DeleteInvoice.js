import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const DeleteInvoice = ({
  isOpen,
  onClose,
  invoiceID,
  setInvoiceID,
  setDeleteModalOpen,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        "http://localhost:8080/api/delete_invoices/" + invoiceID
      );
      setDeleteModalOpen(false);
      setInvoiceID();
    } catch (error) {
      console.error(error.message || "An error occurred");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Body>
        <p>Are you sure you want to delete?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteInvoice;
