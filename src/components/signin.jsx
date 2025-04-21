
import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const signupWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
    }

    const handleSignin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-700 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to access your account</p>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                    <p>Signed in successfully!</p>
                </div>
            )}

            <form onSubmit={handleSignin} className="space-y-4">
                <div>
                    <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 text-left mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="signin-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 text-left">
                            Password
                        </label>
                        <a href="#" className="text-xs text-purple-600 hover:text-purple-800">
                            Forgot password?
                        </a>
                    </div>
                    <input
                        type="password"
                        id="signin-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        placeholder="•••••••••••"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium 
                    ${loading ? 'bg-purple-300' : 'bg-purple-600 hover:bg-purple-700'} 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors`}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="flex items-center justify-between my-2">
                    <hr className="w-full border-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <hr className="w-full border-gray-300" />
                </div>

                <button
                    type="button"
                    onClick={signupWithGoogle}
                    disabled={loading}
                    className={`w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium 
                        flex items-center justify-center space-x-2 cursor-pointer
                        ${loading ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'} 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors`}
                >
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    <span>{loading ? 'Signing in...' : 'Sign Up with Google'}</span>
                </button>
            </form>
        </div>
    );
};

export default Signin;
