import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'

export default class Deck extends Component {
  render () {
    return(
      <TouchableOpacity onPress={() => this.props.showCards(this.props.deck)}>
        <View style={styles.deck}>
          <Text style={styles.deckText}>{this.props.deck.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: '#2604bf',
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
  },
  deckText: {
    color: 'red'
  }
});