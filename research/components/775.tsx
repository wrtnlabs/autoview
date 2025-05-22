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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const comments = Array.isArray(value) ? value : [];

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatAssociation = (assoc: string): string =>
    assoc
      .toLowerCase()
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const reactionEmojis: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const author = comment.user;
        const content = comment.body_text ?? comment.body ?? "";
        const hasReactions = comment.reactions && Object.values(comment.reactions).some((n) => typeof n === "number" && n > 0);

        return (
          <div key={comment.id} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-start space-x-3">
              <img
                src={author?.avatar_url || ""}
                alt={author?.login ? `${author.login} avatar` : "avatar"}
                className="w-10 h-10 rounded-full object-cover bg-gray-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {author?.login || "Unknown User"}
                  </h4>
                  <time className="text-xs text-gray-500">
                    {formatDate(comment.created_at)}
                  </time>
                </div>
                {comment.author_association && (
                  <span className="mt-1 inline-block px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded">
                    {formatAssociation(comment.author_association)}
                  </span>
                )}
              </div>
            </div>
            {content && (
              <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                {content}
              </p>
            )}
            {hasReactions && comment.reactions && (
              <div className="mt-3 flex flex-wrap items-center space-x-4 text-xs text-gray-600">
                {Object.entries(comment.reactions)
                  .filter(([key, value]) => key in reactionEmojis && typeof value === "number" && value > 0)
                  .map(([key, value]) => (
                    <span key={key} className="flex items-center space-x-1">
                      <span>{reactionEmojis[key]}</span>
                      <span>{value as number}</span>
                    </span>
                  ))}
              </div>
            )}
          </div>
        );
      })}
      {comments.length === 0 && (
        <div className="py-6 text-center text-gray-500">
          No comments to display.
        </div>
      )}
    </div>
  );
}
