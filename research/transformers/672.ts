import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_autofix = {
        status: Schema.code_scanning_autofix_status;
        description: Schema.code_scanning_autofix_description;
        started_at: Schema.code_scanning_autofix_started_at;
    };
    /**
     * The status of an autofix.
    */
    export type code_scanning_autofix_status = "pending" | "error" | "success" | "outdated";
    /**
     * The description of an autofix.
    */
    export type code_scanning_autofix_description = string | null;
    /**
     * The start time of an autofix in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type code_scanning_autofix_started_at = string;
}
type IAutoViewTransformerInputType = Schema.code_scanning_autofix;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each status to a FontAwesome icon identifier
  const statusIconMap: Record<Schema.code_scanning_autofix_status, string> = {
    success: "check",
    error: "times-circle",
    pending: "hourglass-half",
    outdated: "clock",
  };

  // Map each status to a Chip color variant (supported by IAutoViewChipProps.color)
  const chipVariantMap: Record<Schema.code_scanning_autofix_status, 
    | "primary" | "secondary" | "success" | "error" 
    | "warning" | "info" | "red" | "orange" | "yellow" 
    | "lime" | "green" | "teal" | "cyan" | "blue" 
    | "indigo" | "violet" | "pink" | "gray" | "darkGray"> = {
    success: "success",
    error: "error",
    pending: "warning",
    outdated: "gray",
  };

  // Map each status to a base color for the icon (supported by IAutoViewIconProps.color)
  const iconColorMap: Record<Schema.code_scanning_autofix_status, 
    | "red" | "orange" | "yellow" | "lime" | "green" 
    | "teal" | "cyan" | "blue" | "indigo" | "violet" 
    | "pink" | "gray" | "darkGray"> = {
    success: "green",
    error: "red",
    pending: "yellow",
    outdated: "gray",
  };

  const iconId = statusIconMap[input.status] ?? "question-circle";
  const chipColor = chipVariantMap[input.status] ?? "gray";
  const iconColor = iconColorMap[input.status] ?? "gray";

  // Compose a Chip showing the status with an icon
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.status.charAt(0).toUpperCase() + input.status.slice(1),
    startElement: {
      type: "Icon",
      id: iconId,
      color: iconColor,
      size: 16,
    },
    color: chipColor,
    size: "small",
    variant: "filled",
  };

  // Use Markdown to render potentially multi-line or null description
  const descriptionMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content:
      input.description !== null && input.description !== undefined
        ? input.description
        : "_No description provided._",
  };

  // Safely format the ISO timestamp into a human-readable string
  const formattedDate = (() => {
    try {
      const d = new Date(input.started_at);
      return isNaN(d.getTime()) ? input.started_at : d.toLocaleString();
    } catch {
      return input.started_at;
    }
  })();

  const dateText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    content: formattedDate,
    variant: "caption",
  };

  // Build a DataList with three items: Status, Description, Started At
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: { type: "Text", content: "Status" },
        value: statusChip,
      },
      {
        type: "DataListItem",
        label: { type: "Text", content: "Description" },
        value: descriptionMarkdown,
      },
      {
        type: "DataListItem",
        label: { type: "Text", content: "Started At" },
        value: dateText,
      },
    ],
  };

  return dataList;
}
