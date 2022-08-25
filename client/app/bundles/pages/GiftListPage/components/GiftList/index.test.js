import React from 'react';
import '@testing-library/jest-dom';
import { screen, within, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUser } from 'test/__mocks__/users';
import { mockGiftList } from 'test/__mocks__/giftLists';
import { renderWithCurrentUserProvider } from 'test/helpers';

import { sortGiftList } from 'pages/GiftListPage';

import GiftList from '.';

test('renders all GiftList items', () => {
  const currentUser = mockUser(1);
  const giftlist = sortGiftList(
    currentUser,
    mockGiftList({
      authenticatedUser: currentUser,
    }),
  );

  renderWithCurrentUserProvider(currentUser, <GiftList user={mockUser(3)} items={giftlist} />);

  expect(screen.getAllByRole('listitem')).toHaveLength(6);
});

/**
 * Claiming
 */

test('shows proper modal when claiming gift', async () => {
  const visitor = userEvent.setup();
  const currentUser = mockUser(1);
  const giftlist = sortGiftList(
    currentUser,
    mockGiftList({
      authenticatedUser: currentUser,
    }),
  );

  renderWithCurrentUserProvider(currentUser, <GiftList user={mockUser(3)} items={giftlist} />);
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[1];

  expect(screen.queryByRole('dialog')).toBeNull();

  await visitor.click(within(item).getByText("I'll get it"));
  const modal = screen.queryByRole('dialog');

  expect(modal).toBeInTheDocument();
  expect(within(modal).queryByText(giftlist[1].title)).toBeInTheDocument();
});

test('updates gift when claiming', async () => {
  const visitor = userEvent.setup();
  const currentUser = mockUser(1);
  const giftlist = sortGiftList(
    currentUser,
    mockGiftList({
      authenticatedUser: currentUser,
    }),
  );

  renderWithCurrentUserProvider(currentUser, <GiftList user={mockUser(3)} items={giftlist} />);
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[1];

  visitor.click(within(item).getByText("I'll get it"));
  await waitFor(() => screen.getByRole('dialog'));
  const modal = screen.queryByRole('dialog');

  const confirmButton = within(modal).getByText('Yes');
  visitor.click(confirmButton);

  await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(within(item).queryByText("I'll get it")).not.toBeInTheDocument();
});

test('does not update gift when cancelling claim', async () => {
  const visitor = userEvent.setup();
  const currentUser = mockUser(1);
  const giftlist = sortGiftList(
    currentUser,
    mockGiftList({
      authenticatedUser: currentUser,
    }),
  );

  renderWithCurrentUserProvider(currentUser, <GiftList user={mockUser(3)} items={giftlist} />);
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[1];

  visitor.click(within(item).getByText("I'll get it"));
  await waitFor(() => screen.getByRole('dialog'));
  const modal = screen.queryByRole('dialog');

  const cancelButton = within(modal).getByText('Cancel');
  visitor.click(cancelButton);

  await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(within(item).queryByText("I'll get it")).toBeInTheDocument();
});

/**
 * Unclaiming
 */

test('shows proper modal when unclaiming gift', async () => {
  const visitor = userEvent.setup();
  const currentUser = mockUser(1);
  const giftlist = sortGiftList(
    currentUser,
    mockGiftList({
      authenticatedUser: currentUser,
    }),
  );

  renderWithCurrentUserProvider(currentUser, <GiftList user={mockUser(3)} items={giftlist} />);
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[0];

  expect(screen.queryByRole('dialog')).toBeNull();

  visitor.click(within(item).getByText('Cancel'));
  await waitFor(() => screen.getByRole('dialog'));
  const modal = screen.queryByRole('dialog');

  expect(modal).toBeInTheDocument();
  expect(within(modal).queryByText(giftlist[0].title)).toBeInTheDocument();
});

test('updates gift when unclaiming', async () => {
  const visitor = userEvent.setup();
  const currentUser = mockUser(1);
  const giftlist = sortGiftList(
    currentUser,
    mockGiftList({
      authenticatedUser: currentUser,
    }),
  );

  renderWithCurrentUserProvider(currentUser, <GiftList user={mockUser(3)} items={giftlist} />);
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[0];

  visitor.click(within(item).getByText('Cancel'));
  await waitFor(() => screen.getByRole('dialog'));
  const modal = screen.queryByRole('dialog');

  const confirmButton = within(modal).getByText('Yes');
  visitor.click(confirmButton);

  await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(within(item).queryByText('Cancel')).not.toBeInTheDocument();
});

test('does not update gift when cancelling claim', async () => {
  const visitor = userEvent.setup();
  const currentUser = mockUser(1);
  const giftlist = sortGiftList(
    currentUser,
    mockGiftList({
      authenticatedUser: currentUser,
    }),
  );

  renderWithCurrentUserProvider(currentUser, <GiftList user={mockUser(3)} items={giftlist} />);
  const allGifts = screen.getAllByRole('listitem');
  const item = allGifts[0];

  visitor.click(within(item).getByText('Cancel'));
  await waitFor(() => screen.getByRole('dialog'));
  const modal = screen.queryByRole('dialog');

  const cancelButton = within(modal).getByText('Cancel');
  visitor.click(cancelButton);

  await waitForElementToBeRemoved(() => screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(within(item).queryByText('Cancel')).toBeInTheDocument();
});
