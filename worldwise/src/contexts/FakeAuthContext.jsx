/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };


// Import the AuthProvider and useAuth hook where needed.
// import React from 'react';
// import { AuthProvider, useAuth } from './AuthContext'; // Update the path as per your project structure

// function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// function AppContent() {
//   const { user, isAuthenticated, login, logout } = useAuth();

//   const handleLogin = () => {
//     // Call the login function with user input
//     login("jack@example.com", "qwerty");
//   };

//   const handleLogout = () => {
//     // Call the logout function
//     logout();
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <div>
//           <p>Welcome, {user.name}!</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <p>Please login:</p>
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
