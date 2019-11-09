import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  FlatList
} from 'react-native'
import Deck from './Deck'

export default class DeckList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.props.decks.map(deck => (<Deck deck={deck} 
            key={deck.name} 
            showCards={() => this.props.showCardsHandler(deck)}
            colors={randomCombination()}
            showCheckBox={this.props.showCheckBox}
            checkBoxPress={this.props.deleteCheckBoxOnPress}
            />))}
        </ScrollView>
      </View>
    )
  }
}

function randomCombination() {
  return gradientCombinations[Math.floor(Math.random() * gradientCombinations.length)];
}

const gradientCombinations = [
  ['#0F2027', '#203A43', '#2C5364'],
  ['#000000', '#0f9b0f'],
  ['#EB5757', '#000000'],
  ['#C33764', '#1D2671'],
  ['#1D4350', '#A43931'],
  ['#1e3c72', '#2a5298'],
  ['#360033', '#0b8793'],
  ['#780206', '#061161']
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})