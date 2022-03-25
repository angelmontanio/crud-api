import React from 'react';

const UsersList = ({users,selectUser,deleteFuntcion}) => {
    

    return (
        <div className='users-list'>
            <header>
                <h1>Usuarios</h1>
                
            </header>
            <main className='user-list__container'>
            {
              users.map(user=>(
                  <div key={user.id} className="user-list__card">
                      <div>
                      <h3>{user.first_name} {user.last_name}</h3>
                      <br />
                      <i className="fa-solid fa-envelope"></i>
                      <span> {user.email}</span>
                      <br />
                      
                      <i className="fa-solid fa-cake-candles"></i>
                      <span className='card__info'> {user.birthday}</span>
                      </div>
                      
                      <div className='user-list__buttons'>
                            <button 
                                className='trash-button'
                                onClick={()=>deleteFuntcion(user.id)}
                            
                            >
                                <i className="fa-regular fa-trash-can"></i>
                            </button>
                            <button 
                                className='edit-button'
                                onClick={()=>selectUser(user)}
                            >
                                <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                      </div>
                  </div>
              ))
                }
            </main>
        </div>
    );
};

export default UsersList;