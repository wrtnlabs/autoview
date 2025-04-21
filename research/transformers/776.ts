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
type IAutoViewTransformerInputType = Schema.issue_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Prepare the card header, including the user's avatar and basic metadata
    const user = input.user;
    // Fallbacks for missing user
    const avatarProps: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        src: user?.avatar_url,
        name: user?.login ?? "Unknown",
        variant: "gray",
        size: 40,
    };
    const headerProps: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        startElement: avatarProps,
        title: user?.login ?? "Unknown User",
        // Display created date in local format; description uses created_at
        description: (() => {
            try {
                return new Date(input.created_at).toLocaleString();
            } catch {
                return input.created_at;
            }
        })(),
    };

    // Prepare the main content: use Markdown if a body exists; otherwise fallback to text
    const contentChildren: IAutoView.IAutoViewPresentationComponentProps = input.body
        ? {
              type: "Markdown",
              content: input.body,
          }
        : {
              type: "Text",
              content: "No comment body",
          };
    const contentProps: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };

    // Prepare the footer: display a badge with total reactions
    let footerProps: IAutoView.IAutoViewCardFooterProps | undefined;
    if (input.reactions) {
        // Use a single badge to show total reactions; you may expand this to per-reaction badges
        const total = input.reactions.total_count;
        const badgeProps: IAutoView.IAutoViewBadgeProps = {
            type: "Badge",
            count: total,
            showZero: false,
            // Use a smiley icon to represent reactions
            childrenProps: {
                type: "Icon",
                id: "smile",
                color: total > 0 ? "yellow" : "gray",
                size: 16,
            },
        };
        footerProps = {
            type: "CardFooter",
            childrenProps: badgeProps,
        };
    }

    // Assemble the vertical card
    const children: Array<
        | IAutoView.IAutoViewCardHeaderProps
        | IAutoView.IAutoViewCardContentProps
        | IAutoView.IAutoViewCardFooterProps
    > = [headerProps, contentProps];
    if (footerProps) {
        children.push(footerProps);
    }

    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
