import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit Comment
     *
     * @title Commit Comment
    */
    export type commit_comment = {
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
    /**
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.commit_comment;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define derived constants and formatting functions.
  const user = value.user;
  const userLogin = user?.login ?? 'Unknown';
  const avatarUrl = user?.avatar_url ?? '';
  const formatAssociation = (assoc: AutoViewInputSubTypes.author_association): string =>
    assoc
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  const authorAssociation = formatAssociation(value.author_association);
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const fileLocation = value.path ? `${value.path}:${value.line ?? value.position}` : null;

  const emojiMap: Record<string, string> = {
    '+1': '👍',
    '-1': '👎',
    laugh: '😄',
    confused: '😕',
    heart: '❤️',
    hooray: '🎉',
    eyes: '👀',
    rocket: '🚀',
  };
  const reactionList: { type: string; count: number }[] = [];
  if (value.reactions) {
    if (value.reactions['+1'] > 0) reactionList.push({ type: '+1', count: value.reactions['+1'] });
    if (value.reactions['-1'] > 0) reactionList.push({ type: '-1', count: value.reactions['-1'] });
    if (value.reactions.laugh > 0) reactionList.push({ type: 'laugh', count: value.reactions.laugh });
    if (value.reactions.confused > 0)
      reactionList.push({ type: 'confused', count: value.reactions.confused });
    if (value.reactions.heart > 0) reactionList.push({ type: 'heart', count: value.reactions.heart });
    if (value.reactions.hooray > 0)
      reactionList.push({ type: 'hooray', count: value.reactions.hooray });
    if (value.reactions.eyes > 0) reactionList.push({ type: 'eyes', count: value.reactions.eyes });
    if (value.reactions.rocket > 0)
      reactionList.push({ type: 'rocket', count: value.reactions.rocket });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {avatarUrl && (
            <img src={avatarUrl} alt={userLogin} className="w-8 h-8 rounded-full mr-2" />
          )}
          <div className="flex items-baseline">
            <span className="font-medium text-gray-900 mr-2">{userLogin}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              {authorAssociation}
            </span>
          </div>
        </div>
        <time dateTime={value.created_at} className="text-xs text-gray-500">
          {formattedDate}
        </time>
      </div>

      <p className="text-gray-700 text-sm mb-3 overflow-hidden line-clamp-3">
        {value.body}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        {fileLocation && <span className="truncate">{fileLocation}</span>}
        {reactionList.length > 0 && (
          <div className="flex items-center space-x-2">
            {reactionList.map((r) => (
              <span key={r.type} className="flex items-center">
                <span className="mr-0.5">{emojiMap[r.type]}</span>
                {r.count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
