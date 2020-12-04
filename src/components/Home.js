import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Buyer, Seller } from '../index';
import { Context } from '../../context';

const Tab = createBottomTabNavigator();

export default function Home() {
  const {
    context: {
      state: { user },
    },
  } = useContext(Context);

  if(user.isBuyer) {
    return <Buyer />
  } else {
    return <Seller/>
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'md-home';
          } else if (route.name === 'Orders') {
            iconName = 'md-list';
          } else if (route.name === 'Notifications') {
            iconName = 'md-notifications';
          } else if (route.name === 'Settings') {
            iconName = 'md-settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3FA578',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen component={Dashboard} name="Dashboard"></Tab.Screen>
      <Tab.Screen component={Orders} name="Orders"></Tab.Screen>
      <Tab.Screen component={Notifications} name="Notifications"></Tab.Screen>
      <Tab.Screen component={Settings} name="Settings"></Tab.Screen>
    </Tab.Navigator>
  );
}
