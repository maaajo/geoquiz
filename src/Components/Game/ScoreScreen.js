import React from 'react';
import OptionButton from '../OptionButton';
import ScoreTile from './ScoreTile';

const ScoreScreen = ({ correctAnswers, wrongCountries, restartGame }) => {
  return (
    <section>
      <h3 className="screen-header mb-0">Congratulations!</h3>
      <p className="screen-header mt-0 mb-2">Your score is:</p>
      <div className="flex justify-center">
        <ScoreTile number={correctAnswers} option="good" />
        <ScoreTile number={wrongCountries} option="bad" />
      </div>
      <div className="flex flex-col items-center mt-6">
        <OptionButton content="Start new game" buttonStyle="wide" />
        <button
          name="restartApp"
          type="button"
          className="button-wide"
          onClick={() => restartGame(false)}
        >
          Start Again the same
        </button>
        {wrongCountries > 0 ? (
          <button
            name="restartApp"
            type="button"
            className="button-wide"
            onClick={() => restartGame(true)}
          >
            Learn only wrong ones
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default ScoreScreen;
