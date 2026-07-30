import { Link } from "react-router-dom";
import type { Article } from "../types/article";
import Avatar from "./Avatar";

type Props = {
  article: Article;
};

export default function ArticleMeta({ article }: Props) {
  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}>
        <Avatar
          src={article.author.image}
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
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}