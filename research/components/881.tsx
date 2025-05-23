import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Contributor Activity
     *
     * @title Contributor Activity
    */
    export interface contributor_activity {
        author: AutoViewInputSubTypes.nullable_simple_user;
        total: number & tags.Type<"int32">;
        weeks: {
            w?: number & tags.Type<"int32">;
            a?: number & tags.Type<"int32">;
            d?: number & tags.Type<"int32">;
            c?: number & tags.Type<"int32">;
        }[];
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
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
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.contributor_activity[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const contributors = value ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (contributors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span className="text-sm">No contributors available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {contributors.map((contrib, idx) => {
        const author = contrib.author;
        const weeks = Array.isArray(contrib.weeks) ? contrib.weeks : [];
        const totalAdds = weeks.reduce((sum, w) => sum + (w.a ?? 0), 0);
        const totalDels = weeks.reduce((sum, w) => sum + (w.d ?? 0), 0);
        const totalCommits = weeks.reduce((sum, w) => sum + (w.c ?? 0), 0);
        const displayName =
          author?.name && author.name.trim() !== "" ? author.name : author?.login ?? "Unknown";
        const avatarSrc =
          author?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

        return (
          <article
            key={idx}
            className="flex flex-col bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <img
                src={avatarSrc}
                alt={displayName}
                className="w-12 h-12 rounded-full object-cover bg-gray-100"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName,
                  )}&background=random`;
                }}
              />
              <div className="ml-3 truncate">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {displayName}
                </h3>
                {author?.login && author.login !== displayName && (
                  <p className="text-xs text-gray-500 truncate">@{author.login}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center text-sm text-gray-600">
              <LucideReact.GitMerge size={16} className="text-gray-500" />
              <span className="ml-1">Total Commits: {contrib.total}</span>
            </div>

            <div className="mt-3 grid grid-cols-3 text-sm font-medium">
              <div className="flex items-center justify-start text-green-600">
                <LucideReact.Plus size={16} />
                <span className="ml-1">{totalAdds}</span>
              </div>
              <div className="flex items-center justify-center text-red-600">
                <LucideReact.Minus size={16} />
                <span className="ml-1">{totalDels}</span>
              </div>
              <div className="flex items-center justify-end text-blue-500">
                <LucideReact.BarChart2 size={16} />
                <span className="ml-1">{totalCommits}</span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
