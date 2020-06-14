import React from 'react';
import Loader from 'react-loader-spinner';
import { motion } from 'framer-motion';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loading = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.3 }}
    className="w-100 flex justify-center mt-16"
  >
    <Loader type="Bars" color="#6CAEB2" height={100} width={100} timeout={0} />
  </motion.div>
);

export default Loading;
