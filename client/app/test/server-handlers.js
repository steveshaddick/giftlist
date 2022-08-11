import { rest } from 'msw';

import { mockGift } from 'test/__mocks__/gifts.js';
import { mockUser } from 'test/__mocks__/users.js';

export const handlers = [
  rest.patch('/api/v1/gifts/:giftId', async (req, res, ctx) => {
    const reqData = await req.json();
    const { giftId } = req.params;
    const { claimerId } = reqData;

    let responseData = null;
    let newGift = mockGift(giftId);

    if (typeof claimerId !== 'undefined') {
      newGift.claimer = (claimerId) ? mockUser(claimerId) : null;
      responseData = newGift;
    }

    return res(
      ctx.json({
        success: true,
        data: responseData,
      })
    )
  }),
];
