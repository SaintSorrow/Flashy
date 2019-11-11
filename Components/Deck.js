import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text,
  TouchableOpacity,
  Dimensions,
  CheckBox
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  checkBoxPressed = () => {
    this.setState({
      checked: !this.state.checked
    })

    this.props.checkBoxPress(this.props.deck);
  }

  render () {
    return(
      <TouchableOpacity onPress={() => this.props.showCards(this.props.deck)}>
        <LinearGradient 
          colors={this.props.colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.deck}>
          <Text style={styles.deckText}>
            {this.props.deck.name}
          </Text>
          {this.props.showCheckBox === true && (
            <CheckBox 
            style={styles.checkBox}
            onChange={this.checkBoxPressed}
            value={this.state.checked}
            />
          )}
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
  },
  checkBox: {
    position: 'absolute',
    top: 10,
    left: 10
  }
});