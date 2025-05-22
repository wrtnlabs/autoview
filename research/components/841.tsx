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
  // 1. Data aggregation/transformation
  const reviewer = value.user;
  const name = reviewer?.name || reviewer?.login || "Unknown Reviewer";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = reviewer?.avatar_url || avatarFallback;

  const submittedAt = value.submitted_at;
  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not submitted";

  const stateKey = value.state.toLowerCase() as
    | "approved"
    | "changes_requested"
    | "commented"
    | "pending"
    | "dismissed";
  const stateMapping: Record<
    typeof stateKey,
    { label: string; icon: JSX.Element; textColor: string }
  > = {
    approved: {
      label: "Approved",
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
      textColor: "text-green-500",
    },
    changes_requested: {
      label: "Changes Requested",
      icon: <LucideReact.AlertTriangle className="text-amber-500" size={16} />,
      textColor: "text-amber-500",
    },
    commented: {
      label: "Commented",
      icon: <LucideReact.MessageSquare className="text-blue-500" size={16} />,
      textColor: "text-blue-500",
    },
    pending: {
      label: "Pending",
      icon: <LucideReact.Clock className="text-gray-500" size={16} />,
      textColor: "text-gray-500",
    },
    dismissed: {
      label: "Dismissed",
      icon: <LucideReact.XCircle className="text-red-500" size={16} />,
      textColor: "text-red-500",
    },
  };
  const stateInfo = stateMapping[stateKey] ?? {
    label: value.state,
    icon: <LucideReact.Circle className="text-gray-400" size={16} />,
    textColor: "text-gray-400",
  };

  const shortCommit = value.commit_id ? value.commit_id.slice(0, 7) : null;
  const body = value.body?.trim() || "";

  // 2. Visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={avatarUrl}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = avatarFallback;
            }}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            <p className="flex items-center text-xs text-gray-500">
              <LucideReact.Calendar className="mr-1" size={14} />
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {stateInfo.icon}
          <span className={`text-sm font-semibold ${stateInfo.textColor}`}>
            {stateInfo.label}
          </span>
        </div>
      </div>

      {shortCommit && (
        <p className="mt-2 text-xs text-gray-500">
          <span className="font-medium">Commit:</span> {shortCommit}
        </p>
      )}

      <div className="mt-2 text-sm text-gray-700 line-clamp-3 whitespace-pre-wrap">
        {body}
      </div>
    </div>
  );
}
