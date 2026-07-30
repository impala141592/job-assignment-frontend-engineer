import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";
import { favoriteArticle } from "../api/articles";
import { useAuth } from "../context/AuthContext";

jest.mock("../api/articles", () => ({
  favoriteArticle: jest.fn(),
  unfavoriteArticle: jest.fn(),
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("FavoriteButton", () => {
  it("favorites an article and updates the count", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        username: "alice",
        email: "alice@example.com",
      },
      loading: false,
    });

    (favoriteArticle as jest.Mock).mockResolvedValue({
      article: {
        favorited: true,
        favoritesCount: 10,
      },
    });

    render(
      <FavoriteButton
        slug="test-article"
        favorited={false}
        favoritesCount={9}
      />
    );

    expect(screen.getByText("9")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("10");
    });

    expect(favoriteArticle).toHaveBeenCalledWith("test-article");
  });
});