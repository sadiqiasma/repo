import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from '../Components/Favorites'
import {FontAwesome,AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Login from '../Components/Login'
import Map from '../Components/Map'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeTabs(){
  return (
      <Tab.Navigator
      initialRouteName ="Search"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Search') {
            return <FontAwesome name="search" size={size} color={color} /> ;
          } else if (route.name === 'Favoris') {
            return <AntDesign name="heart" size={size} color={color} /> ;
          } else if (route.name === 'Map') {
            return <MaterialCommunityIcons name="google-maps" size={size} color={color} /> ;
          }
        },
      })}
        tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        showLabel : false
        }}
      >
        <Tab.Screen name="Search" component={Search}/>
        <Tab.Screen name="Favoris" component={Favorites}/>
        <Tab.Screen name="Map" component={Map}/>
      </Tab.Navigator>
  )
}

class NavigationBottom extends React.Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Rechercher" component={Search}/>
          <Stack.Screen name="FilmDetail" options={{ title: 'Film detail' }} component={FilmDetail}/>
          <Stack.Screen name="Login"  component={Login}/>
          <Stack.Screen name="BottomTabs"  component={HomeTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


export default NavigationBottom