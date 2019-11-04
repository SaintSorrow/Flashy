import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'

export default class Card extends Component {

  getCardText() {
    let cardText = ""

    if (this.props.cards.length === 0) {
      cardText = "No cards left in the deck!";
    } else if (this.props.showCardBack === true) {
      cardText = this.props.cards[this.props.idx].back;
    } else {
      cardText = this.props.cards[this.props.idx].front;
    }

    return cardText;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() => this.props.flipCard()}>
          <Text style={styles.cardText}>{this.getCardText()}</Text>
        </TouchableOpacity>
        <Buttons correctCard={() => this.props.correctCardHandler()}
          incorrectCard={() => this.props.incorrectCardHandler()}
          resetDeck={() => this.props.resetCurrentDeckHandler()}
          deleteCard={() => this.props.deleteCardHandler()}
        />
      </View>
    )
  }
}

const Buttons = props => (
  <View style={styles.buttons}>
    <Button title="correct" onPress={() => props.correctCard()}/>
    <Button title="wrong" onPress={() => props.incorrectCard()}/>
    <Button title="delete" onPress={() => props.deleteCard()}/>
    <Button title="reset" onPress={() => props.resetDeck()}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  card: {
    backgroundColor: '#02a184',
    height: 360,
    width: 240,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  cardText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttons: {
    flex: 1
  }
})