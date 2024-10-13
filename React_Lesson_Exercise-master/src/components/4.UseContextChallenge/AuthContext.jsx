/**
 * Challenge 4: createContext
 *
 * Description:
 * You'll create a context to mimic an authentication context in this challenge. `createContext` and `useContext` will be used to manage and 
 * consume user authentication data just like you'll usually do in a real-world app.
 * 
 * Overview:
 * - Create and provide the `AuthContext` to the entire app.
 * - Store the mock user in state, and create `login` and `logout` functions to update the state.
 * 
 * Steps:
 * 1. Create a mock user with credentials like `firstName`, `lastName`, and `email`, you can add however many you want, have fun!.
 * 2. In this file, create the `AuthContext`, `AuthContextProvider` and the functions within the AuthContextProvider to deal with the user.
 *    - Hold the user object in state using `useState`.
 *    - Create a login function and initializes the user.
 *    - Create a logout function that clears the user and displays a message like "User session timed out." (you can use a alert).
 * 2. Go to the `App.jsx` file and wrap the `AuthContextProvider` around `UseContextChallenge`.
 * 3. Go to the `UserMessage.jsx` file, and follow the steps there.
 */

import { createContext, useState } from "react";

// Mock user obj.
const user = {
  // Initialize user fields mentioned...
}

// const AuthContext =

export function AuthContextProvider({ children }) {


//   return (
//     <AuthContext.Provider
//       value={{
//         ...
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
}

export default AuthContext;
