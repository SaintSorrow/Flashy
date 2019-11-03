import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import decks from './flashcards'
import DeckList from './Components/DeckList'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCards: false,
      incorrectCards: [],
      correctCards: [],
      currentCards: [],
      decks: decks,
    }
  }

  showCardsHandler = deck => {
    this.setState({
      showCards: !this.state.showCards,
      currentCards: deck.cards
    });
  };

  render() {
    return (
      <View style ={styles.container}>
        {this.state.showCards === false && (
          <DeckList showCardsHandler={this.showCardsHandler} decks={this.state.decks}/>
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
