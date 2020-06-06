import React from 'react';

function GameQuestions({
  gameOption,
  answers,
  questionName,
  handleUserAnswer,
  answerPosted
}) {
  let headerParagraph;
  if (gameOption === 'capitals') {
    headerParagraph = <p>What is the capital of {questionName}</p>;
  } else {
    headerParagraph = <p>Please select the flag of {questionName}</p>;
  }

  const flagStyle = flagUrl => ({
    backgroundImage: `url(${flagUrl})`,
    width: '40px',
    height: '30px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  });

  return (
    <div>
      {headerParagraph}
      {answers.map(({ answerNumber, question }, index) => {
        return (
          <button
            type="button"
            key={index}
            style={gameOption === 'flags' ? flagStyle(question) : null}
            name={`game-question-${index}`}
            data-user-answer={answerNumber}
            onClick={handleUserAnswer}
            disabled={answerPosted}
          >
            {gameOption === 'capitals' ? question : null}
          </button>
        );
      })}
    </div>
  );
}

export default GameQuestions;
