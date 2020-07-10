/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import {createStore, applyMiddleware} from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import MovieDetail from './src/screens/MovieDetail';

const App = () => {
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      headerColor: '#404040',
    },
  };

  const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      headerColor: '#white',
    },
  };
  const store = createStore(reducers, applyMiddleware(thunk));

  //const store = createStore(reducers);

  const scheme = useColorScheme();
  const Stack = createStackNavigator();

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <NavigationContainer
          navigationOptions={{
            headerShown: false,
          }}
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MovieDetail"
              component={MovieDetail}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          
        </NavigationContainer>
      </Provider>
    </AppearanceProvider>
  );
};

export default App;
