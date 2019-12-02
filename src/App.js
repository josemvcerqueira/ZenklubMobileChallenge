import React, {useContext, useReducer, useEffect} from 'react';

import Context from './store/context';
import Reducer from './store/reducer';
import useEmojis from './hooks/useEmojis';
import FeelingActionTypes from './constants/action-types';

import AppContent from './screens';
const baseURL =
  'https://my-json-server.typicode.com/josemvcerqueira/zenklub-mock-server/feelings';

export default () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const {err, data} = useEmojis(baseURL);
  useEffect(() => {
    if (err) {
      dispatch({type: FeelingActionTypes.ADD_ERROR, payload: err});
    }
    dispatch({type: FeelingActionTypes.INITIAL_STATE, payload: data});
  }, [err, data.length]);

  return (
    <Context.Provider value={{state, dispatch}}>
      <AppContent />
    </Context.Provider>
  );
};
