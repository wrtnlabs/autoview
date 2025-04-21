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
  // If there are no labels, show a friendly markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No labels found\nThere are no labels to display.",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Transform each GitHub label into a DataListItem:
  // - label: a chip with a tag icon
  // - value: the label description (or a fallback)
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.map((lbl) => {
    // Chip for the label name with a tag icon
    const labelChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: lbl.name,
      variant: "filled",
      // Use a neutral color; GitHub hex color codes are not supported by ChipProps
      color: "gray",
      startElement: {
        type: "Icon",
        id: "tag",
        color: "gray",
        size: 16,
      },
    };

    // Text component for the description
    const descriptionText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "body2",
      // If description is null or empty, show a placeholder
      content: lbl.description && lbl.description.trim().length > 0
        ? lbl.description
        : "No description",
    };

    return {
      type: "DataListItem",
      label: labelChip,
      value: descriptionText,
    };
  });

  // Wrap all items in a DataList for a clean key–value display.
  return {
    type: "DataList",
    childrenProps,
  } as IAutoView.IAutoViewDataListProps;
}
