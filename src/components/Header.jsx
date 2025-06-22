import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Add Item', path: '/' },
  { label: 'View Item', path: '/view-item' },
];

const Header = () => {
  const dotCount = 4;
  const dotSpacing = 20;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 shadow-lg text-white fixed top-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FaStar className="text-yellow-300 animate-spin-slow" />
          <span>StarrySite</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link to={item.path} className="hover:text-yellow-300">
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Animated Dots & Pacman (only show on md and above) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 items-center h-10 w-40 hidden md:flex">
          <motion.div
            className="w-8 h-8 bg-yellow-400 relative"
            style={{
              clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)',
              borderRadius: '50%',
            }}
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-full h-full bg-yellow-400 rounded-full absolute top-0 left-0 -z-10" />
          </motion.div>

          {[...Array(dotCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: 40 + i * dotSpacing,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              animate={{
                opacity: [1, 1, 0],
                x: [0, -dotSpacing * (i + 1)],
              }}
              transition={{
                duration: (dotCount + 1) * 0.6,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block text-lg font-medium text-white hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  );
};

export default Header;
