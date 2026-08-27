import React from 'react';
import '@testing-library/jest-dom';
import { screen, within } from '@testing-library/react';
import { mockUser } from 'test/__mocks__/users';
import { renderWithCurrentUserProvider } from 'test/helpers';

import AccountPage from '.';

test('renders header and footer', () => {
  const currentUser = mockUser(1);

  renderWithCurrentUserProvider(currentUser, <AccountPage currentUser={currentUser} />);

  const header = document.getElementsByTagName('header')[0];
  const footer = document.getElementsByTagName('footer')[0];

  expect(header.innerHTML).toContain('My Account');
  expect(footer.innerHTML).toContain('Suggest improvement');
});

test('renders current user name and email', () => {
  const currentUser = mockUser(1);

  renderWithCurrentUserProvider(currentUser, <AccountPage currentUser={currentUser} />);

  const main = screen.getByRole('main');

  expect(within(main).getByText('User 1')).toBeInTheDocument();
  expect(within(main).getByText('user1@test.com')).toBeInTheDocument();
});

test('links to users profile page', () => {
  const currentUser = mockUser(1);

  renderWithCurrentUserProvider(currentUser, <AccountPage currentUser={currentUser} />);

  const myListsLink = screen.getByRole('link', { name: 'My Lists' });

  expect(myListsLink).toHaveAttribute('href', '/users/1/profile');
});
