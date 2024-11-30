
import { motion } from "framer-motion";
import Navbar from "../component/Navbar";
import { auth } from "../Firebase/FireBaseService";
import { useAuthState } from 'react-firebase-hooks/auth';
import HeroSection from "../component/heroection";


const Index = () => {
  const [user] = useAuthState(auth);
  console.log("user :"+user)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" w-screen overflow-hidden h-screen"
    >
   <Navbar user={user}/>
   <HeroSection />
    </motion.div>
  );
};

export default Index;
