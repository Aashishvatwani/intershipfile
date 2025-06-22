import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-Config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';



const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const ViewItemPage = () => {
  // Get item ID from the route parameters
const { id } = useParams(); // ✅ Correct param name
    const itemId = id; // Use the ID from the URL
  // State to store item data, loading status, and error
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    // Function to fetch item details from Firestore
    const fetchItem = async () => {
      try {
        const docRef = doc(db, 'items', itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Set item data if document exists
          setItem(docSnap.data());
        } else {
          // If document doesn't exist, set an error message
          setError('Item not found.');
          console.warn(`No document found for item ID: ${itemId}`);
        }
      } catch (err) {
        // Catch any errors during the fetch process
        setError('Failed to load item. Please try again later.');
        console.error('Error fetching item:', err);
      } finally {
        // Set loading to false once the fetch is complete (whether successful or not)
        setLoading(false);
      }
    };

    // Call the fetchItem function when the component mounts or itemId changes
    if (itemId) { // Ensure itemId exists before fetching
      fetchItem();
    } else {
      setLoading(false); // If no itemId, stop loading
      setError('No item ID provided.');
    }
  }, [itemId]); // Dependency array: re-run effect if itemId changes

  // --- Loading and Error States ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white">
       
        <div className="flex-grow flex justify-center items-center">
          <p className="text-lg">Loading item details...</p>
        </div>
      
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-red-400">
       
        <div className="flex-grow flex justify-center items-center text-center">
          <p className="text-xl font-semibold">{error}</p>
        </div>
    
      </div>
    );
  }

  // If item is null after loading, it means 'Item not found'
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-red-400">
       
        <div className="flex-grow flex justify-center items-center text-center">
          <p className="text-xl font-semibold">Item data could not be retrieved.</p>
        </div>
       
      </div>
    );
  }

  // --- Main Content Display ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 p-6 flex flex-col items-center">


      <motion.div
        className="w-full max-w-3xl bg-black/70 rounded-3xl shadow-2xl overflow-hidden mt-8 mb-8" // Added margin top and bottom
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {item.imageHashes?.length > 0 ? ( // Check if imageHashes exists and has length
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }} // Keep autoplaying even if user interacts
            loop={true}
            effect="fade"
            modules={[Pagination, Autoplay, EffectFade]}
            className="h-96 rounded-t-3xl"
          >
            {item.imageHashes.map((hash, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={`https://res.cloudinary.com/${cloudName}/image/upload/${hash}.jpg`}
                  alt={`${item.itemName} image ${idx + 1}`} // More descriptive alt text
                  className="object-cover w-full h-full "
                  loading="lazy" // Add lazy loading for images
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-96 flex items-center justify-center bg-gray-800 text-gray-400 rounded-t-3xl">
            <p>No images available for this item.</p>
          </div>
        )}

        <motion.div
          className="p-6 text-white space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-violet-400">
            {item.itemName}
          </h2>
          <p className="text-md text-gray-300 whitespace-pre-wrap">{item.itemDescription}</p> {/* preserve line breaks */}
          <span className="inline-block bg-purple-800 text-white px-4 py-1 rounded-full text-sm shadow-lg">
            {item.itemType}
          </span>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default ViewItemPage;
