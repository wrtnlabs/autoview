import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An artifact
     *
     * @title Artifact
    */
    export type artifact = {
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the artifact.
        */
        name: string;
        /**
         * The size in bytes of the artifact.
        */
        size_in_bytes: number & tags.Type<"int32">;
        url: string;
        archive_download_url: string;
        /**
         * Whether or not the artifact has expired.
        */
        expired: boolean;
        created_at: (string & tags.Format<"date-time">) | null;
        expires_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * The SHA256 digest of the artifact. This field will only be populated on artifacts uploaded with upload-artifact v4 or newer. For older versions, this field will be null.
        */
        digest?: string | null;
        workflow_run?: {
            id?: number & tags.Type<"int32">;
            repository_id?: number & tags.Type<"int32">;
            head_repository_id?: number & tags.Type<"int32">;
            head_branch?: string;
            head_sha?: string;
        } | null;
    };
}
type IAutoViewTransformerInputType = Schema.artifact;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: convert bytes into a human-readable string
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${value} ${units[i]}`;
  };

  // Build a list of metadata entries
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Artifact ID
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "ID", variant: "subtitle2" },
    value: { type: "Markdown", content: `${input.id}` },
  });

  // Created at
  if (input.created_at) {
    const created = new Date(input.created_at).toLocaleString();
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Created", variant: "subtitle2" },
      value: { type: "Markdown", content: created },
    });
  }

  // Updated at
  if (input.updated_at) {
    const updated = new Date(input.updated_at).toLocaleString();
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Updated", variant: "subtitle2" },
      value: { type: "Markdown", content: updated },
    });
  }

  // Expires at
  if (input.expires_at) {
    const expires = new Date(input.expires_at).toLocaleString();
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Expires", variant: "subtitle2" },
      value: { type: "Markdown", content: expires },
    });
  }

  // SHA256 digest (if any)
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Digest", variant: "subtitle2" },
    value: {
      type: "Markdown",
      content: input.digest ?? "_N/A_",
    },
  });

  // Workflow run details (rendered as a JSON code block)
  if (input.workflow_run) {
    const json = JSON.stringify(input.workflow_run, null, 2);
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Workflow Run", variant: "subtitle2" },
      value: {
        type: "Markdown",
        content: ["json", json, "```"].join("\n"),
      },
    });
  }

  // Compose the DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Icon representing the artifact
  const fileIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "archive",
    size: 40,
    color: "blue",
  };

  // Status indicator chip
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.expired ? "Expired" : "Active",
    color: input.expired ? "error" : "success",
    variant: "filled",
    size: "small",
  };

  // Card header with title, size, icon, and status
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Size: ${formatBytes(input.size_in_bytes)}`,
    startElement: fileIcon,
    endElement: statusChip,
  };

  // Wrap the metadata list in the card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Action buttons for viewing and downloading
  const viewButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    variant: "outlined",
    color: "primary",
    size: "small",
    label: "View Artifact",
    href: input.url,
  };
  const downloadButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    variant: "contained",
    color: "primary",
    size: "small",
    label: "Download",
    href: input.archive_download_url,
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [viewButton, downloadButton],
  };

  // Final vertical card combining header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
