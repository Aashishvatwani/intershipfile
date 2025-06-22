import React, { useEffect, useState } from "react";
import { db } from '../config/firebase-Config';  // your firebase config file
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";  // Assuming you are using react-router for navigation
// Replace this with your Cloudinary cloud name
const cloudName = "dsujxyu2f";

const AllItemsPage = () => {
  const [items, setItems] = useState([]);
const Navigate = useNavigate();
  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "items"));
      const itemsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-8">All Uploaded Items</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-black/60 p-5 rounded-xl shadow-lg hover:shadow-purple-500 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => Navigate(`/view-item/${item.id}`)}  // Assuming you have a route set up for viewing items
          >
            <div className="rounded overflow-hidden mb-4">
              <img
                src={`https://res.cloudinary.com/${cloudName}/image/upload/${item.coverImageHash || item.imageHashes?.[0]}.jpg`}
                alt={item.itemName}
                className="object-cover w-full h-48 rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold text-violet-300">{item.itemName}</h2>
            <p className="text-gray-300 text-sm mb-2">{item.itemDescription}</p>
            <span className="inline-block bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
              {item.itemType}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllItemsPage;
