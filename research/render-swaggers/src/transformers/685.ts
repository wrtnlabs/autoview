import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A list of errors found in a repo's CODEOWNERS file
     *
     * @title CODEOWNERS errors
    */
    export type codeowners_errors = {
        errors: {
            /**
             * The line number where this errors occurs.
            */
            line: number & tags.Type<"int32">;
            /**
             * The column number where this errors occurs.
            */
            column: number & tags.Type<"int32">;
            /**
             * The contents of the line where the error occurs.
            */
            source?: string;
            /**
             * The type of error.
            */
            kind: string;
            /**
             * Suggested action to fix the error. This will usually be `null`, but is provided for some common errors.
            */
            suggestion?: string | null;
            /**
             * A human-readable description of the error, combining information from multiple fields, laid out for display in a monospaced typeface (for example, a command-line setting).
            */
            message: string;
            /**
             * The path of the file where the error occured.
            */
            path: string;
        }[];
    };
}
type IAutoViewTransformerInputType = Schema.codeowners_errors;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no errors, display a friendly success message
    if (!input.errors || input.errors.length === 0) {
        return {
            type: "Text",
            content: "🎉 No CODEOWNERS errors found!",
            variant: "body1",
            color: "success",
        };
    }

    // Map each error to a list item with an icon, message, file chip, location, and optional suggestion tooltip
    const items: IAutoView.IAutoViewListItemProps[] = input.errors.map(error => {
        // Base list item with the main error message
        const listItem: IAutoView.IAutoViewListItemProps = {
            type: "ListItem",
            // The human-readable error message
            title: error.message,
            // Show the kind of error as the description
            description: `Kind: ${error.kind}`,
            // Leading icon to indicate an error
            startElement: {
                type: "Icon",
                id: "exclamation-circle",   // FontAwesome icon
                color: "red",
                size: 20,
            },
            // We'll build up the trailing elements below
            endElement: [],
        };

        // 1) Add a chip for the file path
        (listItem.endElement as IAutoView.IAutoViewChipProps[]).push({
            type: "Chip",
            label: error.path,
            variant: "outlined",
            size: "small",
            color: "gray",
        });

        // 2) Show line and column as a small text
        (listItem.endElement as (IAutoView.IAutoViewChipProps | IAutoView.IAutoViewTextProps)[]).push({
            type: "Text",
            content: `${error.line}:${error.column}`,
            variant: "caption",
            color: "gray",
        });

        // 3) If a suggestion is provided, offer it via a tooltip on an info icon
        if (error.suggestion) {
            (listItem.endElement as (IAutoView.IAutoViewChipProps | IAutoView.IAutoViewTextProps | IAutoView.IAutoViewTooltipProps)[]).push({
                type: "Tooltip",
                message: error.suggestion,
                childrenProps: {
                    type: "Icon",
                    id: "info-circle",
                    color: "teal",
                    size: 16,
                },
            });
        }

        return listItem;
    });

    // Compose the list of errors; the UI will be responsive on mobile by default
    return {
        type: "List",
        childrenProps: items,
    };
}
