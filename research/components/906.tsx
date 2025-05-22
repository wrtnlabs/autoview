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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stripHtml = (html: string): string =>
    html.replace(/<[^>]*>/g, "").trim();

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {value.map((discussion) => {
        const author = discussion.author;
        const avatarUrl =
          author?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            (author?.name || author?.login || "User").trim(),
          )}&background=0D8ABC&color=fff`;
        const title = discussion.title;
        const snippetSource = discussion.body_html || discussion.body;
        const rawSnippet = stripHtml(snippetSource);
        const snippet =
          rawSnippet.length > 120
            ? rawSnippet.slice(0, 120).trim() + "…"
            : rawSnippet;
        const created = formatDate(discussion.created_at);
        const comments = discussion.comments_count;
        const reactions = discussion.reactions?.total_count ?? 0;

        return (
          <article
            key={discussion.node_id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <header className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h3>
              <div className="flex items-center space-x-2">
                {discussion.pinned && (
                  <LucideReact.Pin
                    size={16}
                    className="text-gray-500"
                    aria-label="Pinned"
                  />
                )}
                {discussion.private && (
                  <LucideReact.Lock
                    size={16}
                    className="text-gray-500"
                    aria-label="Private"
                  />
                )}
              </div>
            </header>

            <p className="mt-2 text-gray-700 text-sm line-clamp-2">
              {snippet || "No description available."}
            </p>

            <footer className="mt-4 flex flex-wrap items-center justify-between text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <img
                  src={avatarUrl}
                  alt={author?.login || "User avatar"}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>
                  {author?.name ? author.name : author?.login || "Unknown user"}
                </span>
                <span className="mx-1">·</span>
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar size={14} className="text-gray-400" />
                  <span>{created}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <div className="flex items-center space-x-1">
                  <LucideReact.MessageSquare
                    size={14}
                    className="text-gray-400"
                  />
                  <span>{comments}</span>
                </div>
                {reactions > 0 && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.ThumbsUp size={14} className="text-gray-400" />
                    <span>{reactions}</span>
                  </div>
                )}
              </div>
            </footer>
          </article>
        );
      })}
    </div>
  );
}
