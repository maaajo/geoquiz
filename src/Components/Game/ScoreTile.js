import React from 'react';
import { motion } from 'framer-motion';

const ScoreTile = ({ number, option }) => {
  const popVariants = {
    start: { scale: 0 },
    end: { scale: 1 }
  };
  return (
    <motion.div
      variants={popVariants}
      initial="start"
      animate="end"
      transition={{ delay: 0.7 }}
      className={`${
        option === 'good' ? `bg-lightGreen` : `bg-red`
      } text-white flex flex-col justify-center items-center w-20 h-16 rounded-lg shadow-lg mr-2`}
    >
      <p className="font-semibold text-2xl ">{number}</p>
      <p className="font-medium text-sm">
        {option === 'good' ? 'correct' : 'wrong'}
      </p>
    </motion.div>
  );
};

export default ScoreTile;
