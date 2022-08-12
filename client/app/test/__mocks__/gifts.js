const mockGifts = {
  1: {
    id: 1,
    title: "Gift 1",
    description: "Description for gift 1",
    priceLow: 10,
    priceHigh: 20,
    claimer: null,
  },
  2: {
    id: 2,
    title: "Gift 2",
    description: "Description for gift 2",
    priceLow: 20,
    priceHigh: 30,
    claimer: null,
  },
  3: {
    id: 3,
    title: "Gift 3",
    description: "Description for gift 3",
    priceLow: 0,
    priceHigh: 0,
    claimer: null,
  },
  4: {
    id: 4,
    title: "Gift 4",
    description: "Description for gift 4",
    priceLow: 10,
    priceHigh: 10,
    claimer: null,
  },
  5: {
    id: 5,
    title: "Gift 5",
    description: "Description for gift 5",
    priceLow: 10,
    priceHigh: 20,
    claimer: null,
  },
  6: {
    id: 6,
    title: "Gift 6",
    description: "Description for gift 6",
    priceLow: 10,
    priceHigh: 20,
    claimer: null,
  }
}

export function mockGift(id) {
  return JSON.parse(JSON.stringify(mockGifts[id]));
}
