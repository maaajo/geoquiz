import React from 'react';
import OptionButton from './OptionButton';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gameTypes } from '../GameSettings/gameSettings';

const StyledDiv = styled.div`
  ${tw`flex justify-center`}
`;

function InitialScreen() {
  return (
    <section>
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
    </section>
  );
}

export default InitialScreen;
