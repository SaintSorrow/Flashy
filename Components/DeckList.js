import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Deck from './Deck'

export default class DeckList extends Component {
  render() {
    return (
      <View style={styles.container}>
          {this.props.decks.map(deck => (<Deck deck={deck} 
            key={deck.name} 
            showCards={() => this.props.showCardsHandler(deck)}/>))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})