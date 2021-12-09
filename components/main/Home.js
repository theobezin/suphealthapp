import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import firebase from 'firebase';

class Home extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          
          isLoading: true
        };
      }

      componentDidMount() {
        const dbRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        dbRef.get().then((res) => {
          if (res.exists) {
            const user = res.data();
            this.setState({
              
              name: user.name,
              isLoading: false
            });
          } else {
            firebase.auth().signOut()
            console.log("Document does not exist!");
          }
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
              <Text style={styles.title}>Welcome, {this.state.name} </Text>
          </View>
          <View>
              <Text style={styles.subtitle}>Access your medical record </Text>
          </View>
          <View style={styles.buttonList}>
          <Button style={styles.button}
            title='Patient informations'
            onPress={() => {
                this.props.navigation.navigate('PatientInformations')}}
              
            color="#5c2f00"
          />
          
          </View>
          <View style={styles.buttonList}>
          <Button style={styles.button}
            title='History'
            onPress={() => {
                this.props.navigation.navigate('History')}}
              
            color="#5e00d1"
          />
          </View>
          <View style={styles.buttonList}>
          <Button style={styles.button}
            title='Allergies'
            onPress={() => {
                this.props.navigation.navigate('Allergies')}}
              
            color="#8c8c8c"
          />
          </View>
          <View style={styles.buttonList}>
          <Button style={styles.button}
            title='Results'
            onPress={() => {
                this.props.navigation.navigate('Results')}}
              
            color="#ff6040"
          />
          </View>
          <View style={styles.buttonList}>
          <Button style={styles.button}
            title='Treatment'
            onPress={() => {
                this.props.navigation.navigate('Treatment')}}
              
            color="#0f87ff"
          />
          </View>
          <View style={styles.usefulInfos}>
              <Text style={styles.subtitle}>Useful informations </Text>
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
      fontSize: 25,
      fontWeight:'bold',
      marginBottom: 20,
      
    },
    subtitle: {
        fontSize: 18,
        fontWeight:'bold',
        marginBottom: 20,
        color: '#616161',
      },
    usefulInfos: {
        marginTop: 10,
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
    buttonList: {
      marginBottom: 7, 
      
      
    },
    button: {
        borderRadius: 10,
        
    }
  })

export default Home;