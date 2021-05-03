import React from 'react';
import OptionButton from './OptionButton';
import { gameTypes, gameRegions } from '../GameSettings/gameSettings';
import { toProperCase } from '../Utils/gameUtils';
import { appTranslations } from '../Translations/appTranslations';
import { useRouteMatch } from 'react-router-dom';
import NotFound from './NotFound';

function GameOptions(props) {
  const { params } = useRouteMatch();

  const getPathValidity = (pathParam, pathOptions) => {
    const filteredPathOptions = pathOptions.filter(
      (pathOption) => pathOption.datasetValue === pathParam
    );
    return filteredPathOptions.length > 0;
  };

  const isPathValid = getPathValidity(params.gameType, gameTypes);

  return isPathValid ? (
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
  ) : (
    <NotFound />
  );
}

export default GameOptions;
