import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Private User
     *
     * @title Private User
    */
    export interface private_user {
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
    }
    /**
     * Public User
     *
     * @title Public User
    */
    export interface public_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.private_user | AutoViewInputSubTypes.public_user;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.name ?? value.login;
  const profileUrl = value.html_url;
  const joinDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden mx-auto">
      <div className="p-6 flex flex-col items-center text-center">
        <img
          src={value.avatar_url}
          alt={displayName}
          className="w-24 h-24 rounded-full object-cover"
          onError={(e) => {
            const img = e.currentTarget;
            img.onerror = null;
            img.src = avatarPlaceholder;
          }}
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {displayName}
        </h2>
        <a
          href={profileUrl}
          className="mt-1 text-blue-500 text-sm hover:underline truncate"
        >
          @{value.login}
        </a>
        {value.bio && (
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">
            {value.bio}
          </p>
        )}
        <div className="mt-4 w-full space-y-2 text-gray-500 text-sm">
          {value.company && (
            <div className="flex items-center gap-2">
              <LucideReact.Briefcase size={16} className="flex-shrink-0" />
              <span className="truncate">{value.company}</span>
            </div>
          )}
          {value.location && (
            <div className="flex items-center gap-2">
              <LucideReact.MapPin size={16} className="flex-shrink-0" />
              <span className="truncate">{value.location}</span>
            </div>
          )}
          {value.blog && (
            <div className="flex items-center gap-2">
              <LucideReact.Link size={16} className="flex-shrink-0" />
              <a
                href={
                  value.blog.startsWith("http")
                    ? value.blog
                    : `https://${value.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:underline"
              >
                {value.blog}
              </a>
            </div>
          )}
          {value.email && (
            <div className="flex items-center gap-2">
              <LucideReact.Mail size={16} className="flex-shrink-0" />
              <span className="truncate">{value.email}</span>
            </div>
          )}
          {value.twitter_username && (
            <div className="flex items-center gap-2">
              <LucideReact.Twitter size={16} className="flex-shrink-0" />
              <a
                href={`https://twitter.com/${value.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:underline"
              >
                @{value.twitter_username}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2">
            <LucideReact.Calendar size={16} className="flex-shrink-0" />
            <span>Joined {joinDate}</span>
          </div>
          {value.hireable && (
            <div className="flex items-center gap-2 text-green-600">
              <LucideReact.CheckCircle size={16} className="flex-shrink-0" />
              <span>Hireable</span>
            </div>
          )}
        </div>
        <div className="mt-6 w-full grid grid-cols-4 border-t border-gray-200 pt-4 text-center text-gray-700">
          <div>
            <LucideReact.Github size={20} className="mx-auto text-gray-500" />
            <span className="block text-sm font-medium">
              {value.public_repos}
            </span>
            <span className="block text-xs text-gray-500">Repos</span>
          </div>
          <div>
            <LucideReact.FileText size={20} className="mx-auto text-gray-500" />
            <span className="block text-sm font-medium">
              {value.public_gists}
            </span>
            <span className="block text-xs text-gray-500">Gists</span>
          </div>
          <div>
            <LucideReact.Users size={20} className="mx-auto text-gray-500" />
            <span className="block text-sm font-medium">
              {value.followers}
            </span>
            <span className="block text-xs text-gray-500">Followers</span>
          </div>
          <div>
            <LucideReact.UserPlus size={20} className="mx-auto text-gray-500" />
            <span className="block text-sm font-medium">
              {value.following}
            </span>
            <span className="block text-xs text-gray-500">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}
