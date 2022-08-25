import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockUser } from 'test/__mocks__/users';
import { mockGiftList } from 'test/__mocks__/giftLists';

import GiftListPage from '.';

test('renders a public GiftListPage', () => {
  const currentUser = mockUser(1);
  const giftlist = mockGiftList(1);

  render(<GiftListPage currentUser={currentUser} user={mockUser(3)} gifts={giftlist} />);

  expect(screen.getByText(/Gift Lists/i)).toBeTruthy();
  expect(screen.getByText(/Sign out/i)).toBeTruthy();
  expect(screen.getByText(/User 3's List/i)).toBeTruthy();
});
