import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Pull Request Reviews are reviews on pull requests.
   *
   * @title Pull Request Review
   */
  export type pull_request_review = {
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
  /**
   * How the author is associated with the repository.
   *
   * @title author_association
   */
  export type author_association =
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived display values
  const reviewer = value.user;
  const reviewerName = reviewer?.name || reviewer?.login || "Unknown Reviewer";
  const avatarSrc =
    reviewer?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      reviewerName,
    )}&background=random`;

  // Map review state to icon and color
  let StateIcon = LucideReact.Circle;
  let stateColor = "text-gray-400";
  const stateKey = value.state.toLowerCase();
  if (stateKey === "approved") {
    StateIcon = LucideReact.CheckCircle;
    stateColor = "text-green-500";
  } else if (stateKey === "changes_requested") {
    StateIcon = LucideReact.AlertTriangle;
    stateColor = "text-red-500";
  } else if (stateKey === "commented") {
    StateIcon = LucideReact.MessageCircle;
    stateColor = "text-blue-500";
  }

  // Format submitted date
  const submittedAt = value.submitted_at
    ? new Date(value.submitted_at).toLocaleString()
    : "Unknown date";

  // Commit SHA short form
  const shortCommit = value.commit_id ? `${value.commit_id.slice(0, 7)}` : null;

  // Association badge text
  const associationText = value.author_association
    .split("_")
    .map((part) => part[0] + part.slice(1).toLowerCase())
    .join(" ");

  // Body content (prefer text, fallback to body)
  const bodyContent = value.body_text || value.body || "No review content.";

  // JSX
  return (
    <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md">
      {/* Header: reviewer & state */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {reviewer ? (
            <img
              src={avatarSrc}
              alt={reviewerName}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  reviewerName,
                )}&background=random`;
              }}
            />
          ) : (
            <LucideReact.User size={40} className="text-gray-300" />
          )}
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{reviewerName}</p>
            {reviewer?.login && (
              <p className="text-xs text-gray-500">@{reviewer.login}</p>
            )}
          </div>
        </div>
        <div className="flex items-center text-sm font-semibold uppercase">
          <StateIcon className={`${stateColor} mr-1`} size={16} />
          {value.state}
        </div>
      </div>

      {/* Association badge */}
      <div className="mt-2">
        <span className="inline-block text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
          {associationText}
        </span>
      </div>

      {/* Review body */}
      <div className="mt-3 text-sm text-gray-700 line-clamp-3">
        {bodyContent}
      </div>

      {/* Footer: date, commit, link */}
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={14} className="mr-1" />
          {submittedAt}
        </div>
        {shortCommit && (
          <div className="flex items-center ml-4">
            <LucideReact.GitCommit size={14} className="mr-1" />
            {shortCommit}
          </div>
        )}
        <a
          href={value.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          <LucideReact.Link size={16} />
        </a>
      </div>
    </div>
  );
}
