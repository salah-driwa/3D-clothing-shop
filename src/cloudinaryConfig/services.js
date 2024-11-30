import cloudinary from './cloudinaryConfig';

/**
 * Uploads an image to Cloudinary and returns the URL
 * @param {File} file - The image file to upload
 * @returns {string} - The image URL from Cloudinary
 */
export const uploadImage = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      folder: 'user_images',  // Organize uploaded images by folder
      resource_type: 'image', // Type of file (image)
    });

    console.log("Image uploaded successfully: ", response.secure_url);
    return response.secure_url;
  } catch (err) {
    console.error("Error uploading image: ", err);
    throw new Error('Image upload failed.');
  }
};
