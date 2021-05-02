import React from 'react';
import OptionButton from './OptionButton';
import { gameTypes } from '../GameSettings/gameSettings';
import { motion } from 'framer-motion';
import { appTranslations } from '../Translations/appTranslations';

function InitialScreen({ language }) {
  return (
    <motion.section
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      exit={{ x: -1000 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="screen-header">
        {appTranslations.homeScreen.header[language]}
      </h3>
      <div className="flex justify-center">
        {gameTypes.map(({ content, datasetValue }) => (
          <OptionButton
            key={content}
            content={appTranslations.homeScreen.buttons[datasetValue][language]}
            buttonStyle="rectangle"
            urlParam={content.toLowerCase()}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default InitialScreen;
