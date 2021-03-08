/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import {
  Button,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableOpacityBase,
} from 'react-native';
import {App} from '../App';
import {RecentSearchScreen} from './recentSearchScreen';
import {FavouriteScreen} from './favouriteScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchScreen} from './ApiScreen';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {GetDateAndTime} from './Time';

//const Drawer = createDrawerNavigator();
// const storeUserData = async (favouriteList) => {
//   try {
//     await AsyncStorage.setItem('userData', JSON.stringify(favouriteList));
//     console.log({favouriteList});
//   } catch (error) {
//     //console.log(error);
//   }
// };
// export {storeUserData};
export function HomeScreen({navigation}) {
  let apiKey = '9b45508c8b5da35b670a6cfc0424d54c';
  //const {loc} = route.params || 'Shimoga';
  //to fetch data from api Search from apiScreen [Start]
  const [isLoading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);
  const [data, setData] = useState({});
  const [temp, setTemp] = useState(data?.main?.temp);
  const [flag, setFlag] = useState(true);
  const [pressed, setPressed] = useState(true);
  const [SelectedCity, setSelectedCity] = useState('hubli');
  const isFocused = useIsFocused();
  const [favouriteList, setFavouriteList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [query, setQuery] = useState('');
  let favourites = [];
  const [token, setToken] = useState('C');
  //toggle the favourite
  const toggle = (flag) => {
    if (flag) {
      return setFlag(false);
    }
    return setFlag(true);
  };
  const changeText = () => {
    if (flag) {
      return <Text style={styles.text_favourite}>Add to favourite</Text>;
    } else {
      return (
        <Text style={styles.text_favourite_active}>Added to favourite</Text>
      );
    }
  };
  //Async
  //toget deleted city
  // const getDeletedCity = async () => {
  //   try {
  //     await AsyncStorage.getItem('userData2').then((deletedData) =>
  //       setFavouriteList(deletedData),
  //     );
  //     console.log(favouriteList);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   //console.log(getSelectedCity());
  //   getDeletedCity();
  // }, []);

  //to get selected city
  const getSelectedCity = async () => {
    try {
      await AsyncStorage.getItem('newcity').then((cityName) => {
        if (cityName !== null) {
          setSelectedCity(cityName);
          setFlag(true);
        }
        console.log('cityname', cityName);
      });
      // if (cityName !== null) {
      // setSelectedCity(cityName);
      // }
      // console.log('cityname', cityName);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    //console.log(getSelectedCity());
    getSelectedCity();
  }, [isFocused]);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${SelectedCity}&appid=${apiKey}&units=metric`;
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      //.then((data)=>setSearch(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [url]);
  //[End]
  // useEffect(() => {
  //   setSearchList((searchList) => [...searchList, data]);
  // }, [data]);
  function toCelsius(fahrenheit) {
    if (pressed === true) {
      setToken('C');
      return Math.round(fahrenheit);
    }
    let r1 = ((fahrenheit - 32) * 5) / 9;
    //r1 = (0 + r1).slice(-2);
    setTemp(Math.round(r1));
    setToken('C');
    //setFlag(true);
    return temp;
  }
  function toFahrenheit(celsius) {
    let r2 = (celsius * 9) / 5 + 32;
    setTemp(Math.round(r2));
    setToken(' F');
    return temp;
  }
  //on Remove all
  // React.useEffect(() => {
  //   (async () => {
  //     let deleteAllData = await AsyncStorage.getItem('userData');
  //     let deleteList = JSON.parse(deleteAllData);
  //     setFavouriteList(deleteList);
  //   })();
  // }, []);
  //
  const sendFavourites = async (params) => {
    console.log('sending');
    // storeUserData(favouriteList);
    // setFavouriteList((favouriteList) => [...favouriteList, data]);
    if (flag) {
      setFavouriteList((favouriteList) =>
        favouriteList.concat({
          name: data.name,
          // temp: data && data?.main?.temp,
          unit: token,
          temp: temp,
          desc: data && data?.weather[0].description,
          icon: data.weather[0].icon1,
        }),
      );

      try {
        await AsyncStorage.setItem('userData2', JSON.stringify(favouriteList));
        console.log('display');
        console.log(favouriteList);
      } catch (error) {
        //console.log(error);
      }
    } else {
      return;
    }
  };

  //   const icon = wInfo.weather[0].icon; // For instance "09d"
  // <Image source={{ uri: ``http://openweathermap.org/img/w/${icon}.png`` }} />
  const icon1 =
    //data.weather[0].icon;
    data && data?.weather && data?.weather[0] && data?.weather[0]?.icon; // For instance "09d"
  //const icon1 = data.weather[0].icon; // For instance "09d"
  let iconUrl = 'http://openweathermap.org/img/w/' + icon1 + '.png';
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('./background_android.png')}>
        <View style={styles.header}>
          <View style={styles.top1}>
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Image
                style={styles.menu}
                source={require('./icon_menu_white.png')}
                title="menu"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.topLogo}>
            <Image
              style={styles.logo}
              source={require('./logo_splash.png')}
              title="logo"
            />
          </View>
          <View style={styles.top2}>
            <TouchableOpacity onPress={() => navigation.navigate(SearchScreen)}>
              <Image
                style={styles.search}
                source={require('./icon_search_white.png')}
                title="search"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.secondBox}>
            <GetDateAndTime />
            {/* <Text style={styles.lightText}>Wed,17 Feb 2021 6:35PM</Text> */}
          </View>
          <View style={styles.thirdBox}>
            <Text style={styles.text}>{data.name}</Text>
          </View>
          <View style={styles.fourthBox}>
            <TouchableOpacity
              onPress={() => {
                setToken('C');
                toggle(flag);
                changeText(flag);
                sendFavourites();
              }}>
              {console.log(data.name)}
              <Image
                source={
                  flag
                    ? require('./icon_favourite.png')
                    : require('./icon_favourite_active.png')
                }
                style={styles.favourite}
              />
            </TouchableOpacity>
            <View />
            <Text style={styles.addTofav}>
              {changeText(flag)}
              {/* {sendFavourites()} */}
            </Text>
            {/* <Text style={styles.text_favourite}>Add to favourite</Text> */}
          </View>
          <View style={styles.fifthBox}>
            <View style={styles.icon}>
              <Image
                style={styles.bigIcon}
                source={{
                  uri: 'http://openweathermap.org/img/w/' + icon1 + '.png',
                }}
              />
              {/* <Text style={styles.bigIcon}>
                {data &&
                  data?.weather &&
                  data?.weather[0] &&
                  data?.weather[0]?.icon}
              </Text> */}
            </View>
            <View style={styles.detail}>
              <View style={styles.bigText}>
                {console.log(data)}
                {console.log(data?.main?.temp)}
                <Text style={styles.BigText}>{temp}</Text>
              </View>
              <View style={styles.rectangle1}>
                <TouchableOpacity
                  onPress={() => {
                    setPressed(true);
                    toCelsius(temp);
                  }}>
                  <View style={pressed ? styles.box1 : styles.box2}>
                    <View style={styles.placedUp}>
                      <Text style={pressed ? styles.text1 : styles.text2}>
                        o
                      </Text>
                    </View>
                    <Text style={pressed ? styles.text1 : styles.text2}>C</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPressed(false);
                    toFahrenheit(data && data?.main?.temp);
                  }}>
                  <View style={pressed ? styles.box2 : styles.box1}>
                    <View style={styles.placedUp}>
                      <Text style={pressed ? styles.text2 : styles.text1}>
                        o
                      </Text>
                    </View>
                    <Text style={pressed ? styles.text2 : styles.text1}>F</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.report}>
              <Text style={styles.text}>
                {data &&
                  data?.weather &&
                  data?.weather[0] &&
                  data?.weather[0]?.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rectangle}>
          <ScrollView horizontal={true}>
            <View style={styles.bottomBox}>
              <View style={styles.Min_Max}>
                <Image
                  style={styles.temp}
                  source={require('./icon_temperature_info.png')}
                  title="temp"
                />
                <Text style={styles.text_favourite}> Min - Max</Text>
              </View>
              <View style={styles.range}>
                <View style={styles.First}>
                  <Text style={styles.bottomtext}>
                    {Math.floor(data && data?.main?.temp && temp)}
                  </Text>
                  <Text style={styles.degree}>o</Text>
                </View>
                <View style={styles.btw}>
                  <Text style={styles.bottomtext}>-</Text>
                </View>
                <View style={styles.Second}>
                  <Text style={styles.bottomtext}>
                    {Math.floor(data && data?.main?.temp && temp)}
                  </Text>
                  <Text style={styles.degreeCopy}>o</Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomBox}>
              <View style={styles.Precipitation}>
                <Image
                  style={styles.precipitation}
                  source={require('./icon_precipitation_info.png')}
                  title="precipitation"
                />
                <Text style={styles.text_favourite}> Precipitation</Text>
              </View>
              <Text style={styles.bottomtext}>5%</Text>
            </View>
            <View style={styles.bottomBox}>
              <View style={styles.Humidity}>
                <Image
                  style={styles.humidity}
                  source={require('./icon_humidity_info.png')}
                  title="humidity"
                />
                <Text style={styles.text_favourite}> Humidity</Text>
              </View>
              <Text style={styles.bottomtext}>
                {data && data?.main?.humidity}%
              </Text>
            </View>
            <View style={styles.bottomBox}>
              <View style={styles.Humidity}>
                <Image
                  style={styles.precipitation}
                  source={require('./icon_precipitation_info.png')}
                  title="precipitation"
                />
                <Text style={styles.text_favourite}> Precipitation</Text>
              </View>
              <Text style={styles.bottomtext}>7%</Text>
            </View>
            <View style={styles.bottomBox}>
              <View style={styles.Humidity}>
                <Image
                  style={styles.humidity}
                  source={require('./icon_humidity_info.png')}
                  title="humidity"
                />
                <Text style={styles.text_favourite}> Humidity</Text>
              </View>
              <Text style={styles.bottomtext}>47%</Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
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
    //justifyContent: 'space-between',
    //alignItems: 'center',
    top: -70,
    left: 0,
  },
  top1: {
    //position: 'absolute',
    // top: 40,
    marginLeft: 16,
  },
  menu: {
    width: 18,
    height: 18,
  },
  topLogo: {
    //position: 'absolute',
    // top: 0,
    left: 32,
  },
  logo: {
    width: 113,
    height: 24,
  },
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
  secondBox: {
    alignItems: 'center',
    top: -130,
  },
  lightText: {
    width: 220,
    height: 15,
    opacity: 0.6,
    color: '#FFFFFF',
    fontSize: 13,
    letterSpacing: 1.5,
    lineHeight: 15,
    textAlign: 'center',
  },
  thirdBox: {alignItems: 'center', top: -75},
  text: {
    width: 178,
    height: 21,
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  reportText: {
    width: 178,
    height: 21,
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 21,
    // textAlign: 'center',
    textTransform: 'capitalize',
  },

  top2: {
    //position: 'absolute',
    // top: 40,
    right: -130,
  },
  search: {
    width: 20,
    height: 20,
  },
  Degree: {flex: 1, flexDirection: 'row', top: 18},
  degree: {
    marginTop: 18,
    marginLeft: -118,
    height: 13,
    width: 7,
    color: '#FFFFFF',
    fontSize: 11,
    letterSpacing: 0,
    lineHeight: 13,
  },
  degreeCopy: {
    marginTop: 18,
    marginLeft: -118,
    //paddingLeft: 6,
    height: 13,
    width: 7,
    color: '#FFFFFF',
    fontSize: 11,
    letterSpacing: 0,
    lineHeight: 13,
  },
  //ButtonBox: {flexDirection: 'row', marginTop: 20, padding: 4},
  rectangle1: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: 100,
    borderRadius: 5,
  },
  box1: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
    //alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 26,
  },
  text1: {color: '#ff0000', top: 5},
  text2: {color: '#fff', top: 5},
  box2: {
    //backgroundColor: '#fff',
    //alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 25,
    height: 26,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#fff',
  },
  ButtonPressed: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: '#FF0000',
    width: 25,
    height: 26,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 2,
  },
  NormalButton: {
    color: '#FFF',
    flexDirection: 'row',
    width: 25,
    height: 26,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 2,
  },
  degree1: {
    marginLeft: 0,
    marginTop: 8,
    left: 2,
    height: 28,
    width: 10,
    backgroundColor: '#fff',
    color: '#FF0000',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 16,
  },
  // degreeCopy1: {
  //   //left: 80,
  //   marginTop: 8,
  //   height: 12,
  //   width: 14,
  //   color: '#FF0000',
  //   fontSize: 18,
  //   letterSpacing: 0,
  //   lineHeight: 13,
  // },
  placedUp: {top: -8},
  degree2: {
    marginLeft: 0,
    marginTop: 8,
    left: 1,
    height: 28,
    width: 10,
    color: '#FFF',
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 16,
  },
  // degreeCopy2: {
  //   //left: 80,
  //   height: 20,
  //   width: 21,
  //   color: '#FFF',
  //   fontSize: 14,
  //   letterSpacing: 0,
  //   lineHeight: 13,
  // },
  bottomtext: {
    marginLeft: 28,
    marginBottom: 10,
    top: 25,
    width: 138,
    height: 21,
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 21,
    //textAlign: 'center',
  },
  fourthBox: {
    flexDirection: 'row',
    alignContent: 'center',
    left: 95,
    top: -65,
    height: 17,
    width: 150,
  },
  favourite: {height: 18, width: 17},
  addTofav: {flexDirection: 'row', top: 0, left: 0},
  text_favourite: {
    width: 100,
    height: 20,
    color: '#FFFFFF',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 21,
    marginLeft: 2,
  },
  text_favourite_active: {
    width: 100,
    height: 20,
    color: '#FF0',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 21,
    marginLeft: 2,
  },
  fifthBox: {
    alignContent: 'center',
    left: 130,
    top: 20,
    width: 119,
    height: 175,
  },
  icon: {justifyContent: 'center', alignItems: 'center', height: 67, width: 64},
  bigIcon: {justifyContent: 'center', height: 95, width: 95},
  report: {
    left: -40,
    top: 0,
    width: 129,
    height: 175,
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'row',
    alignContent: 'center',
    left: -30,
    width: 119,
    height: 61,
  },
  bigText: {
    alignContent: 'center',
    paddingRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempUnit: {
    flexDirection: 'row',
    top: 20,
    width: 56,
    height: 30,
    color: '#FFF',
  },
  Unit1: {backgroundColor: '#fff', padding: 10, color: '#FF0000'},
  unit1: {flexDirection: 'row', height: 19, width: 6},
  Unit2: {padding: 10},
  unit2: {flexDirection: 'row', height: 19, width: 6},
  // ºC: {backgroundColor: '#fff'},
  //C: {textAlign: 'center', padding: 4, backgroundColor: '#FFF'},
  // F: {textAlign: 'center', padding: 4, color: '#FFF'},
  BigText: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 61,
    width: 60,
    color: '#FFF',
    fontSize: 52,
    letterSpacing: 0,
    lineHeight: 61,
  },
  body: {
    justifyContent: 'space-between',
    alignContent: 'center',
    top: 50,
  },
  rectangle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    // position: 'absolute',
    top: 110,
    left: 0,
    height: 100,
    width: 360,
    backgroundColor: 'rgba(255,255,255,.1)',
  },
  bottomBox: {
    //justifyContent: 'space-between',
    //alignContent: 'center',
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    width: 110,
    height: 30,
  },
  BottomText: {
    alignContent: 'center',
    //padding: 20,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 15,
    color: '#FFFFFF',
  },
  temp: {
    // position: 'absolute',
    bottom: -6,
    // left: 145,
    height: 26,
    width: 13,
    marginRight: 10,
    paddingRight: 15,
  },
  Min_Max: {flex: 1, flexDirection: 'row', alignContent: 'center'},
  range: {flexDirection: 'row'},
  First: {flexDirection: 'row'},
  btw: {
    flexDirection: 'row',
    marginLeft: -28,
    fontSize: 10,
    height: 5,
    width: 5,
    color: '#FFF',
  },
  Second: {flexDirection: 'row', marginLeft: 5},
  Precipitation: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  precipitation: {
    //position: 'absolute',
    bottom: -6,
    marginRight: 10,
    marginLeft: -8,
    height: 23,
    width: 24,
  },
  Humidity: {flex: 1, flexDirection: 'row', alignContent: 'center'},
  humidity: {
    // position: 'absolute',
    bottom: -6,
    // left: 80,
    marginRight: 10,
    marginLeft: -5,
    height: 23,
    width: 18,
  },
});
