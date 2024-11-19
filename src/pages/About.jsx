// eslint-disable-next-line no-unused-vars
import { motion} from 'framer-motion';
//import React from 'react';

const About = () => {
  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"  
    > 
      <h1 className="text-4xl font-bold">About Page</h1>
    </motion.div>
  );
};

export default About;
