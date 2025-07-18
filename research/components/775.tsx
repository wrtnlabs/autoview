import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Comments provide a way for people to collaborate on an issue.
     *
     * @title Issue Comment
    */
    export interface issue_comment {
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
    export interface simple_user {
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
    }
    /**
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
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
    }
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
export type AutoViewInput = AutoViewInputSubTypes.issue_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const comments = Array.isArray(value) ? value : [];
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const user = comment.user;
        const displayName = user?.name ?? user?.login ?? "Unknown";
        const avatarUrl =
          user?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName,
          )}&background=0D8ABC&color=fff`;
        const created = comment.created_at
          ? formatDate(comment.created_at)
          : "";
        const bodyText = comment.body_text ?? comment.body ?? "";

        return (
          <article
            key={comment.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <header className="flex items-center space-x-3">
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {displayName}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <time dateTime={comment.created_at}>{created}</time>
                  {comment.author_association && (
                    <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded">
                      {comment.author_association
                        .toLowerCase()
                        .replace(/_/g, " ")}
                    </span>
                  )}
                </div>
              </div>
            </header>
            <p className="mt-2 text-gray-700 text-sm line-clamp-3">
              {bodyText}
            </p>
            {comment.reactions && comment.reactions.total_count > 0 && (
              <div className="mt-3 flex items-center space-x-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <LucideReact.ThumbsUp size={16} />
                  <span>{comment.reactions["+1"]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Heart size={16} className="text-pink-500" />
                  <span>{comment.reactions.heart}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Laugh size={16} className="text-yellow-500" />
                  <span>{comment.reactions.laugh}</span>
                </div>
                {comment.reactions.total_count >
                  comment.reactions["+1"] +
                    comment.reactions.heart +
                    comment.reactions.laugh && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Smile size={16} />
                    <span>{comment.reactions.total_count -
                      (comment.reactions["+1"] +
                        comment.reactions.heart +
                        comment.reactions.laugh)}</span>
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
