import * as React from 'react';
import {Image, StyleSheet, ImageBackground} from 'react-native';

export function SplashScreen({navigation}) {
  return (
    <ImageBackground>
      <Image style={styles.logo} source={require('./logo_splash.png')} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
