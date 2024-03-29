import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function ListUser() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(["name", "email", "mobile"]);
  const {id} = useParams();

  const getUsers = useCallback(async () =>{
    let response = await fetch(`http://localhost/api/${id}`,{
      method: "GET",
    }, []);
    response = await response.json()
    setInputs(response);
  
    }, [id])
      useEffect(  () => {
            getUsers();
            
      }, [getUsers]);

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      let response = await fetch(`http://localhost/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      }, []);
      response = response.json();
      console.log(response);
      navigate('/');
      

    }

  return (
      <div>
      <h1>Edit user</h1>
        <form onSubmit={handleSubmit}>
            <table cellSpacing="10">
                <tbody>
                    <tr>
                        <th>
                            <label>Name: </label>
                        </th>
                        <td>
                            <input value={inputs.name} type="text" name="name" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>Email: </label>
                        </th>
                        <td> 
                            <input value={inputs.email} type="text" name="email" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>Mobile: </label>
                        </th>
                        <td>
                            <input value={inputs.mobile} type="text" name="mobile" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" align ="right">
                            <button>Save</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    )
}
