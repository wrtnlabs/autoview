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
  const reviewer = value.user;
  const reviewerName = reviewer?.name ?? reviewer?.login ?? 'Unknown Reviewer';
  const avatarUrl = reviewer?.avatar_url;
  const submittedDate = value.submitted_at
    ? new Date(value.submitted_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Not submitted';
  const commitShort = value.commit_id ? value.commit_id.substring(0, 7) : null;

  // Map review state to labels and colors
  const stateMap: Record<string, { label: string; color: keyof typeof stateClasses }> = {
    APPROVED: { label: 'Approved', color: 'green' },
    CHANGES_REQUESTED: { label: 'Changes Requested', color: 'red' },
    COMMENTED: { label: 'Commented', color: 'blue' },
    DISMISSED: { label: 'Dismissed', color: 'gray' },
    PENDING: { label: 'Pending', color: 'yellow' },
  };
  const defaultState = { label: value.state, color: 'gray' as const };
  const stateInfo = stateMap[value.state.toUpperCase()] ?? defaultState;
  const stateClasses: Record<string, string> = {
    green: 'text-green-800 bg-green-100',
    red: 'text-red-800 bg-red-100',
    blue: 'text-blue-800 bg-blue-100',
    gray: 'text-gray-800 bg-gray-100',
    yellow: 'text-yellow-800 bg-yellow-100',
  };

  // Map author association to label and colors
  const assocKey = value.author_association;
  const assocLabel = assocKey
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const assocColorMap: Record<string, keyof typeof assocClasses> = {
    OWNER: 'purple',
    COLLABORATOR: 'blue',
    MEMBER: 'green',
    CONTRIBUTOR: 'yellow',
    FIRST_TIME_CONTRIBUTOR: 'yellow',
    FIRST_TIMER: 'yellow',
    MANNEQUIN: 'gray',
    NONE: 'gray',
  };
  const assocColor = assocColorMap[assocKey] || 'gray';
  const assocClasses: Record<string, string> = {
    purple: 'text-purple-800 bg-purple-100',
    blue: 'text-blue-800 bg-blue-100',
    green: 'text-green-800 bg-green-100',
    yellow: 'text-yellow-800 bg-yellow-100',
    gray: 'text-gray-800 bg-gray-100',
  };

  const bodyText = value.body_text?.trim() || value.body?.trim() || 'No review comments.';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Reviewer info, state badge, association badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={reviewerName}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{reviewerName}</h2>
            <p className="text-xs text-gray-500">{submittedDate}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-0.5 text-xs font-medium ${stateClasses[stateInfo.color]} rounded-full`}>
            {stateInfo.label}
          </span>
          <span className={`px-2 py-0.5 text-xs font-medium ${assocClasses[assocColor]} rounded-full`}>
            {assocLabel}
          </span>
        </div>
      </div>

      {/* Body preview */}
      <div className="mt-4 text-gray-700 text-sm line-clamp-3">
        {bodyText}
      </div>

      {/* Commit info */}
      {commitShort && (
        <p className="mt-3 text-xs text-gray-500">
          Commit SHA: <span className="font-mono">{commitShort}</span>
        </p>
      )}
    </div>
  );
}
