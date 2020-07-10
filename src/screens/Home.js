import React, {useEffect} from 'react';
// eslint-disable-next-line prettier/prettier
import {
  StatusBar, View, Text, StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  TextInput,
  ScrollView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {getPopularMovies, getTopRatedMovies} from '../actions';
import MoviewItem from '../components/MovieItem';

const Home = ({movies, navigation, getPopularMovies, getTopRatedMovies}) => {
  const {colors} = useTheme();

  useEffect(() => {
    StatusBar.setBackgroundColor('#5CA1D4', true);
    StatusBar.setBarStyle('light-content', true);

    if (movies.popularMovies.length == 0) getPopularMovies();
    if (movies.topRatedMovies.length == 0) getTopRatedMovies();
  }, []);

  const onPressImage = (movie) => {
    navigation.navigate('MovieDetail', {movie});
  };

  const renderScroll = (movies) => {
    return (
      <ScrollView horizontal={true}>
        {movies &&
          movies.map((item, index) => (
            <MoviewItem movie={item} key={item.id} onPressImage={onPressImage} />
          ))}
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 22}}>
          Hello, what do you want to watch?
        </Text>
        <View style={styles.inputView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Icon size={18} color="white" name="search" />
          </View>
          <TextInput
            style={styles.inputs}
            placeholder="Search"
            placeholderTextColor="#FFFFFF80"
          />
        </View>
      </View>

      <View style={[styles.footer, {backgroundColor: colors.background}]}>
        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text, fontSize: 12}}>
              RECOMMENDED FOR YOU
            </Text>
            <Text style={{color: colors.text, fontSize: 10}}>See all</Text>
          </View>
          <View style={{marginVertical: 10}}>
            {renderScroll(movies.popularMovies)}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={{color: colors.text, fontSize: 12}}>TOP RATED</Text>
            <Text style={{color: colors.text, fontSize: 10}}>See all</Text>
          </View>
          <View>{renderScroll(movies.topRatedMovies)}</View>
        </ScrollView>
      </View>
    </View>
  );
};
/*
const mapDispatchToProps = (dispatch) => {
  return {actions: bindActionCreators(actionCreators, dispatch)};
};*/

function mapDispatchToProps(dispatch) {
  return {
    getPopularMovies: (e) => dispatch(getPopularMovies(e)),
    getTopRatedMovies: (e) => dispatch(getTopRatedMovies(e)),
  };
}
const mapStateToProps = (state, ownProps) => {
  return {movies: state.movies, props: ownProps};
};
/*
  <Nav>{this.createLinks(this.props.routes)}</Nav> */

//export default connect(mapStateToProps, mapDispatchToProps)(Home);
//export default connect(mapStateToProps, {getPopularMovies})(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
    flex: 2.5,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  inputView: {
    marginVertical: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#FFFFFF33',
    borderRadius: 50,
    paddingLeft: 20,
  },
  inputs: {
    borderRadius: 50,
    paddingLeft: 20,
    color: 'white',
    flex: 10,
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
});
