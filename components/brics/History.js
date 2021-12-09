import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text, SafeAreaView, FlatList } from 'react-native';
import firebase from 'firebase';
import { ListItem, Divider} from 'react-native-elements';
import { addHistory, getHistories} from '../api/HistoriesApi';

class History extends Component {
    colors = [ "red", "black", "green", "orange", "yellow", "purple", "white", "brown"]

    state = {
      historyList: [],
      currentHistoryItem: '',
    }

    onHistoryAdded = (history) =>{
      console.log("History added");
      console.log(history)
      this.componentDidMount();
    }

    onHistoryReceived = (historyList) => {
      console.log(historyList);
      this.setState(prevState => ({
        historyList: prevState.historyList = historyList
      }));
    }

    componentDidMount() {
      getHistories(this.onHistoryReceived);
    }
      
    
      
    
      render() {
        return (
          <SafeAreaView>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Add history"
                value={this.state.currentHistoryItem}
                onChangeText={(text) => this.setState(prevState => ({
                  currentHistoryItem: prevState.currentHistoryItem = text
                }))}
              />
              <Button 
                title='Add' 
                style={styles.button}
                onPress={() => 
                addHistory({
                    name: this.state.currentHistoryItem,
                    color: this.colors[Math.floor(Math.random() * this.colors.length)]
                },
                this.onHistoryAdded
                )
                
                }              
                 
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Your histories</Text>
            </View>
            
            <FlatList 
              data={this.state.historyList}
              
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

export default History
