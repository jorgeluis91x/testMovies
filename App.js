/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import Home from './src/screens/containers/home';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';



const App= () => {
  const store = createStore(reducers,{},applyMiddleware(thunk))
  return (
    <Provider store={store}>
      <StatusBar  />
      <SafeAreaView>
            <View >
                <Home/>
              
            </View>
      </SafeAreaView>
    </Provider>
  );
};


export default App;
