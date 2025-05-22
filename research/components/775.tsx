import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Comments provide a way for people to collaborate on an issue.
   *
   * @title Issue Comment
   */
  export type issue_comment = {
    /**
     * Unique identifier of the issue comment
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * URL for the issue comment
     */
    url: string;
    /**
     * Contents of the issue comment
     */
    body?: string;
    body_text?: string;
    body_html?: string;
    html_url: string & tags.Format<"uri">;
    user: AutoViewInputSubTypes.nullable_simple_user;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    issue_url: string & tags.Format<"uri">;
    author_association: AutoViewInputSubTypes.author_association;
    performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
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
  export type author_association =
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
  /**
   * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
   *
   * @title GitHub app
   */
  export type nullable_integration = {
    /**
     * Unique identifier of the GitHub app
     */
    id: number & tags.Type<"int32">;
    /**
     * The slug name of the GitHub app
     */
    slug?: string;
    node_id: string;
    client_id?: string;
    owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
    /**
     * The name of the GitHub app
     */
    name: string;
    description: string | null;
    external_url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    /**
     * The set of permissions for the GitHub app
     */
    permissions: {
      [key: string]: string;
    };
    /**
     * The list of events for the GitHub app
     */
    events: string[];
    /**
     * The number of installations associated with the GitHub app
     */
    installations_count?: number & tags.Type<"int32">;
    client_secret?: string;
    webhook_secret?: string | null;
    pem?: string;
  } | null;
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
  /**
   * An enterprise on GitHub.
   *
   * @title Enterprise
   */
  export type enterprise = {
    /**
     * A short description of the enterprise.
     */
    description?: string | null;
    html_url: string & tags.Format<"uri">;
    /**
     * The enterprise's website URL.
     */
    website_url?: (string & tags.Format<"uri">) | null;
    /**
     * Unique identifier of the enterprise
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The name of the enterprise.
     */
    name: string;
    /**
     * The slug url identifier for the enterprise.
     */
    slug: string;
    created_at: (string & tags.Format<"date-time">) | null;
    updated_at: (string & tags.Format<"date-time">) | null;
    avatar_url: string & tags.Format<"uri">;
  };
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
export type AutoViewInput = AutoViewInputSubTypes.issue_comment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map reaction types to icons and colors
  const reactionMap: Record<string, { Icon: React.FC<any>; color: string }> = {
    "+1": { Icon: LucideReact.ThumbsUp, color: "text-gray-500" },
    "-1": { Icon: LucideReact.ThumbsDown, color: "text-gray-500" },
    laugh: { Icon: LucideReact.Smile, color: "text-yellow-500" },
    confused: { Icon: LucideReact.Frown, color: "text-orange-500" },
    heart: { Icon: LucideReact.Heart, color: "text-red-500" },
    hooray: { Icon: LucideReact.Star, color: "text-green-500" },
    eyes: { Icon: LucideReact.Eye, color: "text-blue-500" },
    rocket: { Icon: LucideReact.Rocket, color: "text-purple-500" },
  };

  // Format a date string into a human-friendly format
  function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Fallback avatar generator
  function handleAvatarError(
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) {
    const img = event.currentTarget;
    const name = img.alt?.split("'s")[0] || "User";
    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {value.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No comments available</span>
        </div>
      ) : (
        value.map((comment) => {
          const user = comment.user;
          const displayName = user ? user.name || user.login : "Unknown";
          const avatarUrl =
            user?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
          const date = formatDate(comment.created_at);
          const body = comment.body_text?.trim() || "No content";

          return (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={avatarUrl}
                  alt={`${displayName}'s avatar`}
                  onError={handleAvatarError}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 truncate">
                    {displayName}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <LucideReact.Calendar size={14} className="flex-none" />
                    <span className="ml-1">{date}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-800 text-sm line-clamp-3">{body}</p>

              {comment.reactions && comment.reactions.total_count > 0 && (
                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100">
                  {Object.entries(reactionMap).map(([key, { Icon, color }]) => {
                    const count = (comment.reactions as any)[key] as number;
                    if (!count || count <= 0) return null;
                    return (
                      <div
                        key={key}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <Icon size={14} className={`${color} flex-none`} />
                        <span className="ml-1">{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
