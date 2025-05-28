import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Contributor
     *
     * @title Contributor
    */
    export interface contributor {
        login?: string;
        id?: number & tags.Type<"int32">;
        node_id?: string;
        avatar_url?: string & tags.Format<"uri">;
        gravatar_id?: string | null;
        url?: string & tags.Format<"uri">;
        html_url?: string & tags.Format<"uri">;
        followers_url?: string & tags.Format<"uri">;
        following_url?: string;
        gists_url?: string;
        starred_url?: string;
        subscriptions_url?: string & tags.Format<"uri">;
        organizations_url?: string & tags.Format<"uri">;
        repos_url?: string & tags.Format<"uri">;
        events_url?: string;
        received_events_url?: string & tags.Format<"uri">;
        type: string;
        site_admin?: boolean;
        contributions: number & tags.Type<"int32">;
        email?: string;
        name?: string;
        user_view_type?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.contributor[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Sort contributors by contributions descending
  const sortedContributors = React.useMemo(
    () =>
      [...value].sort(
        (a, b) =>
          (b.contributions ?? 0) - (a.contributions ?? 0)
      ),
    [value]
  );

  // Fallback placeholder generator for avatars
  const getAvatarSrc = (contributor: AutoViewInputSubTypes.contributor) => {
    if (contributor.avatar_url) return contributor.avatar_url;
    const name = contributor.name || contributor.login || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!sortedContributors.length) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No contributors available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-800">
        <LucideReact.Users size={20} className="mr-2 text-gray-600" />
        Contributors
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sortedContributors.map((contributor) => {
          const login = contributor.login ?? "Unknown";
          const displayName = contributor.name && contributor.name !== login
            ? contributor.name
            : login;
          const contributions = contributor.contributions ?? 0;
          const avatarSrc = getAvatarSrc(contributor);

          return (
            <div
              key={contributor.id ?? login}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="w-16 h-16 mb-2">
                <img
                  src={avatarSrc}
                  alt={login}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </div>
                {displayName !== login && (
                  <div className="text-xs text-gray-500 truncate">
                    @{login}
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center text-gray-600 text-sm">
                <LucideReact.GitCommit size={14} className="mr-1" />
                <span>{contributions.toLocaleString()}</span>
              </div>
              {contributor.site_admin && (
                <div className="mt-1 flex items-center text-blue-500 text-xs">
                  <LucideReact.ShieldCheck size={14} className="mr-1" />
                  <span>Admin</span>
                </div>
              )}
              {contributor.email && (
                <div className="mt-2 flex items-center text-gray-500 text-xs w-full truncate px-2">
                  <LucideReact.Mail size={12} className="mr-1 flex-shrink-0" />
                  <span className="truncate">{contributor.email}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
