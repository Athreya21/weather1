import React from 'react';
//import React from 'react-native';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useState} from 'react/cjs/react.development';

export const Contents = () => {
  const [empty, setEmpty] = useState(true);
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

const styles = StyleSheet.create({});
