import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunnersLabels {
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunnersLabels.PostResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure the API response
  const { total_count, labels } = input;

  // Build the card header: title, description, and an icon for context
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Runner Labels",
    description: `Total: ${total_count}`,
    startElement: {
      type: "Icon",
      id: "tags",    // a FontAwesome icon representing labels
      color: "blue", // use a standard color to tie into theme
      size: 32,      // prominent size for header
    },
  };

  // Decide what to show in the card content:
  // - If there are no labels, show a friendly markdown note.
  // - Otherwise, render all labels as a group of colored chips.
  const contentChild: IAutoView.IAutoViewComponentProps =
    labels.length === 0
      ? {
          type: "Markdown",
          content: "_No labels available_",
        }
      : {
          type: "ChipGroup",
          // Map each runner_label into a Chip with an icon indicating its type.
          childrenProps: labels.map((label): IAutoView.IAutoViewChipProps => {
            const icon: IAutoView.IAutoViewIconProps = {
              type: "Icon",
              id: label.type === "read-only" ? "lock" : "tag",
              color: label.type === "read-only" ? "gray" : "green",
              size: 12,
            };
            return {
              type: "Chip",
              label: label.name,
              variant: label.type === "read-only" ? "outlined" : "filled",
              color: label.type === "read-only" ? "gray" : "primary",
              size: "small",
              startElement: icon,
            };
          }),
          // Show up to 10 chips before collapsing into a "+n" indicator
          maxItems: 10,
        };

  // Wrap the chosen content in a CardContent component
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChild,
  };

  // Return a vertical card composed of the header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
