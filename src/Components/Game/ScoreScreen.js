import React from 'react';
import OptionButton from '../OptionButton';
import ScoreTile from './ScoreTile';
import { motion } from 'framer-motion';

const ScoreScreen = ({ correctAnswers, wrongCountries, restartGame }) => {
  const popVariants = {
    start: { scale: 0 },
    end: { scale: 1 }
  };

  return (
    <motion.section
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      exit={{ x: -1000 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h3
        variants={popVariants}
        initial="start"
        animate="end"
        transition={{ delay: 0.3 }}
        className="screen-header mb-0"
      >
        Congratulations!
      </motion.h3>
      <motion.p
        variants={popVariants}
        initial="start"
        animate="end"
        transition={{ delay: 0.3 }}
        className="screen-header mt-0 mb-2"
      >
        Your score is:
      </motion.p>
      <div className="flex justify-center">
        <ScoreTile number={correctAnswers} option="good" />
        <ScoreTile number={wrongCountries} option="bad" />
      </div>
      <motion.div
        variants={popVariants}
        initial="start"
        animate="end"
        transition={{ delay: 1 }}
        className="flex flex-col items-center mt-6"
      >
        <OptionButton content="Start new game" buttonStyle="wide" />
        <button
          name="restartApp"
          type="button"
          className="button-wide"
          onClick={() => restartGame(false)}
        >
          Start Again the same
        </button>
        {wrongCountries > 0 ? (
          <button
            name="restartApp"
            type="button"
            className="button-wide"
            onClick={() => restartGame(true)}
          >
            Learn only wrong ones
          </button>
        ) : null}
      </motion.div>
    </motion.section>
  );
};

export default ScoreScreen;
