import React, { Component } from 'react'
import { StyleSheet, View, BackHandler, Button } from 'react-native'
import decks from './flashcards'
import DeckList from './Components/DeckList'
import Card from './Components/Card'
import AddDeck from './Components/AddDeck'

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
      showDecks: true
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
      currentCards: newCurrentCards
    })
  }

  incorrectCardHandler = () => {
    const card = this.state.currentCards[0];
    const newIncorrectCards = [...this.state.incorrectCards, card];
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1)

    this.setState({
      incorrectCards: newIncorrectCards,
      currentCards: newCurrentCards
    })
  }

  deleteCardHandler = () => {
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1);

    this.setState({
      currentCards: newCurrentCards
    })
  }

  resetCurrentDeckHandler = () => {
    const newCurrentCards = [...this.state.incorrectCards, ...this.state.currentCards, ...this.state.correctCards];

    this.setState({
      currentCards: newCurrentCards,
      incorrectCards: [],
      correctCards: []
    })
  }

  handleBackButtonClick () {
    if (this.state.showCards) {
      this.setState({
        showCards: !this.state.showCards,
      })
    }
    return true;
  }

  toggleDecks = () => {
    this.setState(prev => ({showDecks: !prev.showDecks}))
  }

  addDeck = newDeck => {
    this.setState(prev => ({decks: [...prev.decks, newDeck], showDecks: true}))
  }

  render() {
    return (
      <View style ={styles.container}>
        {this.state.showCards === false && this.state.showDecks === true && (
          <View>
            <DeckList showCardsHandler={this.showCardsHandler} decks={this.state.decks}/>
            <Button title='Add deck' onPress={this.toggleDecks}/>
          </View>
        )}
        {this.state.showCards === false && this.state.showDecks === false && (
          <AddDeck onSubmit={this.addDeck}/>
        )}
        {this.state.showCards === true && (
          <Card cards={this.state.currentCards}
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
