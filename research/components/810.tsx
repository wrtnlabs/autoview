import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A collection of related issues and pull requests.
     *
     * @title Milestone
    */
    export interface milestone {
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
export type AutoViewInput = AutoViewInputSubTypes.milestone;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and transformations
  const totalIssues = value.open_issues + value.closed_issues;
  const percentComplete = totalIssues > 0
    ? Math.round((value.closed_issues / totalIssues) * 100)
    : 0;
  const formattedCreated = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const formattedDue = value.due_on
    ? new Date(value.due_on).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric'
      })
    : null;

  // Fallback avatar placeholder for creator
  const creator = value.creator;
  const avatarPlaceholder = creator
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        (creator.name ?? creator.login)
      )}&background=0D8ABC&color=fff`
    : '';

  // Icons for state
  const StateIcon = () => {
    if (value.state === 'closed') {
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    }
    return <LucideReact.Clock className="text-amber-500" size={16} />;
  };

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col">
      {/* Header: Title, Number & State */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {value.title}
        </h2>
        <div className="flex items-center space-x-1">
          <StateIcon />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {value.state.charAt(0).toUpperCase() + value.state.slice(1)}
          </span>
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        #{value.number}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
        {value.description ?? 'No description provided.'}
      </p>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
        {/* Creator */}
        {creator && (
          <div className="flex items-center space-x-2">
            <img
              src={creator.avatar_url}
              alt={creator.login}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = avatarPlaceholder;
              }}
            />
            <span className="truncate">{creator.login}</span>
          </div>
        )}
        {/* Issues */}
        <div className="flex items-center space-x-2">
          <LucideReact.AlertCircle size={16} className="text-gray-400" />
          <span>
            {value.closed_issues} / {totalIssues} issues closed
          </span>
        </div>
        {/* Created date */}
        <div className="flex items-center space-x-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{formattedCreated}</span>
        </div>
        {/* Due date */}
        {formattedDue && (
          <div className="flex items-center space-x-2">
            <LucideReact.CalendarClock size={16} className="text-gray-400" />
            <span>Due {formattedDue}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          {percentComplete}% Complete
        </p>
      </div>
    </div>
  );
}
