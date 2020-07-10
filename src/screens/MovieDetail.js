import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Globals from '../../Globals';
import {
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {getCast, selectMovie, cleanMovieSelected} from '../actions';
import Moment from 'moment';

const {width} = Dimensions.get('screen');

const MovieDetail = ({
  route,
  navigation,
  movies,
  getCast,
  selectMovie,
  cleanMovieSelected,
}) => {
  const {colors} = useTheme();
  const {movie} = route.params;

  useEffect(() => {
    selectMovie(movie.id);
    getCast(movie.id);
  }, []);

  const renderCharacter = (character) => {
    return (
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{uri: Globals.IMAGE_URL + character.profile_path}}
        />
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 10,
            color: colors.text,
          }}>
          {character.name}
        </Text>
      </View>
    );
  };
  const renderTextFooter = (title, description) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Text
          style={{
            color: colors.text,
            fontSize: 12,
            fontWeight: 'bold',
            width: 60,
          }}>
          {title}
        </Text>
        <Text style={{color: colors.text, fontSize: 12}}> {description}</Text>
      </View>
    );
  };

  if (
    Object.keys(movies.movieSelected).length === 0 &&
    movies.movieSelected.constructor === Object
  ) {
    return null;
  } else {
    const onPressBack = () => {
      cleanMovieSelected();
      navigation.goBack();
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            style={styles.productImage}
            source={{
              uri: Globals.IMAGE_URL + movies.movieSelected.poster_path,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                marginHorizontal: 15,
              }}>
              <TouchableOpacity onPress={onPressBack}>
                <Icon
                  size={25}
                  color="#FFFFFF8C"
                  name="keyboard-backspace"
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <Icon
                size={25}
                color="#FFFFFF8C"
                name="favorite-border"
                style={{alignSelf: 'center'}}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={[styles.footer, {backgroundColor: colors.background}]}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                  fontWeight: 'bold',
                  width: '90%',
                }}>
                {movies.movieSelected.title}
              </Text>
              <Icon
                size={25}
                color="grey"
                name="movie-filter"
                style={{alignSelf: 'center'}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <TouchableHighlight style={[styles.button]}>
                <Text
                  style={{color: colors.text, fontSize: 9, fontWeight: 'bold'}}>
                  WATCH NOW
                </Text>
              </TouchableHighlight>
              <Rating
                type="custom"
                tintColor={colors.background}
                ratingBackgroundColor='grey'
                readonly
                ratingCount={5}
                imageSize={12}
                startingValue={movies.movieSelected.vote_average / 2}
                defaultRating={5}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 12,
                  textAlign: 'justify',
                  lineHeight: 23,
                }}>
                {movies.movieSelected.overview}
              </Text>
            </View>
            <View>
              <ScrollView horizontal={true}>
                {movies.movieCast &&
                  movies.movieCast.map((item, index) => renderCharacter(item))}
              </ScrollView>
            </View>
            <View style={{marginTop: 10}}>
              {renderTextFooter(
                'Study',
                movies.movieSelected.production_companies[0].name,
              )}
              {renderTextFooter('Genre', movies.movieSelected.formatedGenres)}
              {renderTextFooter(
                'Release',
                Moment(movies.movieSelected.release_date).format('YYYY	'),
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    getCast: (e) => dispatch(getCast(e)),
    selectMovie: (e) => dispatch(selectMovie(e)),
    cleanMovieSelected: (e) => dispatch(cleanMovieSelected(e)),
  };
}
const mapStateToProps = (state, ownProps) => {
  return {movies: state.movies, props: ownProps};
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5CA1D4',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  footer: {
    flex: 1.2,
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  productImage: {
    flex: 1,
    width: width,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 22,
    backgroundColor: '#FFFFFF66',
    borderRadius: 50,
    borderWidth: 1,
  },

  avatarContainer: {
    overflow: 'hidden',
    flex: 1,
    width: width / 5,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 7,
  },
});
