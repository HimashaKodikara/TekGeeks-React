import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithRedux } from "../utils/test-utils";
import SearchBar from "./SearchBar";
import { vi } from "vitest";

describe("SearchBar Component", () => {
  it("renders correctly with default state", () => {
    renderWithRedux(<SearchBar />);
    const input = screen.getByPlaceholderText("Filter users by name...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("dispatches setSearchQuery action on input change", () => {
    const { store } = renderWithRedux(<SearchBar />);
    const input = screen.getByPlaceholderText("Filter users by name...");

    fireEvent.change(input, { target: { value: "Alice" } });

    const state = store.getState();
    expect(state.users.searchQuery).toBe("Alice");
  });
});
