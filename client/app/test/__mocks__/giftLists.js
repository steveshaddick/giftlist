import { mockUser } from './users';
import { mockGift } from './gifts';

export function mockGiftList(authenticatedUser = 1, otherClaimerUser = 2) {
  let list = [];

  for (let i=1; i<=5; i++) {
    let gift = mockGift(i);
    if (i === 4) {
      gift.claimer = mockUser(authenticatedUser);
    } else if (i === 5) {
      gift.claimer = mockUser(otherClaimerUser);
    }

    list.push(gift);
  }

  return list;
}

export function mockAskList() {
  let list = [];

  for (let i=1; i<=5; i++) {
    let gift = mockGift(i);
    list.push(gift);
  }

  return list;
}

export function mockClaimList() {
  let list = [];
  const user2 = mockUser(2);
  const user3 = mockUser(3);

  // Currently just assuming user 1 is authenticated and hardcoding the other users

  for (let i=1; i<=5; i++) {
    let gift = mockGift(i);
    gift.asker = (i % 2) ? user2 : user3;

    list.push(gift);
  }

  return list;
}
