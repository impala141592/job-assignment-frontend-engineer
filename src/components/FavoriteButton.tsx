import { useState } from "react";
import {
  favoriteArticle,
  unfavoriteArticle,
} from "../api/articles";

type Props = {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
};

export default function FavoriteButton({
  slug,
  favorited,
  favoritesCount,
}: Props) {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    try {
      const response = isFavorited
        ? await unfavoriteArticle(slug)
        : await favoriteArticle(slug);

      setIsFavorited(response.article.favorited);
      setCount(response.article.favoritesCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`btn btn-sm ${isFavorited
          ? "btn-primary"
          : "btn-outline-primary"
        }`}
      disabled={loading}
      onClick={handleClick}
    >
      <i className="ion-heart" /> {count}
    </button>
  );
}