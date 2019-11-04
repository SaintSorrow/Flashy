import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import decks from './flashcards'
import DeckList from './Components/DeckList'
import Card from './Components/Card'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      showCards: false,
      incorrectCards: [],
      correctCards: [],
      currentCards: [],
      decks: decks,
      currentCardIdx: 0,
      showCardBack: false,
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  showCardsHandler = deck => {
    this.setState({
      showCards: !this.state.showCards,
      currentCards: deck.cards
    });
  };

  getCurrentCard() {
    const currentCard = this.state.currentCards[this.state.currentCardIdx];
    return currentCard;
  }

  correctCardHandler = () => {
    console.log("currentIdx: " + this.state.currentCardIdx)
  
    const card = this.getCurrentCard();

    console.log(card.back)
    console.log(card.front)
    console.log(card)
    console.log(this.state.correctCards)

    const correctCards = [...this.state.correctCards, card]
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(this.state.currentCardIdx, 1);

    const nextIdx = Math.floor(Math.random() * newCurrentCards.length);

    this.setState({
      correctCards: correctCards,
      currentCards: newCurrentCards,
      currentCardIdx: nextIdx,
    })
  }

  incorrectCardHandler = () => {
    const card = this.getCurrentCard();
    const newIncorrectCards = this.state.correctCards.join(card);
    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(this.state.currentCardIdx, 1)

    this.setState({
      incorrectCards: newIncorrectCards,
      currentCards: newCurrentCards
    })
  }

  handleBackButtonClick () {
    if (this.state.showCards) {
      this.setState({
        showCards: !this.state.showCards,
        showCardBack: false,
      })
    }
    return true;
  }

  flipCard = () => {
    this.setState({
      showCardBack: !this.state.showCardBack
    })
  }

  render() {
    return (
      <View style ={styles.container}>
        {this.state.showCards === false && (
          <DeckList showCardsHandler={this.showCardsHandler} decks={this.state.decks}/>
        )}
        {this.state.showCards === true && (
          <Card cards={this.state.currentCards}
            idx={this.state.currentCardIdx}
            showCardBack={this.state.showCardBack}
            flipCard={this.flipCard}
            correctCardHandler={this.correctCardHandler}
            incorrectCardHandler={this.incorrectCardHandler}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1adbb8',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
