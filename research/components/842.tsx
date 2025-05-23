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
  const reviewerName = value.user?.login || 'Unknown Reviewer';
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    reviewerName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = value.user?.avatar_url || avatarPlaceholder;
  const formattedDate = value.submitted_at
    ? new Date(value.submitted_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Date N/A';
  const commitShort = value.commit_id ? value.commit_id.slice(0, 7) : null;

  // Map review state to icon, color, and label
  const stateLower = value.state.toLowerCase();
  let stateIcon: JSX.Element;
  let stateLabel: string;
  let stateColorClass: string;
  if (stateLower.includes('approved')) {
    stateIcon = <LucideReact.CheckCircle className="text-green-500" size={16} />;
    stateLabel = 'Approved';
    stateColorClass = 'text-green-500';
  } else if (stateLower.includes('changes_requested')) {
    stateIcon = <LucideReact.AlertTriangle className="text-red-500" size={16} />;
    stateLabel = 'Changes Requested';
    stateColorClass = 'text-red-500';
  } else if (stateLower.includes('commented')) {
    stateIcon = <LucideReact.MessageCircle className="text-gray-500" size={16} />;
    stateLabel = 'Commented';
    stateColorClass = 'text-gray-500';
  } else {
    stateIcon = <LucideReact.Clock className="text-amber-500" size={16} />;
    stateLabel = value.state;
    stateColorClass = 'text-amber-500';
  }

  // Transform author association to human-readable
  const associationLabel = value.author_association
    .toLowerCase()
    .split('_')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-start">
        <img
          src={avatarUrl}
          alt={reviewerName}
          className="h-12 w-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.onerror = null;
            target.src = avatarPlaceholder;
          }}
        />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {reviewerName}
            </h3>
            <span className="text-xs uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              {associationLabel}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 space-x-3">
            <div className="flex items-center space-x-1">
              {stateIcon}
              <span className={stateColorClass}>{stateLabel}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar className="text-gray-400" size={16} />
              <span>{formattedDate}</span>
            </div>
            {commitShort && (
              <div className="flex items-center space-x-1">
                <LucideReact.Code className="text-gray-400" size={16} />
                <span className="font-mono text-gray-700">{commitShort}</span>
              </div>
            )}
          </div>
          {value.body && (
            <p className="mt-3 text-gray-700 line-clamp-3">{value.body}</p>
          )}
          <div className="mt-3 flex items-center text-sm text-indigo-600 space-x-1">
            <LucideReact.Link size={16} />
            <span className="truncate">{value.html_url}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
