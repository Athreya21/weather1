import * as React from 'react';
import {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from 'react-native';
import {ApiCall} from './ApiScreen';

export function SearchScreen1({navigation}) {
  const [City, setCity] = useState('');
  return (
    <ImageBackground
      style={styles.image}
      source={require('./background_android.png')}>
      {/* <View style={styles.container}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View> */}
      <View style={styles.header}>
        <View style={styles.searchInput} title="Search" placeholder=" Search">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backbutton}
              source={require('./icons8-left-24.png')}
              title="Back"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.text}
            placeholder=" Search for cities"
            //onChangeText={() => setCity(City)}
            onKeyPress={() => ApiCall}
            // onSubmitEditing={() => ApiCall}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {flexDirection: 'row'},
  backbutton: {justifyContent: 'center'},
  searchInput: {
    alignItems: 'center',
    flexDirection: 'row',
    top: -230,
    width: 360,
    height: 56,
    backgroundColor: '#fff',
  },
  search: {color: '#292F33'},
  text: {
    justifyContent: 'center',
    padding: -15,
    paddingLeft: 15,
    height: 24,
    width: 204,
    color: '#000',
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 24,
  },
});
