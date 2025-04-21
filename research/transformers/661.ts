import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Check Annotation
     *
     * @title Check Annotation
    */
    export type check_annotation = {
        path: string;
        start_line: number & tags.Type<"int32">;
        end_line: number & tags.Type<"int32">;
        start_column: (number & tags.Type<"int32">) | null;
        end_column: (number & tags.Type<"int32">) | null;
        annotation_level: string | null;
        title: string | null;
        message: string | null;
        raw_details: string | null;
        blob_href: string;
    };
}
type IAutoViewTransformerInputType = Schema.check_annotation[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no annotations, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No code annotations found\nYour codebase is clean! 🎉",
        };
    }

    // Helper to map annotation levels to chip colors
    const levelToColor = (level: string | null): IAutoView.IAutoViewChipProps["color"] => {
        switch (level?.toLowerCase()) {
            case "error":
                return "error";
            case "warning":
                return "warning";
            case "info":
            case "notice":
                return "info";
            case "success":
                return "success";
            default:
                return "gray";
        }
    };

    // Build a DataListItem for each annotation
    const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.map((annotation) => {
        // Construct a path + location label
        const locationText = `${annotation.path} [${annotation.start_line}:${annotation.start_column ?? 0} - ${annotation.end_line}:${annotation.end_column ?? 0}]`;

        // Use a chip to highlight the annotation level/severity
        const severityChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: annotation.annotation_level ? annotation.annotation_level.toUpperCase() : "UNKNOWN",
            color: levelToColor(annotation.annotation_level),
            variant: "filled",
        };

        // Prepare markdown content for the detailed message
        const details = annotation.message
            ? `**${annotation.title ?? "Annotation"}**\n\n${annotation.message}`
            : `**${annotation.title ?? "Annotation"}**\n\n_No additional details provided._`;

        const markdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: details,
        };

        return {
            // Discriminator for DataListItem
            type: "DataListItem",
            // Label side: show file path and lines
            label: [
                {
                    type: "Icon",
                    id: "file",
                    color: "gray",
                    size: 16,
                },
                {
                    type: "Text",
                    content: ` ${locationText}`,
                    variant: "body2",
                    color: "primary",
                },
            ],
            // Value side: show severity chip and markdown details
            value: [
                severityChip,
                markdown,
            ],
        };
    });

    // Return the top-level DataList component
    return {
        type: "DataList",
        childrenProps,
    };
}
