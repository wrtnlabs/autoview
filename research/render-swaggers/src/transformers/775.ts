import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
        user: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        issue_url: string & tags.Format<"uri">;
        author_association: Schema.author_association;
        performed_via_github_app?: Schema.nullable_integration;
        reactions?: Schema.reaction_rollup;
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
type IAutoViewTransformerInputType = Schema.issue_comment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no comments, show a friendly message
  if (!input || input.length === 0) {
    return {
      type: "Text",
      content: "No comments available.",
      variant: "body1",
      color: "gray",
    };
  }

  // Map each issue comment to a DataListItemProps
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((comment) => {
    // Safely extract user information (nullable_simple_user can be null)
    const user = comment.user;
    const login = user?.login ?? "Unknown";
    const avatarUrl = user?.avatar_url;

    // Prepare an avatar or a fallback text component if avatar is missing
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewTextProps = avatarUrl
      ? {
          type: "Avatar",
          src: avatarUrl,
          name: login,
          size: 32,
        }
      : {
          type: "Text",
          content: login,
          variant: "body2",
        };

    // Format the creation date into a human-readable string
    const createdAt = new Date(comment.created_at).toLocaleString();

    // Label area: avatar + user login + timestamp
    const label: IAutoView.IAutoViewPresentationComponentProps[] = [
      startElement,
      {
        type: "Text",
        content: login,
        variant: "body2",
        color: "primary",
      },
      {
        type: "Text",
        content: createdAt,
        variant: "caption",
        color: "gray",
      },
    ];

    // Use markdown to render the comment body for richer formatting
    const bodyContent = comment.body ?? "";
    const value: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: bodyContent || "_No content_",
    };

    return {
      type: "DataListItem",
      label,
      value,
    };
  });

  // Wrap all items in a DataList for display
  return {
    type: "DataList",
    childrenProps: items,
  };
}
