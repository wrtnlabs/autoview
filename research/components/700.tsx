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
export type AutoViewInput = AutoViewInputSubTypes.commit_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const username = user ? (user.name ?? user.login) : 'Unknown User';
  const avatarSrc = user?.avatar_url
    ? user.avatar_url
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`;
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const commitShort = value.commit_id.slice(0, 7);
  const filePath = value.path ?? 'unknown';
  const reactions = value.reactions;
  const reactionData = reactions
    ? [
        { key: '+1', count: reactions['+1'], Icon: LucideReact.ThumbsUp, label: 'Thumbs up' },
        { key: '-1', count: reactions['-1'], Icon: LucideReact.ThumbsDown, label: 'Thumbs down' },
        { key: 'laugh', count: reactions.laugh, Icon: LucideReact.Smile, label: 'Laugh' },
        { key: 'confused', count: reactions.confused, Icon: LucideReact.HelpCircle, label: 'Confused' },
        { key: 'heart', count: reactions.heart, Icon: LucideReact.Heart, label: 'Heart' },
        { key: 'hooray', count: reactions.hooray, Icon: LucideReact.Star, label: 'Hooray' },
        { key: 'eyes', count: reactions.eyes, Icon: LucideReact.Eye, label: 'Eyes' },
        { key: 'rocket', count: reactions.rocket, Icon: LucideReact.Rocket, label: 'Rocket' },
      ]
    : [];
  const activeReactions = reactionData.filter(({ count }) => count > 0);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex items-start space-x-4">
        <img
          src={avatarSrc}
          alt={`${username} avatar`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              username,
            )}&background=0D8ABC&color=fff`;
          }}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-medium">{username}</span>
              {user && (
                <span className="text-gray-500 text-sm">@{user.login}</span>
              )}
              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                {value.author_association}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-1 sm:mt-0">
              <LucideReact.GitCommit size={16} className="text-gray-400" />
              <span>Commit {commitShort}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-400 text-sm mt-1">
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span>{createdAt}</span>
            </div>
            {value.line != null && (
              <div className="flex items-center space-x-1">
                <LucideReact.File size={16} className="text-gray-400" />
                <span>
                  {filePath}:{value.line}
                </span>
              </div>
            )}
          </div>
          <p className="mt-2 text-gray-700 text-sm line-clamp-4 whitespace-pre-wrap">
            {value.body}
          </p>
          {activeReactions.length > 0 && (
            <div className="flex items-center space-x-4 mt-3">
              {activeReactions.map(({ key, count, Icon, label }) => (
                <div key={key} className="flex items-center space-x-1 text-gray-500">
                  <Icon size={16} aria-label={label} className="text-gray-500" />
                  <span className="text-sm">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // 3. Return the React element.
}
