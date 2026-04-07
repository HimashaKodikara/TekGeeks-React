export const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  { id: 4, name: "Bob Brown", email: "bob@example.com" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com" },
  { id: 6, name: "Diana Prince", email: "diana@example.com" }
];

export const fetchUsersApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Un-comment to test error scenarios randomly 
      // if (Math.random() > 0.8) {
      //   reject(new Error("Failed to fetch users."));
      //   return;
      // }
      resolve(mockUsers);
    }, 1000); // Simulate network latency
  });
};
