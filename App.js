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
      decks: decks,
      currentDeck: '',
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
    shuffleDeck(deck.cards)

    this.setState({
      showCards: !this.state.showCards,
      currentDeck: deck,
    });
  };

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
          <Card cards={this.state.currentDeck.cards}/>
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
