import { useContext } from 'react';

const token = document.querySelector('[name=csrf-token]').content;

export async function claimGift(data) {
  const { currentUser, gift} = data;
  const { id: giftId } = gift;

  let requestData = {
    claimer_id: currentUser.id,
  }

  const response = await fetch(`/api/v1/gifts/${giftId}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token,
    },
    method: 'PATCH',
    body: JSON.stringify(requestData),
  });

  return response;
}
