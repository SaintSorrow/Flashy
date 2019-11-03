import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'

export default class Card extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.flipCard()}>
          {this.props.showCardBack === true && (
            <Text>{this.props.cards[this.props.idx].back}</Text>
          )}
          {this.props.showCardBack === false && (
            <Text>{this.props.cards[this.props.idx].front}</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {

  }
})