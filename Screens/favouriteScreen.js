import * as React from 'react';
import {
  Button,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Text,
  FlatList,
} from 'react-native';
//import {AsyncStorage} from 'react-native';
import App1 from './FlatList';
import {createStackNavigator} from '@react-navigation/stack';
import DATA from './mockData';
import {SearchScreen} from './ApiScreen';
import {useState} from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {favouriteList} from './homeScreen';
const Stack = createStackNavigator();

export function FavouriteScreen({navigation}) {
  const [empty, setEmpty] = useState(false);
  const [favArray, setFavArray] = useState([]);

  const ArrayLength = () => {
    console.log(favArray.length);
    let Length = favArray.length;
    if (Length >= 0) {
      return Length;
    } else {
      setEmpty(true);
      return Blank(empty);
    }
  };
  //const [flag, setFlag] = useState(false);
  // const renderItem1 = ({item}) => (
  //   <Item name={item.area} desc={item.desc} temp={item.temperature} />
  // );
  const deleteItem = async (name) => {
    let newItem = favArray.filter((item) => item.name !== name);
    // const newItem = favArray.filter(setFavArray, index);
    storeUserData(newItem);
  };
  const storeUserData = async (toDeleteData) => {
    try {
      await AsyncStorage.setItem(
        'userData2',
        JSON.stringify(toDeleteData),
      ).then(() => setFavArray(toDeleteData));
    } catch (error) {
      //console.log(error);
    }
  };
  // on press Remove all
  // const fetchToRemoveAllContent = async () => {
  //   setFavArray([]);
  //   console.log('removed');
  //   try {
  //     await AsyncStorage.setItem(
  //       'userData',
  //       JSON.stringify(favArray),
  //     ).then(() => []);
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };
  // const deleteItem = async () => {
  //   try {
  //     // let newItem = await AsyncStorage.getItem('userData2',
  //     //       JSON.stringify(favArray),
  //     await AsyncStorage.removeItem(
  //       'userData2',
  //       JSON.stringify(favArray),
  //     ).then(() => AsyncStorage.setItem('userData2', JSON.stringify(favArray)));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const clearAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      //await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing app data.');
    }
  };
  const goToCity = async (cityname) => {
    await AsyncStorage.setItem('newcity', cityname);
    navigation.navigate('HomeScreen', {city: cityname});
  };
  // const fetchToRemoveAllContent = async () => {
  //   setFavArray([]);
  //   console.log('removed');
  //   try {
  //     await AsyncStorage.setItem(
  //       'userData2',
  //       JSON.stringify(favArray),
  //     ).then(() => );
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };
  const renderItem = ({item, index, icon}) => {
    console.log();

    const icon1 =
      item && item?.weather && item?.weather[0] && item?.weather[0]?.icon;
    return (
      <View style={styles.FavouriteStart}>
        <Item
          name={item.area}
          desc={item.desc}
          temp={item.temperature}
          icon={item.icon1}
          unit={item.unit}
        />
        <TouchableOpacity
          style={styles.Area}
          onPress={() => goToCity(item.name)}>
          <Text style={styles.area}>
            {console.log('renderring')}
            {console.log(item.icon1)}
            {item.name}
          </Text>
        </TouchableOpacity>
        {/* <Image
          source={{
            uri: 'http://openweathermap.org/img/w/' + icon1 + '.png',
          }}
          style={styles.icon}>
          {item.icon}
        </Image> */}
        <Text style={styles.temperature}>{Math.round(item.temp)}</Text>
        <Text style={styles.degree}>o</Text>
        <Text style={styles.celcius}>{item.unit}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <TouchableOpacity
          style={styles.Favourite}
          onPress={() => {
            deleteItem(item.name);
            console.log(index);
          }}>
          <Image
            source={require('./icon_favourite_active.png')}
            style={styles.favourite}
          />
        </TouchableOpacity>
      </View>
    );
  };

  //For fetching data from home screen
  // React.useEffect(() => {
  //   (async () => {
  //     let favouritesData = await AsyncStorage.getItem('userData');
  //     let Details = JSON.parse(favouritesData);
  //     //setid(Details.id);
  //     // setToken(Details.token);
  //   })();
  // }, []);
  const Header = () => {
    return (
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
          <Text style={styles.text}> Favourite </Text>
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
    );
  };
  const Header1 = () => {
    return (
      <View style={styles.header1}>
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
          <Text style={styles.text}> Favourite </Text>
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
    );
  };
  const Blank = () => {
    if (empty) {
      return (
        <View style={styles.Blank}>
          <Image
            style={styles.Nothing}
            source={require('./icon_nothing.png')}
          />
          <Text style={styles.textEmpty}> No Favourite Added </Text>
        </View>
      );
    }
    return setEmpty(false);
  };
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
  const AlertFunction = () => {
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
  // const [favArray, setFavArray] = useState([]);
  React.useEffect(() => {
    (async () => {
      let favouritesData = await AsyncStorage.getItem('userData2');
      let Details = JSON.parse(favouritesData);
      setFavArray(Details);
      setEmpty(false);
      //setId(Details.id);
      // setToken(Details.token);
    })();
  }, []);
  const Item = ({name, icon, desc, temp}) => {
    const [flag, setFlag] = useState(false);
    const toggle = (flag) => {
      if (flag) {
        return setFlag(false);
      }
      return setFlag(true);
    };

    return (
      <View style={styles.item}>
        {/* <Text style={styles.area}>
          {console.log({name})}
          {favArray && favArray?.name}
          {console.log(favArray && favArray?.name)}
        </Text> */}
        {console.log(favArray)}
      </View>
    );
  };
  if (!empty) {
    return (
      <ImageBackground
        style={styles.image}
        source={require('./background_android.png')}>
        <View>
          <Header />
          <Contents />
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        style={styles.image}
        source={require('./background_android.png')}>
        {/* for Blank */}

        <View>
          <Header1 />
          <Blank />
          {/* {setEmpty(false)} */}
        </View>
      </ImageBackground>
    );
  }
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
    top: 3,
    // bottom: 190,
  },
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 55,
    top: -169,
    // bottom: 190,
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 1,
  },
  FavouriteStart: {marginTop: -2, top: 0},
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
  search: {flexDirection: 'row', marginRight: 8},
  backbutton: {marginLeft: 8},
  about: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: -2,
    marginRight: 10,
    marginLeft: 10,
  },
  aboutPage: {color: '#fff', top: 10},
  clear: {color: '#fff', top: 30},
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
  //
  Box: {marginTop: -28, paddingBottom: 0, height: 450},
  item: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    marginVertical: 1,
    marginStart: 12,
    // marginEnd: 1,
    width: 295,
    height: 80,
    top: 30,
  },
  report: {flexDirection: 'row', width: 167, height: 23, padding: 13, top: 5},
  icon: {height: 22, width: 25, left: 20},
  temperature: {
    height: 16,
    width: 84,
    color: '#fff',
    letterSpacing: 0,
    lineHeight: 16,
    fontSize: 17,
    marginLeft: 50,
    top: 15,
  },
  degree: {width: 10, height: 16, color: '#fff', marginLeft: 77, top: -13},
  celcius: {width: 25, height: 20, color: '#fff', left: 82, top: -19},
  desc: {
    // padding: 2,
    height: 16,
    width: 160,
    color: '#fff',
    letterSpacing: 0,
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 105,
    marginTop: -56,
    top: 18,
    textTransform: 'capitalize',
  },
  Area: {marginTop: -15},
  area: {
    marginTop: -20,
    marginLeft: 20,
    //left: -30,
    height: 18,
    width: 123,
    color: '#FFE539',
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
  },
  delete: {
    marginTop: 32,
    height: 20,
    width: 75,
    color: '#fff',
    top: -25,
    padding: 2,
  },
  favourite: {
    marginLeft: 267,
    marginTop: -18,
  },
});
