import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getProfile } from "./api/profiles";
import { getArticlesByAuthor } from "./api/articles";
import type { Profile as ProfileType } from "./types/profile";
import type { Article } from "./types/article";
import Avatar from "./components/Avatar";

import FollowButton from "./components/FollowButton";
import ArticlePreview from "./components/ArticlePreview";

export default function Profile() {
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  const [profileLoading, setProfileLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!username) return;

      try {
        const response = await getProfile(username);
        setProfile(response.profile);
      } catch {
        setError("Failed to load profile");
      } finally {
        setProfileLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  useEffect(() => {
    async function loadArticles() {
      if (!username) return;

      try {
        const response = await getArticlesByAuthor(username);
        setArticles(response.articles);
      } catch {
        // Optional: add article-specific error later
      } finally {
        setArticlesLoading(false);
      }
    }

    loadArticles();
  }, [username]);

  if (profileLoading) {
    return <p>Loading profile...</p>;
  }

  if (error || !profile) {
    return <p>{error || "Profile not found"}</p>;
  }

  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <Avatar
                  src={profile.image}
                  className="user-img"
                  alt={profile.username}
                />

                <h4>{profile.username}</h4>

                <p>{profile.bio}</p>

                <FollowButton
                  username={profile.username}
                  following={profile.following}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {articlesLoading ? (
                <p>Loading articles...</p>
              ) : articles.length === 0 ? (
                <p>No articles yet.</p>
              ) : (
                articles.map((article) => (
                  <ArticlePreview
                    key={article.slug}
                    article={article}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}