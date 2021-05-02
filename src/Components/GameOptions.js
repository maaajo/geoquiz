import React from 'react';
import OptionButton from './OptionButton';
import { gameRegions } from '../GameSettings/gameSettings';
import { toProperCase } from '../Utils/gameUtils';
import { appTranslations } from '../Translations/appTranslations';

function GameOptions(props) {
  return (
    <section>
      <h3 className="screen-header">{`${toProperCase(
        appTranslations.optionsScreen.title[props.match.params.gameType][
          props.language
        ]
      )} ${appTranslations.optionsScreen.header[props.language]}?`}</h3>
      <div className="flex flex-col items-center mb-8">
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
      </div>
    </section>
  );
}

export default GameOptions;
