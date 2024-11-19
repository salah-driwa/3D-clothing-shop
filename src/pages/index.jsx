// src/pages/index.jsx
//import React from 'react';
import { motion } from "framer-motion";
const Index = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto p-4"  
  > 
    <h1 className="text-4xl font-bold">main Page</h1>
  </motion.div>
  );
};

export default Index;
