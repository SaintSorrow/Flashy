import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import decks from './flashcards'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCards: false,
      incorrectCards: [],
      correctCards: [],
      currentCards: [],
    }
  }

  openDeck = (deck) => {
    this.setState({
      showDeckList: !this.state.showDeckList,
      showCards: !this.state.showCards,
      currentCards: deck.cards,
    })
  }

  render() {
    return (
      <View style ={styles.container}>
        {this.state.showDeckList === true && (
          <DeckList decks={decks}
          handler = {this.openDeck}
          />
        )}
      </View>
    );
  }
}

function DeckComponent({ deck }) {
  return (
    <View style={styles.deckComponent}>
      <TouchableOpacity style={styles.deckComponent} onPress = {this.props.handler(deck)}>
        <Text style={styles.deckText}>{deck.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

class DeckComponent extends Component {

}

class DeckList extends Component {
  render() {
    return (
      {this.props.decks.map((deck) => )}
    )
  }
}

function DeckList({ decks }) {
  const list = decks.map((deck) => <DeckComponent deck={deck} key={deck.name} handler={this.props.handler}/>)

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

    backgroundColor: '#1adbb8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckText: {
    color: 'red',
  },
  deckComponent: {
    backgroundColor: '#2604bf',
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
  }
});
