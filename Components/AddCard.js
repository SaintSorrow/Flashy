import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput,
  ToolbarAndroid,
  TouchableOpacity,
  Text
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity 
              disabled={!this.state.isValid}
              onPress={this.handleSubmit}>
              <Text style={styles.button}>
                ADD CARD
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
  }
})