function reducer(state, action) {
  switch (action.type) {
    case 'INITIAL_STATE': {
      const initialState = action.payload.reduce(
        (acc, obj) => ({...acc, [obj.text]: obj}),
        {},
      );
      return {
        ...state,
        feelings: {...initialState},
      };
    }

    case 'ADD_FEELING': {
      return {
        ...state,
        feelings: {...state.feelings, [action.payload.text]: action.payload},
      };
    }

    case 'ADD_CURRENT_FEELING': {
      return {
        ...state,
        currentFeeling: action.payload,
      };
    }

    case 'ADD_ERROR': {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
}

export default reducer;
