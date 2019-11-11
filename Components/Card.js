import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Button, 
  Animated,
  ToolbarAndroid
} from 'react-native'
import AddCard from './AddCard'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCardBack: false,
      incorrectCards: [],
      correctCards: [],
      currentCards: props.cards,
      showCards: true,
      startTime: 0,
      endTime: 0
    }
  }
  

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });
  }

  componentWillMount() {
    this.manageFlipAnimation();
    this.populateTimeOnCards();
  }

  populateTimeOnCards() {
    cards = [];
    this.state.currentCards.map(card => {
      let newCard = { front: card.front, back: card.back, time: 0};
      cards.push(newCard);
    });

    this.setState({
      currentCards: cards
    });
  }

  manageFlipAnimation() {
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

    let card = this.state.currentCards[0];
    card.time = (new Date() - this.state.startTime) / 1000;
    let newCorrectCards = [...this.state.correctCards, card];
    newCorrectCards.sort((a, b) => (a.time > b.time) ? 1 : -1);

    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1);

    this.setState({
      correctCards: newCorrectCards,
      currentCards: newCurrentCards,
      startTime: new Date()
    })
  }

  incorrectCard() {
    if (this.state.showCardBack === true) {
      this.flipCard();
    }

    let card = this.state.currentCards[0];
    card.time = (new Date() - this.state.startTime) / 1000;
    let newIncorrectCards = [...this.state.incorrectCards, card];
    newIncorrectCards.sort((a, b) => (a.time < b.time) ? 1 : -1);

    let newCurrentCards = [...this.state.currentCards];
    newCurrentCards.splice(0, 1);

    this.setState({
      incorrectCards: newIncorrectCards,
      currentCards: newCurrentCards,
      startTime: new Date()
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

  addCard = newCard => {
    this.setState(prev => ({currentCards: [newCard, ...prev.currentCards], showCards: true}))
  }

  toggleCards = () => {
    this.setState(prev => ({showCards: !prev.showCards}));
  }

  onActionSelected = position => {
    switch (position) {
      case 0:
        this.correctCard();
        break;
      case 1:
        this.incorrectCard();
        break;
      case 2:
        this.deleteCard();
        break;
      case 3:
        this.resetCurrentDeck();
        break;
      case 4:
        this.toggleCards();
        break;
    }
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
        {this.state.showCards ?
          <View>
            <View>
              <ToolbarAndroid style={styles.toolbar}
                title="Flashy"
                titleColor="white"
                onActionSelected={this.onActionSelected}
                actions={toolBarActions}>
              </ToolbarAndroid>
            </View>
            <View style={styles.cardContainer}>
              <TouchableOpacity onPress={() => this.flipCard()}>
                <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                  <Text style={styles.cardText}>{this.getCardText()}</Text>
                </Animated.View>
                <Animated.View style={[styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                  <Text style={styles.cardText}>{this.getCardText()}</Text>
                </Animated.View>
              </TouchableOpacity>          
            </View>
          </View> : 
          <View>
            <AddCard onSubmit={this.addCard}/>
          </View>
        }
      </View>
    )
  }
}


const toolBarActions = [
  {
    title: 'Correct',
    show: 'always',
    icon: require('./../assets/check-mark.png')
  },
  {
    title: 'Wrong',
    show: 'always',
    icon: require('./../assets/cancel-button.png')
  },
  {
    title: 'Delete',
    show: 'always',
    icon: require('./../assets/delete-button.png')
  },
  {
    title: 'Reset',
    show: 'always',
    icon: require('./../assets/reset-icon.png')
  },
  {
    title: 'New card',
    show: 'always',
    icon: require('./../assets/add-circular-outlined-button.png')
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  flipCard: {
    backgroundColor: '#1d951f',
    height: 460,
    width: 290,
    textAlignVertical: 'center',
    textAlign: 'center',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 3
  },
  flipCardBack: {
    justifyContent: 'center',
    backgroundColor: '#e0765c',
    position: 'absolute',
    height: 460,
    width: 290,
    top: 0,
    borderRadius: 50,
    borderWidth: 3
  },
  cardText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'monospace',
    color: 'white',
    fontSize: 16
  },
  buttons: {
    flex: 1
  },
  actionButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 0,
    alignItems: 'center'
  },
  toolbar: {
    backgroundColor: '#00bbff',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
    zIndex: 20
  },
  cardContainer: {
    alignItems: 'center', 
    top: 75
  }
})