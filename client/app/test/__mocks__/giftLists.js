import { mockUser } from './users';
import { mockGift } from './gifts';
import { mockGiftGroup } from './giftGroups';

export function mockGiftList({
    authenticatedUser = null,
    otherClaimerUser = null
  } = {}) {
  let list = [];

  authenticatedUser = authenticatedUser || mockUser(1);
  otherClaimerUser = otherClaimerUser || mockUser(2);

  for (let i=1; i<=6; i++) {
    let gift = mockGift(i);
    if (i === 4) {
      gift.claimer = authenticatedUser;
    } else if (i === 5) {
      gift.claimer = otherClaimerUser;
    } else if (i === 6) {
      gift.owner = authenticatedUser;
      gift.groupOwner = mockGiftGroup(1);
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
