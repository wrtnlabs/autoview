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
    // Helper to format ISO date strings into a more readable form
    const formatDate = (iso: string): string =>
        new Date(iso).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    // Build the avatar or fallback icon for the creator
    const creatorElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.creator
        ? {
            type: "Avatar",
            src: input.creator.avatar_url,
            name: input.creator.login,
            size: 32,
            variant: "primary",
        }
        : {
            type: "Icon",
            id: "user",
            size: 24,
            color: "gray",
        };

    // A chip indicating the milestone state
    const stateChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: input.state === "open" ? "Open" : "Closed",
        variant: "filled",
        color: input.state === "open" ? "success" : "error",
        size: "small",
    };

    // Assemble a list of key milestone details using a DataList
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Milestone number
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Number", variant: "subtitle2" },
        value: {
            type: "Chip",
            label: input.number.toString(),
            variant: "filled",
            color: "secondary",
            size: "small",
        },
    });

    // Open issues count
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Open issues", variant: "subtitle2" },
        value: {
            type: "Chip",
            label: input.open_issues.toString(),
            variant: "filled",
            color: "warning",
            size: "small",
        },
    });

    // Closed issues count
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Closed issues", variant: "subtitle2" },
        value: {
            type: "Chip",
            label: input.closed_issues.toString(),
            variant: "filled",
            color: "success",
            size: "small",
        },
    });

    // Creation date
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created at", variant: "subtitle2" },
        value: { type: "Text", content: formatDate(input.created_at), variant: "body2" },
    });

    // Due date (optional)
    if (input.due_on) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Due on", variant: "subtitle2" },
            value: { type: "Text", content: formatDate(input.due_on), variant: "body2" },
        });
    }

    // Wrap items in a DataList component
    const detailsList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // Header section with title, description, avatar, and state chip
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.title,
        description: input.description ?? undefined,
        startElement: creatorElement,
        endElement: stateChip,
    };

    // Content section holding the details list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: detailsList,
    };

    // Footer with a button linking to GitHub
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            href: input.html_url,
            variant: "outlined",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "github",
                color: "gray",
                size: 16,
            },
        },
    };

    // Compose the full vertical card
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };

    return card;
}
