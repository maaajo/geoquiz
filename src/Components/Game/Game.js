// https://coolors.co/353535-3c6e71-ffffff-d9d9d9-284b63

import React from 'react';
import axios from 'axios';
import throttle from 'lodash.throttle';
import {
  generateRandomNumber,
  removeItemFromArray,
  shuffleArray,
  roundNumber
} from '../../Utils/gameUtils';
import { countryTranslations } from '../../Translations/countryTranslations';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentQuestionNumber: 0,
      answers: [],
      score: 0,
      correctAnswers: 0,
      gameAnswersNr: 4,
      gameStart: false,
      gameStop: false,
      userGameHistory: [],
      answerPosted: false,
      answersUpdated: false,
      userAnswer: '',
      correctCountries: [],
      wrongCountries: [],
      startGameTimestamp: Date.now(),
      stopGameTimestamp: ''
    };
    this.answerDelay = 100;
    this.handleUserAnswerThrottled = throttle(this.handleUserAnswer, 300);
  }

  async componentDidMount() {
    try {
      this.setState(currState => ({ isLoading: !currState.isLoading }));
      const geoData = await this.getData(this.props.area);
      this.setState(currState => ({
        isLoading: !currState.isLoading
      }));
      let dataUserArea;
      let dataWorld;
      if (this.props.area.toLowerCase() === 'world') {
        dataUserArea = geoData;
        dataWorld = geoData;
      } else {
        dataUserArea = geoData[0];
        dataWorld = geoData[1];
      }
      const gamePreparedData = this.createGameArray(
        dataUserArea.data,
        this.props.option
      );
      this.gamePreparedData = gamePreparedData;
      this.gamePreparedDataWorld = this.createGameArray(
        dataWorld.data,
        this.props.option
      );
      this.gameArrayRemained = this.gamePreparedData.slice();
      this.numberOfQuestions = this.gamePreparedData.length - 1;
      this.handleGameNextRound();
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate() {
    if (this.state.answersUpdated) {
      clearTimeout(this.timeoutId);
      this.timeoutId = 0;
    }
  }

  componentWillUnmount() {
    this.handleUserAnswerThrottled.cancel();
  }

  createGameArray(gameData = [], gameOption) {
    if (gameOption === 'capitals') {
      return gameData.map(({ name, capital }) => ({
        name,
        question: capital ? capital : name
      }));
    }
    return gameData.map(({ name, flag }) => ({
      name,
      question: flag ? flag : 'https://placeholder.pics/svg/100'
    }));
  }

  drawGameAnswerNr(gameData = []) {
    const randomNumber = generateRandomNumber(gameData.length - 1, 0);
    return randomNumber;
  }

  drawGameBadAnswers(nrOfBadAnswers, gameArray, gameAnswerNr) {
    let result = [];
    let previousRandomNumbers = [];
    for (let i = 0; i < nrOfBadAnswers; i++) {
      let randomNumber = this.drawGameAnswerNr(gameArray);
      while (
        previousRandomNumbers.includes(randomNumber) ||
        gameAnswerNr === randomNumber
      ) {
        randomNumber = this.drawGameAnswerNr(gameArray);
      }
      result.push(gameArray[randomNumber]);
      previousRandomNumbers.push(randomNumber);
    }
    return result;
  }

  getCorrectAnswer(gameData, gameDataPos) {
    return gameData[gameDataPos];
  }

  startDelayedRound = delay => {
    return setTimeout(() => {
      this.handleGameNextRound();
      this.setState({ answersUpdated: true });
    }, delay);
  };

  handleUserAnswer = e => {
    console.log(this.answer);
    const userAnswer = this.state.answers.filter(
      ({ answerNumber }) =>
        answerNumber === parseInt(e.target.dataset.userAnswer)
    )[0].question;
    const correctAnswer = this.answer;
    this.setState(currentState => {
      return {
        userAnswer,
        answersUpdated: false,
        answerPosted: true,
        userGameHistory: [
          ...currentState.userGameHistory,
          {
            [`Round ${currentState.currentQuestionNumber}`]: {
              country: correctAnswer.name,
              userAnswer,
              correctAnswer: correctAnswer.question,
              answers: currentState.answers.map(item => item.question)
            }
          }
        ]
      };
    });
    if (userAnswer.toLowerCase() === correctAnswer.question.toLowerCase()) {
      this.setState(currentState => {
        return {
          correctCountries: currentState.correctCountries.concat(
            correctAnswer.name
          ),
          correctAnswers: currentState.correctAnswers + 1
        };
      });
      this.timeoutId = this.startDelayedRound(this.answerDelay);
    } else {
      this.setState(currentState => ({
        wrongCountries: currentState.wrongCountries.concat(correctAnswer.name)
      }));
      this.timeoutId = this.startDelayedRound(this.answerDelay);
    }
  };

  createGameQuestion(gameDataRemained, gameDataAll, answersNr = 4) {
    const gameDataCopy = gameDataRemained.slice();
    const gameAnswerNr = this.drawGameAnswerNr(gameDataCopy);
    const gameAnswer = this.getCorrectAnswer(gameDataCopy, gameAnswerNr);
    const gameDataWithoutAnswer = removeItemFromArray(
      gameDataCopy,
      gameAnswerNr
    );
    const gameAnswerIndexInAll = gameDataAll
      .map((item, index) => {
        if (item.name === gameAnswer.name) {
          return index;
        }
        return undefined;
      })
      .filter(item => item !== undefined)[0];
    const otherAnswers = this.drawGameBadAnswers(
      answersNr - 1,
      gameDataAll,
      gameAnswerIndexInAll
    );
    const allAnswers = [
      ...otherAnswers,
      gameAnswer
    ].map(({ question }, index) => ({ answerNumber: index, question }));
    const allAnswersRandom = shuffleArray(allAnswers);
    return [gameAnswer, allAnswersRandom, gameDataWithoutAnswer];
  }

  startRound() {
    const [gameAnswer, allAnswers, newGameData] = this.createGameQuestion(
      this.gameArrayRemained,
      this.gamePreparedDataWorld,
      this.state.gameAnswersNr
    );
    this.gameArrayRemained = newGameData;
    this.answer = gameAnswer;
    this.setState(currState => ({
      answers: allAnswers,
      userAnswer: '',
      answerPosted: false,
      currentQuestionNumber: currState.currentQuestionNumber + 1,
      score: this.formatGameScore(
        this.calculateGameScore(
          currState.correctAnswers,
          currState.currentQuestionNumber + 1
        )
      ),
      gameStart: true,
      gameStop: false
    }));
  }

  stopRound() {
    this.setState(currState => ({
      gameStart: !currState.gameStart,
      gameStop: !currState.gameStop,
      answerPosted: false,
      currentQuestionNumber: 0,
      score: this.formatGameScore(
        this.calculateGameScore(
          currState.correctAnswers,
          currState.currentQuestionNumber + 1
        )
      ),
      answers: [],
      stopGameTimestamp: Date.now()
    }));
  }

  handleGameNextRound() {
    if (this.state.currentQuestionNumber <= this.numberOfQuestions) {
      this.startRound();
    } else {
      this.stopRound();
    }
  }

  async getData(userArea) {
    const apiEndPointSelected = `https://restcountries.eu/rest/v2/region/${userArea}`;
    const apiEndPointAll = 'https://restcountries.eu/rest/v2/all';
    if (userArea.toLowerCase() === 'world') {
      return await axios.get(apiEndPointAll);
    }
    return await Promise.all([
      axios.get(apiEndPointSelected),
      axios.get(apiEndPointAll)
    ]);
  }

  calculateGameScore(correctAnswers, questionNumber) {
    if (questionNumber === 1) {
      return 0;
    } else {
      return correctAnswers / (questionNumber - 1);
    }
  }

  formatGameScore(score) {
    return `${roundNumber(score, 2)}%`;
  }

  getAnswerButtonHighlight = (buttonAnswer, answerPosted, answer) => {
    if (answerPosted) {
      if (buttonAnswer.toLowerCase() === answer.toLowerCase()) {
        return (
          <AiFillCheckCircle size="20px" className="inline text-lightGreen" />
        );
      }
      return <AiFillCloseCircle size="20px" className="inline text-red" />;
    }
    return null;
  };

  restartGameWithTheSameChoice = (onlyBadOnes = false) => {
    if (onlyBadOnes) {
      this.gameArrayRemained = this.gamePreparedData
        .slice()
        .filter(item => this.state.wrongCountries.includes(item.name));
      this.numberOfQuestions = this.gameArrayRemained.length - 1;
    } else {
      this.gameArrayRemained = this.gamePreparedData.slice();
      this.numberOfQuestions = this.gamePreparedData.length - 1;
    }
    this.setState({
      score: this.formatGameScore('0'),
      correctAnswers: 0,
      correctCountries: [],
      wrongCountries: [],
      userGameHistory: []
    });
    this.handleGameNextRound();
  };

  render() {
    const flagStyle = flagUrl => ({
      backgroundImage: `url(${flagUrl})`,
      width: '40px',
      height: '30px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    });
    return (
      <section className="mx-8">
        {this.state.isLoading ? <p>Loading</p> : null}
        {this.state.gameStart ? (
          <>
            <h3 className="screen-header text-left p-0 mb-0 pb-1 border-b-2 border-dashed border-grey">
              Question: {this.state.currentQuestionNumber} /{' '}
              {this.numberOfQuestions + 1}
            </h3>
            {this.props.option === 'capitals' ? (
              <p className="my-10 text-white tracking-custom text-xl text-left font-semibold">
                What is the capital of{' '}
                {countryTranslations[this.answer.name][this.props.language]}?
              </p>
            ) : (
              <p>
                Please select the flag of{' '}
                {countryTranslations[this.answer.name][this.props.language]}
              </p>
            )}
            <div>
              {this.state.answers.map(({ answerNumber, question }, index) => {
                return (
                  <button
                    type="button"
                    className="button-wide w-full"
                    key={index}
                    style={
                      this.props.option === 'flags' ? flagStyle(question) : null
                    }
                    name={`game-question-${index}`}
                    data-user-answer={answerNumber}
                    onClick={this.handleUserAnswerThrottled}
                    disabled={this.state.answerPosted}
                  >
                    <span
                      data-user-answer={answerNumber}
                      className="flex justify-between items-center mx-6 font-medium"
                    >
                      <span
                        data-user-answer={answerNumber}
                        className="text-base"
                      >
                        {this.props.option === 'capitals'
                          ? countryTranslations[question][this.props.language]
                          : null}
                      </span>
                      {this.getAnswerButtonHighlight(
                        question,
                        this.state.answerPosted,
                        this.answer.question
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}
        {this.state.gameStop ? (
          <section>
            <h3 className="screen-header mb-0">Congratulations!</h3>
            <p className="screen-header mt-0 mb-2">Your score is:</p>
            <div className="flex justify-center">
              <div className="bg-lightGreen text-white flex flex-col justify-center items-center w-20 h-16 rounded-lg shadow-md mr-2">
                <p className="font-semibold text-2xl ">
                  {this.state.correctAnswers}
                </p>
                <p className="font-medium text-xs">correct</p>
              </div>
              <div className="bg-red text-white flex flex-col justify-center items-center w-20 h-16 rounded-lg shadow-md">
                <p className="font-semibold text-2xl">
                  {this.state.wrongCountries.length}
                </p>
                <p className="font-medium text-xs">wrong</p>
              </div>
            </div>
            <div className="flex flex-col items-center mt-6">
              <button className="button-wide" onClick={this.props.restart}>
                Start Again
              </button>
              <button
                className="button-wide"
                onClick={() => this.restartGameWithTheSameChoice(false)}
              >
                Start Again the same
              </button>
              {this.state.wrongCountries.length > 0 ? (
                <button
                  className="button-wide"
                  onClick={() => this.restartGameWithTheSameChoice(true)}
                >
                  Learn only wrong ones
                </button>
              ) : null}
            </div>
          </section>
        ) : null}
      </section>
    );
  }
}

export default Game;
