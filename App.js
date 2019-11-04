import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import decks from './flashcards'
import DeckList from './Components/DeckList'
import Card from './Components/Card'

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
      currentCardIdx: 0,
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
      currentCards: deck.cards
    });
  };

  getCurrentCard() {
    const currentCard = this.state.currentCards[this.state.currentCardIdx];
    return currentCard;
  }

  getNextRandomIdx(array) {
    let nextIdx = 0

    if (array.length !== 1) {
       nextIdx = Math.floor(Math.random() * array.length)
    }
    
    return nextIdx;
  }

  correctCardHandler = () => {
    const card = this.getCurrentCard();
    const newCorrectCards = [...this.state.correctCards, card]
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(this.state.currentCardIdx, 1);

    const nextIdx = this.getNextRandomIdx(newCurrentCards);

    this.setState({
      correctCards: newCorrectCards,
      currentCards: newCurrentCards,
      currentCardIdx: nextIdx,
    })
  }

  incorrectCardHandler = () => {
    const card = this.getCurrentCard();
    const newIncorrectCards = [...this.state.incorrectCards, card];
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(this.state.currentCardIdx, 1)

    const nextIdx = this.getNextRandomIdx(newCurrentCards);

    this.setState({
      incorrectCards: newIncorrectCards,
      currentCards: newCurrentCards,
      currentCardIdx: nextIdx,
    })
  }

  deleteCardHandler = () => {
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(this.state.currentCardIdx, 1);

    const nextIdx = this.getNextRandomIdx(newCurrentCards);

    this.setState({
      currentCards: newCurrentCards,
      currentCardIdx: nextIdx,
    })
  }

  resetCurrentDeckHandler = () => {
    const newCurrentCards = [...this.state.incorrectCards, ...this.state.correctCards];

    const nextIdx = this.getNextRandomIdx(newCurrentCards);

    this.setState({
      currentCards: newCurrentCards,
      incorrectCards: [],
      correctCards: [],
      currentCardIdx: nextIdx,
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
            idx={this.state.currentCardIdx}
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
