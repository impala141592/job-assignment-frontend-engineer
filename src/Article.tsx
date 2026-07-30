import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "./api/articles";
import type { Article as ArticleType } from "./types/article";
import FavoriteButton from "./components/FavoriteButton";
import FollowButton from "./components/FollowButton";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();

  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await getArticle(slug);
        setArticle(response.article);
      } catch {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <p>Loading article...</p>;
  }

  if (error || !article) {
    return <p>{error || "Article not found"}</p>;
  }

  return (
    <>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>

            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} alt={article.author.username} />
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

              <FollowButton
                username={article.author.username}
                following={article.author.following}
              />

              &nbsp;&nbsp;

              <FavoriteButton
                slug={article.slug}
                favorited={article.favorited}
                favoritesCount={article.favoritesCount}
              />
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article.body}</p>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} alt={article.author.username} />
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

              <FollowButton
                username={article.author.username}
                following={article.author.following}
              />

              &nbsp;

              <FavoriteButton
                slug={article.slug}
                favorited={article.favorited}
                favoritesCount={article.favoritesCount}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <p className="text-muted text-center">
                Comments are not implemented yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
