import { app } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Signup from './components/Signup';
import Signin from './components/signin';
import React, { useEffect, useState } from 'react';

const auth = getAuth(app);

function App() {
  const [showSignup, setShowSignup] = useState(true);
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, ((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }))
  })

  if (user === null) {
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
  else {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center">
              <div className='text-center font-bold text-2xl mb-5'> {user.displayName ? `Hello ${user.displayName}` : `Hello ${user.email}`}</div>
              <button onClick={() => auth.signOut()} className='px-4 py-2 cursor-pointer bg-purple-700 text-white rounded-md'>Sign Out</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App
