import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type ChatTagsView = {
        next?: string;
        chatTags?: ChatTag[];
    };
}
type ChatTag = {
    id?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    channelId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
    name: string;
    key: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    description?: string;
    /**
     * @deprecated
    */
    followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
};
type IAutoViewTransformerInputType = desk.ChatTagsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper function: map chat tag colorVariant to a valid AutoView color.
  // Allowed colors for chip and avatar components are:
  // "primary", "secondary", "success", "error", "warning", "info",
  // "red", "orange", "yellow", "lime", "green", "teal", "cyan", "blue",
  // "indigo", "violet", "pink", "gray", "darkGray"
  // Since some chat tag colorVariant values (like "olive", "cobalt", "purple", "navy") are not allowed,
  // we default these to "gray".
  function normalizeColor(colorVariant?: string): "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray" | "primary" {
    const validColors = new Set([
      "red", "orange", "yellow", "lime", "green", "teal", "cyan",
      "blue", "indigo", "violet", "pink", "gray", "darkGray",
      "primary", "secondary", "success", "error", "warning", "info"
    ]);
    if (colorVariant && validColors.has(colorVariant)) {
      return colorVariant as any;
    }
    // For known alternatives we try a mapping (if desired you can expand this)
    if (colorVariant === "olive" || colorVariant === "cobalt" || colorVariant === "purple" || colorVariant === "navy") {
      return "gray";
    }
    // Fallback default
    return "primary";
  }

  // Check if the input has any chat tags to display.
  if (input.chatTags && input.chatTags.length > 0) {
    // For each chat tag, create a chip.
    // We use chips for a more compact and visual representation, and we include an avatar element with the first letter.
    const chipChildren: IAutoView.IAutoViewChipProps[] = input.chatTags.map((tag) => {
      // Create an avatar to display as the chip start element.
      // Extract the first character of the tag name (if available) to use as a visual cue.
      const firstChar = tag.name.trim().charAt(0).toUpperCase();
      // Determine the color for this tag using our helper.
      const normalizedColor = normalizeColor(tag.colorVariant);

      // Construct the avatar element. The 'src' property is not provided here because we are using a letter symbol.
      const avatarElement: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        name: firstChar,
        variant: normalizedColor,
        size: 24 // A moderate size for an avatar inside a chip.
      };

      // Construct the chip using the tag name and avatar.
      return {
        type: "Chip",
        label: tag.name,
        startElement: avatarElement,
        color: normalizedColor,
        size: "small",
        variant: "filled"
      };
    });

    // Wrap the chips in a ChipGroup for visual grouping.
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: chipChildren,
      maxItems: chipChildren.length // Show all items; adjust as needed for UI constraints.
    };

    // Return the ChipGroup as the final component.
    return chipGroup;
  } else {
    // If there are no chat tags, display a markdown message using a Markdown component.
    // Using markdown helps in a more stylized and responsive presentation.
    const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "## No Chat Tags Available\n\nThere are currently no chat tags to display."
    };
    return markdownComponent;
  }
}
