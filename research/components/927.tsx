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
}
export type AutoViewInput = AutoViewInputSubTypes.private_user;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.name ?? value.login;
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const formattedJoinDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" },
  );
  const handleAvatarError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = avatarFallback;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={value.avatar_url}
          alt={`${displayName} avatar`}
          onError={handleAvatarError}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{displayName}</h2>
          <p className="text-sm text-gray-500">@{value.login}</p>
        </div>
      </div>

      {value.bio && (
        <p className="mt-4 text-gray-700 line-clamp-3">{value.bio}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
        {value.company && (
          <div className="flex items-center gap-1">
            <LucideReact.Briefcase size={16} className="text-gray-400" />
            <span>{value.company}</span>
          </div>
        )}
        {value.location && (
          <div className="flex items-center gap-1">
            <LucideReact.MapPin size={16} className="text-gray-400" />
            <span>{value.location}</span>
          </div>
        )}
        {value.blog && (
          <div className="flex items-center gap-1 max-w-xs">
            <LucideReact.Link size={16} className="text-gray-400" />
            <a
              href={value.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 truncate"
            >
              {value.blog}
            </a>
          </div>
        )}
        {value.email && (
          <div className="flex items-center gap-1">
            <LucideReact.Mail size={16} className="text-gray-400" />
            <span>{value.email}</span>
          </div>
        )}
        {value.twitter_username && (
          <div className="flex items-center gap-1">
            <LucideReact.Twitter size={16} className="text-blue-400" />
            <a
              href={`https://twitter.com/${value.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              @{value.twitter_username}
            </a>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Github size={16} className="text-gray-400" />
          <span>{value.public_repos} Repos</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.FileText size={16} className="text-gray-400" />
          <span>{value.public_gists} Gists</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} className="text-gray-400" />
          <span>{value.followers} Followers</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.User size={16} className="text-gray-400" />
          <span>{value.following} Following</span>
        </div>
      </div>

      <div className="mt-4 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="mr-1" />
        <span>Joined {formattedJoinDate}</span>
      </div>
    </div>
  );
}
