import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub Actions workflow
     *
     * @title Workflow
    */
    export type workflow = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        path: string;
        state: "active" | "deleted" | "disabled_fork" | "disabled_inactivity" | "disabled_manually";
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        url: string;
        html_url: string;
        badge_url: string;
        deleted_at?: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.workflow;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map workflow state to a UI color variant for the status chip
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    active: "success",
    disabled_fork: "warning",
    disabled_inactivity: "warning",
    disabled_manually: "warning",
    deleted: "error",
  };
  const chipColor = stateColorMap[input.state] || "gray";

  // Safely format date‐time strings for display
  const formatDate = (dt: string): string => {
    try {
      return new Date(dt).toLocaleString();
    } catch {
      return dt;
    }
  };
  const createdAt = formatDate(input.created_at);
  const updatedAt = formatDate(input.updated_at);
  const deletedAt = input.deleted_at ? formatDate(input.deleted_at) : undefined;

  // Build the key/value list of workflow properties
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "ID" },
      value: { type: "Text", content: String(input.id) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Node ID" },
      value: { type: "Text", content: input.node_id },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created At" },
      value: { type: "Text", content: createdAt },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Updated At" },
      value: { type: "Text", content: updatedAt },
    },
  ];
  if (deletedAt) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Deleted At" },
      value: { type: "Text", content: deletedAt },
    });
  }

  // Card header: display name, path, GitHub icon, and a state chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.path,
    startElement: {
      type: "Icon",
      id: "github",        // GitHub logo icon
      size: 24,
      color: "gray",
    },
    endElement: {
      type: "Chip",
      label: input.state,
      color: chipColor,
      size: "small",
      variant: "filled",
    },
  };

  // Card content: a DataList of workflow fields
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Card footer: link button to GitHub UI and the status badge image
  const viewButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View on GitHub",
    variant: "text",
    color: "primary",
    size: "medium",
    startElement: {
      type: "Icon",
      id: "external-link-alt", // external link icon
      size: 16,
      color: "blue",
    },
    href: input.html_url,
  };
  const badgeImage: IAutoView.IAutoViewImageProps = {
    type: "Image",
    src: input.badge_url,
    alt: `${input.name} badge`,
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [viewButton, badgeImage],
  };

  // Assemble everything into a vertical card for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
