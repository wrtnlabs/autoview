import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposDependencyGraphSnapshots {
        export type PostResponse = {
            /**
             * ID of the created snapshot.
            */
            id: number & tags.Type<"int32">;
            /**
             * The time at which the snapshot was created.
            */
            created_at: string;
            /**
             * Either "SUCCESS", "ACCEPTED", or "INVALID". "SUCCESS" indicates that the snapshot was successfully created and the repository's dependencies were updated. "ACCEPTED" indicates that the snapshot was successfully created, but the repository's dependencies were not updated. "INVALID" indicates that the snapshot was malformed.
            */
            result: string;
            /**
             * A message providing further details about the result, such as why the dependencies were not updated.
            */
            message: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IApiReposDependencyGraphSnapshots.PostResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine a color-coded chip for the snapshot result status
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.result,
    // Map result to semantic color variants
    color:
      input.result === "SUCCESS"
        ? "success"
        : input.result === "ACCEPTED"
        ? "warning"
        : "error",
    variant: "filled",
    size: "medium",
  };

  // Format timestamp into a human‐friendly string
  const formattedDate = (() => {
    try {
      const date = new Date(input.created_at);
      return isNaN(date.getTime())
        ? input.created_at
        : date.toLocaleString();
    } catch {
      // If parsing fails, fall back to raw value
      return input.created_at;
    }
  })();

  // Build a data list for key fields: ID, created time, and result
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: { type: "Text", content: "ID" },
        value: { type: "Text", content: input.id.toString() },
      },
      {
        type: "DataListItem",
        label: { type: "Text", content: "Created At" },
        value: { type: "Text", content: formattedDate },
      },
      {
        type: "DataListItem",
        label: { type: "Text", content: "Result" },
        // Use the same chip for consistency in header and details
        value: statusChip,
      },
    ],
  };

  // Render the optional message as markdown for better readability
  const messageSection: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content:
      input.message && input.message.trim()
        ? `**Message**\n\n${input.message}`
        : "**Message**\n\n*(No details provided)*",
  };

  // Assemble card header with status chip, title, and subtitle
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Snapshot #${input.id}`,
    description: formattedDate,
    startElement: statusChip,
  };

  // Combine details list and message into card content
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [detailsList, messageSection],
  };

  // Return a vertical card that encapsulates all snapshot information
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return verticalCard;
}
