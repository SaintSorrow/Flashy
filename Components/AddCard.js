import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Button, 
  TextInput,
  ToolbarAndroid
} from 'react-native';

export default class AddCard extends Component {

  state = {
    front: '',
    back: '',
    isValid: false,
  }

  validateForm = () => {
    const validForm = (this.state.back.length >= 6 
      && this.state.front.length >= 6);
      this.setState({isValid: validForm});
  }

  handleBackChange = back => {
    this.setState({back: back}, this.validateForm);
  }

  handleFrontChange = front => {
    this.setState({front: front}, this.validateForm);
  }

  handleSubmit = () => {
    this.props.onSubmit({front: this.state.front, back: this.state.back});
  }

  render() {
    return(
      <View>
        <View>
          <ToolbarAndroid style={styles.toolbar}
            title="Flashy"
            titleColor="white"/>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Question'
            value={this.state.front}
            onChangeText={this.handleFrontChange}
          />
          <TextInput
            style={styles.input}
            placeholder='Answer'
            value={this.state.back}
            onChangeText={this.handleBackChange}
          />
          <Button
            title='Add card'
            onPress={this.handleSubmit}
            disabled={!this.state.isValid}
          />
        </View>

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
  },
  toolbar: {
    backgroundColor: '#00bbff',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
    zIndex: 20
  }
})