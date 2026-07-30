import { Link } from "react-router-dom";
import type { Article } from "../types/article";

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

        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
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