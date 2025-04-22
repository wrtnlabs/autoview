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
  // If there are no labels, show a simple text message
  if (!input || input.length === 0) {
    return {
      type: "Text",
      content: "No labels available.",
      variant: "body1",
      color: "tertiary",
    };
  }

  // Map each label to a Chip component.
  // Use a gray color for default labels, primary otherwise.
  const chips: IAutoView.IAutoViewChipProps[] = input.map((label) => ({
    type: "Chip",
    label: label.name,
    variant: "filled",
    size: "medium",
    color: label.default ? "gray" : "primary",
    // We could add an icon to show default status, but keep it simple.
  }));

  // Compose a ChipGroup to hold all label chips.
  const chipGroup: IAutoView.IAutoViewChipGroupProps = {
    type: "ChipGroup",
    childrenProps: chips,
    maxItems: 10, // limit for responsiveness; overflow will be hidden with "+N"
  };

  // Build a card header with an icon and summary
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Labels (${input.length})`,
    description: "A quick overview of all repository labels",
    startElement: {
      type: "Icon",
      id: "tag",
      color: "blue",
      size: 24,
    },
  };

  // Put the chip group inside CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: chipGroup,
  };

  // Wrap everything in a vertical card for responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
