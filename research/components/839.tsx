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
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants and helpers
  const reviews = value;
  // Map review state to icon component and color class
  const getStateInfo = (state: string) => {
    switch (state) {
      case "APPROVED":
        return {
          Icon: LucideReact.CheckCircle,
          color: "text-green-500",
          label: "Approved",
        };
      case "CHANGES_REQUESTED":
        return {
          Icon: LucideReact.AlertTriangle,
          color: "text-red-500",
          label: "Changes Requested",
        };
      case "COMMENTED":
        return {
          Icon: LucideReact.MessageCircle,
          color: "text-gray-500",
          label: "Commented",
        };
      case "DISMISSED":
        return {
          Icon: LucideReact.XCircle,
          color: "text-amber-500",
          label: "Dismissed",
        };
      case "PENDING":
        return {
          Icon: LucideReact.Clock,
          color: "text-blue-500",
          label: "Pending",
        };
      default:
        return {
          Icon: LucideReact.FileText,
          color: "text-gray-400",
          label: state,
        };
    }
  };
  const formatDate = (iso?: string) => {
    if (!iso) return "N/A";
    const dt = new Date(iso);
    return dt.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 2. If no reviews, show empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No reviews available</p>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const user = review.user;
        const displayName = user?.name?.trim() || user?.login || "Unknown User";
        const avatarSrc =
          user?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;
        const {
          Icon: StateIcon,
          color: stateColor,
          label: stateLabel,
        } = getStateInfo(review.state);

        return (
          <div
            key={review.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={avatarSrc}
                  alt={`${displayName} avatar`}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      displayName,
                    )}&background=0D8ABC&color=fff`;
                  }}
                />
                <div className="ml-3">
                  <p className="text-gray-900 font-medium truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 uppercase">
                    {review.author_association.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <StateIcon size={16} className={stateColor} />
                <span className="text-sm font-semibold text-gray-700">
                  {stateLabel}
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-700 text-sm line-clamp-3">
              {review.body || "No review comment provided."}
            </p>
            <div className="mt-3 flex items-center text-gray-500 text-sm">
              <LucideReact.Calendar size={16} />
              <span className="ml-1">{formatDate(review.submitted_at)}</span>
              <a
                href={review.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 flex items-center hover:text-blue-500"
              >
                <LucideReact.Link size={16} />
                <span className="ml-1">View</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
