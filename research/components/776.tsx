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
  const userName = user?.name ?? user?.login ?? "Unknown User";
  const userAvatar = user?.avatar_url;
  const formattedAssociation = value.author_association
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const rawHtml = value.body_html ?? '';
  const stripped = rawHtml.replace(/<[^>]+>/g, '');
  const content = (value.body_text ?? value.body ?? stripped).trim() || 'No comment content.';
  const reactions = value.reactions;
  const reactionsList = reactions
    ? [
        { count: reactions["+1"], icon: "👍" },
        { count: reactions["-1"], icon: "👎" },
        { count: reactions.laugh,  icon: "😄" },
        { count: reactions.confused, icon: "😕" },
        { count: reactions.heart,   icon: "❤️" },
        { count: reactions.hooray,  icon: "🎉" },
        { count: reactions.eyes,    icon: "👀" },
        { count: reactions.rocket,  icon: "🚀" },
      ].filter(item => item.count > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center mb-3">
        {userAvatar && (
          <img
            src={userAvatar}
            alt={`${userName} avatar`}
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
        )}
        <div>
          <div className="text-sm font-semibold text-gray-800">{userName}</div>
          <div className="text-xs text-gray-500 flex items-center space-x-1">
            <span>{formattedAssociation}</span>
            <span>·</span>
            <time dateTime={value.created_at}>{formattedDate}</time>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-5">
        {content}
      </p>
      {reactionsList.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center space-x-4 text-xs text-gray-600">
          {reactionsList.map((item, index) => (
            <div key={index} className="flex items-center space-x-1">
              <span>{item.icon}</span>
              <span>{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
