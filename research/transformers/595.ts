import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsRunnersLabels {
        export type PutResponse = {
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
type IAutoViewTransformerInputType = Schema.IApiReposActionsRunnersLabels.PutResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { total_count, labels } = input;

  // If there are no labels, render a simple markdown message.
  if (!labels || labels.length === 0) {
    return {
      type: "Markdown",
      content: [
        "### 🏷 Runner Labels",
        "",
        `No labels found. Total count: **${total_count}**.`
      ].join("\n")
    };
  }

  // Transform each runner_label into a DataListItem with a name and a Chip indicating its type.
  const items: IAutoView.IAutoViewDataListItemProps[] = labels.map((label) => {
    // Choose chip color based on label type
    const chipColor = label.type === "read-only" ? "gray" : "blue";
    // Capitalize for display
    const chipLabel = label.type === "read-only" ? "Read‑only" : "Custom";

    return {
      type: "DataListItem",
      // The name of the label, rendered as body1 text
      label: {
        type: "Text",
        content: label.name,
        variant: "body1"
      },
      // Render label type as a Chip
      value: {
        type: "Chip",
        label: chipLabel,
        variant: "outlined",
        color: chipColor,
        size: "small"
      }
    };
  });

  // Wrap the items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Compose a vertical card summarizing total and listing each label
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Title and summary with an icon
        title: "Runner Labels",
        description: `Total: ${total_count}`,
        startElement: {
          type: "Icon",
          id: "tags",    // FontAwesome "tags" icon
          color: "blue",
          size: 24
        }
      },
      {
        type: "CardContent",
        childrenProps: dataList
      }
    ]
  };
}
