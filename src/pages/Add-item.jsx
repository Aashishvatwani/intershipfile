import React, { useState } from 'react';
import { db } from '../config/firebase-Config';
import { collection, addDoc } from 'firebase/firestore';
import { openUploadWidget } from '../config/cloudanaryConfig';
import AddItemButton from '../components/Additembutton';
import RemoveItemButton from '../components/Removeitem';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddItemPage = () => {
 const [formData, setFormData] = useState({
  itemName: '',
  itemDescription: '',
  itemType: '',
  imageHashes: [],
});


  const [imageURL, setImageURL] = useState('');
  const [uploading, setUploading] = useState(false);
const [extraImages, setExtraImages] = useState([]);
const handleUpload = () => {
  setUploading(true);

  openUploadWidget((info) => {
    if (info && info.public_id) {
      setFormData((prev) => ({
        ...prev,
        imageHashes: [...prev.imageHashes, info.public_id], // ⬅️ Push each hash
      }));

      setUploading(false);

      const wantsMore = window.confirm('Do you want to upload another image?');
      if (wantsMore) {
        handleUpload(); // Trigger another upload
      }
    } else {
      setUploading(false);
      alert('Upload failed. Please try again.');
    }
  });
};


 const handleSubmit = async () => {
  if (formData.imageHashes.length === 0) {
    return alert('Please upload at least one image');
  }

  try {
    await addDoc(collection(db, 'items'), {
      ...formData,
      createdAt: new Date(),
    });
    alert('Item added successfully!');
    resetForm();
  } catch (err) {
    console.error(err);
    alert('Error saving to Firestore');
  }
};


const resetForm = () => {
  setFormData({
    itemName: '',
    itemDescription: '',
    itemType: '',
    imageHashes: [],
  });
  setImageURL('');
};


  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white">
      <Header />

      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-black/70 p-8 rounded-2xl shadow-xl w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Item</h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Item Name"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              className="w-full p-3 rounded bg-gray-800 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <textarea
              placeholder="Item Description"
              value={formData.itemDescription}
              onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
              className="w-full p-3 rounded bg-gray-800 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              required
            />

            <input
              type="text"
              placeholder="Item Type"
              value={formData.itemType}
              onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
              className="w-full p-3 rounded bg-gray-800 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <div className="text-center">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-600 transition"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>


           
            </div>
            {formData.imageHashes.length > 0 && (
  <div className="mt-4 grid grid-cols-2 gap-4">
    {formData.imageHashes.map((hash, idx) => (
      <img
        key={idx}
        src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${hash}.jpg`}
        alt={`Uploaded ${idx + 1}`}
        className="w-full h-32 object-cover rounded border border-purple-500"
      />
    ))}
  </div>
)}

            <div className="flex justify-between mt-6">
              <AddItemButton onClick={handleSubmit} />
              <RemoveItemButton onClick={resetForm} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddItemPage;
