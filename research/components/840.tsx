import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Pull Request Reviews are reviews on pull requests.
     *
     * @title Pull Request Review
    */
    export interface pull_request_review {
        /**
         * Unique identifier of the review
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The text of the review.
        */
        body: string;
        state: string;
        html_url: string & tags.Format<"uri">;
        pull_request_url: string & tags.Format<"uri">;
        _links: {
            html: {
                href: string;
            };
            pull_request: {
                href: string;
            };
        };
        submitted_at?: string & tags.Format<"date-time">;
        /**
         * A commit SHA for the review. If the commit object was garbage collected or forcibly deleted, then it no longer exists in Git and this value will be `null`.
        */
        commit_id: string | null;
        body_html?: string;
        body_text?: string;
        author_association: AutoViewInputSubTypes.author_association;
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
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const displayName = user?.name || user?.login || "Unknown User";
  const avatarSrc = user?.avatar_url;
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;

  // Humanize author association: e.g. "FIRST_TIMER" → "First timer"
  const assocRaw = value.author_association;
  const association = assocRaw
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Format submitted date
  const submittedAt = value.submitted_at
    ? new Date(value.submitted_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  // Shorten commit id
  const commitShort =
    typeof value.commit_id === "string" && value.commit_id.length > 0
      ? value.commit_id.slice(0, 7)
      : null;

  // Map state to label and icon
  let statusLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1).toLowerCase();
  let statusIcon = <LucideReact.MessageSquare className="text-gray-500" size={16} />;
  if (value.state.toUpperCase() === "APPROVED") {
    statusLabel = "Approved";
    statusIcon = <LucideReact.CheckCircle className="text-green-500" size={16} />;
  } else if (value.state.toUpperCase() === "CHANGES_REQUESTED") {
    statusLabel = "Changes Requested";
    statusIcon = <LucideReact.XCircle className="text-red-500" size={16} />;
  } else if (value.state.toUpperCase() === "COMMENTED") {
    statusLabel = "Commented";
    statusIcon = <LucideReact.MessageSquare className="text-blue-500" size={16} />;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-4">
      {/* Header: Avatar and user info */}
      <div className="flex items-center">
        <img
          src={avatarSrc || fallbackAvatar}
          alt={`${displayName} avatar`}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (img.src !== fallbackAvatar) img.src = fallbackAvatar;
          }}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3 flex flex-col">
          <span className="text-sm font-medium text-gray-900">{displayName}</span>
          {user?.login && (
            <span className="text-xs text-gray-500">@{user.login}</span>
          )}
        </div>
        <span className="ml-auto px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
          {association}
        </span>
      </div>

      {/* Status, Date, Commit */}
      <div className="mt-4 flex flex-wrap items-center text-sm text-gray-700 gap-x-4 gap-y-2">
        <div className="flex items-center gap-1">
          {statusIcon}
          <span>{statusLabel}</span>
        </div>
        {submittedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span>{submittedAt}</span>
          </div>
        )}
        {commitShort && (
          <div className="flex items-center gap-1">
            <LucideReact.GitCommit className="text-gray-400" size={16} />
            <span>{commitShort}</span>
          </div>
        )}
      </div>

      {/* Review Body */}
      {(value.body_text || value.body) && (
        <p className="mt-3 text-sm text-gray-700 line-clamp-3">
          {value.body_text || value.body}
        </p>
      )}
    </div>
  );
}
