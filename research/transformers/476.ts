import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The type of issue.
     *
     * @title Issue Type
    */
    export type issue_type = {
        /**
         * The unique identifier of the issue type.
        */
        id: number & tags.Type<"int32">;
        /**
         * The node identifier of the issue type.
        */
        node_id: string;
        /**
         * The name of the issue type.
        */
        name: string;
        /**
         * The description of the issue type.
        */
        description: string | null;
        /**
         * The color of the issue type.
        */
        color?: "gray" | "blue" | "green" | "yellow" | "orange" | "red" | "pink" | "purple" | null;
        /**
         * The time the issue type created.
        */
        created_at?: string & tags.Format<"date-time">;
        /**
         * The time the issue type last updated.
        */
        updated_at?: string & tags.Format<"date-time">;
        /**
         * The enabled state of the issue type.
        */
        is_enabled?: boolean;
    } | null;
}
type IAutoViewTransformerInputType = Schema.issue_type;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there is no data, render a simple markdown message
  if (input == null) {
    return {
      type: "Markdown",
      content: "**No issue type data provided**",
    };
  }

  // Prepare the avatar: use the first letter of the name, fallback to gray
  const avatarVariant = (input.color ?? "gray") as IAutoView.IAutoViewAvatarProps["variant"];
  const avatarName = input.name?.charAt(0).toUpperCase() ?? "?";

  // Format dates with a fallback
  const createdDate = input.created_at
    ? new Date(input.created_at).toLocaleDateString()
    : "N/A";
  const updatedDate = input.updated_at
    ? new Date(input.updated_at).toLocaleDateString()
    : "N/A";

  // Map the schema color to a chip-friendly color (palette difference: "purple" → "violet")
  const chipColor = (
    input.color === "purple" ? "violet" : input.color
  ) as IAutoView.IAutoViewChipProps["color"];

  // Header: show name, numeric ID, avatar, and an enabled/disabled badge
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `ID: ${input.id}`,
    startElement: {
      type: "Avatar",
      name: avatarName,
      variant: avatarVariant,
      size: 40,
    },
    endElement: {
      type: "Chip",
      label: input.is_enabled ? "Enabled" : "Disabled",
      color: input.is_enabled ? "success" : "error",
      size: "small",
      variant: "filled",
    },
  };

  // Build a small data‐list of metadata: node_id, created, updated, color
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Node ID" },
      value: { type: "Text", content: input.node_id },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created At" },
      value: { type: "Text", content: createdDate },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Updated At" },
      value: { type: "Text", content: updatedDate },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Color" },
      value: {
        type: "Chip",
        label: input.color ?? "N/A",
        color: chipColor,
        size: "small",
        variant: input.color ? "filled" : "outlined",
      },
    },
  ];

  // Wrap the list in a CardContent block
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataListItems,
    },
  };

  // Compose a vertical card with header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
