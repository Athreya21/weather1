import * as React from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import {shouldUseActivityState} from 'react-native-screens';

export const SearchScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState('Check Input');
  const [data, setData] = useState({});
  //   weather: [
  //     {
  //       description: 'Broken Clouds',
  //       icon: '04d',
  //     },
  //   ],
  //   main: {
  //     temp: 0,
  //     temp_min: 0,
  //     temp_max: 0,
  //     humidity: 0,
  //   },
  //   visibility: 0,
  //   wind: {
  //     speed: 0,
  //   },
  //   sys: {
  //     country: '',
  //   },
  //   city: '',
  //   id: 0,
  // });
  //let apiKey = 'dc7674b4bddf726f1181451f4b69886a';

  // const ApiCall = (location) => {
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => setData(json))

  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));

  //   console.log(data, 'Data');
  //   return (
  //     <View style={{flex: 1, padding: 24}}>
  //       {isLoading ? (
  //         <ActivityIndicator />
  //       ) : (

  // /* <View>
  //           <TextInput
  //             style={styles.search}
  //             placeholder="Search City"
  //             onChangeText={(city) => setCity(city)}
  //           />
  //         </View> */

  //       )}
  //     </View>
  //   );
  // };
  const Pressed = (cityname) => {
    if (cityname.keyCode === 13) {
      console.log('enter');
      listClick(location);
    }
  };
  const listClick = async (cityname) => {
    //setCity(cityname);
    console.log('city', cityname);
    console.log('findCity');

    // eslint-disable-next-line no-undef
    await AsyncStorage.setItem('newcity', cityname);
    navigation.navigate('HomeScreen', {city: cityname});
  };
  return (
    <ImageBackground
      style={styles.image}
      source={require('./background_android.png')}>
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
            placeholder="Search for City"
            onChangeText={(text) => setLocation(text)}
            url={location}
            onSubmitEditing={() => {
              listClick(location);
            }}
          />
          {/* <View style={styles.Submit}>
            <Button
              //style={styles.Button}
              //onPress={() => ApiCall(location)}
              //onPress={() => navigation.navigate('HomeScreen', {loc: location})}
              onPress={() => listClick(location)}
              title="submit"
            />
          </View> */}
        </View>
      </View>

      <View style={styles.Box}>
        <Text style={styles.text}>{location}</Text>
        <Text style={styles.text}>{data.name}</Text>
        <Text style={styles.text}>{data && data?.main?.humidity}</Text>
        <Text style={styles.text}>{data && data?.main?.temp} </Text>

        {/* <Text>
          {data.name},{data.sys.country}
        </Text>
        <Text>{data.main.temp} ºc</Text>
        <Text>{data.main.humidity} %</Text>
        <Text>{data.sys.country}</Text> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  search: {
    top: 65,
    backgroundColor: '#000',
    color: '#fff',
    height: 35,
    padding: 10,
  },
  Box: {
    borderTopColor: '#002',
    borderWidth: 0.3,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 3,
    top: -190,
    resizeMode: 'cover',
  },
  Submit: {
    width: 80,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {top: 15, flexDirection: 'row', justifyContent: 'space-between'},
  backbutton: {justifyContent: 'center', marginLeft: 8},
  searchInput: {
    alignItems: 'center',
    flexDirection: 'row',
    top: -200,
    width: 360,
    height: 56,
    backgroundColor: '#fff',
  },
  //search: {color: '#292F33'},
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
