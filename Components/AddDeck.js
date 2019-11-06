import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TextInput} from 'react-native';

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
      <View>
        <Text>Deck name:</Text>
        <TextInput
          maxLength={30}
          placeholder='Deck name'
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />
        <Button
          title='Add deck'
          onPress={this.handleSubmit}
          disabled={!this.state.isValid}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    margin: 20
  }
})