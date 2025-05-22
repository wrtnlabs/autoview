import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
   *
   * @title Reaction
   */
  export type reaction = {
    id: number & tags.Type<"int32">;
    node_id: string;
    user: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The reaction to use
     */
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
    created_at: string & tags.Format<"date-time">;
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
}
export type AutoViewInput = AutoViewInputSubTypes.reaction[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Sort reactions by date (most recent first)
  const reactions = [...value].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // 2. Icon mapping for each reaction content
  const iconProps = { size: 16, className: "flex-shrink-0 text-gray-400" };
  const contentIconMap: Record<
    AutoViewInputSubTypes.reaction["content"],
    JSX.Element
  > = {
    "+1": <LucideReact.ThumbsUp {...iconProps} aria-label="+1" />,
    "-1": <LucideReact.ThumbsDown {...iconProps} aria-label="-1" />,
    laugh: <LucideReact.Smile {...iconProps} aria-label="laugh" />,
    confused: <LucideReact.Meh {...iconProps} aria-label="confused" />,
    heart: (
      <LucideReact.Heart
        {...iconProps}
        className="flex-shrink-0 text-red-500"
        aria-label="heart"
      />
    ),
    hooray: (
      <LucideReact.Star
        {...iconProps}
        className="flex-shrink-0 text-yellow-400"
        aria-label="hooray"
      />
    ),
    rocket: <LucideReact.Rocket {...iconProps} aria-label="rocket" />,
    eyes: <LucideReact.Eye {...iconProps} aria-label="eyes" />,
  };

  // 3. Date formatting helper
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 4. Render component
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.MessageSquare
          size={20}
          className="text-gray-500 mr-2"
          aria-hidden="true"
        />
        Reactions
      </h2>

      {reactions.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {reactions.map((r) => {
            const user = r.user;
            const displayName = user ? (user.name ?? user.login) : "Unknown";
            const avatarSrc = user?.avatar_url;
            const encodedName = encodeURIComponent(displayName);

            return (
              <li key={r.id} className="flex items-center py-2">
                <img
                  src={
                    avatarSrc ||
                    `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff`
                  }
                  alt={displayName}
                  className="h-8 w-8 rounded-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    img.src = `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff`;
                  }}
                />
                <div className="ml-3 flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {contentIconMap[r.content]}
                    <span className="text-sm font-medium text-gray-900">
                      {displayName}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(r.created_at)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center py-6 text-gray-500">
          <LucideReact.AlertCircle
            size={24}
            className="mr-2"
            aria-hidden="true"
          />
          <span>No reactions yet</span>
        </div>
      )}
    </div>
  );
}
