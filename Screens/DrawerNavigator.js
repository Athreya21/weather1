import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  MainScreenNavigation,
  SearchScreenNavigation,
  RecentSearchScreenNavigation,
  FavouriteScreenNavigation,
} from './StackNavigator';

const Drawer = createDrawerNavigator();

export function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={MainScreenNavigation}
        title="Home"
      />
      {/* <Drawer.Screen
        name="Search"
        component={SearchScreenNavigation}
        title="Search"
      /> */}
      <Drawer.Screen
        name="Favourite"
        component={FavouriteScreenNavigation}
        title="Favourites"
      />

      <Drawer.Screen
        name="RecentSearch"
        component={RecentSearchScreenNavigation}
        title="RecentSearch"
      />
    </Drawer.Navigator>
  );
}
