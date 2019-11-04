import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import decks from './flashcards'
import DeckList from './Components/DeckList'
import Card from './Components/Card'

function shuffleDeck(array) {
 let m = array.length, i, t;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      showCards: false,
      incorrectCards: [],
      correctCards: [],
      currentCards: [],
      decks: decks,
      showCardBack: false,
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  showCardsHandler = deck => {
    this.setState({
      showCards: !this.state.showCards,
      currentCards: shuffleDeck(deck.cards),
    });
  };

  correctCardHandler = () => {
    const card = this.state.currentCards[0]
    const newCorrectCards = [...this.state.correctCards, card]
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1);

    this.setState({
      correctCards: newCorrectCards,
      currentCards: newCurrentCards,
      showCardBack: false,
    })
  }

  incorrectCardHandler = () => {
    const card = this.state.currentCards[0];
    const newIncorrectCards = [...this.state.incorrectCards, card];
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1)

    this.setState({
      incorrectCards: newIncorrectCards,
      currentCards: newCurrentCards,
      showCardBack: false,
    })
  }

  deleteCardHandler = () => {
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1);

    this.setState({
      currentCards: newCurrentCards,
      showCardBack: false,
    })
  }

  resetCurrentDeckHandler = () => {
    const newCurrentCards = [...this.state.incorrectCards, ...this.state.currentCards, ...this.state.correctCards];

    this.setState({
      currentCards: newCurrentCards,
      incorrectCards: [],
      correctCards: [],
      showCardBack: false,
    })
  }

  handleBackButtonClick () {
    if (this.state.showCards) {
      this.setState({
        showCards: !this.state.showCards,
        showCardBack: false,
      })
    }
    return true;
  }

  flipCard = () => {
    this.setState({
      showCardBack: !this.state.showCardBack
    })
  }

  render() {
    return (
      <View style ={styles.container}>
        {this.state.showCards === false && (
          <DeckList showCardsHandler={this.showCardsHandler} decks={this.state.decks}/>
        )}
        {this.state.showCards === true && (
          <Card cards={this.state.currentCards}
            showCardBack={this.state.showCardBack}
            flipCard={this.flipCard}
            correctCardHandler={this.correctCardHandler}
            incorrectCardHandler={this.incorrectCardHandler}
            resetCurrentDeckHandler={this.resetCurrentDeckHandler}
            deleteCardHandler={this.deleteCardHandler}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1adbb8',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
