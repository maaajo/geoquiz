import React from 'react';
import OptionButton from '../OptionButton';
import ScoreTile from './ScoreTile';
import { appTranslations } from '../../Translations/appTranslations';

const ScoreScreen = ({
  correctAnswers,
  wrongCountries,
  restartGame,
  language,
}) => {
  return (
    <section>
      <h3 className="screen-header mb-0">
        {appTranslations.scoreScreen.header[language]}
      </h3>
      <p className="screen-header mt-0 mb-2 text-xl">
        {appTranslations.scoreScreen.score[language]}
      </p>
      <div className="flex justify-center">
        <ScoreTile
          number={correctAnswers}
          option="good"
          text={appTranslations.scoreScreen.correct[language]}
        />
        <ScoreTile
          number={wrongCountries}
          option="bad"
          text={appTranslations.scoreScreen.wrong[language]}
        />
      </div>
      <div className="flex flex-col items-center mt-6">
        <OptionButton
          content={appTranslations.scoreScreen.buttons.newGame[language]}
          buttonStyle="wide"
        />
        <button
          name="restartApp"
          type="button"
          className="button-wide"
          onClick={() => restartGame(false)}
        >
          {appTranslations.scoreScreen.buttons.sameGame[language]}
        </button>
        {wrongCountries > 0 ? (
          <button
            name="restartApp"
            type="button"
            className="button-wide"
            onClick={() => restartGame(true)}
          >
            {appTranslations.scoreScreen.buttons.badOnes[language]}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default ScoreScreen;
