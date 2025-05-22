import { tags } from "typia";
import React from "react";
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
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
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
        owner: any | any;
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
    export type simple_user = any;
    export type enterprise = any;
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
  // 1. Helper: Format a date string as "MMM D, YYYY"
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Helper: Get a simple relative time (s, m, h, d ago)
  const getRelativeTime = (iso: string): string => {
    const now = Date.now();
    const then = new Date(iso).getTime();
    const diff = now - then;
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return `${day}d ago`;
    return formatDate(iso);
  };

  // 3. Emoji mapping for reactions
  const reactionIcons: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  // 4. Handle no comments
  if (!value || value.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        No comments yet.
      </div>
    );
  }

  // 5. Render comment list
  return (
    <div className="space-y-4 mx-auto max-w-md">
      {value.map((comment) => {
        const user = comment.user;
        const login = user?.login ?? "Unknown";
        const avatar = user?.avatar_url;
        const timeLabel = getRelativeTime(comment.created_at);
        const content = comment.body_text ?? comment.body ?? "";
        const reactions = comment.reactions;
        // Build list of non-zero reaction entries
        const entries: [string, number][] = reactions
          ? (Object.entries(reactions) as [string, any][])
              .filter(
                ([key, cnt]) =>
                  key !== "url" &&
                  key !== "total_count" &&
                  typeof cnt === "number" &&
                  cnt > 0
              ) as [string, number][]
          : [];

        return (
          <div
            key={comment.id}
            className="flex bg-white rounded-lg shadow p-4"
          >
            {avatar ? (
              <img
                src={avatar}
                alt={login}
                className="w-10 h-10 rounded-full mr-4 flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex-shrink-0 flex items-center justify-center text-gray-500">
                ?
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center">
                <span className="font-semibold text-gray-800">
                  {login}
                </span>
                {comment.author_association && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {comment.author_association}
                  </span>
                )}
                <span className="ml-auto text-xs text-gray-500">
                  {timeLabel}
                </span>
              </div>
              <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                {content || "No content."}
              </p>
              {entries.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {entries.map(([key, cnt]) => (
                    <span
                      key={key}
                      className="flex items-center px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                    >
                      <span className="mr-1">
                        {reactionIcons[key] || key}
                      </span>
                      {cnt}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
