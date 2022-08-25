const apiHost =
  typeof process !== 'undefined' && process?.env?.NODE_ENV === 'test' ? 'http://localhost' : '';
const apiBase = `${apiHost}/api/v1`;

const csrfToken = document.querySelector('[name=csrf-token]')?.content;

let currentUser = null;

function generalError() {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-alert
    alert('There was an error, please try again.');

    resolve({
      success: false,
      data: null,
      message: 'Unknown json error',
    });
  });
}

async function callApi(path, data = null, options = {}) {
  const defaultOptions = {};
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken,
  };

  const requestOptions = {
    ...defaultOptions,
    ...options,
  };
  requestOptions.headers = options.headers
    ? {
        ...defaultHeaders,
        ...options.headers,
      }
    : defaultHeaders;

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${apiBase}/${path}`, requestOptions);
  if (response.status >= 500) {
    return generalError();
  }

  let returnData = null;
  try {
    returnData = await response.json();
  } catch (e) {
    return generalError();
  }

  return returnData;
}

export async function signout() {
  return callApi('/users/sign_out', null, {
    method: 'DELETE',
  });
}

export async function setApiCurrentUser(userData) {
  currentUser = userData;
}

export async function claimGift(data) {
  const { gift } = data;
  const { id: giftId } = gift;

  const requestData = {
    claimerId: currentUser.id,
  };

  return callApi(`gifts/${giftId}/claim`, requestData, {
    method: 'PATCH',
  });
}

export async function unclaimGift(data) {
  const { gift } = data;
  const { id: giftId } = gift;

  const requestData = {
    claimerId: null,
  };

  return callApi(`gifts/${giftId}/claim`, requestData, {
    method: 'PATCH',
  });
}

export async function getGroups() {
  return callApi(`users/${currentUser.id}/groups`);
}

export async function getClaimedList() {
  return callApi(`users/${currentUser.id}/claimlist`);
}

export async function setGiftGot(data) {
  const { gift } = data;
  const { isGot, id: giftId } = gift;

  const requestData = {
    claimerGot: isGot,
  };

  return callApi(`gifts/${giftId}/got`, requestData, {
    method: 'PATCH',
  });
}

export async function getAskingList() {
  return callApi(`users/${currentUser.id}/asklist`);
}

export async function addGift(data) {
  const { gift } = data;
  const { askerId, title, description, priceHigh, priceLow, groupOwnerId } = gift;

  const requestData = {
    askerId,
    title,
    description,
    groupOwnerId,
    priceHigh: parseInt(priceHigh, 10),
    priceLow: parseInt(priceLow, 10),
  };

  return callApi('gifts', requestData, {
    method: 'POST',
  });
}

export async function updateGift(data) {
  const { gift } = data;
  const { id, title, description, priceHigh, priceLow } = gift;

  const requestData = {
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
