import { tags } from "typia";
import React from "react";
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
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const username = value.user?.login ?? "Unknown User";
  const avatarUrl = value.user?.avatar_url;
  const submittedAt = value.submitted_at
    ? new Date(value.submitted_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Unknown date";
  const commitShort =
    typeof value.commit_id === "string" && value.commit_id.length > 7
      ? value.commit_id.substring(0, 7)
      : value.commit_id ?? "—";
  // State badge styling
  const stateKey = value.state.toLowerCase();
  const stateStyles =
    stateKey === "approved"
      ? "bg-green-100 text-green-800"
      : stateKey === "changes_requested" || stateKey === "changes-requested"
      ? "bg-red-100 text-red-800"
      : stateKey === "commented" || stateKey === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";
  const stateLabel = value.state
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  // Author association display
  const assocLabel = value.author_association
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  // Body text fallback
  const bodyText = value.body_text
    ? value.body_text
    : value.body
    ? value.body
    : "No review content.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header: Avatar, Username, Association, Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username} avatar`}
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              ?
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 truncate">
              {username}
            </span>
            <span className="text-xs text-gray-500">{assocLabel}</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {submittedAt}
        </span>
      </div>

      {/* Review State and Commit */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${stateStyles}`}
        >
          {stateLabel}
        </span>
        <span className="text-xs text-gray-500 font-mono">
          {commitShort}
        </span>
      </div>

      {/* Body Preview */}
      <p className="mt-4 text-gray-700 text-sm line-clamp-3">
        {bodyText}
      </p>
    </div>
  );
}
