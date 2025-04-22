import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Details of a deployment branch or tag policy.
     *
     * @title Deployment branch policy
    */
    export type deployment_branch_policy = {
        /**
         * The unique identifier of the branch or tag policy.
        */
        id?: number & tags.Type<"int32">;
        node_id?: string;
        /**
         * The name pattern that branches or tags must match in order to deploy to the environment.
        */
        name?: string;
        /**
         * Whether this rule targets a branch or tag.
        */
        type?: "branch" | "tag";
    };
}
type IAutoViewTransformerInputType = Schema.deployment_branch_policy;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input for easier access
  const { id, node_id: nodeId, name, type } = input;

  // Map policy type to an icon identifier and colors
  // 'code-branch' for branch, 'tag' for tag (FontAwesome kebab-case names)
  const iconId = type === "branch" ? "code-branch" : "tag";
  const iconColor = type === "branch" ? "green" : "blue";
  const chipColor = type === "branch" ? "success" : "info";

  // Helper to render a DataListItem for a key/value pair.
  const makeListItem = (
    labelText: string,
    valueComponent: IAutoView.IAutoViewPresentationComponentProps
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: { type: "Text", content: labelText },
    value: valueComponent,
  });

  // Compose DataList items dynamically, skipping undefined values
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    makeListItem(
      "Policy ID",
      {
        type: "Text",
        content: id != null ? id.toString() : "N/A",
      }
    ),
    nodeId != null
      ? makeListItem("Node ID", { type: "Text", content: nodeId })
      : undefined,
    makeListItem("Policy Type", {
      type: "Chip",
      label: type ?? "unknown",
      // Use filled variant to stand out
      variant: "filled",
      color: chipColor,
      size: "medium",
    }),
  ].filter((item): item is IAutoView.IAutoViewDataListItemProps => !!item);

  return {
    // Use a vertical card to stack header and details
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with an icon, title, and optional description
        type: "CardHeader",
        title: name ?? "Unnamed Policy",
        description: nodeId ? `Node: ${nodeId}` : undefined,
        startElement: {
          type: "Icon",
          id: iconId,
          color: iconColor,
          size: 24,
        },
      },
      {
        // Card content holds a DataList of key/value rows
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems,
        },
      },
    ],
  };
}
