import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type integration = {
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
}
type IAutoViewTransformerInputType = Schema.integration;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Handle null input gracefully
    if (input === null) {
        return {
            type: "Markdown",
            content: "## No integration data available.\nPlease check the source or try again later."
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Helper to build a simple text component
    const makeText = (text: string): IAutoView.IAutoViewTextProps => ({
        type: "Text",
        content: text
    });

    // Helper to build a data list item with label and value components
    const makeDataItem = (
        label: string,
        value: IAutoView.IAutoViewPresentationComponentProps
    ): IAutoView.IAutoViewDataListItemProps => ({
        type: "DataListItem",
        label: makeText(label),
        value
    });

    // Format dates for readability
    const formatDate = (iso: string): string =>
        new Date(iso).toLocaleString();

    // Build badges for counts
    const makeBadge = (count: number, iconId: string): IAutoView.IAutoViewBadgeProps => ({
        type: "Badge",
        count,
        childrenProps: {
            type: "Icon",
            id: iconId,
            size: 16,
            color: "gray"
        }
    });

    // DataList items
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    // ID
    items.push(makeDataItem("ID", makeText(input.id.toString())));

    // Slug (optional)
    if (input.slug) {
        items.push(makeDataItem("Slug", makeText(input.slug)));
    }

    // Node ID
    items.push(makeDataItem("Node ID", makeText(input.node_id)));

    // Client ID (optional)
    if (input.client_id) {
        items.push(makeDataItem("Client ID", makeText(input.client_id)));
    }

    // External URL link as a button
    items.push(
        makeDataItem(
            "External URL",
            {
                type: "Button",
                variant: "text",
                color: "primary",
                label: "Visit",
                href: input.external_url
            }
        )
    );

    // HTML URL link as a button
    items.push(
        makeDataItem(
            "HTML URL",
            {
                type: "Button",
                variant: "text",
                color: "primary",
                label: "Open Repo",
                href: input.html_url
            }
        )
    );

    // Creation & update times
    items.push(makeDataItem("Created At", makeText(formatDate(input.created_at))));
    items.push(makeDataItem("Updated At", makeText(formatDate(input.updated_at))));

    // Events count badge
    if (Array.isArray(input.events)) {
        items.push(makeDataItem(
            "Events",
            makeBadge(input.events.length, "caret-down") // using caret-down as generic list icon
        ));
    }

    // Permissions count badge
    if (input.permissions && typeof input.permissions === "object") {
        const permCount = Object.keys(input.permissions).length;
        items.push(makeDataItem(
            "Permissions",
            makeBadge(permCount, "lock")
        ));
    }

    // Installations count (optional)
    if (typeof input.installations_count === "number") {
        items.push(makeDataItem("Installations", makeText(input.installations_count.toString())));
    }

    // Build the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items
    };

    // Assemble the vertical card
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            // Card header with icon and primary info
            {
                type: "CardHeader",
                title: input.name,
                description: input.description ?? "No description provided.",
                startElement: {
                    type: "Icon",
                    id: "github",
                    size: 32,
                    color: "darkGray"
                }
            },
            // Main content: the data list
            {
                type: "CardContent",
                childrenProps: dataList
            },
            // Footer with quick action buttons
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        variant: "contained",
                        color: "primary",
                        label: "Visit Website",
                        href: input.external_url
                    },
                    {
                        type: "Button",
                        variant: "contained",
                        color: "secondary",
                        label: "View on GitHub",
                        href: input.html_url
                    }
                ]
            }
        ]
    };

    return card;
}
