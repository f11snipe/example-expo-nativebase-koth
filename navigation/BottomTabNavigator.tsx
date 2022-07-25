/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from 'react';
// import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
// import { ColorSchemeName, Pressable } from 'react-native';
import { Colors } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
import { PlayerStatsScreen, GameStatsScreen } from '../screens';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Players"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Players"
        component={PlayerStatsScreen}
        options={{
          title: 'Players',
          tabBarIcon: ({ color }) => <Icon as={FontAwesome5} name={'user'} color={'violet.600'} size={'sm'} mr={2} />,
          headerRight: () => <Icon as={FontAwesome5} name={'user'} color={'violet.600'} size={'lg'} mr={4} />,
        }}
      />
      <BottomTab.Screen
        name="Games"
        component={GameStatsScreen}
        options={{
          title: 'Games',
          tabBarIcon: ({ color }) => <Icon as={FontAwesome5} name={'chart-line'} color={'amber.600'} size={'sm'} mr={2} />,
          headerRight: () => <Icon as={FontAwesome5} name={'chart-line'} color={'amber.600'} size={'lg'} mr={4} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
