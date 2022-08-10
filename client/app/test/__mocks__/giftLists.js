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
