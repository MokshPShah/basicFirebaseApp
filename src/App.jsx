import { app } from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Signup from './components/Signup';
import Signin from './components/signin';
import React, { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [showSignup, setShowSignup] = useState(true);
  // const signupUser = () => {
  //   createUserWithEmailAndPassword(
  //     auth,
  //     "moksh.shah.mps@gmail.com",
  //     "itsmeusingit"
  //   ).then((value) => console.log(value));
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">ᎷᎧᏦᏕᏂ</h2>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setShowSignup(true)}
            className={`px-4 py-2 cursor-pointer ${showSignup ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setShowSignup(false)}
            className={`px-4 py-2 cursor-pointer ${!showSignup ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Sign In
          </button>
        </div>

        {showSignup ? <Signup /> : <Signin />}
      </div>
    </div>
  );
}

export default App
