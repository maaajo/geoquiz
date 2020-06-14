import React from 'react';
import OptionButton from './OptionButton';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gameTypes } from '../GameSettings/gameSettings';
import { motion } from 'framer-motion';
import { appTranslations } from '../Translations/appTranslations';

const StyledDiv = styled.div`
  ${tw`flex justify-center`}
`;

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
      <StyledDiv>
        {gameTypes.map(({ content, datasetValue }) => (
          <OptionButton
            key={content}
            content={appTranslations.homeScreen.buttons[datasetValue][language]}
            buttonStyle="rectangle"
            urlParam={content.toLowerCase()}
          />
        ))}
      </StyledDiv>
    </motion.section>
  );
}

export default InitialScreen;
