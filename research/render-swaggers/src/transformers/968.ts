import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type organization_simple = {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
    };
}
type IAutoViewTransformerInputType = Schema.organization_simple[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, inform the user with a lightweight markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "*No organizations available.*"
        };
    }

    // Map each organization to a ListItem component
    const items: IAutoView.IAutoViewListItemProps[] = input.map((org) => ({
        type: "ListItem",
        // Organization login as the main title
        title: org.login,
        // Show description only if present
        description: org.description ?? undefined,
        // Display the organization's avatar on the left
        startElement: {
            type: "Image",
            src: org.avatar_url,
            alt: `${org.login} avatar`
        },
        // Add a chevron icon on the right to indicate navigation
        endElement: {
            type: "Icon",
            id: "chevron-right",
            color: "gray",
            // Moderate icon size for mobile friendliness
            size: 20
        }
    }));

    // Compose a sticky subheader plus the list items for better structure on mobile
    const children: (IAutoView.IAutoViewListSubheaderProps | IAutoView.IAutoViewListItemProps)[] = [
        {
            type: "ListSubheader",
            stickToTop: true,
            // Use a heading text to title the list
            childrenProps: {
                type: "Text",
                variant: "h5",
                content: "Organizations"
            }
        },
        ...items
    ];

    // Return the composed List component
    return {
        type: "List",
        childrenProps: children
    };
}
