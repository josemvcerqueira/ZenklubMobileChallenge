import {NavigationActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigation(navigationRef) {
  _navigator = navigationRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function back() {
  _navigator.dispatch(NavigationActions.back());
}

const NavigationService = {
  setTopLevelNavigation,
  navigate,
  back,
};

export default NavigationService;
