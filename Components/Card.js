import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Button, 
  Animated 
} from 'react-native'

export default class Card extends Component {

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })

    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    })

    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  flipCardPress() {
    this.props.flipCard();
    this.flipCard();
  }

  getCardText() {
    let cardText = ""

    if (this.props.cards.length === 0) {
      cardText = "No cards left in the deck!";
    } else if (this.props.showCardBack === true) {
      cardText = this.props.cards[0].back;
    } else {
      cardText = this.props.cards[0].front;
    }

    return cardText;
  }

  correctCard() {
    if (this.props.showCardBack === true) {
      this.flipCardPress();
    }

    this.props.correctCardHandler();
  }

  incorrectCard() {
    if (this.props.showCardBack === true) {
      this.flipCardPress();
    }

    this.props.incorrectCardHandler();
  }

  resetCurrentDeck() {
    if (this.props.showCardBack === true) {
      this.flipCardPress();
    }

    this.props.resetCurrentDeckHandler();
  }

  deleteCard() {
    if (this.props.showCardBack === true) {
      this.flipCardPress();
    }

    this.props.deleteCardHandler();
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }

    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.flipCardPress()}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
            <Text style={styles.cardText}>{this.getCardText()}</Text>
          </Animated.View>
          <Animated.View style={[styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
            <Text style={styles.cardText}>{this.getCardText()}</Text>
          </Animated.View>
        </TouchableOpacity>
        <Buttons correctCard={() => this.correctCard()}
          incorrectCard={() => this.incorrectCard()}
          resetDeck={() => this.resetCurrentDeck()}
          deleteCard={() => this.deleteCard()}
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
  flipCard: {
    backgroundColor: 'blue',
    height: 360,
    width: 240,
    textAlignVertical: 'center',
    textAlign: 'center',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    height: 360,
    width: 240,
    top: 0,
  },
  cardText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttons: {
    flex: 1
  }
})