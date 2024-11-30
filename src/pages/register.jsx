import { useState } from "react";
import { auth, db, storage } from "../Firebase/FireBaseService";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null); // For image file
  const [imageUrl, setImageUrl] = useState(""); // To hold the uploaded image URL
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let uploadedImageUrl = "";
      if (imageFile) {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `users/${user.uid}/profileImage`);
        await uploadBytes(imageRef, imageFile);
        uploadedImageUrl = await getDownloadURL(imageRef); // Get the download URL
      }

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        image: uploadedImageUrl,
      });

      console.log("Account created successfully!");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Create Your Account</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-6 flex justify-center">
          <label
            className="cursor-pointer bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all"
            htmlFor="profile-image"
          >
            <div className="w-32 h-32 rounded-full border-4 border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-lg">Upload Image</span>
              )}
            </div>
            <input
              type="file"
              id="profile-image"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
