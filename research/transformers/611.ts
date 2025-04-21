import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The public key used for setting Actions Secrets.
     *
     * @title ActionsPublicKey
    */
    export type actions_public_key = {
        /**
         * The identifier for the key.
        */
        key_id: string;
        /**
         * The Base64 encoded public key.
        */
        key: string;
        id?: number & tags.Type<"int32">;
        url?: string;
        title?: string;
        created_at?: string;
    };
}
type IAutoViewTransformerInputType = Schema.actions_public_key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Format the creation timestamp into a human-readable string
    const createdAt = input.created_at
        ? new Date(input.created_at).toLocaleString()
        : "Unknown";

    // Build a list of DataListItemProps for each field we want to display
    const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Always include the key ID
    dataItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Key ID" },
        value: { type: "Text", content: input.key_id },
    });

    // Optionally include the numeric id if present
    if (input.id !== undefined) {
        dataItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Internal ID" },
            value: { type: "Text", content: String(input.id) },
        });
    }

    // Optionally include the title if present
    if (input.title) {
        dataItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Title" },
            value: { type: "Text", content: input.title },
        });
    }

    // Display the creation date
    dataItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At" },
        value: { type: "Text", content: createdAt },
    });

    // Optionally include a clickable link to the resource
    if (input.url) {
        dataItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "URL" },
            value: {
                type: "Markdown",
                // Use markdown link syntax for better UX on mobile
                content: `[Open Resource](${input.url})`,
            },
        });
    }

    // Finally, visualize the raw public key as a code block for copy/paste
    dataItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Public Key" },
        value: {
            type: "Markdown",
            content: "\n" + input.key + "\n```",
        },
    });

    // Assemble the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataItems,
    };

    // Card header with an icon to represent "key" visually
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.title ?? input.key_id,
        description: `Generated: ${createdAt}`,
        startElement: {
            type: "Icon",
            id: "key",
            color: "blue",
            size: 24,
        },
    };

    // Card content that holds our DataList
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Optional footer with a button linking to the URL if provided
    const footer: IAutoView.IAutoViewCardFooterProps = input.url
        ? {
              type: "CardFooter",
              childrenProps: {
                  type: "Button",
                  label: "View Details",
                  variant: "contained",
                  color: "primary",
                  href: input.url,
              },
          }
        : {
              // Empty footer to maintain consistent card structure
              type: "CardFooter",
          };

    // Return a vertical card combining header, content, and footer
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };

    return card;
}
