import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Contributor
   *
   * @title Contributor
   */
  export type contributor = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.contributor[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived and transformation logic
  const sortedContributors = React.useMemo(
    () =>
      [...value].sort(
        (a, b) => (b.contributions ?? 0) - (a.contributions ?? 0),
      ),
    [value],
  );

  const getPlaceholder = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="p-4 bg-gray-50">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedContributors.length > 0 ? (
          sortedContributors.map((contributor, idx) => {
            const displayName =
              contributor.name?.trim() || contributor.login || "Unknown";
            const avatarSrc =
              contributor.avatar_url || getPlaceholder(displayName);

            return (
              <div
                key={idx}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mb-2">
                  <img
                    src={avatarSrc}
                    alt={displayName}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.onerror = null;
                      img.src = getPlaceholder(displayName);
                    }}
                  />
                </div>
                <div className="text-sm font-medium text-gray-900 truncate text-center">
                  {displayName}
                </div>
                {contributor.login && (
                  <div className="text-xs text-gray-500 truncate">
                    {contributor.login}
                  </div>
                )}
                <div className="mt-1 text-xs text-gray-700 flex items-center gap-1">
                  <LucideReact.BarChart2 size={16} className="text-gray-400" />
                  <span>{contributor.contributions} contributions</span>
                </div>
                {contributor.site_admin && (
                  <div className="mt-1 flex items-center text-red-500 text-xs">
                    <LucideReact.ShieldCheck size={14} className="mr-1" />
                    <span>Admin</span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-gray-400">
            <LucideReact.AlertCircle size={48} className="mb-2" />
            <span>No contributors found.</span>
          </div>
        )}
      </div>
    </div>
  );
}
