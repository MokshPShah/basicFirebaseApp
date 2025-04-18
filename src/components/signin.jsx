
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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
            </form>
        </div>
    );
};

export default Signin;
