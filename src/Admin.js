import React, { useEffect, useState } from "react";
import axiosClient from "./plugins/axiosClient";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [isDiploma, setIsDiploma] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axiosClient.get("/users").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const addUsersFunc = () => {
    axiosClient.post("/users/add", {
        name: name,
        surname: surname,
        age: age,
        isDiploma: isDiploma,
        address: address,
      }).then((res) => {
        setUsers(res.data);
      });
      setOpenModal(false)
  };
  return (
    <div>
      <Modal isOpen={openModal} toggle={() => setOpenModal(false)}>
        <ModalHeader>Fill the blanks</ModalHeader>
        <ModalBody>
          <form id="fillBlanks" onSubmit={addUsersFunc}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="form-control my-2"
            />
            <input
              type="text"
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Surname"
              className="form-control my-2"
            />
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="form-control my-2"
            />
            <select
              className="form-control my-2"
              onChange={(e) => setIsDiploma(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="form-control my-2"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            form="fillBlanks"
            type="submit"
            className="btn btn-primary my-2"
          >
            Add
          </button>
        </ModalFooter>
      </Modal>
      <h1>Admin</h1>
      <div className="container">
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-success my-2"
        >
          Add User
        </button>
        <div className="parent">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>iS_Diploma</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.age}</td>
                    <td>{item.is_diploma}</td>
                    <td>{item.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
