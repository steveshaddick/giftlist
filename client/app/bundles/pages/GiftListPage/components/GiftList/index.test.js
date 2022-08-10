import '@testing-library/jest-dom';
import { screen, within, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUser } from 'test/__mocks__/users';
import { mockGiftList } from 'test/__mocks__/giftLists';
import { renderWithCurrentUserProvider } from 'test/helpers';

import GiftList from '.';

test('renders all GiftList items', () => {
  const currentUser = mockUser(1);
  const giftlist = mockGiftList(1);

  renderWithCurrentUserProvider(currentUser, 
    <GiftList
      user={ mockUser(3) }
      items={ giftlist }
    />
  );
  
  expect(screen.getAllByRole('listitem')).toHaveLength(5);
});

test('shows proper modal when claiming gift', async () => {
  const currentUser = mockUser(1);
  const giftlist = mockGiftList(1);

  renderWithCurrentUserProvider(currentUser, 
    <GiftList
      user={ mockUser(3) }
      items={ giftlist }
    />
  );
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[0];

  expect(screen.queryByRole('dialog')).toBeNull();

  userEvent.click(within(item).getByText("I'll get it"));
  await waitFor(() => screen.getByRole('dialog'));
  const modal = screen.queryByRole('dialog');

  expect(modal).toBeInTheDocument();
  expect(within(modal).queryByText(giftlist[0].title)).toBeInTheDocument();
});

test('updates gift when claiming', async () => {
  const currentUser = mockUser(1);
  const giftlist = mockGiftList(1);

  renderWithCurrentUserProvider(currentUser, 
    <GiftList
      user={ mockUser(3) }
      items={ giftlist }
    />
  );
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[0];

  userEvent.click(within(item).getByText("I'll get it"));
  await waitFor(() => screen.getByRole('dialog'));
  const modal = screen.queryByRole('dialog');

  const confirmButton = within(modal).getByText('Yes');
  userEvent.click(confirmButton);

  await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(within(item).queryByText("I'll get it")).not.toBeInTheDocument();
});

test('does not update gift when cancelling claim', async () => {
  const currentUser = mockUser(1);
  const giftlist = mockGiftList(1);

  renderWithCurrentUserProvider(currentUser, 
    <GiftList
      user={ mockUser(3) }
      items={ giftlist }
    />
  );
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[0];

  userEvent.click(within(item).getByText("I'll get it"));
  await waitFor(() => screen.getByRole('dialog'));
  const modal = screen.queryByRole('dialog');

  const cancelButton = within(modal).getByText('Cancel');
  userEvent.click(cancelButton);

  await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(within(item).queryByText("I'll get it")).toBeInTheDocument();
});