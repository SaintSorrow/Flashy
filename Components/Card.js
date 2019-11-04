import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'

export default class Card extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() => this.props.flipCard()}>
          {this.props.showCardBack === true && (
            <Text style={styles.cardText}>{this.props.cards[this.props.idx].back}</Text>
          )}
          {this.props.showCardBack === false && (
            <Text style={styles.cardText}>{this.props.cards[this.props.idx].front}</Text>
          )}
        </TouchableOpacity>
        <Buttons correctCard={() => this.props.correctCardHandler()}
          incorrectCard={() => this.props.incorrectCardHandler()}
        />
      </View>
    )
  }
}

const Buttons = props => (
  <View style={styles.buttons}>
    <Button title="correct" onPress={() => props.correctCard()}/>
    <Button title="wrong" onPress={() => props.incorrectCard()}/>
    <Button title="delete"/>
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