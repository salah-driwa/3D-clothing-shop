import { useState, useEffect } from "react";
import { auth } from "../Firebase/FireBaseService";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GrGooglePlus } from "react-icons/gr";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  // Redirect if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect to index page
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In successful!");
      navigate("/"); // Redirect to index page
    } catch (err) {
      console.error("Google Sign-In error:", err);
      setError(err.message);
    }
  };

  // Sign in with email and password
  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Email Sign-In successful!");
      navigate("/"); // Redirect to index page
    } catch (err) {
      console.error("Email Sign-In error:", err);
      setError(err.message);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={signInWithEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
    
        </div>
        <p className="text-sm text-gray-600 text-center">
  Don’t have an account? <a href="/register" className="text-blue-500">Register here</a>
</p>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Or sign in with:</p>
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            <GrGooglePlus className="mr-2 text-white" size={25} /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
