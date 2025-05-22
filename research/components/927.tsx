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
}
export type AutoViewInput = AutoViewInputSubTypes.private_user;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.name ?? value.login;
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const joinDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const onAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = avatarFallback;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 flex flex-col items-center text-gray-800">
      <div className="relative">
        <img
          src={value.avatar_url}
          alt={displayName}
          onError={onAvatarError}
          className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
        />
        {value.site_admin && (
          <span
            className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1"
            title="Site Admin"
          >
            <LucideReact.ShieldCheck size={16} />
          </span>
        )}
      </div>
      <a
        href={value.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-xl font-semibold text-blue-600 hover:underline"
      >
        {displayName}
      </a>
      {value.login && value.name && (
        <p className="text-sm text-gray-500 mt-1">@{value.login}</p>
      )}
      {value.bio && (
        <p className="mt-3 text-center text-gray-700 line-clamp-3">
          {value.bio}
        </p>
      )}

      <div className="mt-4 w-full grid grid-cols-2 gap-4 text-sm">
        {value.company && (
          <div className="flex items-center gap-2 text-gray-600">
            <LucideReact.Briefcase size={16} />
            <span>{value.company}</span>
          </div>
        )}
        {value.location && (
          <div className="flex items-center gap-2 text-gray-600">
            <LucideReact.MapPin size={16} />
            <span>{value.location}</span>
          </div>
        )}
        {value.blog && (
          <div className="flex items-center gap-2 text-gray-600">
            <LucideReact.Link size={16} />
            <a
              href={
                value.blog.startsWith("http")
                  ? value.blog
                  : `https://${value.blog}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline truncate"
            >
              {value.blog.replace(/(^\w+:|^)\/\//, "")}
            </a>
          </div>
        )}
        {value.twitter_username && (
          <div className="flex items-center gap-2 text-gray-600">
            <LucideReact.Twitter size={16} className="text-blue-400" />
            <a
              href={`https://twitter.com/${value.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @{value.twitter_username}
            </a>
          </div>
        )}
        {value.email && (
          <div className="flex items-center gap-2 text-gray-600 col-span-2">
            <LucideReact.Mail size={16} />
            <a
              href={`mailto:${value.email}`}
              className="hover:underline truncate"
            >
              {value.email}
            </a>
          </div>
        )}
      </div>

      <div className="mt-6 w-full flex justify-between border-t pt-4 text-gray-700">
        <div className="flex flex-col items-center">
          <LucideReact.GitBranch size={16} />
          <span className="mt-1 text-sm">{value.public_repos}</span>
          <span className="text-xs text-gray-500">Repos</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Users size={16} />
          <span className="mt-1 text-sm">{value.followers}</span>
          <span className="text-xs text-gray-500">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.UserPlus size={16} />
          <span className="mt-1 text-sm">{value.following}</span>
          <span className="text-xs text-gray-500">Following</span>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 flex items-center">
        <LucideReact.Calendar size={14} />
        <span className="ml-1">Joined {joinDate}</span>
      </div>
    </div>
  );
}
