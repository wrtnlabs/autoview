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
  const createdAtFormatted = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedAtFormatted = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const dueOnFormatted = value.due_on
    ? new Date(value.due_on).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const closedOnFormatted = value.closed_at
    ? new Date(value.closed_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const totalIssues = value.open_issues + value.closed_issues;
  const completionRate =
    totalIssues > 0 ? Math.round((value.closed_issues / totalIssues) * 100) : 0;

  const creatorName = value.creator?.name ?? value.creator?.login ?? "Unknown";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = value.creator?.avatar_url ?? avatarPlaceholder;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm sm:p-6">
      {/* Header: Number, Title, Status */}
      <div className="flex justify-between items-start">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            <span className="text-indigo-600">#{value.number}</span>{" "}
            {value.title}
          </h3>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${
            value.state === "open"
              ? "bg-amber-100 text-amber-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {value.state === "open" ? (
            <LucideReact.Clock className="mr-1" size={14} />
          ) : (
            <LucideReact.CheckCircle className="mr-1" size={14} />
          )}
          {value.state.charAt(0).toUpperCase() + value.state.slice(1)}
        </span>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-700 text-sm mt-2 line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Metadata: Dates & Creator */}
      <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={14} />
          <span title={value.created_at}>Created: {createdAtFormatted}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock className="mr-1" size={14} />
          <span title={value.updated_at}>Updated: {updatedAtFormatted}</span>
        </div>
        {dueOnFormatted && (
          <div className="flex items-center">
            <LucideReact.Calendar className="mr-1" size={14} />
            <span title={dueOnFormatted}>{`Due: ${dueOnFormatted}`}</span>
          </div>
        )}
        {closedOnFormatted && (
          <div className="flex items-center">
            <LucideReact.Calendar className="mr-1" size={14} />
            <span title={closedOnFormatted}>{`Closed: ${closedOnFormatted}`}</span>
          </div>
        )}
        <div className="flex items-center">
          <img
            src={avatarUrl}
            alt={creatorName}
            className="w-6 h-6 rounded-full object-cover mr-1"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.src = avatarPlaceholder;
            }}
          />
          <span>By {creatorName}</span>
        </div>
      </div>

      {/* Issue Progress */}
      <div className="mt-4">
        <div className="flex justify-between mb-1 text-sm text-gray-600">
          <span>Progress</span>
          <span>
            {value.closed_issues} / {totalIssues}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
