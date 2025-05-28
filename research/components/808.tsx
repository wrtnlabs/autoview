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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    number,
    title,
    state,
    description,
    open_issues,
    closed_issues,
    created_at,
    due_on,
    creator,
  } = value;

  const totalIssues = open_issues + closed_issues;
  const progress = totalIssues > 0 ? Math.round((closed_issues / totalIssues) * 100) : 0;

  const formatDate = (dateStr?: string | null): string | null =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

  const createdDate = formatDate(created_at);
  const dueDate = formatDate(due_on);

  const creatorLogin = creator?.login ?? "Unknown";
  const initialAvatar =
    creator?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creatorLogin,
    )}&background=random&color=fff`;

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creatorLogin,
    )}&background=random&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
      {/* Header: Title and State */}
      <div className="flex items-center justify-between mb-2">
        <h2
          className="text-gray-800 font-semibold text-lg truncate"
          title={title}
        >
          #{number} {title}
        </h2>
        {state === "closed" ? (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <LucideReact.CheckCircle size={16} className="mr-1" />
            Closed
          </div>
        ) : (
          <div className="flex items-center text-amber-600 text-sm font-medium">
            <LucideReact.Clock size={16} className="mr-1" />
            Open
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
      )}

      {/* Progress Bar */}
      {totalIssues > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        {createdDate && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span title={created_at}>{createdDate}</span>
          </div>
        )}
        {dueDate && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span title={due_on ?? undefined}>Due: {dueDate}</span>
          </div>
        )}
        <div className="flex items-center ml-auto">
          <img
            src={initialAvatar}
            onError={handleAvatarError}
            alt={creatorLogin}
            className="w-6 h-6 rounded-full object-cover mr-1"
          />
          <span>{creatorLogin}</span>
        </div>
      </div>
    </div>
  );
}
