import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingChannelCategory {
        /**
         * Invert category information with parent category.
        */
        export type IInvert = {
            /**
             * Parent category info with recursive structure.
             *
             * If no parent exists, then be `null`.
             *
             * @title Parent category info with recursive structure
            */
            parent: null | any;
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Identifier code of the category.
             *
             * The code must be unique in the channel.
             *
             * @title Identifier code of the category
            */
            code: string;
            /**
             * Parent category's ID.
             *
             * @title Parent category's ID
            */
            parent_id: null | (string & tags.Format<"uuid">);
            /**
             * Representative name of the category.
             *
             * The name must be unique within the parent category. If no parent exists,
             * then the name must be unique within the channel between no parent
             * categories.
             *
             * @title Representative name of the category
            */
            name: string;
            /**
             * Creation time of record.
             *
             * @title Creation time of record
            */
            created_at: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IShoppingChannelCategory.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to flatten the parent chain into an array of { name, code }
    const flattenParents = (node: any): { name: string; code: string }[] => {
        const chain: { name: string; code: string }[] = [];
        let current: any = node;
        while (current) {
            // Protect against unexpected shapes
            if (typeof current.name === "string" && typeof current.code === "string") {
                chain.push({ name: current.name, code: current.code });
            }
            // Move to next parent
            current = current.parent;
        }
        // We want root-first order
        return chain.reverse();
    };

    const parentChain = input.parent ? flattenParents(input.parent) : [];

    // Build a DataList of parent categories, or a Markdown note if none exist
    let contentChildren: IAutoView.IAutoViewPresentationComponentProps;
    if (parentChain.length > 0) {
        const items: IAutoView.IAutoViewDataListItemProps[] = parentChain.map(item => {
            // Label: parent name
            const labelText: IAutoView.IAutoViewTextProps = {
                type: "Text",
                content: item.name,
                variant: "body1",
            };
            // Value: parent code
            const valueText: IAutoView.IAutoViewTextProps = {
                type: "Text",
                content: item.code,
                variant: "body2",
                color: "gray",
            };
            return {
                type: "DataListItem",
                label: [labelText],
                value: [valueText],
            };
        });

        contentChildren = {
            type: "DataList",
            childrenProps: items,
        };
    } else {
        // No parent: show a friendly markdown message
        contentChildren = {
            type: "Markdown",
            content: "*No parent category*",
        };
    }

    // Card header with icon, category name, and code
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: `Code: ${input.code}`,
        startElement: {
            type: "Icon",
            id: "folder",
            color: "blue",
            size: 24,
        },
    };

    // Card content wrapping our DataList or Markdown
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };

    // Card footer with creation timestamp
    const footerText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: `Created At: ${new Date(input.created_at).toLocaleString()}`,
        variant: "caption",
        color: "tertiary",
    };
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: [footerText],
    };

    // Assemble a vertical card containing the header, content, and footer
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };

    return card;
}
