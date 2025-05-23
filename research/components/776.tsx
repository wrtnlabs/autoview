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
export type AutoViewInput = AutoViewInputSubTypes.issue_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.user;
  const authorName = author?.login ?? "Unknown";
  const avatarUrl =
    author?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authorName
    )}&background=random&color=fff`;
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const isEdited = value.updated_at !== value.created_at;
  const bodyText = value.body_text ?? value.body ?? "";

  // Prepare reactions if available
  const rawReactions = value.reactions;
  const reactionEntries: [string, number][] = [];
  if (rawReactions) {
    if (rawReactions["+1"] > 0) reactionEntries.push(["+1", rawReactions["+1"]]);
    if (rawReactions["-1"] > 0) reactionEntries.push(["-1", rawReactions["-1"]]);
    if (rawReactions.laugh > 0) reactionEntries.push(["laugh", rawReactions.laugh]);
    if (rawReactions.confused > 0)
      reactionEntries.push(["confused", rawReactions.confused]);
    if (rawReactions.heart > 0) reactionEntries.push(["heart", rawReactions.heart]);
    if (rawReactions.hooray > 0) reactionEntries.push(["hooray", rawReactions.hooray]);
    if (rawReactions.eyes > 0) reactionEntries.push(["eyes", rawReactions.eyes]);
    if (rawReactions.rocket > 0)
      reactionEntries.push(["rocket", rawReactions.rocket]);
  }

  const reactionIcons: Record<string, JSX.Element> = {
    "+1": <LucideReact.ThumbsUp size={16} className="text-gray-500" />,
    "-1": <LucideReact.ThumbsDown size={16} className="text-gray-500" />,
    laugh: <LucideReact.Smile size={16} className="text-gray-500" />,
    confused: <LucideReact.HelpCircle size={16} className="text-gray-500" />,
    heart: <LucideReact.Heart size={16} className="text-gray-500" />,
    hooray: <LucideReact.Sparkles size={16} className="text-gray-500" />,
    eyes: <LucideReact.Eye size={16} className="text-gray-500" />,
    rocket: <LucideReact.Rocket size={16} className="text-gray-500" />,
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex items-start">
        <img
          src={avatarUrl}
          alt={authorName}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              authorName
            )}&background=random&color=fff`;
          }}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">{authorName}</span>
            <span className="text-xs text-gray-400 capitalize">
              {value.author_association.toLowerCase()}
            </span>
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <LucideReact.Calendar className="mr-1" size={12} />
            <time dateTime={value.created_at}>{createdAt}</time>
            {isEdited && (
              <span className="ml-2 text-gray-400">
                · Edited <time dateTime={value.updated_at}>{updatedAt}</time>
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-gray-700 text-sm line-clamp-3 whitespace-pre-wrap">
        {bodyText}
      </p>

      {reactionEntries.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {reactionEntries.map(([key, count]) => (
            <div key={key} className="flex items-center gap-1 text-xs text-gray-600">
              {reactionIcons[key]}
              <span>{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
