import '@testing-library/jest-dom';
import { screen, within, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUser } from 'test/__mocks__/users';
import { renderWithCurrentUserProvider } from 'test/helpers';

import UserProfilePage from '.';

test('renders header and footer', () => {
  const currentUser = mockUser(1);

  renderWithCurrentUserProvider(currentUser, 
    <UserProfilePage
      currentUser={ currentUser }
      selectedTab={ '' }
      />
  );

  const header = document.getElementsByTagName('header')[0];
  const footer = document.getElementsByTagName('footer')[0];

  expect(header.innerHTML).toContain("My Lists");
  expect(footer.innerHTML).toContain("Suggest improvement");
});


