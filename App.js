import { StatusBar } from 'expo-status-bar';
import React, { Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import firebase from 'firebase'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';
import MainScreen from './components/Main';
import PatientInformationsScreen from './components/brics/PatientInformations';
import HistoryScreen from './components/brics/History';
import AllergiesScreen from './components/brics/Allergies';
import ResultsScreen from './components/brics/Results';
import TreatmentScreen from './components/brics/Treatment';

const store = createStore(rootReducer, applyMiddleware(thunk))

var firebaseConfig = {
  apiKey: "AIzaSyAssYa-gk1GF4IGjcbxxxZCR3sjKzF8jVc",
  authDomain: "suphealthapp.firebaseapp.com",
  projectId: "suphealthapp",
  storageBucket: "suphealthapp.appspot.com",
  messagingSenderId: "709493557430",
  appId: "1:709493557430:web:186b57c620fe21ce3c7e17",
  measurementId: "G-K3EV8ZHH1D"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


const Stack = createStackNavigator();



export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded:true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        
          <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#202020"/>
          
        </View>
        
      )
    }

    if(!loggedIn){

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing"  component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register"  component={RegisterScreen}  />
          <Stack.Screen name="Login"  component={LoginScreen}  />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options ={{ headerShown: false}} />
          <Stack.Screen name="PatientInformations" component={PatientInformationsScreen} options={{ title: 'Patient Informations' }} />
          <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
          <Stack.Screen name="Allergies" component={AllergiesScreen} options={{ title: 'Allergies' }} />
          <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results' }} />
          <Stack.Screen name="Treatment" component={TreatmentScreen} options={{ title: 'Treatment' }} />
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    )
  }
}

const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default App


