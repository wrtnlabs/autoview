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
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to format ISO date strings to "MMM d, YYYY"
  const formatDate = (dateStr?: string): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  // Map review.state to an icon
  const stateIcon = (state: string): JSX.Element => {
    switch (state.toUpperCase()) {
      case "APPROVED":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "CHANGES_REQUESTED":
        return <LucideReact.AlertTriangle className="text-amber-500" size={16} />;
      case "COMMENTED":
        return <LucideReact.MessageCircle className="text-gray-500" size={16} />;
      case "DISMISSED":
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      default:
        return <LucideReact.FileText className="text-blue-500" size={16} />;
    }
  };

  // Icons for metadata
  const calendarIcon = <LucideReact.Calendar className="text-gray-400" size={16} />;
  const commitIcon = <LucideReact.Code className="text-gray-400" size={16} />;

  // Fallback avatar generator
  const avatarFallback = (login: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

  // Handle empty list
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2">No reviews available</p>
      </div>
    );
  }

  // Main render: list of review cards
  return (
    <div className="space-y-4">
      {value.map((review) => {
        const user = review.user;
        const login = user?.login ?? "Unknown user";
        const avatarUrl = user?.avatar_url ?? avatarFallback(login);
        const truncatedCommit = review.commit_id
          ? review.commit_id.substring(0, 7)
          : null;
        const stateText = review.state.toLowerCase().replace(/_/g, " ");

        return (
          <div key={review.id} className="flex bg-white rounded-lg shadow p-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {avatarUrl ? (
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={avatarUrl}
                  alt={login}
                  onError={(e) => {
                    e.currentTarget.src = avatarFallback(login);
                  }}
                />
              ) : (
                <LucideReact.User className="h-12 w-12 text-gray-300" />
              )}
            </div>

            {/* Content */}
            <div className="ml-4 flex-1 flex flex-col">
              {/* Header: user and state */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{login}</span>
                <div className="flex items-center gap-1">
                  {stateIcon(review.state)}
                  <span className="text-sm text-gray-600 capitalize">{stateText}</span>
                </div>
              </div>

              {/* Submitted date */}
              {review.submitted_at && (
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  {calendarIcon}
                  <span className="ml-1">{formatDate(review.submitted_at)}</span>
                </div>
              )}

              {/* Review body (truncated) */}
              <div className="mt-2 flex-1">
                <p className="text-sm text-gray-700 line-clamp-3">{review.body}</p>
              </div>

              {/* Footer: commit & association */}
              <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                {truncatedCommit && (
                  <div className="flex items-center">
                    {commitIcon}
                    <span className="ml-1 font-mono">{truncatedCommit}</span>
                  </div>
                )}
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                  {review.author_association.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
