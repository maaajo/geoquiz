import React from 'react';
import InitialScreen from './Components/InitialScreen';
import GameOptions from './Components/GameOptions';
import Game from './Components/Game/Game';
import tw from 'twin.macro';
import styled from 'styled-components';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Switch, Route, withRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './Assets/styles.css';

const StyledMain = styled.main`
  padding-bottom: 70px;
  ${tw`min-h-screen font-body bg-blue relative`}
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialScreen: true,
      areaSelectionScreen: false,
      gameScreen: false,
      gameOption: '',
      area: '',
      language: 'en'
    };

    this.handleGameOptionClick = this.handleGameOptionClick.bind(this);
    this.handleAreaSelectionClick = this.handleAreaSelectionClick.bind(this);
    this.restartApp = this.restartApp.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleAreaSelectionClick(e) {
    this.setState({
      area: e.target.dataset.area,
      areaSelectionScreen: false,
      gameScreen: true
    });
  }

  handleGameOptionClick(e) {
    this.setState({
      gameOption: e.target.dataset.gameOption,
      initialScreen: false,
      areaSelectionScreen: true
    });
  }

  restartApp() {
    this.setState({
      gameOption: '',
      area: '',
      areaSelectionScreen: false,
      initialScreen: true,
      gameScreen: false
    });
  }

  handleLanguageChange(e) {
    this.setState({
      language: e.target.dataset.language
    });
  }

  render() {
    return (
      <StyledMain className="App">
        <Header
          handleLanguageChange={this.handleLanguageChange}
          language={this.state.language}
        />
        <AnimatePresence exitBeforeEnter>
          <Switch
            location={this.props.location}
            key={this.props.location.pathname}
          >
            <Route
              exact
              path="/"
              render={props => (
                <InitialScreen {...props} language={this.state.language} />
              )}
            />
            <Route
              exact
              path="/:gameType"
              render={props => (
                <GameOptions {...props} language={this.state.language} />
              )}
            />
            <Route
              exact
              path="/:gameType/:gameArea"
              render={props => (
                <Game {...props} language={this.state.language} />
              )}
            />
          </Switch>
        </AnimatePresence>
        <Footer />
      </StyledMain>
    );
  }
}

export default withRouter(App);
