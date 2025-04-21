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
type IAutoViewTransformerInputType = Schema.label;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
    input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
    // 1. Compose the card header: display the label name, optional description,
    //    an icon to denote "label", and a chip indicating whether it's a default label.
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        // Use a tag icon to visually indicate that this is a label
        startElement: {
            type: "Icon",
            id: "tag",
            color: "gray",
            size: 24,
        },
        title: input.name,
        // If a description is provided, show it underneath the title
        ...(input.description
            ? { description: input.description }
            : {}),
        // End element: chip indicating default vs. custom label
        endElement: {
            type: "Chip",
            label: input.default ? "Default" : "Custom",
            color: input.default ? "success" : "warning",
            variant: "filled",
        },
    };

    // 2. Build a data list with the rest of the properties: id, node_id, url, and color hex
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // ID field
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID" },
        value: {
            type: "Text",
            content: input.id.toString(),
        },
    });

    // Node ID field
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Node ID" },
        value: {
            type: "Text",
            content: input.node_id,
        },
    });

    // URL field: render as a text-button for easy tapping on mobile
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL" },
        value: {
            type: "Button",
            variant: "text",
            label: input.url,
            href: input.url,
        },
    });

    // Color hex field: show the hex code; 
    // for stronger visual, we could add a colored dot via markdown or emoji, but here we stick to plain code.
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Color" },
        value: {
            type: "Text",
            content: `#${input.color}`,
        },
    });

    // 3. Wrap the items in a DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // 4. Place the DataList inside CardContent
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // 5. Compose the full vertical card
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}
