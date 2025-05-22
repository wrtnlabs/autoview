import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const authorName = value.user?.name ?? value.user?.login ?? "Unknown";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = value.user?.avatar_url || avatarFallback;
  const submittedDate = value.submitted_at
    ? new Date(value.submitted_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";
  const commitShort = value.commit_id ? value.commit_id.substring(0, 7) : null;

  const stateKey = value.state.toLowerCase();
  let StateIcon = LucideReact.MessageCircle;
  let stateColor = "text-blue-500";
  let stateLabel =
    value.state.charAt(0).toUpperCase() + value.state.slice(1).toLowerCase();

  if (stateKey === "approved") {
    StateIcon = LucideReact.CheckCircle;
    stateColor = "text-green-500";
    stateLabel = "Approved";
  } else if (stateKey === "changes_requested") {
    StateIcon = LucideReact.XCircle;
    stateColor = "text-red-500";
    stateLabel = "Changes Requested";
  } else if (stateKey === "commented") {
    StateIcon = LucideReact.MessageCircle;
    stateColor = "text-blue-500";
    stateLabel = "Commented";
  } else {
    StateIcon = LucideReact.Clock;
    stateColor = "text-gray-500";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow flex flex-col gap-4 max-w-md mx-auto">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <img
            src={avatarSrc}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = avatarFallback;
            }}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-semibold">{authorName}</span>
              <span className="text-xs uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {value.author_association.replace(/_/g, " ")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <StateIcon className={stateColor} size={16} />
              <span>{stateLabel}</span>
              <LucideReact.Calendar className="text-gray-400" size={16} />
              <span>{submittedDate}</span>
            </div>
          </div>
        </div>
        {commitShort && (
          <div className="flex items-center text-sm text-gray-500 gap-1">
            <LucideReact.Hash size={16} />
            <span className="font-mono">{commitShort}</span>
          </div>
        )}
      </div>
      {value.body_text || value.body ? (
        <p className="text-gray-700 text-sm line-clamp-3">
          {value.body_text || value.body}
        </p>
      ) : (
        <p className="text-gray-400 italic text-sm">No review comments.</p>
      )}
    </div>
  );
}
