import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A comment made to a gist.
     *
     * @title Gist Comment
    */
    export type gist_comment = {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        /**
         * The comment text.
        */
        body: string;
        user: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: Schema.author_association;
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
}
type IAutoViewTransformerInputType = Schema.gist_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Extract user info, handling the case where user may be null
    const userLogin: string = input.user?.login ?? "unknown user";
    const avatarSrc: string | undefined = input.user?.avatar_url ?? undefined;

    // Format created date to a human‐readable string
    // Using toLocaleString makes it responsive to the viewer's locale
    const createdAtLabel: string = new Date(input.created_at).toLocaleString();

    // Build the card header with avatar, username, and timestamp
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: userLogin,
        description: createdAtLabel,
        // Only include avatar if we have a valid URL
        startElement: avatarSrc
            ? {
                  type: "Avatar",
                  src: avatarSrc,
                  name: userLogin,
                  size: 40,
              }
            : undefined,
    };

    // Use a Markdown component to render the comment body,
    // so that any markdown syntax in the comment is rendered properly.
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };

    // Provide a footer with a link button to view the comment on GitHub.
    // We attach a link icon to make it visually intuitive.
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            variant: "text",
            size: "small",
            label: "View on GitHub",
            href: input.url,
            startElement: {
                type: "Icon",
                id: "link",
                size: 16,
                color: "blue",
            },
        },
    };

    // Assemble into a vertical card for a clear visual hierarchy.
    // This component is responsive and stacks its header, content, and footer vertically.
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };

    return card;
}
