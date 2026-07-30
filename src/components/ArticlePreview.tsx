import { Link } from "react-router-dom";
import type { Article } from "../types/article";
import FavoriteButton from "./FavoriteButton";
import ArticleMeta from "./ArticleMeta";

type Props = {
  article: Article;
};

export default function ArticlePreview({ article }: Props) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <ArticleMeta article={article} />

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