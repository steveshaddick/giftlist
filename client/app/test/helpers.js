import { render } from '@testing-library/react';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';
import Modal from 'react-modal';

export function renderWithCurrentUserProvider(currentUser, component) {
  return renderInAppContainer(
    <CurrentUserProvider currentUser={currentUser} >
      { component }
    </CurrentUserProvider>
  );
}

export function renderInAppContainer(component) {
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'AppContainer');
  document.body.appendChild(appContainer);

  Modal.setAppElement('#AppContainer');

  return render(
    component, {
      container: appContainer,
    }
  );
}