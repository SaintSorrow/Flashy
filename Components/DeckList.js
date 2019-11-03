import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Deck from './Deck'

export default class DeckList extends Component {
  render() {
    return (
      <ScrollView>
        {this.props.decks.map(deck => (<Deck deck={deck} 
          key={deck.name} 
          showCards={() => this.props.showCardsHandler(deck)}/>))}
      </ScrollView>
    )
  }
}