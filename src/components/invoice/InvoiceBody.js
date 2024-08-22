import React, { useEffect, useState } from "react";
import axios from "axios";
import Delete from "../../img/delete.svg";
import Edit from "../../img/edit.svg";
import CreateInvoice from "./CreateInvoice";
import EditInvoice from "./EditInvoice";
import DeleteInvoice from "./DeleteInvoice";

const InvoiceBody = () => {
  const [invoices, setInvoices] = useState([]);

  // modals states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [invoice, setInvoice] = useState({});
  const [invoiceID, setInvoiceID] = useState([]);

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = (invoice) => {
    setEditModalOpen(true);
    setInvoice(invoice);
  };

  const handleDeleteClick = (invoiceID) => {
    setDeleteModalOpen(true);
    setInvoiceID(invoiceID);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/invoices");
        setInvoices(response.data.data);
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
          INVOICES
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
            <th scope="col">Name</th>
            <th scope="col">Mobile No.</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Billing Type</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(invoices) ? (
            invoices.map((invoice, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{invoice.name}</td>
                <td>{invoice.mobileNo}</td>
                <td>{invoice.email}</td>
                <td>{invoice.address}</td>
                <td>{invoice.BillingType}</td>
                <td>
                  <img
                    src={Edit}
                    alt="Edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditClick(invoice)}
                  />
                </td>
                <td>
                  <img
                    src={Delete}
                    alt="Delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(invoice.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No invoices available</td>
            </tr>
          )}
        </tbody>
      </table>

      <CreateInvoice
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        setCreateModalOpen={setCreateModalOpen}
      />

      <DeleteInvoice
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        invoiceID={invoiceID}
        setInvoiceID={setInvoiceID}
        setDeleteModalOpen={setDeleteModalOpen}
      />

      <EditInvoice
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        invoice={invoice}
        setInvoice={setInvoice}
        setEditModalOpen={setEditModalOpen}
      />
    </div>
  );
};

export default InvoiceBody;
