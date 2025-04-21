import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An autolink reference.
     *
     * @title Autolink reference
    */
    export type autolink = {
        id: number & tags.Type<"int32">;
        /**
         * The prefix of a key that is linkified.
        */
        key_prefix: string;
        /**
         * A template for the target URL that is generated if a key was found.
        */
        url_template: string;
        /**
         * Whether this autolink reference matches alphanumeric characters. If false, this autolink reference only matches numeric characters.
        */
        is_alphanumeric: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.autolink;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Construct a DataList to present autolink fields as a responsive definition list.
    // Each item uses visual components (Chip, Icon, Markdown) for clarity and engagement.

    // ID field displayed as a labeled Chip
    const idItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: { 
            type: "Text",
            content: "ID"
        },
        value: {
            type: "Chip",
            label: input.id.toString(),
            // Use secondary color to make the ID stand out
            color: "secondary",
            variant: "filled",
            size: "small"
        }
    };

    // Key prefix field displayed as a Chip
    const prefixItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Key Prefix"
        },
        value: {
            type: "Chip",
            label: input.key_prefix,
            color: "info",
            variant: "outlined",
            size: "small"
        }
    };

    // URL template shown as formatted code block via Markdown for readability
    const urlTemplateItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "URL Template"
        },
        value: {
            type: "Markdown",
            content: [
                "text",
                input.url_template,
                "```"
            ].join("\n")
        }
    };

    // Alphanumeric flag displayed as a green check or red cross icon
    const alnumItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Alphanumeric"
        },
        value: {
            type: "Icon",
            id: input.is_alphanumeric ? "check-circle" : "times-circle",
            color: input.is_alphanumeric ? "green" : "red",
            size: 20
        }
    };

    // Return the composed DataList component
    return {
        type: "DataList",
        childrenProps: [
            idItem,
            prefixItem,
            urlTemplateItem,
            alnumItem
        ]
    };
}
