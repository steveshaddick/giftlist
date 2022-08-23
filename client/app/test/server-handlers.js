import { rest } from 'msw';

import { mockGift } from 'test/__mocks__/gifts.js';
import { mockUser } from 'test/__mocks__/users.js';
import { mockAskList, mockClaimList } from 'test/__mocks__/giftLists.js';

export const handlers = [
  rest.patch('/api/v1/gifts/:giftId/claim', async (req, res, ctx) => {
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
  rest.get('/api/v1/users/:userId/asklist', async (req, res, ctx) => {
    const { userId } = req.params;

    let responseData = mockAskList();

    return res(
      ctx.json({
        success: true,
        data: responseData,
      })
    )
  }),
  rest.get('/api/v1/users/:userId/claimlist', async (req, res, ctx) => {
    const { userId } = req.params;

    let responseData = mockClaimList();

    return res(
      ctx.json({
        success: true,
        data: responseData,
      })
    )
  }),
];
