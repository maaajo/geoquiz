import React from 'react';
import OptionButton from './OptionButton';
import { gameTypes } from '../GameSettings/gameSettings';
import { appTranslations } from '../Translations/appTranslations';

function InitialScreen({ language }) {
  return (
    <section
    >
      <h3 className="screen-header">
        {appTranslations.homeScreen.header[language]}
      </h3>
      <div className="flex justify-center">
        {gameTypes.map(({ content, datasetValue }) => (
          <OptionButton
            key={content}
            content={appTranslations.homeScreen.buttons[datasetValue][language]}
            buttonStyle="rectangle"
            urlParam={content.toLowerCase()}
          />
        ))}
      </div>
    </section>
  );
}

export default InitialScreen;
