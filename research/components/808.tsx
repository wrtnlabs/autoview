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
  const totalIssues = value.open_issues + value.closed_issues;
  const closedPercentage = totalIssues > 0
    ? Math.round((value.closed_issues / totalIssues) * 100)
    : 0;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const formattedCreatedAt = formatDate(value.created_at);
  const formattedUpdatedAt = formatDate(value.updated_at);
  const formattedDueOn = value.due_on ? formatDate(value.due_on) : null;
  const formattedClosedAt = value.closed_at ? formatDate(value.closed_at) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Header: Title, Number, State */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}{' '}
          <span className="text-gray-500 font-medium">#{value.number}</span>
        </h2>
        <span
          className={
            value.state === 'open'
              ? 'px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full'
              : 'px-2 py-1 text-sm bg-red-100 text-red-800 rounded-full'
          }
        >
          {value.state === 'open' ? 'Open' : 'Closed'}
        </span>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-500"
            style={{ width: `${closedPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{value.closed_issues} closed</span>
          <span>{value.open_issues} open</span>
          <span>{closedPercentage}% complete</span>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-600 mb-4">
        <div>
          <span className="font-medium">Created:</span> {formattedCreatedAt}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {formattedUpdatedAt}
        </div>
        {formattedDueOn && (
          <div>
            <span className="font-medium">Due:</span> {formattedDueOn}
          </div>
        )}
        {formattedClosedAt && (
          <div>
            <span className="font-medium">Closed:</span> {formattedClosedAt}
          </div>
        )}
      </div>

      {/* Creator */}
      {value.creator && (
        <div className="flex items-center space-x-3">
          <img
            src={value.creator.avatar_url}
            alt={value.creator.login}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="text-sm">
            <div className="font-medium text-gray-800 truncate">
              {value.creator.login}
            </div>
            {value.creator.name && (
              <div className="text-gray-600 truncate">{value.creator.name}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
