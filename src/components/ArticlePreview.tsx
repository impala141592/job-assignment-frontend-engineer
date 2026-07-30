import { Link } from "react-router-dom";
import type { Article } from "../types/article";
import FavoriteButton from "./FavoriteButton";

type Props = {
  article: Article;
};

export default function ArticlePreview({ article }: Props) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img
            src={
              article.author.image ||
              "https://api.dicebear.com/7.x/initials/svg?seed=" +
              article.author.username
            }
            alt={article.author.username}
          />
        </Link>

        <div className="info">
          <Link
            to={`/profile/${article.author.username}`}
            className="author"
          >
            {article.author.username}
          </Link>

          <span className="date">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>

        <FavoriteButton
          slug={article.slug}
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
        />
      </div>

      <Link
        to={`/${article.slug}`}
        className="preview-link"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}