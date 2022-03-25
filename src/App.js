import { useEffect, useState } from 'react';
import './App.css';
import UsersForm from './components/UsersForm';
import UsersList from './components/UsersList';
import axios from 'axios';

function App() {

  useEffect(()=>{
    getUsers()
  },[])

  /**Estado principal */
  const [users,setUsers]=useState([])
  /*Estados */
  const [userSelected,setUserSelected]=useState(null)
  

  /**Solicitud de la api */
  const getUsers = ()=>{
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }

  /*Seleccionar un usuario con el boton edit*/
  const selectUser = user =>{setUserSelected(user)
    
  }

  /*Eliminar Usuario */

  const deleteFuntcion= (id)=>{
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(res => getUsers(res.data))
  }


  return (
    <div className="App">
      <UsersList users={users} selectUser={selectUser} deleteFuntcion={deleteFuntcion}/>
      <UsersForm getUsers={getUsers} userSelected={userSelected} selectUser={selectUser}/>
    </div>
  );
}

export default App;
