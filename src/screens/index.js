import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Screen from '../constants/screens';
import NavigationService from '../api/navigation-service';

const RouteConfigs = {
  [Screen.Feelings]: {
    getScreen: () => require('./feelings.screen').default,
  },
  [Screen.RateFeelings]: {
    getScreen: () => require('./rate-feelings.screen').default,
  },
};

const NavigatorConfig = {
  initialRoutename: Screen.Feelings,
  defaultNavigationOptions: {
    header: null,
  },
};

const HomeStack = createStackNavigator(RouteConfigs, NavigatorConfig);

const AppContainer = createAppContainer(HomeStack);

export default class App extends Component {
  render = () => (
    <AppContainer
      ref={navigatorRef => {
        if (navigatorRef) NavigationService.setTopLevelNavigation(navigatorRef);
      }}
    />
  );
}
