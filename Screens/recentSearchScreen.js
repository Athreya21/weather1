import * as React from 'react';
import {
  Button,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from 'react-native';
import {SafeAreaView, FlatList, StatusBar} from 'react-native';
import DATA from './mockData';
import {createStackNavigator} from '@react-navigation/stack';
import weatherData from './mockData';
import {SearchScreen} from './ApiScreen';
import {FavouriteScreen} from './favouriteScreen';
import {Blank} from '../Components/Blank';
const Stack = createStackNavigator();

export function RecentSearchScreen({navigation}) {
  const Contents = () => {
    if (!empty) {
      return (
        <View>
          <View style={styles.about}>
            <Text style={styles.aboutPage}>
              {ArrayLength()} City added to favourite
            </Text>
            <TouchableOpacity onPress={() => AlertFunction()}>
              <Text style={styles.delete}>Remove All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.FavouriteStart}>
            {/* <App1 /> */}
            <View style={styles.Box}>
              <FlatList
                data={favArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <ImageBackground
      style={styles.image}
      source={require('./background_android.png')}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={styles.backbutton}
              source={require('./icons8-left-24.png')}
              title="Back"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}> Recent Search</Text>
        </View>
        <View style={styles.top2}>
          <TouchableOpacity onPress={() => navigation.navigate(SearchScreen)}>
            <Image
              style={styles.search}
              source={require('./icons8-search-30.png')}
              title="search"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* for blank */}
      <View style={styles.Blank}>
        {/* <Image style={styles.Nothing} source={require('./icon_nothing.png')} />
        <Text style={styles.textEmpty}> No Recent Search</Text> */}
        <Blank />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    //position: 'absolute',
    justifyContent: 'space-between',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 55,
    top: -170,
  },
  backbutton: {marginLeft: 10},
  top2: {marginRight: 10},
  Blank: {
    alignItems: 'center',
    height: 130,
    width: 167,
    justifyContent: 'center',
    right: -70,
  },
  Nothing: {alignItems: 'center', height: 84, width: 159, padding: 10},
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  searchInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: 360,
    height: 56,
    backgroundColor: '#FFF',
  },
  search: {flexDirection: 'row'},
  text: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 24,
    width: 180,
    color: '#292F33',
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 24,
    textShadowColor: 'rgba(0,0,0,0.15)',
  },
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
