import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text, SafeAreaView, FlatList } from 'react-native';
import firebase from 'firebase';
import { ListItem, Divider} from 'react-native-elements';
import { addAllergy, getAllergies} from '../api/AllergiesApi';

class Allergy extends Component {
    colors = [ "red", "black", "green", "orange", "yellow", "purple", "white", "brown"]

    state = {
      allergyList: [],
      currentAllergyItem: '',
    }

    onAllergyAdded = (allergy) =>{
      console.log("allergy added");
      console.log(allergy)
      this.componentDidMount();
    }

    onAllergyReceived = (allergyList) => {
      console.log(allergyList);
      this.setState(prevState => ({
        allergyList: prevState.allergyList = allergyList
      }));
    }

    componentDidMount() {
      getAllergies(this.onAllergyReceived);
    }
      
    
      
    
      render() {
        return (
          <SafeAreaView>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Add allergy"
                value={this.state.currentAllergyItem}
                onChangeText={(text) => this.setState(prevState => ({
                  currentAllergyItem: prevState.currentAllergyItem = text
                }))}
              />
              <Button 
                title='Add' 
                style={styles.button}
                onPress={() => 
                addAllergy({
                    name: this.state.currentAllergyItem,
                    color: this.colors[Math.floor(Math.random() * this.colors.length)]
                },
                this.onAllergyAdded
                )
                
                }              
                 
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Your allergies</Text>
            </View>
            
            <FlatList 
              data={this.state.allergyList}
              
              ItemSeparatorComponent={() => <Divider style={{background: 'black'}} />}
              
              renderItem = {({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              )}
            />
          </SafeAreaView>
        
        );
      }
    }
    
    const styles = StyleSheet.create({
      row:{
        flexDirection: 'row',
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'white',
      },
      container:{
        flex:1,
        padding:15,
      },
      title: {
        
        fontSize: 30,
        fontWeight:'bold',
        marginBottom: 20,
      },
      input:{
        flex:1,
        paddingLeft:16,
        fontSize: 16,
      },
      itemList:{
        flex:1,
      },
      button:{
        width: 100,
        height: 50,
        flexDirection: 'row',
      },
      item: {
        backgroundColor: '#f7f7f7',
        padding: 10,
        
      },
      title: {
        fontSize: 18,
      },
    })

export default Allergy
