import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const UsersForm = ({getUsers,userSelected,selectUser}) => {

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [birthday,setBirthday]=useState("");

    useEffect(()=>{
        if(userSelected){
            setFirstName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setEmail(userSelected.email)
            setPassword(userSelected.password)
            setBirthday(userSelected.birthday)
            setChangebutton("Aceptar cambios")
        }
    },[userSelected])

    const restartUserData=()=>{
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setBirthday("")
    }   
    
    /**set cambio de boton */
    const [changebutton,setChangebutton]=useState("Agregar nuevo usuario")
    

    /*Funcion para editar*/
    const editUserFunction = (id, user)=>{
        axios.put(`https://users-crud1.herokuapp.com/users/${id}/`,user)
        .then(res => {getUsers(res.data)
            restartUserData();
        })
    }
     
    
    const submit= e =>{
    
        e.preventDefault()
        
        const user = {

            email:email,
            password:password,
            first_name:firstName,
            last_name:lastName,
            birthday:birthday
        }
        if(userSelected){
            editUserFunction(userSelected.id,user);
            selectUser(null);
            setChangebutton("Agregar nuevo usuario")
        }else{
        
        axios.post("https://users-crud1.herokuapp.com/users/" , user)
            .then(res => {getUsers(res.data)
                restartUserData();
            })
        }
        /**Vaciar el user despues de mandarlo y verificar que este completo-- */
        
        
    }

    
    return (
        <div className='users-form'>
            <h1>Nuevo usuario</h1>

            <form onSubmit={submit}>
                
                <div className='name-container'>
                    <i className="fa-solid fa-user"></i>
                        <input 
                            type="text" 
                            id='firstName'
                            onChange={(e)=>setFirstName(e.target.value)}  
                            value={firstName}
                            placeholder="Nombre"
                            required
                        />
                        <input 
                            type="text" 
                            id='lastName'
                            onChange={(e)=>setLastName(e.target.value)}  
                            value={lastName}
                            placeholder="Apellidos"
                        />
                </div>
                <br />

                <div className="input-container">
                  
                    <i className="fa-solid fa-envelope"></i>
                    <input 
                        type="email" 
                        id='email'
                        onChange={(e)=>setEmail(e.target.value)}  
                        value={email}
                        required
                        placeholder="Correo"
                    />
                </div>
                <br />
                <div className="input-container">
                    
                    
                    <i className="fa-solid fa-lock"></i>
                    <input 
                        type="password" 
                        id='password'
                        placeholder='Contraseña'
                        onChange={(e)=>setPassword(e.target.value)}  
                        value={password}
                    />
                </div>
                <br />
                <div className="input-container">
                    
                    
                    <i className="fa-solid fa-cake-candles"></i>
                    <input 
                        type="date" 
                        id='birthday'
                        onChange={(e)=>setBirthday(e.target.value)}  
                        value={birthday}
                        required
                    />
                </div>

                <button type='submit' className='submit'>{changebutton}</button>
            </form>
        </div>
    );
};

export default UsersForm;