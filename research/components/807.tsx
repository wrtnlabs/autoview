import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A collection of related issues and pull requests.
     *
     * @title Milestone
    */
    export type milestone = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        labels_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The number of the milestone.
        */
        number: number & tags.Type<"int32">;
        /**
         * The state of the milestone.
        */
        state: "open" | "closed";
        /**
         * The title of the milestone.
        */
        title: string;
        description: string | null;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        open_issues: number & tags.Type<"int32">;
        closed_issues: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        due_on: (string & tags.Format<"date-time">) | null;
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
export type AutoViewInput = AutoViewInputSubTypes.milestone[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const milestones = React.useMemo(
    () => [...value].sort((a, b) => a.number - b.number),
    [value],
  );

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {milestones.map((ms) => (
        <div
          key={ms.id}
          className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center"
        >
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {ms.title}
              </h3>
              <span className="text-sm text-gray-500 truncate">
                #{ms.number}
              </span>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  ms.state === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {capitalize(ms.state)}
              </span>
            </div>
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {ms.description ?? "No description provided."}
            </p>
            <div className="mt-3 flex flex-wrap text-sm text-gray-500 space-x-4">
              <span>
                Open Issues: <span className="font-medium">{ms.open_issues}</span>
              </span>
              <span>
                Closed Issues: <span className="font-medium">{ms.closed_issues}</span>
              </span>
              <span>
                Due: <span className="font-medium">{formatDate(ms.due_on)}</span>
              </span>
            </div>
          </div>
          {ms.creator && (
            <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center">
              <img
                src={ms.creator.avatar_url}
                alt={ms.creator.login}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="ml-3 text-gray-700 text-sm font-medium truncate">
                {ms.creator.login}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
