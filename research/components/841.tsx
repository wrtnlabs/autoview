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
  // 1. Define data aggregation/transformation
  const userName = value.user?.login || 'Unknown';
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName,
  )}&background=random`;
  const avatarUrl = value.user?.avatar_url || placeholderAvatar;
  const associationLabel = value.author_association
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const submittedAt = value.submitted_at
    ? new Date(value.submitted_at).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Unknown date';
  const shortSha = value.commit_id ? value.commit_id.substring(0, 7) : null;
  // State mapping for icon and color
  let StateIcon = LucideReact.Info;
  let stateLabel =
    value.state.charAt(0).toUpperCase() + value.state.slice(1).toLowerCase();
  let stateColorClass = 'text-gray-500';
  switch (value.state.toLowerCase()) {
    case 'approved':
      StateIcon = LucideReact.CheckCircle;
      stateLabel = 'Approved';
      stateColorClass = 'text-green-600';
      break;
    case 'changes_requested':
    case 'changes requested':
      StateIcon = LucideReact.AlertTriangle;
      stateLabel = 'Changes Requested';
      stateColorClass = 'text-amber-500';
      break;
    case 'commented':
      StateIcon = LucideReact.MessageSquare;
      stateLabel = 'Commented';
      stateColorClass = 'text-blue-500';
      break;
    default:
      StateIcon = LucideReact.Info;
      stateColorClass = 'text-gray-500';
  }
  const bodyPreview = value.body_text ?? value.body ?? 'No review comment.';

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={avatarUrl}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = placeholderAvatar;
          }}
          alt={`${userName} avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium text-gray-900">{userName}</p>
                <p className="text-sm text-gray-500">{associationLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <StateIcon size={16} className={stateColorClass} />
              <span className={`text-sm font-semibold ${stateColorClass}`}>
                {stateLabel}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 gap-2">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>{submittedAt}</span>
            {shortSha && (
              <>
                <LucideReact.GitCommit size={16} className="text-gray-400" />
                <span className="font-mono">{shortSha}</span>
              </>
            )}
          </div>
          <p className="mt-2 text-gray-700 text-sm line-clamp-3">{bodyPreview}</p>
          <div className="mt-3 text-xs text-gray-400 flex items-center gap-1 truncate">
            <LucideReact.Link size={14} className="text-gray-400" />
            <span className="truncate">{value.html_url}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
