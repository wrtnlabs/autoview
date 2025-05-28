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
  // Renders a list of GitHub issue comments with avatar, author, timestamp, content preview, and reactions.

  return (
    <div className="space-y-4">
      {value.length === 0 ? (
        <div className="p-4 text-center text-gray-500 flex items-center justify-center gap-2">
          <LucideReact.MessageSquare size={24} color="currentColor" />
          <span>No comments available.</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {value.map((comment) => {
            const { id, body_text, body, created_at, user, reactions } = comment;
            const content = body_text ?? body ?? 'No content';
            const displayName = user?.name ?? user?.login ?? 'Unknown user';
            const avatarUrl =
              user?.avatar_url ??
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName,
              )}&background=random&color=fff`;
            const formattedDate = new Date(created_at).toLocaleString();

            // Extract reaction entries with count > 0 (excluding url and total_count)
            const reactionEntries = reactions
              ? (Object.entries(reactions).filter(
                  ([key, val]) =>
                    key !== 'url' &&
                    key !== 'total_count' &&
                    typeof val === 'number' &&
                    val > 0,
                ) as [keyof AutoViewInputSubTypes.reaction_rollup, number][])
              : [];

            return (
              <li
                key={id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        displayName,
                      )}&background=random&color=fff`;
                    }}
                  />
                  <div className="ml-3 flex-grow">
                    <p className="text-sm font-medium text-gray-900">{displayName}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <LucideReact.Calendar className="mr-1" size={14} />
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-gray-700 text-sm line-clamp-3">{content}</p>

                {reactionEntries.length > 0 && (
                  <div className="flex items-center space-x-4 mt-3 text-gray-500">
                    {reactionEntries.map(([key, count]) => {
                      let Icon = LucideReact.Heart;
                      let color: string | undefined;

                      switch (key) {
                        case '+1':
                          Icon = LucideReact.ThumbsUp;
                          break;
                        case '-1':
                          Icon = LucideReact.ThumbsDown;
                          break;
                        case 'laugh':
                          Icon = LucideReact.Smile;
                          break;
                        case 'confused':
                          Icon = LucideReact.Frown;
                          break;
                        case 'heart':
                          Icon = LucideReact.Heart;
                          color = '#e0245e';
                          break;
                        case 'hooray':
                          Icon = LucideReact.Star;
                          color = '#fcdc00';
                          break;
                        case 'eyes':
                          Icon = LucideReact.Eye;
                          break;
                        case 'rocket':
                          Icon = LucideReact.Rocket;
                          break;
                      }

                      return (
                        <div key={key} className="flex items-center text-xs">
                          <Icon className="mr-1" size={14} color={color} />
                          <span>{count}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
