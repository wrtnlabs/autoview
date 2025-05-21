import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * An entry in the reviews log for environment deployments
     *
     * @title Environment Approval
    */
    export type environment_approvals = {
        /**
         * The list of environments that were approved or rejected
        */
        environments: {
            /**
             * The id of the environment.
            */
            id?: number & tags.Type<"int32">;
            node_id?: string;
            /**
             * The name of the environment.
            */
            name?: string;
            url?: string;
            html_url?: string;
            /**
             * The time that the environment was created, in ISO 8601 format.
            */
            created_at?: string;
            /**
             * The time that the environment was last updated, in ISO 8601 format.
            */
            updated_at?: string;
        }[];
        /**
         * Whether deployment to the environment(s) was approved or rejected or pending (with comments)
        */
        state: "approved" | "rejected" | "pending";
        user: AutoViewInputSubTypes.simple_user;
        /**
         * The comment submitted with the deployment review
        */
        comment: string;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.environment_approvals[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateColorMap: Record<string, { bg: string; text: string }> = {
    approved:   { bg: "bg-green-100",  text: "text-green-800" },
    pending:    { bg: "bg-yellow-100", text: "text-yellow-800" },
    rejected:   { bg: "bg-red-100",    text: "text-red-800" },
  };

  // If there are no approvals, show a placeholder message.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No environment approvals found.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((entry, idx) => {
        // Extract environment names, filtering out any undefined.
        const envNames = entry.environments
          .map(env => env.name)
          .filter((name): name is string => Boolean(name));

        // Determine the most recent update across all environments.
        const lastUpdatedIso = entry.environments.reduce<string>((acc, env) => {
          if (!env.updated_at) return acc;
          if (!acc) return env.updated_at;
          return new Date(env.updated_at) > new Date(acc) ? env.updated_at : acc;
        }, "");

        const formattedDate = lastUpdatedIso
          ? new Date(lastUpdatedIso).toLocaleString()
          : "";

        // Use the user's display name if available, otherwise fallback to login.
        const displayName = entry.user.name ?? entry.user.login;

        // Badge styling based on approval state.
        const badgeStyles = stateColorMap[entry.state] ?? stateColorMap.pending;

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow transition-shadow hover:shadow-md"
          >
            {/* Header: Avatar, Name, State Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={entry.user.avatar_url}
                  alt={displayName}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div className="truncate">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {displayName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    @{entry.user.login}
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${badgeStyles.bg} ${badgeStyles.text}`}
              >
                {entry.state.charAt(0).toUpperCase() + entry.state.slice(1)}
              </span>
            </div>

            {/* Environment Tags */}
            {envNames.length > 0 && (
              <div className="mt-3 flex flex-wrap">
                {envNames.map((env, i) => (
                  <span
                    key={i}
                    className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                  >
                    {env}
                  </span>
                ))}
              </div>
            )}

            {/* Comment (truncated to two lines) */}
            <p className="mt-2 text-sm text-gray-700 line-clamp-2">
              {entry.comment || "No comment provided."}
            </p>

            {/* Last Updated Timestamp */}
            {formattedDate && (
              <div className="mt-2 text-xs text-gray-400">
                Last Updated: {formattedDate}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
