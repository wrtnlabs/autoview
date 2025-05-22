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
  const user = value.user;
  const displayName = user
    ? user.name?.trim() || user.login
    : 'Unknown Reviewer';

  const submittedDate = value.submitted_at
    ? new Date(value.submitted_at)
    : null;
  const formattedDate = submittedDate
    ? submittedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Date Unknown';

  const commitShortId = value.commit_id
    ? value.commit_id.slice(0, 7)
    : 'N/A';

  const bodyPreview = (value.body_text || value.body || '')
    .trim();

  // Map review state to a badge color
  const stateColorMap: Record<string, string> = {
    approved: 'bg-green-100 text-green-800',
    changes_requested: 'bg-red-100 text-red-800',
    commented: 'bg-blue-100 text-blue-800'
  };
  const normalizedState = value.state.toLowerCase().replace(' ', '_');
  const stateBadgeClasses =
    stateColorMap[normalizedState] ||
    'bg-gray-100 text-gray-800';

  // Map author association to a human-friendly label
  const associationLabel = value.author_association
    .split('_')
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(' ');

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <header className="flex items-center p-4">
        <div className="flex-shrink-0">
          <img
            src={user?.avatar_url}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover bg-gray-100"
          />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </p>
          <p className="text-xs text-gray-500">
            {formattedDate}
          </p>
        </div>
        <div className="ml-2 flex flex-col items-end space-y-1">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${stateBadgeClasses}`}
          >
            {value.state.replace('_', ' ')}
          </span>
          <span className="px-2 py-0.5 text-xs text-gray-600 rounded bg-gray-50">
            {associationLabel}
          </span>
        </div>
      </header>
      <section className="px-4 pb-4">
        <div className="text-xs text-gray-500">
          Commit <span className="font-medium text-gray-700">{commitShortId}</span>
        </div>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {bodyPreview || <span className="text-gray-400 italic">No review comments.</span>}
        </p>
      </section>
    </article>
  );
}
