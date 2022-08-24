import React from 'react';
import '@testing-library/jest-dom';
import { screen, within, waitFor } from '@testing-library/react';
import { mockUser } from 'test/__mocks__/users';
import { renderWithCurrentUserProvider } from 'test/helpers';

import UserProfilePage from '.';

beforeEach(() => {
  delete global.window.location;
  global.window = Object.create(window);
  global.window.location = {
    pathname: '/users/1/profile/',
    origin: '',
  };
});

test('renders header and footer', () => {
  const currentUser = mockUser(1);

  renderWithCurrentUserProvider(currentUser, <UserProfilePage currentUser={currentUser} />);

  const header = document.getElementsByTagName('header')[0];
  const footer = document.getElementsByTagName('footer')[0];

  expect(header.innerHTML).toContain('My Lists');
  expect(footer.innerHTML).toContain('Suggest improvement');
});

test('redirects to the asklist by default', async () => {
  window.history.pushState = jest.fn();
  const currentUser = mockUser(1);

  renderWithCurrentUserProvider(currentUser, <UserProfilePage currentUser={currentUser} />);

  await waitFor(() =>
    expect(window.history.pushState).toBeCalledWith(
      { tab: 'asklist' },
      '',
      '/users/1/profile/asklist',
    ),
  );
});

test('renders the asklist', async () => {
  global.window.location.pathname = '/users/1/profile/asklist';
  const currentUser = mockUser(1);

  renderWithCurrentUserProvider(currentUser, <UserProfilePage currentUser={currentUser} />);

  const mainContent = screen.getByRole('main');

  await waitFor(() => expect(within(mainContent).getAllByRole('article')).toHaveLength(5));
});

test('renders the claim list', async () => {
  global.window.location.pathname = '/users/1/profile/claimlist';
  const currentUser = mockUser(1);

  renderWithCurrentUserProvider(currentUser, <UserProfilePage currentUser={currentUser} />);

  const mainContent = screen.getByRole('main');

  await waitFor(() => expect(within(mainContent).getAllByRole('article')).toHaveLength(5));
});
