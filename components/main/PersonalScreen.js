import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from 'firebase';

class PersonalScreen extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      mobile: '',
      address: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('userInformations').doc(firebase.auth().currentUser.uid)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          address: user.address,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  onLogout() {
      firebase.auth().signOut()
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('userInformations').doc(firebase.auth().currentUser.uid);
    updateDBRef.set({
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      address: this.state.address
    }).then((docRef) => {
      this.setState({
        
        name: '',
        email: '',
        mobile: '',
        address: '',
        isLoading: false,
      });
      this.componentDidMount();
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  

  

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#202020"/>
          
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
          <View >
              <Text style={styles.title}>Your informations</Text>
          </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Mobile'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Address'}
              value={this.state.address}
              onChangeText={(val) => this.inputValueUpdate(val, 'address')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateUser()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Logout'
            onPress={() => this.onLogout()}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  title: {
    fontSize: 30,
    fontWeight:'bold',
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default PersonalScreen;