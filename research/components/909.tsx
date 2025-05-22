import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A team discussion is a persistent record of a free-form conversation within a team.
   *
   * @title Team Discussion
   */
  export type team_discussion = {
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
    private: boolean;
    team_url: string & tags.Format<"uri">;
    /**
     * The title of the discussion.
     */
    title: string;
    updated_at: string & tags.Format<"date-time">;
    url: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformations and derived constants
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const editedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  // Prepare reaction items with corresponding icons
  const reactions = value.reactions;
  const reactionItems: { icon: JSX.Element; count: number }[] = [];
  if (reactions) {
    const map: Record<string, JSX.Element> = {
      "+1": <LucideReact.ThumbsUp size={16} className="text-gray-400" />,
      "-1": <LucideReact.ThumbsDown size={16} className="text-gray-400" />,
      laugh: <LucideReact.Smile size={16} className="text-gray-400" />,
      confused: <LucideReact.Frown size={16} className="text-gray-400" />,
      heart: <LucideReact.Heart size={16} className="text-red-400" />,
      hooray: <LucideReact.Star size={16} className="text-amber-400" />,
      eyes: <LucideReact.Eye size={16} className="text-gray-400" />,
      rocket: <LucideReact.Rocket size={16} className="text-gray-400" />,
    };
    (
      [
        "+1",
        "-1",
        "laugh",
        "confused",
        "heart",
        "hooray",
        "eyes",
        "rocket",
      ] as const
    ).forEach((key) => {
      const count = (reactions as any)[key] as number;
      if (count > 0) {
        reactionItems.push({ icon: map[key], count });
      }
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="bg-white rounded-lg shadow p-4 max-w-md w-full mx-auto">
      {/* Header: number, title, badges */}
      <header className="mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">
            #{value.number}
          </span>
          <h2 className="text-lg font-semibold text-gray-800">{value.title}</h2>
        </div>
        <div className="flex items-center space-x-2 mt-1 text-sm">
          {value.pinned && (
            <div className="flex items-center bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
              <LucideReact.Pin size={14} className="mr-1" />
              Pinned
            </div>
          )}
          {value.private && (
            <div className="flex items-center bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
              <LucideReact.Lock size={14} className="mr-1" />
              Private
            </div>
          )}
        </div>
      </header>

      {/* Author Info */}
      <div className="flex items-center mb-4 space-x-3">
        {value.author?.avatar_url ? (
          <img
            src={value.author.avatar_url}
            alt={value.author.login}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(value.author?.login || "") +
                "&background=ddd&color=555";
            }}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <LucideReact.User size={40} className="text-gray-400" />
        )}
        <div className="flex flex-col text-sm text-gray-600">
          <span className="font-medium">
            {value.author?.name || value.author?.login || "Unknown"}
          </span>
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={14} className="text-gray-400" />
            <span>{createdAt}</span>
          </div>
          {editedAt && (
            <div className="flex items-center space-x-1 text-gray-500">
              <LucideReact.Edit3 size={14} />
              <span>Edited: {editedAt}</span>
            </div>
          )}
        </div>
      </div>

      {/* Body Preview */}
      <section
        className="prose prose-sm text-gray-700 mb-4 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {/* Footer: comments and reactions */}
      <footer className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <LucideReact.MessageCircle
              size={16}
              className="text-gray-400 mr-1"
            />
            <span>{value.comments_count}</span>
          </div>
          {reactionItems.length > 0 && (
            <div className="flex items-center space-x-3">
              {reactionItems.map((r, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  {r.icon}
                  <span>{r.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </footer>
    </article>
  );
}
