import React from 'react';
import OptionButton from './OptionButton';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gameTypes } from '../GameSettings/gameSettings';

const StyledDiv = styled.div`
  ${tw`flex justify-center`}
`;

function InitialScreen({ handleGameOptionClick }) {
  return (
    <section>
      <h3 className="screen-header">What would you like to learn today?</h3>
      <StyledDiv>
        {gameTypes.map(({ content, datasetName, datasetValue }) => (
          <OptionButton
            key={datasetValue}
            onClick={handleGameOptionClick}
            content={content}
            datasetName={datasetName}
            datasetValue={datasetValue}
            buttonStyle="rectangle"
          />
        ))}
      </StyledDiv>
    </section>
  );
}

export default InitialScreen;
