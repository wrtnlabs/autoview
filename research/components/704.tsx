import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit Comment
     *
     * @title Commit Comment
    */
    export interface commit_comment {
        html_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        body: string;
        path: string | null;
        position: (number & tags.Type<"int32">) | null;
        line: (number & tags.Type<"int32">) | null;
        commit_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: AutoViewInputSubTypes.author_association;
        reactions?: AutoViewInputSubTypes.reaction_rollup;
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
    /**
     * @title Reaction Rollup
    */
    export interface reaction_rollup {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.commit_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const comments = value;
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  const formatAssociation = (
    assoc: AutoViewInputSubTypes.author_association,
  ) =>
    assoc
      .toLowerCase()
      .split('_')
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(' ');

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2">No comments available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const user = comment.user;
        const avatarUrl =
          user?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.login ?? 'User',
          )}&background=random&color=fff`;
        const shortSha = comment.commit_id.slice(0, 7);
        const assocLabel = formatAssociation(comment.author_association);
        const reactions = comment.reactions;

        return (
          <div key={comment.id} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={avatarUrl}
                  alt={user?.login ?? 'User'}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.login ?? 'User',
                    )}&background=random&color=fff`;
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.login ?? 'Unknown'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
              </div>
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {assocLabel}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700 line-clamp-3">
              {comment.body}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-gray-500">
              {comment.path && (
                <div className="flex items-center gap-1 text-sm">
                  <LucideReact.FileText size={16} />
                  <span>
                    {comment.path}
                    {comment.line != null ? `:${comment.line}` : ''}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1 text-sm">
                <LucideReact.GitCommit size={16} />
                <span>{shortSha}</span>
              </div>
              {comment.html_url && (
                <div className="flex items-center gap-1 text-sm max-w-xs truncate">
                  <LucideReact.Link size={16} />
                  <span className="truncate">{comment.html_url}</span>
                </div>
              )}
            </div>
            {reactions && reactions.total_count > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-4 text-gray-600">
                {reactions['+1'] > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <LucideReact.ThumbsUp size={16} />
                    <span>{reactions['+1']}</span>
                  </div>
                )}
                {reactions['-1'] > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <LucideReact.ThumbsDown size={16} />
                    <span>{reactions['-1']}</span>
                  </div>
                )}
                {reactions.laugh > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <LucideReact.Laugh size={16} />
                    <span>{reactions.laugh}</span>
                  </div>
                )}
                {reactions.confused > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <LucideReact.AlertTriangle size={16} />
                    <span>{reactions.confused}</span>
                  </div>
                )}
                {reactions.heart > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <LucideReact.Heart size={16} />
                    <span>{reactions.heart}</span>
                  </div>
                )}
                {reactions.hooray > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <LucideReact.Star size={16} />
                    <span>{reactions.hooray}</span>
                  </div>
                )}
                {reactions.eyes > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <LucideReact.Eye size={16} />
                    <span>{reactions.eyes}</span>
                  </div>
                )}
                {reactions.rocket > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <LucideReact.Rocket size={16} />
                    <span>{reactions.rocket}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
