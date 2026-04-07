import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCard from "./UserCard";

describe("UserCard Component", () => {
  const mockUser = {
    id: 99,
    name: "John Tester",
    email: "john@test.com",
  };

  it("renders user information correctly", () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText("John Tester")).toBeInTheDocument();
    expect(screen.getByText("ID: 99")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
  });
});
