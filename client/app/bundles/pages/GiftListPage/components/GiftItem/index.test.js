import '@testing-library/jest-dom';
import { screen, within, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUser } from 'test/__mocks__/users';
import { mockGift } from 'test/__mocks__/gifts';
import { renderWithCurrentUserProvider } from 'test/helpers';

import GiftItem from '.';

test('renders public gift item', () => {
  const currentUser = mockUser(1);
  const gift = mockGift(1);

  renderWithCurrentUserProvider(currentUser, 
    <GiftItem
      index={ 1 }
      gift={ gift }
      enableClaimed={ true }
      currentUserClaimed={ false }
      claimHandler={ null }
      unClaimHandler = { null }
      />
  );

  const renderedItem = screen.getByRole('article');

  expect(screen.queryAllByRole('button')[0].innerHTML).toContain(gift.title);
  expect(screen.queryByText(gift.description)).not.toBeInTheDocument();
  expect(screen.queryByText(gift.priceLow)).toBeInTheDocument();
  expect(screen.queryByText(gift.priceHigh)).toBeInTheDocument();
  expect(screen.queryByText("I'll get it")).toBeInTheDocument();
});

test('shows description when clicked', async () => {
  const visitor = userEvent.setup();
  const currentUser = mockUser(1);
  const gift = mockGift(1);

  renderWithCurrentUserProvider(currentUser, 
    <GiftItem
      index={ 1 }
      gift={ gift }
      enableClaimed={ true }
      currentUserClaimed={ false }
      claimHandler={ null }
      unClaimHandler = { null }
      />
  );

  expect(screen.queryByText(gift.description)).not.toBeInTheDocument();

  const titleButton = screen.queryAllByRole('button')[0];
  await visitor.click(titleButton);

  expect(screen.queryByText(gift.description)).toBeInTheDocument();
});

test('renders gift item claimed by current user', () => {
  const currentUser = mockUser(1);
  const gift = mockGift(1);
  gift.claimer = currentUser;

  renderWithCurrentUserProvider(currentUser, 
    <GiftItem
      index={ 1 }
      gift={ gift }
      enableClaimed={ true }
      currentUserClaimed={ true }
      claimHandler={ null }
      unClaimHandler = { null }
      />
  );

  const renderedItem = screen.getByRole('article');

  expect(screen.queryAllByRole('button')[0].innerHTML).toContain(gift.title);
  expect(screen.queryByText(gift.description)).not.toBeInTheDocument();
  expect(screen.queryByText(gift.priceLow)).toBeInTheDocument();
  expect(screen.queryByText(gift.priceHigh)).toBeInTheDocument();
  expect(screen.queryByText("I'll get it")).not.toBeInTheDocument();
  expect(screen.queryByText("You are getting this.")).toBeInTheDocument();
  expect(screen.queryByText("Cancel")).toBeInTheDocument();
});

test('renders gift item claimed by another user', () => {
  const currentUser = mockUser(1);
  const anotherUser = mockUser(2);
  const gift = mockGift(1);
  gift.claimer = anotherUser;

  renderWithCurrentUserProvider(currentUser, 
    <GiftItem
      index={ 1 }
      gift={ gift }
      enableClaimed={ true }
      currentUserClaimed={ false }
      claimHandler={ null }
      unClaimHandler = { null }
      />
  );

  const renderedItem = screen.getByRole('article');

  expect(screen.queryAllByRole('button')[0].innerHTML).toContain(gift.title);
  expect(screen.queryByText(gift.description)).not.toBeInTheDocument();
  expect(screen.queryByText(gift.priceLow)).toBeInTheDocument();
  expect(screen.queryByText(gift.priceHigh)).toBeInTheDocument();
  expect(screen.queryByText("I'll get it")).not.toBeInTheDocument();
  expect(screen.queryByText(anotherUser.name, { exact: false })).toBeInTheDocument();
});

test('does not show claim button for current user\'s own list', () => {
  const currentUser = mockUser(1);
  const gift = mockGift(1);

  renderWithCurrentUserProvider(currentUser, 
    <GiftItem
      index={ 1 }
      gift={ gift }
      enableClaimed={ false }
      currentUserClaimed={ false }
      claimHandler={ null }
      unClaimHandler = { null }
      />
  );

  const renderedItem = screen.getByRole('article');

  expect(screen.queryAllByRole('button')[0].innerHTML).toContain(gift.title);
  expect(screen.queryByText(gift.description)).not.toBeInTheDocument();
  expect(screen.queryByText(gift.priceLow)).toBeInTheDocument();
  expect(screen.queryByText(gift.priceHigh)).toBeInTheDocument();
  expect(screen.queryByText("I'll get it")).not.toBeInTheDocument();
});
