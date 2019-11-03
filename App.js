import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import decks from './flashcards'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeckList: true,
      showCards: false,
      incorrectCards: [],
      correctCards: [],
      currentCards: [],
    }
  }

  render() {
    return (
      <View style ={styles.container}>
        {this.state.showDeckList === true && (
          <DeckList decks={decks}/>
        )}
      </View>
    );
  }
}

function DeckComponent({ deck }) {
  return (
    <View>
      <Text style={styles.deckText}>{deck.name}</Text>
    </View>
  )
}

function DeckList({ decks }) {
  const list = decks.map((deck) => <DeckComponent deck={deck} key={deck.name}/>)

  return (
    <View>
      {list}
    </View>
  )
}

//const DeckList = decks.map((deck) => <DeckComponent deck={deck}/>)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckText: {
    color: 'red',
  },
});
