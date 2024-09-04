import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
        //set to localstorage during online
        setIsOnline(true);
        localStorage.setItem("users", JSON.stringify(data));
      } catch (error) {
        let collection = localStorage.getItem("users");
        collection = collection && JSON.parse(collection);
        setIsOnline(false);
        setUsers(collection);

        console.log(error);
      }
    };
    getUsers();
  }, []);

  console.log(users);
  return (
    <>
    {!isOnline && <span>Offline Mode</span>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, idx) => (
            <tr key={user?.id}>
              <td>{user?.id}</td>
              <td>{user?.name}</td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.phone}</td>
              <td>
                <a href={user?.website}>{user?.website}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
