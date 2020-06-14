import React from 'react';
import OptionButton from './OptionButton';
import { gameRegions } from '../GameSettings/gameSettings';
import { toProperCase } from '../Utils/gameUtils';
import { motion } from 'framer-motion';
import { appTranslations } from '../Translations/appTranslations';

function GameOptions(props) {
  return (
    <motion.section
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      exit={{ x: -1000 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="screen-header">{`${toProperCase(
        appTranslations.optionsScreen.title[props.match.params.gameType][
          props.language
        ]
      )} ${appTranslations.optionsScreen.header[props.language]}?`}</h3>
      <motion.div
        initial="hidden"
        animate="show"
        className="flex flex-col items-center mb-8"
      >
        {gameRegions.map(({ content, datasetValue }) => {
          return (
            <OptionButton
              key={datasetValue}
              content={
                appTranslations.optionsScreen.buttons[datasetValue][
                  props.language
                ]
              }
              buttonStyle="wide"
              urlParam={`${
                props.match.params.gameType
              }/${content.toLowerCase()}`}
            />
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default GameOptions;
