import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyModal from "./MyModal";
import InputFieldComponent from "./InputFieldComponent";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { instance } from "./Instance";

// const varibale = [
//   { id: 1, username: "gowtham", password: "123456" },
//   { id: 2, username: "raj", password: "123456" },
// ];
const UserTable = ({ userDetails, getUserDetails }) => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);

  const deleteLoginData = async (id) => {
    try {
      const response = await instance.post(`/api/deleteLoginRecords?id=${id}`);
      if (response.status === 200) {
        getUserDetails();
        alert("success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateModal = async () => {
    try {
      const response = await instance.post(
        `/api/updateUsersData`,
        {
          selectedId: userData.id,
          UpdateUserName: userData.username,
          UpdatePassWord: userData.password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        getUserDetails();
        setShow(false);
        alert("successs");
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log({ ...userData });
  const handleHide = () => {
    setShow(false);
  };
  const handleCollectedData = (val) => {
    setUserData(val);
    setShow(val);
  };
  const delecteloginData = (id) => {
    deleteLoginData(id);
  };
  // console.log(userData)
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>PassWord</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDetails.map((e) => {
              return (
                <TableRow>
                  <TableCell> {e.id}</TableCell>
                  <TableCell> {e.username}</TableCell>
                  <TableCell> {e.password}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleCollectedData(e)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => delecteloginData(e.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <MyModal show={show} onHide={handleHide} Update={"Update"} close={"close"}>
        <InputFieldComponent/>
      </MyModal> */}

      <Modal show={show}>
        <ModalHeader>
          <ModalTitle>Login Page</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <InputFieldComponent
            label={"userName"}
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <InputFieldComponent
            label={"password"}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" onClick={updateModal}>
            Update
          </Button>
          <Button variant="contained" onClick={handleHide}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserTable;
