import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A collection of related issues and pull requests.
     *
     * @title Milestone
    */
    export type milestone = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        labels_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The number of the milestone.
        */
        number: number & tags.Type<"int32">;
        /**
         * The state of the milestone.
        */
        state: "open" | "closed";
        /**
         * The title of the milestone.
        */
        title: string;
        description: string | null;
        creator: Schema.nullable_simple_user;
        open_issues: number & tags.Type<"int32">;
        closed_issues: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        due_on: (string & tags.Format<"date-time">) | null;
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
}
type IAutoViewTransformerInputType = Schema.milestone;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to format date strings into a more readable format
    const formatDate = (dateStr: string | null | undefined): string =>
        dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

    // Build an Avatar component for the creator if available
    const creatorAvatar: IAutoView.IAutoViewAvatarProps | undefined = input.creator
        ? {
              type: "Avatar",
              src: input.creator.avatar_url,
              name: input.creator.name ?? input.creator.login,
              variant: "primary",
              size: 40,
          }
        : undefined;

    // Build a list of detail items for the milestone
    const details: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            // Milestone number
            label: [
                {
                    type: "Text",
                    content: ["Number"],
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: [`#${input.number}`],
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            // State with a colored chip
            label: [
                {
                    type: "Text",
                    content: ["State"],
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Chip",
                label: input.state,
                color: input.state === "open" ? "success" : "error",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            // Open issues count
            label: [
                {
                    type: "Text",
                    content: ["Open Issues"],
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Chip",
                label: String(input.open_issues),
                color: "info",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            // Closed issues count
            label: [
                {
                    type: "Text",
                    content: ["Closed Issues"],
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Chip",
                label: String(input.closed_issues),
                color: "primary",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            // Due date
            label: [
                {
                    type: "Text",
                    content: ["Due Date"],
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: [formatDate(input.due_on)],
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            // Created at
            label: [
                {
                    type: "Text",
                    content: ["Created"],
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: [formatDate(input.created_at)],
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            // Last updated at
            label: [
                {
                    type: "Text",
                    content: ["Updated"],
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: [formatDate(input.updated_at)],
                    variant: "body1",
                },
            ],
        },
    ];

    // Compose the final VerticalCard with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            // CardHeader: shows title, optional description, and the creator's avatar
            {
                type: "CardHeader",
                title: input.title,
                description: input.description ?? undefined,
                startElement: creatorAvatar,
            },
            // CardContent: a DataList of the milestone details
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: details,
                },
            },
            // CardFooter: a button linking to the GitHub milestone page
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View on GitHub",
                    href: input.html_url,
                    variant: "text",
                    color: "primary",
                    size: "small",
                },
            },
        ],
    };
}
