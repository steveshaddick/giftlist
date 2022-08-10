const mockUsers = {
  1: {
    id: 1,
    email: "user1@test.com",
    name: "User 1",
  },
  2: {
    id: 2,
    email: "user2@test.com",
    name: "User 2",
  },
  3: {
    id: 3,
    email: "user3@test.com",
    name: "User 3",
  },
  4: {
    id: 4,
    email: "user4@test.com",
    name: "User 4",
  }
}

export function mockUser(id) {
  return JSON.parse(JSON.stringify(mockUsers[id]));
}
