import React, {createContext, useReducer} from 'react';

const initialState = {
  currentUser: null
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ currentUser, children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'actionType':
        return newState;
      default:
        throw new Error();
    };
  }, {
    currentUser
  });

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
