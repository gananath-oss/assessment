import React, { useEffect, useState } from "react";
import axios from "axios";
import Delete from "../../img/delete.svg";
import Edit from "../../img/edit.svg";
import CreateModel from "./CreateModel";
import DeleteModal from "../models/DeleteModels";
import EditModels from "./EditModels";

const ItemTable = () => {
  const [items, setItems] = useState([]);

  // modals states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [item, setItem] = useState({});
  const [itemID, setItemID] = useState();

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditModalOpen(true);
    setItem(item);
  };

  const handleDeleteClick = (itemID) => {
    setDeleteModalOpen(true);
    setItemID(itemID);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items");
        setItems(response.data.data);
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
          ITEMS
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
            <th scope="col">Unit Price</th>
            <th scope="col">Item Category</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(items) ? (
            items.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.unitPrice}</td>
                <td>{item.itemCategory}</td>
                <td>
                  <img
                    src={Edit}
                    alt="Edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditClick(item)}
                  />
                </td>
                <td>
                  <img
                    src={Delete}
                    alt="Delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(item.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items available</td>
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
        itemID={itemID}
        setItemID={setItemID}
        setDeleteModalOpen={setDeleteModalOpen}
      />

      <EditModels
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={item}
        // setItem={setItem}
        setEditModalOpen={setEditModalOpen}
      />
    </div>
  );
};

export default ItemTable;
