import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunnersLabels {
        export type _DeleteResponse = {
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunnersLabels._DeleteResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Card header showing an icon and the total count of labels
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Runner Labels",
    description: `Total: ${input.total_count}`,
    startElement: {
      type: "Icon",
      id: "tags",
      color: "blue",
      size: 24
    }
  };

  // Build a list of DataListItemProps for each runner_label
  const items: IAutoView.IAutoViewDataListItemProps[] = input.labels.map(label => {
    // Primary text showing the label's name
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: label.name,
      variant: "body1"
    };

    // If the label has an ID, show it as a badge on a small tag icon
    const idBadge: IAutoView.IAutoViewBadgeProps | null =
      label.id !== undefined
        ? {
            type: "Badge",
            count: label.id,
            maxCount: 999,
            showZero: false,
            dot: false,
            offset: { vertical: "top", horizontal: "right" },
            childrenProps: {
              type: "Icon",
              id: "tag",
              color: "gray",
              size: 16
            }
          }
        : null;

    // Chip to represent whether the label is custom or read-only
    const chipColor: IAutoView.IAutoViewChipProps["color"] =
      label.type === "custom" ? "success" : "info";
    const typeChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: label.type ?? "custom",
      color: chipColor,
      size: "small",
      variant: "filled"
    };

    return {
      type: "DataListItem",
      label: [
        nameText,
        // filter out null in case there's no ID
        ...(idBadge ? [idBadge] : [])
      ],
      value: typeChip
    };
  });

  // If there are no labels, show a Markdown message; otherwise a DataList
  const contentChild: IAutoView.IAutoViewComponentProps =
    items.length > 0
      ? {
          type: "DataList",
          childrenProps: items
        }
      : {
          type: "Markdown",
          content: "_No labels available._"
        };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChild
  };

  // Wrap everything in a vertical card for a clean, responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
