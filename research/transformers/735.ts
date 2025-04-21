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



// Function to transform a deployment branch policy into a rich UI representation
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Pick icon and color based on whether it is a branch or tag policy
  const isBranch = input.type === "branch";
  const iconId = isBranch ? "code-branch" : "tag";
  const themeColor = (isBranch ? "green" : "blue") as IAutoView.IAutoViewIconProps["color"];

  // Helper to create a simple text component
  const createText = (
    text: string,
    variant: IAutoView.IAutoViewTextProps["variant"] = "body2",
  ): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
    variant,
  });

  // A small chip to show the policy type with a distinct color
  const typeChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.type ?? "-",
    variant: "outlined",
    size: "small",
    color: themeColor as IAutoView.IAutoViewChipProps["color"],
  };

  // Build the rows: Policy ID, Node ID, and Type
  const rows: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: createText("Policy ID", "subtitle2"),
      value: createText(input.id != null ? String(input.id) : "-", "body1"),
    },
    {
      type: "DataListItem",
      label: createText("Node ID", "subtitle2"),
      value: createText(input.node_id ?? "-", "body1"),
    },
    {
      type: "DataListItem",
      label: createText("Type", "subtitle2"),
      value: typeChip,
    },
  ];

  // The DataList component wraps those rows
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: rows,
  };

  // Compose a vertical card with a header (icon + title) and content (the list)
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Show the policy name or a fallback
        title: input.name ?? "Unnamed Policy",
        // If node_id is present, repeat it in the header description for quick glance
        description: input.node_id ? `Node ID: ${input.node_id}` : undefined,
        // Leading icon visualizes branch vs. tag
        startElement: {
          type: "Icon",
          id: iconId,
          color: themeColor,
          size: 24,
        },
      },
      {
        type: "CardContent",
        // Embed the data list inside the card content
        childrenProps: [dataList],
      },
    ],
  };

  return card;
}
