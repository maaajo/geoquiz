import React from 'react';
import OptionButton from '../OptionButton';
import ScoreTile from './ScoreTile';
import { appTranslations } from '../../Translations/appTranslations';
import { motion, AnimatePresence } from 'framer-motion';

const ScoreScreen = ({
  correctAnswers,
  wrongCountries,
  restartGame,
  language
}) => {
  const popVariants = {
    start: { scale: 0 },
    end: { scale: 1 }
  };

  return (
    <AnimatePresence exitBeforeEnter>
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
          {appTranslations.scoreScreen.header[language]}
        </motion.h3>
        <motion.p
          variants={popVariants}
          initial="start"
          animate="end"
          transition={{ delay: 0.3 }}
          className="screen-header mt-0 mb-2 text-xl"
        >
          {appTranslations.scoreScreen.score[language]}
        </motion.p>
        <div className="flex justify-center">
          <ScoreTile
            number={correctAnswers}
            option="good"
            text={appTranslations.scoreScreen.correct[language]}
          />
          <ScoreTile
            number={wrongCountries}
            option="bad"
            text={appTranslations.scoreScreen.wrong[language]}
          />
        </div>
        <motion.div
          variants={popVariants}
          initial="start"
          animate="end"
          transition={{ delay: 1 }}
          className="flex flex-col items-center mt-6"
        >
          <OptionButton
            content={appTranslations.scoreScreen.buttons.newGame[language]}
            buttonStyle="wide"
          />
          <button
            name="restartApp"
            type="button"
            className="button-wide"
            onClick={() => restartGame(false)}
          >
            {appTranslations.scoreScreen.buttons.sameGame[language]}
          </button>
          {wrongCountries > 0 ? (
            <button
              name="restartApp"
              type="button"
              className="button-wide"
              onClick={() => restartGame(true)}
            >
              {appTranslations.scoreScreen.buttons.badOnes[language]}
            </button>
          ) : null}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default ScoreScreen;
