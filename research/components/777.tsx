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
export type AutoViewInput = AutoViewInputSubTypes.issue_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const displayName = user
    ? user.name
      ? user.name
      : user.login
    : "Unknown User";
  const avatarUrl = user?.avatar_url;
  const createdDate = new Date(value.created_at);
  const createdAtStr = createdDate.toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const updatedDate = new Date(value.updated_at);
  const isEdited = updatedDate.getTime() > createdDate.getTime();
  // Derive plain text from body, fallback in order
  let commentText = value.body_text ?? value.body;
  if (!commentText && value.body_html) {
    commentText = value.body_html.replace(/<[^>]+>/g, "");
  }
  const emojiMap: { [key: string]: string } = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };
  const reactions = value.reactions;
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="flex items-center mb-3">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={displayName + " avatar"}
            className="w-10 h-10 rounded-full mr-3"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{displayName}</span>
          <span className="text-xs text-gray-500">
            {createdAtStr}
            {isEdited ? " • edited" : ""}
          </span>
        </div>
        <span className="ml-auto px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded">
          {value.author_association.toLowerCase().replace(/_/g, " ")}
        </span>
      </header>
      {commentText && (
        <p
          className="text-gray-700 text-sm mb-3 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {commentText}
        </p>
      )}
      {reactions && (
        <div className="flex flex-wrap items-center">
          {Object.entries(reactions).map(([key, count]) => {
            if (key === "url" || key === "total_count" || (count as number) === 0) {
              return null;
            }
            const emoji = emojiMap[key] || "";
            return (
              <span
                key={key}
                className="inline-flex items-center px-2 py-0.5 mr-2 mb-1 text-xs font-medium text-gray-800 bg-gray-100 rounded"
              >
                {emoji} {count}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
