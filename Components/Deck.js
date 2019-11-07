import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  Dimensions
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default class Deck extends Component {
  render () {
    return(
      <TouchableOpacity onPress={() => this.props.showCards(this.props.deck)}>
        <LinearGradient 
          colors={this.props.colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.deck}>
          <Text style={styles.deckText}>{this.props.deck.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: '#2604bf',
    padding: 5,
    height: (Dimensions.get('window').height / 3),
    width: Dimensions.get('window').width
  },
  deckText: {
    color: 'red',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24
  }
});