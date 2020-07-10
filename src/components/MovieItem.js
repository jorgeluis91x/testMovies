import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Globals from '../../Globals';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Rating} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');
const cardWidth = width / 3.5;

const MovieItem = (props) => {
  const {colors} = useTheme();
  const {movie, onPressImage} = props;
  return (
    <View style={{flex: 1, marginRight: 15, width: cardWidth}}>
      <TouchableOpacity onPress={() => onPressImage(movie)}>
        <ImageBackground
          style={styles.productImage}
          imageStyle={{borderRadius: 10}}
          source={{uri: Globals.IMAGE_URL + movie.poster_path}}
        />
      </TouchableOpacity>

      <TextInput
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          height: 35,
          alignSelf: 'flex-start',
          margin: 0,
          padding: 0,
          color: colors.text,
        }}>
        {movie.title}
      </TextInput>
      <View style={{alignItems: 'flex-start'}}>
        <Rating
          tintColor={colors.background}
          readonly
          ratingCount={5}
          imageSize={12}
          startingValue={movie.vote_average / 2}
          defaultRating={5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: cardWidth,
    height: height / 5,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

export default MovieItem;
