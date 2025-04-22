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
  // If there's no label data, show a simple text placeholder.
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Text",
      // Using a body2 variant for slightly less prominent text on empty state
      variant: "body2",
      content: "No labels available",
    };
  }

  // Map each label into a ListItem component
  const items: IAutoView.IAutoViewListItemProps[] = input.map((label) => {
    // Build a multiline description: optional description + color hex code
    const descriptionLines: string[] = [];
    if (label.description) {
      descriptionLines.push(label.description);
    }
    // Always show the color hex code for quick visual reference
    descriptionLines.push(`Color: #${label.color}`);
    const description = descriptionLines.join("\n");

    // Start icon: a tag icon to represent "label"
    const startIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "tag",
      color: "blue",
      size: 20,
    };

    // End icons: a link icon always, and a check-circle if this is a default label
    const linkIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "link",
      color: "teal",
      size: 20,
    };
    const defaultIcon: IAutoView.IAutoViewIconProps | undefined = label.default
      ? {
          type: "Icon",
          id: "check-circle",
          color: "green",
          size: 20,
        }
      : undefined;

    // Compose the endElement property: either a single icon or an array of icons
    const endElements = defaultIcon ? [linkIcon, defaultIcon] : linkIcon;

    // Return the ListItem representing this label
    return {
      type: "ListItem",
      title: label.name,
      description,
      startElement: startIcon,
      endElement: endElements,
      // Make the whole item clickable to navigate to the label's URL
      href: label.url,
    };
  });

  // Wrap all items in a responsive List component
  return {
    type: "List",
    childrenProps: items,
  };
}
