// cloudinaryUpload.js
export const openUploadWidget = (callback) => {
  if (!window.cloudinary) {
    console.error('Cloudinary widget not loaded');
    return;
  }

  window.cloudinary.openUploadWidget(
    {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      sources: ['local', 'url', 'camera'],
      multiple: false,
      cropping: false,
      folder: 'user_uploads',
    },
    (error, result) => {
      if (!error && result.event === 'success') {
        callback(result.info); // result.info.public_id, etc.
      } else if (error) {
        console.error('Upload failed:', error);
      }
    }
  );
};
