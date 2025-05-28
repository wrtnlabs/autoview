import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export interface team_discussion {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived and formatted values
  const author = value.author;
  const authorName = author ? author.name ?? author.login : 'Unknown';
  const defaultAvatar = author
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0D8ABC&color=fff`
    : `https://placehold.co/32x32/e2e8f0/1e293b?text=?`;
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const isEdited = Boolean(value.last_edited_at);

  // Prepare reaction list with emojis
  const reactionList: { emoji: string; count: number }[] = [];
  if (value.reactions) {
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
    for (const key of Object.keys(emojiMap)) {
      const count = (value.reactions as any)[key];
      if (typeof count === 'number' && count > 0) {
        reactionList.push({ emoji: emojiMap[key], count });
      }
    }
  }

  // 2. Visual composition
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Title and status icons */}
      <header className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.title}</h2>
        <div className="flex space-x-2">
          {value.pinned && (
            <LucideReact.Pin
              size={16}
              className="text-blue-500"
              aria-label="Pinned"
            />
          )}
          {value['private'] && (
            <LucideReact.Lock
              size={16}
              className="text-gray-500"
              aria-label="Private"
            />
          )}
        </div>
      </header>

      {/* Author and timestamp */}
      <div className="flex items-center mt-2 text-sm text-gray-500 space-x-2">
        <img
          src={author?.avatar_url || defaultAvatar}
          alt={authorName}
          className="w-6 h-6 rounded-full"
          onError={(e) => {
            e.currentTarget.src = defaultAvatar;
          }}
        />
        <span className="truncate">{authorName}</span>
        <span>·</span>
        <LucideReact.Calendar size={16} className="inline-block" />
        <time dateTime={value.created_at}>{formattedCreatedAt}</time>
        {isEdited && <span className="italic">(Edited)</span>}
      </div>

      {/* Body snippet */}
      <p className="mt-3 text-gray-700 line-clamp-3">{value.body}</p>

      {/* Footer: comments and reactions */}
      <footer className="mt-4 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center space-x-1">
          <LucideReact.MessageCircle size={16} />
          <span>{value.comments_count}</span>
        </div>
        {reactionList.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto">
            {reactionList.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1">
                <span>{item.emoji}</span>
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </footer>
    </div>
  );
}
