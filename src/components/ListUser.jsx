import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default  function ListUser() {
  const [users, setUsers] = useState([]);
  const getUsers = useCallback(async () =>{
     let response = await fetch("http://localhost/api/",{
       method: "GET",
     }, []);
     response = await response.json()
     setUsers(response);
   
  }, [])
    useEffect(  () => {
          getUsers();
          
    }, [getUsers]);

    const  deleteUser = async (id) => {
      let response = await fetch(`http://localhost/api/${id}`,
      {
        method: "DELETE",
      }, []);

      response = await response.json();
      console.log(response)
      getUsers();
    }
  
  return (
    <div>
       <h1>List Users</h1>
       <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
       
        {users.map((user, key) => 
            <tr key={key}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>
              <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link><br />
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
          )}
        </tbody>
       </table>
    </div>
  )
  }
