import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Contributor Activity
     *
     * @title Contributor Activity
    */
    export type contributor_activity = {
        author: AutoViewInputSubTypes.nullable_simple_user;
        total: number & tags.Type<"int32">;
        weeks: {
            w?: number & tags.Type<"int32">;
            a?: number & tags.Type<"int32">;
            d?: number & tags.Type<"int32">;
            c?: number & tags.Type<"int32">;
        }[];
    };
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
  // 1. Data transformation: ensure we have an array
  const contributions = Array.isArray(value) ? value : [];

  // 2. Early return if no data
  if (contributions.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No contributor activity to display.
      </div>
    );
  }

  // 3. Render list of contributor cards
  return (
    <div className="space-y-4">
      {contributions.map((item, index) => {
        // Derive author info
        const author = item.author;
        const name = author?.name?.trim() || author?.login || "Unknown";
        const avatar = author?.avatar_url || "";
        // Extract commit counts per week
        const commits = item.weeks.map((wk) => wk.c ?? 0);
        const maxCommits = commits.length > 0 ? Math.max(...commits) : 0;

        return (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center bg-white p-4 rounded-lg shadow"
          >
            {avatar ? (
              <img
                src={avatar}
                alt={`${name}'s avatar`}
                className="w-10 h-10 rounded-full flex-shrink-0 mr-4"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                ?
              </div>
            )}
            <div className="flex-1 w-full">
              <h3 className="text-gray-900 font-medium truncate">{name}</h3>
              <p className="text-sm text-gray-600">
                Total Contributions:{" "}
                <span className="font-semibold text-gray-800">{item.total}</span>
              </p>
              {commits.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-end space-x-1 h-16 overflow-hidden">
                    {commits.map((count, idx) => {
                      // Calculate bar height percent
                      const heightPct =
                        maxCommits > 0 ? (count / maxCommits) * 100 : 0;
                      return (
                        <div
                          key={idx}
                          title={`${count} commits`}
                          style={{ height: `${heightPct}%` }}
                          className="w-1 bg-blue-500 flex-shrink-0 rounded"
                        />
                      );
                    })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last {commits.length} weeks
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
