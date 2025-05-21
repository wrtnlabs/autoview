import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Compute total contributions to derive each contributor's share percentage.
  const totalContributions = value.reduce(
    (acc, contributor) => acc + (contributor.contributions ?? 0),
    0
  )

  // Filter out any entries without a login or contributions
  const contributors = value.filter(
    (contributor) =>
      typeof contributor.login === "string" &&
      typeof contributor.contributions === "number"
  )

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // If no valid contributors, show a fallback message.
  if (contributors.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No contributors available.
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Contributors
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contributors.map((contributor) => {
          const {
            id,
            login,
            name,
            avatar_url,
            contributions,
            site_admin,
          } = contributor

          // Derive a display name and a unique key
          const displayName = name?.trim() ? name : login!
          const key = id ?? login!

          // Compute percent share, rounded to nearest integer
          const percent =
            totalContributions > 0
              ? Math.round((contributions! / totalContributions) * 100)
              : 0

          return (
            <li
              key={key}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
            >
              {/* Avatar */}
              <img
                src={avatar_url || undefined}
                alt={displayName}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />

              {/* Textual Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 font-medium truncate">
                    {displayName}
                  </span>
                  {site_admin && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <div className="text-gray-500 text-sm">
                  {contributions!.toLocaleString()} contributions
                </div>

                {/* Contribution share bar */}
                <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-2"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Percentage Label */}
              <span className="text-gray-600 text-sm flex-shrink-0">
                {percent}%
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
