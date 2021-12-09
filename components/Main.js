import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {fetchUser} from '../redux/actions/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './main/Home'
import PersonalScreen from './main/PersonalScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        
        return (
            <Tab.Navigator initialRouteName="Home" labeled={false}>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    )
                }} />
                <Tab.Screen name="Informations" component={PersonalScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account-details" color={color} size={26}/>
                    )
                }} /> 
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);
