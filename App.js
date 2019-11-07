import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  BackHandler, 
  ToolbarAndroid,
  StatusBar
} from 'react-native';
import decks from './flashcards';
import DeckList from './Components/DeckList';
import Card from './Components/Card';
import AddDeck from './Components/AddDeck';

function shuffleDeck(array) {
 let m = array.length, i, t;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      showCards: false,
      decks: decks,
      currentDeck: '',
      currentDeckIdx: -1,
      showDecks: true
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  showCardsHandler = deck => {
    const decks = this.state.decks;
    const currentDeckIdx = decks.indexOf(deck);
    shuffleDeck(deck.cards)

    this.setState({
      showCards: !this.state.showCards,
      currentDeck: deck,
      currentDeckIdx: currentDeckIdx
    });
  };

  handleBackButtonClick () {
    if (this.state.showCards) {
      this.setState({
        showCards: !this.state.showCards,
      })
    }

    if (this.state.showDecks === false) {
      this.setState({
        showDecks: !this.state.showDecks
      })
    }

    return true;
  }

  toggleDecks() {
    this.setState(prev => ({showDecks: !prev.showDecks}));
  }


  addDeck = newDeck => {
    this.setState(prev => ({decks: [...prev.decks, newDeck], showDecks: true}))
  }

  onActionSelected = position => {
    if (position === 0) {
      this.toggleDecks();
    }
  }

  render() {
    return (
      <View style ={styles.container}>
        {this.state.showCards === false && this.state.showDecks === true && (
          <View>
            <View>
              <ToolbarAndroid style={styles.toolbar}
                title="Flashy"
                titleColor="white"
                onActionSelected={this.onActionSelected}
                actions={toolBarActions}>
              </ToolbarAndroid>
            </View>
            <DeckList showCardsHandler={this.showCardsHandler} decks={this.state.decks}/>
          </View>
        )}
        {this.state.showCards === false && this.state.showDecks === false && (
          <AddDeck onSubmit={this.addDeck}/>
        )}
        {this.state.showCards === true && (
          <Card cards={this.state.currentDeck.cards}/>
        )}
      </View>
    );
  }
}

const toolBarActions = [
  {
    title: 'Add deck',
    show: 'always',
    icon: require('./assets/add-circular-outlined-button.png')
  },
  {
    title: 'Delete',
    show: 'always',
    icon: require('./assets/delete-button.png')
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004e92',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: StatusBar.currentHeight
  },
  toolbar: {
    backgroundColor: '#00bbff',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
    zIndex: 20
  },
});
