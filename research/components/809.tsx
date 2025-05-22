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
export type AutoViewInput = AutoViewInputSubTypes.milestone;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    title,
    number,
    state,
    description,
    open_issues,
    closed_issues,
    created_at,
    updated_at,
    closed_at,
    due_on,
    creator,
  } = value;

  // Date parsing and formatting
  const createdDate = new Date(created_at);
  const dueDate = due_on ? new Date(due_on) : null;

  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedDue = dueDate
    ? dueDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Issue completion percentage
  const totalIssues = open_issues + closed_issues;
  const completionPercent =
    totalIssues > 0 ? Math.round((closed_issues / totalIssues) * 100) : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header: Title, Number and State */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          #{number} {title}
        </h2>
        <span
          className={
            state === "open"
              ? "text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium"
              : "text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-medium"
          }
        >
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </span>
      </div>

      {/* Description (truncated) */}
      {description && (
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      )}

      {/* Progress Bar for Issues */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Progress</span>
          <span>{completionPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <div className="text-xs text-gray-500">
          {closed_issues} closed / {open_issues} open
        </div>
      </div>

      {/* Footer: Creator and Dates */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          {creator && creator.avatar_url ? (
            <img
              src={creator.avatar_url}
              alt={creator.login}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">
              {creator?.login ?? "Unknown"}
            </span>
            <span className="text-xs text-gray-500">
              Created {formattedCreated}
            </span>
          </div>
        </div>
        {formattedDue && (
          <div className="text-xs text-gray-500">
            Due {formattedDue}
          </div>
        )}
      </div>
    </div>
  );
}
