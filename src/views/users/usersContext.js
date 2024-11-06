// src/views/users/usersContext.js
import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const UserContext = createContext();

// Crea un proveedor de contexto
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const removeUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Crea un hook para usar el contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe estar dentro de un UserProvider');
  }
  return context;
};

// Exporta el contexto por defecto
export default UserContext;
