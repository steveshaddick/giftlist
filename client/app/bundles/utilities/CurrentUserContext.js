import React, {createContext, useReducer, useContext} from 'react';
import { setApiCurrentUser } from 'utilities/api';

const initialState = {
  currentUser: null
};
const CurrentUserContext = createContext(initialState);

const CurrentUserProvider = ({ currentUser, children } ) => {
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

  setApiCurrentUser(currentUser);

  return <CurrentUserContext.Provider value={{ state, dispatch }}>{children}</CurrentUserContext.Provider>;
};

export function getCurrentUser() {
  const context = useContext(CurrentUserContext);
  const { currentUser } = context.state;

  return currentUser;
}

export { CurrentUserContext, CurrentUserProvider };
