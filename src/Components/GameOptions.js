import React from 'react';
import OptionButton from './OptionButton';
import { gameRegions } from '../GameSettings/gameSettings';
import { toProperCase } from '../Utils/gameUtils';

function GameOptions(props) {
  return (
    <section>
      <h3 className="screen-header">{`${toProperCase(
        props.match.params.gameType
      )} for which region?`}</h3>
      <div className="flex flex-col items-center mb-8">
        {gameRegions.map(({ content, datasetValue }) => (
          <OptionButton
            key={datasetValue}
            content={content}
            buttonStyle="wide"
            urlParam={`${props.match.params.gameType}/${content.toLowerCase()}`}
          />
        ))}
      </div>
    </section>
  );
}

export default GameOptions;
