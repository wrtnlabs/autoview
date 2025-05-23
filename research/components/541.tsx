import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export interface team_discussion_comment {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the comment.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        discussion_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion comment.
        */
        number: number & tags.Type<"int32">;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const editedDate = value.last_edited_at ? new Date(value.last_edited_at) : null;
  const formattedEditedAt = editedDate
    ? editedDate.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : null;

  const author = value.author;
  const authorName = author ? author.name ?? author.login : 'Unknown';
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = author?.avatar_url ?? avatarPlaceholder;

  // Prepare reactions if available
  const reactions = value.reactions;
  type ReactionItem = { key: string; icon: React.ReactNode; count: number; ariaLabel: string };
  const reactionItems: ReactionItem[] = reactions
    ? [
        { key: '+1', icon: <LucideReact.ThumbsUp size={16} />, count: reactions['+1'], ariaLabel: 'Thumbs up' },
        { key: '-1', icon: <LucideReact.ThumbsDown size={16} />, count: reactions['-1'], ariaLabel: 'Thumbs down' },
        { key: 'laugh', icon: <LucideReact.Smile size={16} className="text-green-500" />, count: reactions.laugh, ariaLabel: 'Laugh' },
        { key: 'confused', icon: <span className="text-gray-600">😕</span>, count: reactions.confused, ariaLabel: 'Confused' },
        { key: 'heart', icon: <LucideReact.Heart size={16} className="text-red-500" />, count: reactions.heart, ariaLabel: 'Heart' },
        { key: 'hooray', icon: <span className="text-amber-500">🎉</span>, count: reactions.hooray, ariaLabel: 'Hooray' },
        { key: 'eyes', icon: <LucideReact.Eye size={16} />, count: reactions.eyes, ariaLabel: 'Eyes' },
        { key: 'rocket', icon: <LucideReact.Rocket size={16} />, count: reactions.rocket, ariaLabel: 'Rocket' },
      ].filter(item => item.count > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
      {/* Header: avatar, author, timestamps, comment number */}
      <div className="flex items-center space-x-3">
        <img
          src={avatarUrl}
          alt={authorName}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = avatarPlaceholder;
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">{authorName}</div>
          <div className="flex items-center text-xs text-gray-500 space-x-1">
            <LucideReact.Calendar size={14} />
            <span>{formattedCreatedAt}</span>
            {formattedEditedAt && (
              <>
                <span>•</span>
                <span>edited {formattedEditedAt}</span>
              </>
            )}
          </div>
        </div>
        <div className="text-xs text-gray-400">#{value.number}</div>
      </div>

      {/* Comment content */}
      <div
        className="prose prose-sm max-w-none text-gray-800 break-words line-clamp-4"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Reactions summary */}
      {reactionItems.length > 0 && (
        <div className="flex items-center space-x-4 pt-2 border-t border-gray-200">
          {reactionItems.map(item => (
            <div
              key={item.key}
              className="flex items-center text-sm text-gray-600 space-x-1"
              aria-label={item.ariaLabel}
            >
              {item.icon}
              <span>{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
