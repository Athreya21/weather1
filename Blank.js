import React from 'react';
//import React from 'react-native';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useState} from 'react/cjs/react.development';

export const Blank = () => {
  const [empty, setEmpty] = useState(true);
  if (empty) {
    return (
      <View style={styles.Blank}>
        <Image
          style={styles.Nothing}
          source={require('../Screens/icon_nothing.png')}
        />
        <Text style={styles.textEmpty}> No Favourite Added </Text>
      </View>
    );
  }
  return setEmpty(false);
};

const styles = StyleSheet.create({
  Blank: {
    alignItems: 'center',
    height: 130,
    width: 167,
    justifyContent: 'center',
  },
  Nothing: {alignItems: 'center', height: 84, width: 159, padding: 10},
  textEmpty: {
    height: 24,
    width: 180,
    color: '#FFF',
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center',
  },
});
