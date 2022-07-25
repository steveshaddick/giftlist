import { useContext } from 'react';

const token = document.querySelector('[name=csrf-token]').content;
const headers = {
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': token,
};

export async function claimGift(data) {
  const { currentUser, gift} = data;
  const { id: giftId } = gift;

  let requestData = {
    claimer_id: currentUser.id,
  }

  const response = await fetch(`/api/v1/gifts/${giftId}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(requestData),
  });

  return response;
}

export async function unClaimGift(data) {
  const { gift} = data;
  const { id: giftId } = gift;

  let requestData = {
    claimer_id: null,
  }

  const response = await fetch(`/api/v1/gifts/${giftId}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(requestData),
  });

  return response;
}

export async function getClaimList(data) {
  const { currentUser } = data;

  const response = await fetch(`/api/v1/users/${currentUser.id}/claimlist`, {
    headers,
  });

  const jsonRepsponse = await response.json();

  return jsonRepsponse;
}
