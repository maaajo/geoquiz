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
import GameScreen from './GameScreen';
import ScoreScreen from './ScoreScreen';

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
    this.answerDelay = 800;
    this.handleUserAnswerThrottled = throttle(this.handleUserAnswer, 800);
  }

  async componentDidMount() {
    try {
      this.setState(currState => ({ isLoading: !currState.isLoading }));
      const geoData = await this.getData(this.props.match.params.gameArea);
      this.setState(currState => ({
        isLoading: !currState.isLoading
      }));
      let dataUserArea;
      let dataWorld;
      if (this.props.match.params.gameArea.toLowerCase() === 'world') {
        dataUserArea = geoData;
        dataWorld = geoData;
      } else {
        dataUserArea = geoData[0];
        dataWorld = geoData[1];
      }
      const gamePreparedData = this.createGameArray(
        dataUserArea.data,
        this.props.match.params.gameType
      );
      this.gamePreparedData = gamePreparedData;
      this.gamePreparedDataWorld = this.createGameArray(
        dataWorld.data,
        this.props.match.params.gameType
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

  restartGame = (onlyBadOnes = false) => {
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
    return (
      <section className="mx-8">
        {this.state.isLoading ? <p>Loading</p> : null}
        {this.state.gameStart ? (
          <GameScreen
            gameType={this.props.match.params.gameType}
            currentQuestionNumber={this.state.currentQuestionNumber}
            numberOfQuestions={this.numberOfQuestions}
            countryName={this.answer.name}
            language={this.props.language}
            answers={this.state.answers}
            answerPosted={this.state.answerPosted}
            correctAnswer={this.answer.question}
            handleUserAnswerThrottled={this.handleUserAnswerThrottled}
          />
        ) : null}
        {this.state.gameStop ? (
          <ScoreScreen
            correctAnswers={this.state.correctAnswers}
            wrongCountries={this.state.wrongCountries.length}
            restartGame={this.restartGame}
          />
        ) : null}
      </section>
    );
  }
}

export default Game;
