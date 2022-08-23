const mockGiftGroups = {
  1: {
    id: 1,
    name: "Gift Group 1",
    description: "Description for gift group 1",
  },
  2: {
    id: 2,
    name: "Gift Group 2",
    description: "Description for gift group 2",
  },
}

export function mockGiftGroup(id) {
  return JSON.parse(JSON.stringify(mockGiftGroups[id]));
}
