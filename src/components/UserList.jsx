import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const UserList = () => {
const [users,setUser] =useState([]);
const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/users/${id}`);
    getUsers();
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
    getUsers();

},[]);
async function getUsers() {
  const response = await axios.get('http://localhost:5000/users');
  setUser(response.data);
}
  return (
      <div className="columns mt-5 is-centered">        <div className="column is-half">
          <Link to="/add-user" className="button is-primary mb-3">Add User</Link>
            <table className="table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1 }</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Link to={`/edit-user/${user.id}`} className="button is-small is-info">Edit</Link>
                    <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
        </div>
      </div>
  )
}

export default UserList
