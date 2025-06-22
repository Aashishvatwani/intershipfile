import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

// Star animation component
const FallingStar = ({ delay }) => {
  const randomX = Math.floor(Math.random() * 100);
  const size = Math.random() * 2 + 1;

  return (
    <motion.div
      className="absolute top-0 bg-white rounded-full"
      style={{ width: size, height: size, left: `${randomX}%` }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: '100vh', opacity: 0 }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

const Footer = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 text-white py-10 mt-10">
      {/* Falling stars */}
      {[...Array(30)].map((_, i) => (
        <FallingStar key={i} delay={i * 0.2} />
      ))}

      <div className="relative z-10 text-center">
        <h2 className="text-xl font-bold mb-4">Let's Connect!</h2>
        <div className="flex justify-center gap-6 text-2xl mb-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaLinkedin />
          </a>
        </div>
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
