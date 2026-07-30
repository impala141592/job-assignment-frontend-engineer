import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { getProfile } from "./api/profiles";
import type { Profile as ProfileType } from "./types/profile";
import FollowButton from "./components/FollowButton";

export default function Profile() {
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile(username);
        setProfile(response.profile);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) {
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
                <img
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

              <div className="article-preview">
                <div className="article-meta">
                  <Link to={`/profile/${profile.username}`}>
                    <img
                      src={profile.image}
                      alt={profile.username}
                    />
                  </Link>

                  <div className="info">
                    <Link
                      to={`/profile/${profile.username}`}
                      className="author"
                    >
                      {profile.username}
                    </Link>

                    <span className="date">
                      Profile articles will be loaded here.
                    </span>
                  </div>

                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart" /> 0
                  </button>
                </div>

                <div className="preview-link">
                  <h1>No articles yet</h1>
                  <p>
                    Article listing for this profile will be implemented later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
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
