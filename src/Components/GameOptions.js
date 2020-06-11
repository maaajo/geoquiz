import React from 'react';
import OptionButton from './OptionButton';
import { gameRegions } from '../GameSettings/gameSettings';
import { toProperCase } from '../Utils/gameUtils';
import { motion } from 'framer-motion';

function GameOptions(props) {
  return (
    <motion.section
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2, type: 'tween', delay: 0.2 }}
    >
      <h3 className="screen-header">{`${toProperCase(
        props.match.params.gameType
      )} for which region?`}</h3>
      <motion.div
        initial="hidden"
        animate="show"
        className="flex flex-col items-center mb-8"
      >
        {gameRegions.map(({ content, datasetValue }) => (
          <OptionButton
            key={datasetValue}
            content={content}
            buttonStyle="wide"
            urlParam={`${props.match.params.gameType}/${content.toLowerCase()}`}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default GameOptions;
