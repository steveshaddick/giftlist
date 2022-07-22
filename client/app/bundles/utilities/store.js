import React, {createContext, useReducer} from 'react';

const initialState = {
  currentAccount: null
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ currentAccount, children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'actionType':
        return newState;
      default:
        throw new Error();
    };
  }, {
    currentAccount
  });

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
