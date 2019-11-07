import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Button, 
  Text, 
  TextInput,
  ToolbarAndroid,
  StatusBar,
  TouchableOpacity
} from 'react-native';

export default class AddDeck extends Component {

  state = {
    name: '',
    isValid: false,
    cards: []
  }

  handleNameChange = name => {
    this.setState({name: name}, this.validateForm)
  }

  validateForm = () => {
    const validForm = (this.state.name.length >= 6);
    this.setState({isValid: validForm});
  }

  handleSubmit = () => {
    this.props.onSubmit({name: this.state.name, cards: []})
  }

  render () {
    return(
      <View style={styles.container}>
        <View>
          <ToolbarAndroid style={styles.toolbar}
            title="Flashy"
            titleColor="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            maxLength={30}
            placeholder='Deck name'
            style={styles.input}
            value={this.state.name}
            onChangeText={this.handleNameChange}/>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              disabled={!this.state.isValid}
              onPress={this.handleSubmit}>
              <Text style={styles.button}>
                ADD DECK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    margin: 20,
    borderRadius: 10,
    color: 'white'
  },
  toolbar: {
    backgroundColor: '#00bbff',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
    zIndex: 20
  },
  container: {
    flex: 1,
    width: '100%'
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#00bbff',
    width: 250,
    justifyContent: 'center',
    borderRadius: 10
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    bottom: 150
  }
})