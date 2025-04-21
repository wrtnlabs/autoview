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
    // If there's no data, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No labels to display\n\nThere are no labels available at this time."
        };
    }

    // Map each label object to a DataListItem
    const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map((lbl) => {
        // Construct the description text, falling back if missing
        const descriptionText = lbl.description ?? "No description provided.";

        return {
            type: "DataListItem",
            // Label section: an icon + the label name
            label: [
                {
                    type: "Icon",
                    id: "tag",           // FontAwesome "tag" icon
                    size: 16,
                    color: "blue"
                } as IAutoView.IAutoViewIconProps,
                {
                    type: "Text",
                    content: lbl.name,
                    variant: "body1",
                    color: "primary"
                } as IAutoView.IAutoViewTextProps
            ],
            // Value section: the label's description
            value: {
                type: "Text",
                content: descriptionText,
                variant: "body2",
                // Use gray for neutral, red if truly missing
                color: lbl.description ? "gray" : "error"
            } as IAutoView.IAutoViewTextProps
        };
    });

    // Return a DataList component containing all label items
    return {
        type: "DataList",
        childrenProps: listItems
    };
}
