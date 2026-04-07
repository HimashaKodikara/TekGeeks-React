import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithRedux } from "../utils/test-utils";
import UserList from "./UserList";
import { vi } from "vitest";
import * as api from "../services/api";

vi.mock("../services/api", () => ({
  fetchUsersApi: vi.fn(),
}));

describe("UserList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    api.fetchUsersApi.mockImplementation(() => new Promise(() => {}));

    renderWithRedux(<UserList />);
    expect(screen.getByText(/Loading amazing users/i)).toBeInTheDocument();
  });

  it("renders users when data is successfully fetched", async () => {
    const mockUsers = [
      { id: 1, name: "Alice Test", email: "alice@test.com" },
      { id: 2, name: "Bob Test", email: "bob@test.com" },
    ];
    api.fetchUsersApi.mockResolvedValue(mockUsers);

    renderWithRedux(<UserList />);

    await waitFor(() => {
      expect(screen.getByText("Alice Test")).toBeInTheDocument();
    });
    expect(screen.getByText("Bob Test")).toBeInTheDocument();
  });

  it("renders error state when API fails", async () => {
    api.fetchUsersApi.mockRejectedValue(new Error("API Failed"));

    renderWithRedux(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
    expect(screen.getByText("API Failed")).toBeInTheDocument();
  });
});
