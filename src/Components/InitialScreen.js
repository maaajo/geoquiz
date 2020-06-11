import React from 'react';
import OptionButton from './OptionButton';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gameTypes } from '../GameSettings/gameSettings';
import { motion } from 'framer-motion';

const StyledDiv = styled.div`
  ${tw`flex justify-center`}
`;

function InitialScreen() {
  return (
    <motion.section
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2, type: 'tween', delay: 0.2 }}
    >
      <h3 className="screen-header">What would you like to learn today?</h3>
      <StyledDiv>
        {gameTypes.map(({ content }) => (
          <OptionButton
            key={content}
            content={content}
            buttonStyle="rectangle"
            urlParam={content.toLowerCase()}
          />
        ))}
      </StyledDiv>
    </motion.section>
  );
}

export default InitialScreen;
