import * as React from 'react';
import {useState} from 'react/cjs/react.development';
import {Alert} from 'react-native';
import {Blank} from './Blank';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AlertFunction = () => {
  const [empty, setEmpty] = useState(false);

  const clearAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      //await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing app data.');
    }
  };
  console.log('hi');
  Alert.alert('Are you sure want to remove the  search list?', '', [
    {text: 'No', style: 'cancel', onPress: () => console.log('no')},
    {
      text: 'Yes',
      onPress: () => {
        console.log('yes');
        Blank();
        //fetchToRemoveAllContent();
        clearAppData();
        //setFavArray([]);
        setEmpty(true);
      },
    },
  ]);
};
