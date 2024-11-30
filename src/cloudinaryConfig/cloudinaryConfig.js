import { v2 as cloudinary } from 'cloudinary';

// Set up Cloudinary config
cloudinary.config({
  cloud_name: import.meta.env.REACT_APP_CLOUD_NAME,  // Store your Cloudinary credentials in .env
  api_key:    import.meta.env.REACT_APP_CLOUD_API_KEY,
  api_secret: import.meta.env.REACT_APP_CLOUD_API_SECRET,
});

export default cloudinary;
