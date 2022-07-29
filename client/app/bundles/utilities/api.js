import { useContext } from 'react';

const apiDomain = '/api/v1';

const csrfToken = document.querySelector('[name=csrf-token]').content;
const headers = {
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': csrfToken,
};

let currentUser = null;

let inFlight = {};

async function callApi(path, data=null, options={}) {
  const defaultOptions = {
  }
  const defaultHeaders =  {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken,
  }

  let requestOptions = {
    ...defaultOptions,
    ...options,
  }
  requestOptions.headers = options.headers ? {
    ...defaultHeaders,
    ...options.headers,
  } : defaultHeaders;

  if (data) {
    requestOptions.body = JSON.stringify(data)
  }

  const response = await fetch(`${apiDomain}/${path}`, requestOptions);

  return await response.json();
}

export async function setApiCurrentUser(userData) {
  currentUser = userData;
}

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

export async function getGroups() {
  return callApi(`users/${currentUser.id}/groups`);
}

export async function unClaimGift(data) {
  const { gift} = data;
  const { id: giftId } = gift;

  let requestData = {
    claimerId: null,
  }

  return callApi(`gifts/${giftId}`, requestData, {
    method: 'PATCH',
  });
}

export async function getClaimedList() {
  return callApi(`users/${currentUser.id}/claimlist`);
}

export async function setGiftGot(data) {
  const { gift } = data;
  const { isGot, id: giftId } = gift;

  let requestData = {
    claimerGot: gift.isGot,

  }

  return callApi(`gifts/${giftId}`, requestData, {
    method: 'PATCH',
  });
}

export async function getAskingList() {
  return callApi(`users/${currentUser.id}/asklist`);
}

export async function addGift(data) {
  const { gift } = data;
  const { askerId, title, description, priceHigh, priceLow } = gift;

  let requestData = {
    askerId,
    title,
    description,
    priceHigh: parseInt(priceHigh, 10),
    priceLow: parseInt(priceLow, 10),
  };

  return callApi(`gifts`, requestData, {
    method: 'POST',
  });
}

export async function updateGift(data) {
  const { gift } = data;
  const { id, title, description, priceHigh, priceLow } = gift;

  let requestData = {
    title,
    description,
    priceHigh: parseInt(priceHigh, 10),
    priceLow: parseInt(priceLow, 10),
  };

  return callApi(`gifts/${id}`, requestData, {
    method: 'PATCH',
  });
}

export async function deleteGift(data) {
  const { gift } = data;
  const { id } = gift;

  return callApi(`gifts/${id}`, null, {
    method: 'DELETE',
  });
}
