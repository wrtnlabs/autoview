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
  // 1. Define data aggregation/transformation functions or derived constants.
  const totalIssues = value.open_issues + value.closed_issues;
  const closedPercentage = totalIssues
    ? Math.round((value.closed_issues / totalIssues) * 100)
    : 0;
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <header className="flex items-start justify-between">
        <h2 className="flex-1 pr-2 text-lg font-semibold text-gray-800 truncate">
          #{value.number} {value.title}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-semibold uppercase rounded ${
            value.state === 'open'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value.state}
        </span>
      </header>

      {value.description && (
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {value.description}
        </p>
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {value.closed_issues}/{totalIssues} issues closed
          </span>
          <span>{closedPercentage}%</span>
        </div>
        <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${closedPercentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created:</span>{' '}
          {formatDate(value.created_at)}
        </div>
        <div>
          <span className="font-medium">Due:</span>{' '}
          {value.due_on ? formatDate(value.due_on) : '—'}
        </div>
        <div>
          <span className="font-medium">Updated:</span>{' '}
          {formatDate(value.updated_at)}
        </div>
        {value.closed_at && (
          <div>
            <span className="font-medium">Closed:</span>{' '}
            {formatDate(value.closed_at)}
          </div>
        )}
      </div>

      {value.creator && (
        <div className="mt-4 flex items-center">
          <img
            src={value.creator.avatar_url}
            alt={value.creator.login}
            className="h-8 w-8 rounded-full"
          />
          <div className="ml-3 text-sm text-gray-800">
            <div>{value.creator.name ?? value.creator.login}</div>
            <div className="text-gray-500 text-xs">Creator</div>
          </div>
        </div>
      )}
    </div>
  );
}
