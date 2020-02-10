import React from 'react'
import { StyleSheet, Image } from 'react-native'
import {createAppContainer, StackNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import PersonnalSpace from '../Components/PersonnalSpace'
import Simulation from '../Components/Simulation'
import Help from '../Components/Help'

const MeansTabNavigator = createBottomTabNavigator({
    Me: {
        screen: PersonnalSpace,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../Images/ic_favorite.png')}
                    style={styles.icon}>
                    </Image>
            }
        }
    },
    Simulation: {
        screen: Simulation,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../Images/ic_favorite.png')}
                    style={styles.icon}>
                    </Image>
            }
        }
    },
    Help: {
        screen: Help,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../Images/ic_help.png')}
                    style={styles.icon}>
                    </Image>
            }
        }
    }
},{
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF'
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MeansTabNavigator)