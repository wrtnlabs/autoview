import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Private User
   *
   * @title Private User
   */
  export type private_user = {
    login: string;
    id: number & tags.Type<"int32">;
    user_view_type?: string;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: (string & tags.Format<"email">) | null;
    notification_email?: (string & tags.Format<"email">) | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username?: string | null;
    public_repos: number & tags.Type<"int32">;
    public_gists: number & tags.Type<"int32">;
    followers: number & tags.Type<"int32">;
    following: number & tags.Type<"int32">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    private_gists: number & tags.Type<"int32">;
    total_private_repos: number & tags.Type<"int32">;
    owned_private_repos: number & tags.Type<"int32">;
    disk_usage: number & tags.Type<"int32">;
    collaborators: number & tags.Type<"int32">;
    two_factor_authentication: boolean;
    plan?: {
      collaborators: number & tags.Type<"int32">;
      name: string;
      space: number & tags.Type<"int32">;
      private_repos: number & tags.Type<"int32">;
    };
    business_plus?: boolean;
    ldap_dn?: string;
  };
  /**
   * Public User
   *
   * @title Public User
   */
  export type public_user = {
    login: string;
    id: number & tags.Type<"int32">;
    user_view_type?: string;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: (string & tags.Format<"email">) | null;
    notification_email?: (string & tags.Format<"email">) | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username?: string | null;
    public_repos: number & tags.Type<"int32">;
    public_gists: number & tags.Type<"int32">;
    followers: number & tags.Type<"int32">;
    following: number & tags.Type<"int32">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    plan?: {
      collaborators: number & tags.Type<"int32">;
      name: string;
      space: number & tags.Type<"int32">;
      private_repos: number & tags.Type<"int32">;
    };
    private_gists?: number & tags.Type<"int32">;
    total_private_repos?: number & tags.Type<"int32">;
    owned_private_repos?: number & tags.Type<"int32">;
    disk_usage?: number & tags.Type<"int32">;
    collaborators?: number & tags.Type<"int32">;
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.private_user
  | AutoViewInputSubTypes.public_user;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.name?.trim() || value.login;
  const formattedJoined = React.useMemo(
    () =>
      new Date(value.created_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [value.created_at],
  );
  const [avatarSrc, setAvatarSrc] = React.useState<string>(value.avatar_url);
  const handleImageError = () =>
    setAvatarSrc(
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName,
      )}&background=0D8ABC&color=fff`,
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col items-center p-6">
        <img
          src={avatarSrc}
          onError={handleImageError}
          alt={`${displayName}'s avatar`}
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          {displayName}
        </h2>
        {displayName !== value.login && (
          <span className="text-sm text-gray-500">@{value.login}</span>
        )}
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {value.bio ?? "No bio available"}
        </p>

        <div className="mt-4 space-y-2 w-full">
          {value.company && (
            <div className="flex items-center text-gray-500 text-sm">
              <LucideReact.Building size={16} />
              <span className="ml-1 truncate">{value.company}</span>
            </div>
          )}
          {value.location && (
            <div className="flex items-center text-gray-500 text-sm">
              <LucideReact.MapPin size={16} />
              <span className="ml-1 truncate">{value.location}</span>
            </div>
          )}
          {value.email && (
            <div className="flex items-center text-gray-500 text-sm">
              <LucideReact.Mail size={16} />
              <span className="ml-1 truncate">{value.email}</span>
            </div>
          )}
          {value.blog && (
            <div className="flex items-center text-gray-500 text-sm">
              <LucideReact.Link size={16} />
              <span className="ml-1 truncate">{value.blog}</span>
            </div>
          )}
          {value.twitter_username && (
            <div className="flex items-center text-gray-500 text-sm">
              <LucideReact.Twitter size={16} />
              <span className="ml-1 truncate">@{value.twitter_username}</span>
            </div>
          )}
        </div>

        <div className="mt-5 w-full border-t border-gray-200 pt-4 flex justify-between text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <LucideReact.BookOpen size={16} />
            <span>{value.public_repos} Repos</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Users size={16} />
            <span>{value.followers} Followers</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.UserCheck size={16} />
            <span>{value.following} Following</span>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Joined {formattedJoined}</span>
        </div>
      </div>
    </div>
  );
}
