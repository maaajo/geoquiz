import React from 'react';
import { countryTranslations } from '../../Translations/countryTranslations';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';

const getAnswerButtonHighlight = (
  buttonAnswer,
  answerPosted,
  answer,
  gameType
) => {
  if (answerPosted) {
    switch (gameType.toLowerCase()) {
      case 'capitals':
        if (buttonAnswer.toLowerCase() === answer.toLowerCase()) {
          return (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <AiFillCheckCircle
                size="20px"
                className="inline text-lightGreen"
              />
            </motion.span>
          );
        }
        return (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <AiFillCloseCircle size="20px" className="inline text-red" />
          </motion.span>
        );
      case 'flags':
        if (buttonAnswer.toLowerCase() === answer.toLowerCase()) {
          return 'flag-highlight-correct';
        }
        return 'flag-highlight-incorrect';
      default:
        return 'something went wrong';
    }
  }
  return null;
};

const getButtonClassNames = (gameType, buttonHighlight = '') => {
  switch (gameType.toLowerCase()) {
    case 'capitals':
      return 'button-wide w-full';
    case 'flags':
      return `w-32 h-24 bg-center bg-contain bg-no-repeat m-2 ${buttonHighlight}`;
    default:
      return 'button-wide w-full';
  }
};

const getButtonStyle = (gameType, currentAnswer) => {
  switch (gameType.toLowerCase()) {
    case 'capitals':
      return {};
    case 'flags':
      return {
        backgroundImage: `url(${currentAnswer})`,
        flexBasis: '43%'
      };
    default:
      return 'button-wide w-full';
  }
};

const capitalButtonContent = (answerNumber, text, buttonHighlight) => (
  <span
    data-user-answer={answerNumber}
    className="flex justify-between items-center mx-6 font-medium"
  >
    <span data-user-answer={answerNumber} className="text-base">
      {text}
    </span>
    {buttonHighlight}
  </span>
);

const getButtonContent = (gameType, answerNumber, text, buttonHighlight) => {
  switch (gameType.toLowerCase()) {
    case 'capitals':
      return capitalButtonContent(answerNumber, text, buttonHighlight);
    case 'flags':
      return null;
    default:
      return null;
  }
};

const GameScreen = ({
  gameType,
  currentQuestionNumber,
  numberOfQuestions,
  countryName,
  language,
  answers,
  answerPosted,
  correctAnswer,
  handleUserAnswerThrottled
}) => {
  const countryNameTranslated = countryTranslations[countryName][language];
  return (
    <>
      <h3 className="screen-header text-left p-0 mb-0 pb-1 border-b-2 border-dashed border-grey">
        Question: {currentQuestionNumber} / {numberOfQuestions + 1}
      </h3>
      <p className="my-10 text-white tracking-custom text-xl text-left font-semibold">
        {`What is the ${
          gameType.toLowerCase() === 'capitals' ? 'capital' : 'flag'
        } of `}
        <span>{countryNameTranslated}</span>?
      </p>

      <div
        id="gameQuestions"
        className={
          gameType.toLowerCase() === `flags`
            ? `flex flex-wrap justify-between`
            : null
        }
      >
        {answers.map(({ answerNumber, question: currentAnswer }, index) => {
          const buttonHighlight = getAnswerButtonHighlight(
            currentAnswer,
            answerPosted,
            correctAnswer,
            gameType
          );
          const capitalTranslated =
            gameType.toLowerCase() === 'capitals'
              ? countryTranslations[currentAnswer][language]
              : '';
          return (
            <button
              type="button"
              className={`${getButtonClassNames(gameType, buttonHighlight)} ${
                answerPosted ? 'cursor-not-allowed' : null
              }`}
              key={index}
              style={getButtonStyle(gameType, currentAnswer)}
              name={`game-question-${index}`}
              data-user-answer={answerNumber}
              onClick={handleUserAnswerThrottled}
              disabled={answerPosted}
            >
              {getButtonContent(
                gameType,
                answerNumber,
                capitalTranslated,
                buttonHighlight
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default GameScreen;
