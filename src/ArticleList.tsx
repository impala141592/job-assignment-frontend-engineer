import { useEffect, useState } from "react";
import { getArticles } from "./api/articles";
import { Article } from "./types/article";
import ArticlePreview from "./components/ArticlePreview";

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getArticles();
        setArticles(data.articles);
      } catch (error) {
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">
                      Your Feed
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {loading && <p>Loading articles...</p>}

              {error && <p>{error}</p>}

              {!loading &&
                !error &&
                articles.map((article) => (
                  <ArticlePreview
                    key={article.slug}
                    article={article}
                  />
                ))}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="#" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="#" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="#" className="tag-pill tag-default">
                    react
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="#" className="logo-font">
            conduit
          </a>

          <span className="attribution">
            An interactive learning project from{" "}
            <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}
