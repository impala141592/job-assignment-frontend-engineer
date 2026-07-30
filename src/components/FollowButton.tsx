import { useState } from "react";
import {
  followProfile,
  unfollowProfile,
} from "../api/profiles";
import { useAuth } from "../context/AuthContext";

type Props = {
  username: string;
  following: boolean;
};

export default function FollowButton({
  username,
  following: initialFollowing,
}: Props) {
  const { user } = useAuth();
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;

    setLoading(true);

    try {
      if (following) {
        await unfollowProfile(username);
        setFollowing(false);
      } else {
        await followProfile(username);
        setFollowing(true);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={handleClick}
      disabled={loading}
    >
      <i className="ion-plus-round" />
      &nbsp;
      {following ? "Unfollow" : "Follow"} {username}
    </button>
  );
}