import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from 'firebase';

class PatientInformations extends Component {
    constructor() {
        super();
        this.state = {
          size: '',
          weight: '',
          isLoading: true
        };
      }
     
      componentDidMount() {
        const dbRef = firebase.firestore().collection('patientInformations').doc(firebase.auth().currentUser.uid)
        dbRef.get().then((res) => {
          if (res.exists) {
            const user = res.data();
            this.setState({
              size: user.size,
              weight: user.weight,
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
    
    
      updatePatientInformations() {
        this.setState({
          
          isLoading: true,
        });
        const updateDBRef = firebase.firestore().collection('patientInformations').doc(firebase.auth().currentUser.uid);
        updateDBRef.set({
          size: this.state.size,
          weight: this.state.weight
        }).then((docRef) => {
          this.setState({
            size: '',
            weight: '',
            
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
                  <Text style={styles.title}>Patient informations</Text>
              </View>
              <View>
                <Text style={styles.labelInput}>Size</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                    placeholder={'Size'}
                    value={this.state.size}
                    onChangeText={(val) => this.inputValueUpdate(val, 'size')}
                />
              </View>
              <View>
                <Text style={styles.labelInput}>Weight</Text>
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                    placeholder={'Weight'}
                    value={this.state.weight}
                    onChangeText={(val) => this.inputValueUpdate(val, 'weight')}
                />
              </View>
            
            <View style={styles.button}>
              <Button
                title='Update'
                onPress={() => this.updatePatientInformations()} 
                color="#19AC52"
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
      labelInput: {
        fontWeight: 'bold',
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

export default PatientInformations
