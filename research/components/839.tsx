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
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Sort reviews by submission date (newest first)
  const sortedReviews = [...value].sort((a, b) => {
    const ta = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
    const tb = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
    return tb - ta;
  });

  // Badge color mapping for review states
  const badgeClasses: Record<string, string> = {
    APPROVED: 'bg-green-100 text-green-800',
    CHANGES_REQUESTED: 'bg-red-100 text-red-800',
    COMMENTED: 'bg-blue-100 text-blue-800',
    DISMISSED: 'bg-gray-100 text-gray-800',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto space-y-4">
      {sortedReviews.map((review, idx) => {
        const user = review.user;
        const displayName = user ? (user.name || user.login) : 'Unknown reviewer';
        const avatarUrl = user?.avatar_url || '';
        const rawText = review.body_text?.trim() || review.body || '';
        const content =
          rawText.length > 200 ? rawText.slice(0, 200).trimEnd() + '…' : rawText;
        const dateLabel = review.submitted_at
          ? new Date(review.submitted_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Unsubmitted';
        const stateClass = badgeClasses[review.state] || badgeClasses['DISMISSED'];

        return (
          <div
            key={idx}
            className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow"
          >
            {avatarUrl ? (
              <img
                className="w-10 h-10 rounded-full flex-shrink-0"
                src={avatarUrl}
                alt={displayName}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {displayName}
                </h3>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${stateClass}`}
                >
                  {review.state.replace('_', ' ')}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{dateLabel}</p>
              {content && (
                <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                  {content}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
