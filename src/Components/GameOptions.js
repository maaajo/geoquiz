import React from 'react';
import OptionButton from './OptionButton';
import { toProperCase } from '../Utils/gameUtils';
import { gameRegions } from '../GameSettings/gameSettings';

function GameOptions({ handleAreaSelectionClick, gameType }) {
  return (
    <section>
      <h3 className="screen-header">{`${toProperCase(
        gameType
      )} for which region?`}</h3>
      <div className="flex flex-col items-center mb-8">
        {gameRegions.map(({ content, datasetName, datasetValue }) => (
          <OptionButton
            key={datasetValue}
            onClick={handleAreaSelectionClick}
            content={content}
            datasetName={datasetName}
            datasetValue={datasetValue}
            buttonStyle="wide"
          />
        ))}
      </div>
    </section>
  );
}

export default GameOptions;
