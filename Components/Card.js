import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Button, 
  Animated,
  TouchableHighlight 
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
      showCards: true
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

  addCard = newCard => {
    this.setState(prev => ({currentCards: [newCard, ...prev.currentCards]}))
  }

  toggleCards = () => {
    this.setState(prev => ({showCards: !prev.showCards}));
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
          <View style={{position: 'relative'}}>
            <TouchableOpacity onPress={() => this.flipCard()}>
              <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                <Text style={styles.cardText}>{this.getCardText()}</Text>
              </Animated.View>
              <Animated.View style={[styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                <Text style={styles.cardText}>{this.getCardText()}</Text>
              </Animated.View>
            </TouchableOpacity>
            <View>
              <TouchableHighlight style={styles.addButton}
                  underlayColor='#ff7043' onPress={()=>{console.log('pressed')}}>
                  <Text style={{fontSize: 50, color: 'white'}}>+</Text>
              </TouchableHighlight>
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

        /*{this.state.showCards === true && (
          <View>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.flipCard()}>
                <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                  <Text style={styles.cardText}>{this.getCardText()}</Text>
                </Animated.View>
                <Animated.View style={[styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                  <Text style={styles.cardText}>{this.getCardText()}</Text>
                </Animated.View>
              </TouchableOpacity>
              <ActionButtons/>
            </View>
          </View>
        )}
        {this.state.showCards === false && (
          <View>
            <AddCard onSubmit={this.addCard}/>
          </View>
        )}*/

          /*<Buttons correctCard={() => this.correctCard()}
            incorrectCard={() => this.incorrectCard()}
            resetDeck={() => this.resetCurrentDeck()}
            deleteCard={() => this.deleteCard()}
            toggleCards={() => this.toggleCards()}/>*/

const ActionButtons = props => (
  <View style={styles.actionButtons}>
    <ActionButton buttonColor="rgba(231,76,60,1)">
      <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
        <Icon name="md-create" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
        <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
        <Icon name="md-done-all" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  </View>
)

const Buttons = props => (
  <View style={styles.buttons}>
    <Button title="correct" onPress={() => props.correctCard()}/>
    <Button title="wrong" onPress={() => props.incorrectCard()}/>
    <Button title="delete" onPress={() => props.deleteCard()}/>
    <Button title="reset" onPress={() => props.resetDeck()}/>
    <Button title="new card" onPress={() => props.toggleCards()}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
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
  },
  actionButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 0,
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    left: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    zIndex: 10
  }
})