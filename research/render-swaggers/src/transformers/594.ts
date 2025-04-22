import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsRunnersLabels {
        export type PostResponse = {
            total_count: number & tags.Type<"int32">;
            labels: Schema.runner_label[];
        };
    }
    /**
     * A label for a self hosted runner
     *
     * @title Self hosted runner label
    */
    export type runner_label = {
        /**
         * Unique identifier of the label.
        */
        id?: number & tags.Type<"int32">;
        /**
         * Name of the label.
        */
        name: string;
        /**
         * The type of label. Read-only labels are applied automatically when the runner is configured.
        */
        type?: "read-only" | "custom";
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposActionsRunnersLabels.PostResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no labels, display a simple Markdown message
  if (!input.labels || input.labels.length === 0) {
    return {
      type: "Markdown",
      content: "### No runner labels available",
    };
  }

  // Map each runner label to a Chips; use a gray outline for read-only labels
  const chips: IAutoView.IAutoViewChipProps[] = input.labels.map((label) => {
    // Choose chip color by label type
    const color = label.type === "read-only" ? "gray" : "primary";
    return {
      type: "Chip",
      label: label.name,
      color,
      variant: "outlined",
      size: "small",
    };
  });

  // Wrap all chips in a ChipGroup for compact, responsive layout
  const chipGroup: IAutoView.IAutoViewChipGroupProps = {
    type: "ChipGroup",
    childrenProps: chips,
    // Limit visible items and collapse extras on small screens
    maxItems: 8,
  };

  // Create a card header with an icon and a summary of total labels
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Runner Labels",
    description: `Total labels: ${input.total_count}`,
    startElement: {
      type: "Icon",
      id: "tag",      // FontAwesome "tag" icon
      size: 24,
      color: "cyan",
    },
  };

  // Put the chip group into the card content area
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: chipGroup,
  };

  // Use a vertical card to stack the header and content responsively
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
