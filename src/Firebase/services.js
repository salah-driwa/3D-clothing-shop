import { db } from '../Firebase/FireBaseService';  // Firestore configuration
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Save user profile data to Firestore, including the image URL
 * @param {string} userId - The user identifier (UID)
 * @param {string} imageUrl - The URL of the uploaded image
 * @param {Object} userData - Other user data (e.g., name, email)
 */
export const saveUserProfile = async (userId, imageUrl, userData) => {
  try {
    const userRef = doc(db, 'users', userId);

    await setDoc(userRef, {
      ...userData,  // Other user info (name, etc.)
      profileImage: imageUrl,  // Store the Cloudinary image URL
    }, { merge: true });  // Merge to avoid overwriting other fields

    console.log("User profile saved successfully!");
  } catch (err) {
    console.error("Error saving profile data: ", err);
    throw new Error('Profile saving failed.');
  }
};

/**
 * Retrieve user profile data from Firestore
 * @param {string} userId - The user identifier (UID)
 * @returns {Object} - The user profile data
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No user found with that ID.");
      return null;
    }
  } catch (err) {
    console.error("Error fetching user profile: ", err);
    throw new Error('Error fetching user profile.');
  }
};
