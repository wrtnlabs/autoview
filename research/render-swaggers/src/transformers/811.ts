import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Color-coded labels help you categorize and filter your issues (just like labels in Gmail).
     *
     * @title Label
    */
    export type label = {
        /**
         * Unique identifier for the label.
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the label
        */
        url: string;
        /**
         * The name of the label.
        */
        name: string;
        /**
         * Optional description of the label, such as its purpose.
        */
        description: string | null;
        /**
         * 6-character hex code, without the leading #, identifying the color
        */
        color: string;
        /**
         * Whether this label comes by default in a new repository.
        */
        "default": boolean;
    };
}
type IAutoViewTransformerInputType = Schema.label[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Clone and sort labels by name for consistent ordering
    const sortedLabels = [...input].sort((a, b) => a.name.localeCompare(b.name));

    // Map each label to a DataListItemProps
    const items: IAutoView.IAutoViewDataListItemProps[] = sortedLabels.map(label => {
        // Build the "label" area: avatar + name + optional default-star icon
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // 1. Avatar with the first letter of the label name
        labelComponents.push({
            type: "Avatar",
            name: label.name.charAt(0).toUpperCase(),
            variant: "gray",
            size: 24,
        });

        // 2. Text component for the full label name
        labelComponents.push({
            type: "Text",
            content: label.name,
            variant: "body1",
        });

        // 3. If it's a default label, append a star icon
        if (label.default) {
            labelComponents.push({
                type: "Icon",
                id: "star",
                size: 12,
                color: "yellow",
            });
        }

        // Build the "value" area: use markdown for description if present
        // Otherwise show a placeholder Text
        let valueComponent: IAutoView.IAutoViewPresentationComponentProps;
        if (label.description) {
            // Render description via markdown for richer formatting
            valueComponent = {
                type: "Markdown",
                content: label.description,
            };
        } else {
            // Empty description fallback
            valueComponent = {
                type: "Text",
                content: "_No description_",
                variant: "caption",
                color: "tertiary",
            };
        }

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponent,
        };
    });

    // Wrap all items in a DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
