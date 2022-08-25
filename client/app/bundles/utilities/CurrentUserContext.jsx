import React, { createContext, useReducer, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { setApiCurrentUser } from 'utilities/api';

const initialState = {
  currentUser: null,
};
const CurrentUserContext = createContext(initialState);

const CurrentUserProvider = ({ currentUser, children }) => {
  const [state, dispatch] = useReducer(
    (previousState, action) => {
      switch (action.type) {
        case 'updateUser':
          return { currentUser: action.newUser };
        default:
          throw new Error();
      }
    },
    {
      currentUser,
    },
  );

  setApiCurrentUser(currentUser);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};

CurrentUserProvider.propTypes = {
  currentUser: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export function getCurrentUser() {
  const context = useContext(CurrentUserContext);
  const { currentUser } = context.state;

  return currentUser;
}

export { CurrentUserContext, CurrentUserProvider };
