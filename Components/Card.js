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
  constructor(props) {
    super(props)
    this.state = {
      showCardBack: false,
      incorrectCards: [],
      correctCards: [],
      currentCards: props.cards
    }
  }
  

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

    this.setState({
      showCardBack: !this.state.showCardBack
    })
  }

  getCardText() {
    let cardText = ""

    if (this.props.cards.length === 0) {
      cardText = "No cards left in the deck!";
    } else if (this.state.showCardBack === true) {
      cardText = this.state.currentCards[0].back;
    } else {
      cardText = this.state.currentCards[0].front;
    }

    return cardText;
  }

  correctCard() {
    if (this.state.showCardBack === true) {
      this.flipCard();
    }

    const card = this.state.currentCards[0];
    const newCorrectCards = [...this.state.correctCards, card];
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1);

    this.setState({
      correctCards: newCorrectCards,
      currentCards: newCurrentCards
    })
  }

  incorrectCard() {
    if (this.state.showCardBack === true) {
      this.flipCard();
    }

    const card = this.state.currentCards[0];
    const newIncorrectCards = [...this.state.incorrectCards, card];
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1);

    this.setState({
      incorrectCards: newIncorrectCards,
      currentCards: newCurrentCards
    })
  }

  resetCurrentDeck() {
    if (this.state.showCardBack === true) {
      this.flipCard();
    }

    const newCurrentCards = [...this.state.incorrectCards, 
      ...this.state.currentCards,
      ...this.state.correctCards];

      this.setState({
        currentCards: newCurrentCards,
        incorrectCards: [],
        correctCards: []
      })
  }

  deleteCard() {
    if (this.state.showCardBack === true) {
      this.flipCard();
    }

    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1);

    this.setState({
      currentCards: newCurrentCards
    })
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
        <TouchableOpacity onPress={() => this.flipCard()}>
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
    <Button title="new card"/>
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