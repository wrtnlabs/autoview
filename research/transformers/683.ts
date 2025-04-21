import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_sarifs_status = {
        /**
         * `pending` files have not yet been processed, while `complete` means results from the SARIF have been stored. `failed` files have either not been processed at all, or could only be partially processed.
        */
        processing_status?: "pending" | "complete" | "failed";
        /**
         * The REST API URL for getting the analyses associated with the upload.
        */
        analyses_url?: (string & tags.Format<"uri">) | null;
        /**
         * Any errors that ocurred during processing of the delivery.
        */
        errors?: string[] | null;
    };
}
type IAutoViewTransformerInputType = Schema.code_scanning_sarifs_status;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine processing status and map to icons, labels, and colors
  const status = input.processing_status ?? "pending";
  const statusMapping: Record<
    string,
    { iconId: string; color: IAutoView.IAutoViewIconProps["color"]; label: string; chipColor: IAutoView.IAutoViewChipProps["color"] }
  > = {
    pending:    { iconId: "hourglass-half", color: "yellow", label: "Pending",  chipColor: "warning" },
    complete:   { iconId: "check-circle",   color: "green",  label: "Complete", chipColor: "success" },
    failed:     { iconId: "times-circle",   color: "red",    label: "Failed",   chipColor: "error" },
  };
  const mapping = statusMapping[status] ?? statusMapping.pending;

  // Compose the Analyses URL item: a button if URL exists, or a text otherwise
  const analysesItemValue: IAutoView.IAutoViewComponentProps = input.analyses_url
    ? {
        type: "Button",
        label: "Open",
        href: input.analyses_url,
        variant: "text",
        color: "primary",
        startElement: { type: "Icon", id: "external-link-alt", size: 16, color: "blue" },
      }
    : {
        type: "Text",
        content: input.analyses_url === null ? "None" : "N/A",
        variant: "body2",
      };

  // Compose the Errors item: a markdown bullet list if errors exist, or a simple text otherwise
  let errorsComponent: IAutoView.IAutoViewComponentProps;
  if (input.errors && input.errors.length > 0) {
    // Join each error into a bullet point
    const markdownContent = input.errors.map(err => `- ${err}`).join("\n");
    errorsComponent = { type: "Markdown", content: markdownContent };
  } else {
    errorsComponent = {
      type: "Text",
      content: "No errors",
      variant: "body2",
      color: "success",
    };
  }

  // Build the DataList with two entries: Analyses URL and Errors
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "link", size: 16, color: "blue" },
        { type: "Text", content: "Analyses URL", variant: "body1" },
      ],
      value: analysesItemValue,
    },
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "exclamation-triangle", size: 16, color: "orange" },
        { type: "Text", content: "Errors", variant: "body1" },
      ],
      value: errorsComponent,
    },
  ];

  // Return a vertical card assembling header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "SARIF Scan Status",
        description: mapping.label,
        startElement: { type: "Icon", id: mapping.iconId, size: 24, color: mapping.color },
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: dataListItems,
          },
        ],
      },
      {
        type: "CardFooter",
        childrenProps: {
          type: "Chip",
          label: mapping.label,
          color: mapping.chipColor,
          size: "small",
          variant: "filled",
        },
      },
    ],
  };
}
