import 'react-native-gesture-handler';
import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './homeScreen';
import {FavouriteScreen} from './favouriteScreen';
import {RecentSearchScreen} from './recentSearchScreen';
//import {SearchScreen} from './searchScreen';
import {SearchScreen} from './ApiScreen';
//import {SearchScreen1} from './ApiScreen';

const Stack = createStackNavigator();

const MainScreenNavigation = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const SearchScreenNavigation = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecentSearchScreen"
        component={RecentSearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const RecentSearchScreenNavigation = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="RecentSearchScreen">
      <Stack.Screen
        name="RecentSearchScreen"
        component={RecentSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const FavouriteScreenNavigation = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="FavouriteScreen">
      <Stack.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export {
  MainScreenNavigation,
  SearchScreenNavigation,
  RecentSearchScreenNavigation,
  FavouriteScreenNavigation,
};
// export default function Screens() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="SearchScreen"
//         component={SearchScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="RecentSearchScreen"
//         component={RecentSearchScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="FavouriteScreen"
//         component={FavouriteScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
